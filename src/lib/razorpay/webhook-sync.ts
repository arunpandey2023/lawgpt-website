import { synchronizeUserEntitlement } from "@/lib/billing/synchronize-entitlement";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { resolveBillingIntervalFromPlanId } from "@/lib/razorpay/config";
import {
  buildUserSubscriptionRow,
  deriveCancelAtPeriodEnd,
  razorpayUnixToIso,
  type RazorpaySubscriptionSnapshot,
} from "@/lib/razorpay/persist-subscription";
import {
  compareProviderEventTimestamps,
  providerEventUnixToIso,
} from "@/lib/razorpay/webhook-ordering";
import {
  evaluateUnknownSubscriptionGate,
  shouldApplyIncomingSubscriptionStatus,
  type ParsedRazorpayWebhook,
} from "@/lib/razorpay/webhook-parse";

const PROVIDER = "razorpay" as const;

export type WebhookSyncResult =
  | { action: "updated"; subscriptionId: string }
  | { action: "inserted"; subscriptionId: string }
  | { action: "skipped"; reason: string; subscriptionId?: string };

export class WebhookSyncError extends Error {
  readonly status: number;

  constructor(message: string, status = 503) {
    super(message);
    this.name = "WebhookSyncError";
    this.status = status;
  }
}

async function assertAuthUserExists(userId: string): Promise<boolean> {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (error) {
    const status = typeof error.status === "number" ? error.status : 0;
    const message = error.message?.toLowerCase() || "";
    if (
      status === 404 ||
      message.includes("not found") ||
      message.includes("user not found")
    ) {
      return false;
    }
    console.error("[webhooks:razorpay] auth user lookup failed", {
      status: error.status,
      name: error.name,
    });
    throw new WebhookSyncError("Unable to validate subscription owner.", 503);
  }

  return Boolean(data.user?.id);
}

function mapUpdateFields(
  subscription: RazorpaySubscriptionSnapshot,
  lastProviderEventAt: string | null,
) {
  const fields: Record<string, unknown> = {
    provider_customer_id:
      typeof subscription.customer_id === "string" &&
      subscription.customer_id.trim()
        ? subscription.customer_id.trim()
        : null,
    provider_plan_id: subscription.plan_id,
    status: subscription.status,
    current_period_start: razorpayUnixToIso(subscription.current_start),
    current_period_end: razorpayUnixToIso(subscription.current_end),
    cancel_at_period_end: deriveCancelAtPeriodEnd(subscription),
    cancelled_at: razorpayUnixToIso(subscription.ended_at),
  };

  if (lastProviderEventAt) {
    fields.last_provider_event_at = lastProviderEventAt;
  }

  return fields;
}

async function syncEntitlementSafe(userId: string): Promise<void> {
  try {
    await synchronizeUserEntitlement(userId);
  } catch (error) {
    console.error("[webhooks:razorpay] entitlement sync failed", {
      message: error instanceof Error ? error.message : "unknown",
    });
    throw new WebhookSyncError("Unable to synchronize entitlement.", 503);
  }
}

/**
 * Synchronize a verified Razorpay subscription webhook into user_subscriptions,
 * then refresh user_profiles.plan from all of the owner's subscriptions.
 * Never changes ownership of an existing row.
 */
export async function syncSubscriptionFromWebhook(
  parsed: ParsedRazorpayWebhook,
): Promise<WebhookSyncResult> {
  const supabase = getSupabaseAdminClient();
  const subscription = parsed.subscription;
  const subscriptionId = subscription.id;
  const incomingEventAt = providerEventUnixToIso(parsed.eventCreatedAt);

  const { data: existing, error: lookupError } = await supabase
    .from("user_subscriptions")
    .select(
      "id, user_id, status, provider_plan_id, current_period_end, cancelled_at, last_provider_event_at",
    )
    .eq("provider", PROVIDER)
    .eq("provider_subscription_id", subscriptionId)
    .maybeSingle();

  if (lookupError) {
    console.error("[webhooks:razorpay] lookup failed", {
      code: lookupError.code,
      message: lookupError.message,
    });
    throw new WebhookSyncError("Unable to load subscription record.", 503);
  }

  if (existing) {
    const ordering = compareProviderEventTimestamps({
      storedIso: existing.last_provider_event_at,
      incomingUnix: parsed.eventCreatedAt,
    });

    if (ordering === "stale") {
      return {
        action: "skipped",
        reason: "Ignored stale webhook event (older than last_provider_event_at).",
        subscriptionId,
      };
    }

    const fields = mapUpdateFields(subscription, incomingEventAt);

    if (
      !shouldApplyIncomingSubscriptionStatus({
        existingStatus: existing.status,
        incomingStatus: subscription.status,
      })
    ) {
      const { error: partialError } = await supabase
        .from("user_subscriptions")
        .update({
          provider_customer_id: fields.provider_customer_id,
          provider_plan_id: fields.provider_plan_id,
          current_period_start: fields.current_period_start,
          current_period_end: fields.current_period_end,
          cancel_at_period_end: fields.cancel_at_period_end,
          cancelled_at: fields.cancelled_at ?? existing.cancelled_at,
          ...(incomingEventAt
            ? { last_provider_event_at: incomingEventAt }
            : {}),
        })
        .eq("provider", PROVIDER)
        .eq("provider_subscription_id", subscriptionId)
        .eq("user_id", existing.user_id);

      if (partialError) {
        console.error("[webhooks:razorpay] partial update failed", {
          code: partialError.code,
        });
        throw new WebhookSyncError("Unable to update subscription record.", 503);
      }

      await syncEntitlementSafe(existing.user_id);

      return {
        action: "skipped",
        reason:
          "Ignored out-of-order status regression for terminal subscription.",
        subscriptionId,
      };
    }

    const { error: updateError } = await supabase
      .from("user_subscriptions")
      .update(fields)
      .eq("provider", PROVIDER)
      .eq("provider_subscription_id", subscriptionId)
      .eq("user_id", existing.user_id);

    if (updateError) {
      console.error("[webhooks:razorpay] update failed", {
        code: updateError.code,
      });
      throw new WebhookSyncError("Unable to update subscription record.", 503);
    }

    await syncEntitlementSafe(existing.user_id);
    return { action: "updated", subscriptionId };
  }

  const gate = evaluateUnknownSubscriptionGate({
    notes: subscription.notes,
    planId: subscription.plan_id,
    resolveBillingInterval: resolveBillingIntervalFromPlanId,
  });

  if (!gate.ok) {
    return {
      action: "skipped",
      reason: gate.reason,
      subscriptionId,
    };
  }

  const lawgptUserId = gate.lawgptUserId;

  const userExists = await assertAuthUserExists(lawgptUserId);
  if (!userExists) {
    return {
      action: "skipped",
      reason: "Unknown subscription references a non-existent auth user.",
      subscriptionId,
    };
  }

  const row = {
    ...buildUserSubscriptionRow(subscription, lawgptUserId),
    ...(incomingEventAt ? { last_provider_event_at: incomingEventAt } : {}),
  };

  const { data: raced, error: raceLookupError } = await supabase
    .from("user_subscriptions")
    .select("user_id, last_provider_event_at, status")
    .eq("provider", PROVIDER)
    .eq("provider_subscription_id", subscriptionId)
    .maybeSingle();

  if (raceLookupError) {
    console.error("[webhooks:razorpay] race lookup failed", {
      code: raceLookupError.code,
    });
    throw new WebhookSyncError("Unable to save subscription record.", 503);
  }

  if (raced?.user_id) {
    if (raced.user_id !== lawgptUserId) {
      return {
        action: "skipped",
        reason:
          "Subscription already owned by a different user; ownership unchanged.",
        subscriptionId,
      };
    }

    const ordering = compareProviderEventTimestamps({
      storedIso: raced.last_provider_event_at,
      incomingUnix: parsed.eventCreatedAt,
    });
    if (ordering === "stale") {
      return {
        action: "skipped",
        reason: "Ignored stale webhook event (older than last_provider_event_at).",
        subscriptionId,
      };
    }

    const { error: updateError } = await supabase
      .from("user_subscriptions")
      .update(mapUpdateFields(subscription, incomingEventAt))
      .eq("provider", PROVIDER)
      .eq("provider_subscription_id", subscriptionId)
      .eq("user_id", raced.user_id);

    if (updateError) {
      throw new WebhookSyncError("Unable to update subscription record.", 503);
    }

    await syncEntitlementSafe(raced.user_id);
    return { action: "updated", subscriptionId };
  }

  const { error: insertError } = await supabase
    .from("user_subscriptions")
    .upsert(row, { onConflict: "provider,provider_subscription_id" });

  if (insertError) {
    console.error("[webhooks:razorpay] insert failed", {
      code: insertError.code,
    });
    throw new WebhookSyncError("Unable to save subscription record.", 503);
  }

  await syncEntitlementSafe(lawgptUserId);
  return { action: "inserted", subscriptionId };
}

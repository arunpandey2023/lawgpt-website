import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  resolveBillingIntervalFromPlanId,
  type SubscriptionPlan,
} from "@/lib/razorpay/config";
import { SubscriptionVerificationError } from "@/lib/razorpay/errors";

const PROVIDER = "razorpay" as const;

/** Minimal Razorpay subscription fields used for persistence (server-fetched). */
export interface RazorpaySubscriptionSnapshot {
  id: string;
  plan_id: string;
  status: string;
  customer_id?: string | null;
  current_start?: number | string | null;
  current_end?: number | string | null;
  ended_at?: number | string | null;
  /** Present on some cancel responses; not always returned by fetch. */
  cancel_at_cycle_end?: number | boolean | null;
}

export interface UserSubscriptionRow {
  user_id: string;
  provider: typeof PROVIDER;
  provider_subscription_id: string;
  provider_customer_id: string | null;
  provider_plan_id: string;
  billing_interval: SubscriptionPlan;
  status: string;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  cancelled_at: string | null;
}

/**
 * Convert Razorpay Unix-second timestamps to ISO strings for timestamptz.
 * Returns null for missing/invalid values.
 */
export function razorpayUnixToIso(value: unknown): string | null {
  if (value === null || value === undefined || value === "") return null;

  let seconds: number;
  if (typeof value === "number") {
    seconds = value;
  } else if (typeof value === "string" && value.trim()) {
    seconds = Number(value);
  } else {
    return null;
  }

  if (!Number.isFinite(seconds) || seconds <= 0) return null;

  // Razorpay uses seconds; reject values that look like milliseconds.
  if (seconds > 1e12) {
    return new Date(seconds).toISOString();
  }

  return new Date(seconds * 1000).toISOString();
}

export function deriveCancelAtPeriodEnd(
  subscription: RazorpaySubscriptionSnapshot,
): boolean {
  const flag = subscription.cancel_at_cycle_end;
  if (flag === true || flag === 1) return true;
  if (flag === false || flag === 0) return false;
  // Not reliably present on standard fetch responses — keep DB default.
  return false;
}

export function buildUserSubscriptionRow(
  subscription: RazorpaySubscriptionSnapshot,
  lawgptUserId: string,
): UserSubscriptionRow {
  const billingInterval = resolveBillingIntervalFromPlanId(subscription.plan_id);
  if (!billingInterval) {
    throw new SubscriptionVerificationError(
      "Subscription is not linked to a LawGPT Pro plan.",
      400,
    );
  }

  const customerId =
    typeof subscription.customer_id === "string" &&
    subscription.customer_id.trim()
      ? subscription.customer_id.trim()
      : null;

  return {
    user_id: lawgptUserId,
    provider: PROVIDER,
    provider_subscription_id: subscription.id,
    provider_customer_id: customerId,
    provider_plan_id: subscription.plan_id,
    billing_interval: billingInterval,
    status: subscription.status,
    current_period_start: razorpayUnixToIso(subscription.current_start),
    current_period_end: razorpayUnixToIso(subscription.current_end),
    cancel_at_period_end: deriveCancelAtPeriodEnd(subscription),
    cancelled_at: razorpayUnixToIso(subscription.ended_at),
  };
}

/**
 * Idempotent upsert of a verified Razorpay subscription.
 * Refuses to reassign ownership if the subscription already belongs to another user.
 * Does not include last_provider_event_at (preserves webhook ordering timestamps).
 * Does not write user_profiles.plan — callers synchronize entitlement separately.
 */
export async function persistVerifiedSubscription(
  subscription: RazorpaySubscriptionSnapshot,
  lawgptUserId: string,
): Promise<void> {
  const row = buildUserSubscriptionRow(subscription, lawgptUserId);
  const supabase = getSupabaseAdminClient();

  const { data: existing, error: lookupError } = await supabase
    .from("user_subscriptions")
    .select("user_id")
    .eq("provider", PROVIDER)
    .eq("provider_subscription_id", row.provider_subscription_id)
    .maybeSingle();

  if (lookupError) {
    console.error("[subscriptions:persist] lookup failed", lookupError);
    throw new SubscriptionVerificationError(
      "Unable to save subscription. Please try again.",
      503,
    );
  }

  if (existing?.user_id && existing.user_id !== lawgptUserId) {
    throw new SubscriptionVerificationError(
      "Subscription is already linked to another account.",
      409,
    );
  }

  if (existing?.user_id) {
    // Update billing fields only — never touch last_provider_event_at.
    const { error: updateError } = await supabase
      .from("user_subscriptions")
      .update({
        provider_customer_id: row.provider_customer_id,
        provider_plan_id: row.provider_plan_id,
        billing_interval: row.billing_interval,
        status: row.status,
        current_period_start: row.current_period_start,
        current_period_end: row.current_period_end,
        cancel_at_period_end: row.cancel_at_period_end,
        cancelled_at: row.cancelled_at,
      })
      .eq("provider", PROVIDER)
      .eq("provider_subscription_id", row.provider_subscription_id)
      .eq("user_id", existing.user_id);

    if (updateError) {
      console.error("[subscriptions:persist] update failed", updateError);
      throw new SubscriptionVerificationError(
        "Unable to save subscription. Please try again.",
        503,
      );
    }
    return;
  }

  const { error: insertError } = await supabase
    .from("user_subscriptions")
    .insert(row);

  if (insertError) {
    console.error("[subscriptions:persist] insert failed", insertError);
    throw new SubscriptionVerificationError(
      "Unable to save subscription. Please try again.",
      503,
    );
  }
}

import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  resolveAppPlanFromSubscriptions,
  type AppPlan,
  type SubscriptionEntitlementSnapshot,
} from "@/lib/billing/entitlement";

const PROVIDER = "razorpay" as const;

export class EntitlementSyncError extends Error {
  readonly status: number;

  constructor(message: string, status = 503) {
    super(message);
    this.name = "EntitlementSyncError";
    this.status = status;
  }
}

/**
 * Recompute user_profiles.plan from all Razorpay subscription rows for the user.
 * Server-side / service-role only. Never accepts client-supplied plan values.
 */
export async function synchronizeUserEntitlement(
  userId: string,
  now: Date = new Date(),
): Promise<{ plan: AppPlan }> {
  const supabase = getSupabaseAdminClient();

  const { data: rows, error: listError } = await supabase
    .from("user_subscriptions")
    .select("status, current_period_end, cancel_at_period_end, cancelled_at")
    .eq("provider", PROVIDER)
    .eq("user_id", userId);

  if (listError) {
    console.error("[entitlement] list subscriptions failed", {
      code: listError.code,
    });
    throw new EntitlementSyncError("Unable to synchronize entitlement.", 503);
  }

  const snapshots: SubscriptionEntitlementSnapshot[] = (rows ?? []).map(
    (row) => ({
      status: row.status,
      current_period_end: row.current_period_end,
      cancel_at_period_end: row.cancel_at_period_end,
      cancelled_at: row.cancelled_at,
    }),
  );

  const plan = resolveAppPlanFromSubscriptions(snapshots, now);

  const { data: updated, error: updateError } = await supabase
    .from("user_profiles")
    .update({ plan })
    .eq("user_id", userId)
    .select("id");

  if (updateError) {
    console.error("[entitlement] profile update failed", {
      code: updateError.code,
    });
    throw new EntitlementSyncError("Unable to synchronize entitlement.", 503);
  }

  if (!updated?.length) {
    const { error: insertError } = await supabase.from("user_profiles").insert({
      user_id: userId,
      plan,
    });

    if (insertError) {
      // Concurrent ensure_user_records may have created the row — retry update.
      const { error: retryError } = await supabase
        .from("user_profiles")
        .update({ plan })
        .eq("user_id", userId);

      if (retryError) {
        console.error("[entitlement] profile insert/update failed", {
          code: insertError.code,
        });
        throw new EntitlementSyncError(
          "Unable to synchronize entitlement.",
          503,
        );
      }
    }
  }

  return { plan };
}

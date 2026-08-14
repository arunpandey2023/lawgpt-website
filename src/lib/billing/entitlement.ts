/**
 * Centralized Pro entitlement rules.
 * Billing source of truth: user_subscriptions
 * Application projection: user_profiles.plan ('pro' | 'free_professional')
 *
 * Primary signal: Razorpay subscription entity status (+ paid period bounds).
 */

export type AppPlan = "free_professional" | "pro";

export interface SubscriptionEntitlementSnapshot {
  status: string;
  current_period_end: string | null;
  cancel_at_period_end?: boolean;
  cancelled_at?: string | null;
}

export function isWithinPaidPeriod(
  currentPeriodEnd: string | null | undefined,
  now: Date = new Date(),
): boolean {
  if (!currentPeriodEnd) return false;
  const endMs = Date.parse(currentPeriodEnd);
  if (!Number.isFinite(endMs)) return false;
  return endMs > now.getTime();
}

/**
 * Whether a single subscription currently confers Pro access.
 */
export function isSubscriptionEntitlementValid(
  subscription: SubscriptionEntitlementSnapshot,
  now: Date = new Date(),
): boolean {
  const status = subscription.status.trim().toLowerCase();
  const withinPeriod = isWithinPaidPeriod(subscription.current_period_end, now);

  switch (status) {
    case "authenticated":
    case "active":
      // Valid paid/authorized lifecycle — grant/maintain Pro.
      return true;

    case "pending":
      // Payment retry window: keep Pro while the paid period is still valid.
      return withinPeriod;

    case "paused":
    case "halted":
      // Not indefinite Pro — only while a known paid period remains.
      return withinPeriod;

    case "cancelled":
      // Cancellation at period end keeps Pro until current_period_end.
      // Immediate end with no remaining period → no Pro from this row.
      return withinPeriod;

    case "completed":
      // Term finished — Pro only if period end is still in the future (edge).
      return withinPeriod;

    default:
      return false;
  }
}

/**
 * Resolve application plan from all of a user's subscription rows.
 * Never downgrade while ANY other valid Pro subscription remains.
 */
export function resolveAppPlanFromSubscriptions(
  subscriptions: SubscriptionEntitlementSnapshot[],
  now: Date = new Date(),
): AppPlan {
  for (const subscription of subscriptions) {
    if (isSubscriptionEntitlementValid(subscription, now)) {
      return "pro";
    }
  }
  return "free_professional";
}

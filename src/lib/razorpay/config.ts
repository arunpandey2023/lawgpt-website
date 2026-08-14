/**
 * Server-side Razorpay configuration.
 * Plan IDs and secrets never leave the server; never accept them from the client.
 */

export type SubscriptionPlan = "monthly" | "yearly";

const SUBSCRIPTION_PLANS = ["monthly", "yearly"] as const;

/** Billing cycles charged before the subscription ends (server-defined). */
const TOTAL_COUNT_BY_PLAN: Record<SubscriptionPlan, number> = {
  monthly: 120,
  yearly: 30,
};

export function isSubscriptionPlan(value: unknown): value is SubscriptionPlan {
  return (
    typeof value === "string" &&
    (SUBSCRIPTION_PLANS as readonly string[]).includes(value)
  );
}

export function getRazorpayConfig() {
  const keyId = process.env.RAZORPAY_KEY_ID?.trim() || "";
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim() || "";
  const monthlyPlanId = process.env.RAZORPAY_PRO_MONTHLY_PLAN_ID?.trim() || "";
  const yearlyPlanId = process.env.RAZORPAY_PRO_YEARLY_PLAN_ID?.trim() || "";

  return {
    keyId,
    keySecret,
    monthlyPlanId,
    yearlyPlanId,
  };
}

export function assertRazorpayConfigured() {
  const config = getRazorpayConfig();
  const missing: string[] = [];

  if (!config.keyId) missing.push("RAZORPAY_KEY_ID");
  if (!config.keySecret) missing.push("RAZORPAY_KEY_SECRET");
  if (!config.monthlyPlanId) missing.push("RAZORPAY_PRO_MONTHLY_PLAN_ID");
  if (!config.yearlyPlanId) missing.push("RAZORPAY_PRO_YEARLY_PLAN_ID");

  if (missing.length > 0) {
    throw new Error(
      `Razorpay is not configured. Missing: ${missing.join(", ")}.`,
    );
  }

  return config;
}

/** Map client plan interval → Razorpay Plan ID (env only). */
export function resolvePlanId(plan: SubscriptionPlan): string {
  const config = assertRazorpayConfigured();
  return plan === "monthly" ? config.monthlyPlanId : config.yearlyPlanId;
}

/**
 * Map a Razorpay Plan ID → billing interval using server env only.
 * Returns null when the plan ID is not one of our configured Pro plans.
 */
export function resolveBillingIntervalFromPlanId(
  planId: string,
): SubscriptionPlan | null {
  const { monthlyPlanId, yearlyPlanId } = getRazorpayConfig();
  if (planId && planId === monthlyPlanId) return "monthly";
  if (planId && planId === yearlyPlanId) return "yearly";
  return null;
}

export function resolveTotalCount(plan: SubscriptionPlan): number {
  return TOTAL_COUNT_BY_PLAN[plan];
}

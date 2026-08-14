import { getRazorpayClient } from "@/lib/razorpay/client";
import {
  assertRazorpayConfigured,
  resolvePlanId,
  resolveTotalCount,
  type SubscriptionPlan,
} from "@/lib/razorpay/config";
import type { CreateSubscriptionSuccess } from "@/lib/razorpay/types";

export async function createProSubscription(
  plan: SubscriptionPlan,
  lawgptUserId: string,
): Promise<CreateSubscriptionSuccess> {
  const { keyId } = assertRazorpayConfigured();
  const razorpay = getRazorpayClient();
  const planId = resolvePlanId(plan);
  const totalCount = resolveTotalCount(plan);

  const subscription = await razorpay.subscriptions.create({
    plan_id: planId,
    total_count: totalCount,
    quantity: 1,
    customer_notify: 1,
    notes: {
      product: "lawgpt_pro",
      billing_interval: plan,
      lawgpt_user_id: lawgptUserId,
    },
  });

  if (!subscription?.id) {
    throw new Error("Razorpay did not return a subscription id.");
  }

  return {
    ok: true,
    keyId,
    subscriptionId: subscription.id,
    plan,
    status: subscription.status,
  };
}

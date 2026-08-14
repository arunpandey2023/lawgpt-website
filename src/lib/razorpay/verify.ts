import { createHmac, timingSafeEqual } from "crypto";
import {
  assertRazorpayConfigured,
  getRazorpayConfig,
} from "@/lib/razorpay/config";

/**
 * Razorpay subscription Checkout signature:
 * HMAC-SHA256(razorpay_payment_id + "|" + razorpay_subscription_id, key_secret)
 */
export function verifySubscriptionPaymentSignature(input: {
  paymentId: string;
  subscriptionId: string;
  signature: string;
  secret: string;
}): boolean {
  const payload = `${input.paymentId}|${input.subscriptionId}`;
  const expected = createHmac("sha256", input.secret)
    .update(payload)
    .digest("hex");

  const expectedBuf = Buffer.from(expected, "utf8");
  const actualBuf = Buffer.from(input.signature, "utf8");

  if (expectedBuf.length !== actualBuf.length) {
    return false;
  }

  return timingSafeEqual(expectedBuf, actualBuf);
}

export function isConfiguredProPlanId(planId: string): boolean {
  const { monthlyPlanId, yearlyPlanId } = getRazorpayConfig();
  return planId === monthlyPlanId || planId === yearlyPlanId;
}

/** Accepted post-authorization subscription statuses (no entitlement yet). */
const ACCEPTABLE_SUBSCRIPTION_STATUSES = new Set([
  "authenticated",
  "active",
]);

export function isAcceptableSubscriptionStatus(status: string): boolean {
  return ACCEPTABLE_SUBSCRIPTION_STATUSES.has(status);
}

export function requireRazorpaySecret(): string {
  return assertRazorpayConfigured().keySecret;
}

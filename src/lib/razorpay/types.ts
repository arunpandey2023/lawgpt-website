import type { SubscriptionPlan } from "@/lib/razorpay/config";

export interface CreateSubscriptionRequestBody {
  plan?: unknown;
}

export interface CreateSubscriptionSuccess {
  ok: true;
  /** Public Razorpay Key ID for Checkout (never the secret). */
  keyId: string;
  /** Subscription id to pass as `subscription_id` to Checkout. */
  subscriptionId: string;
  plan: SubscriptionPlan;
  status: string;
}

export interface CreateSubscriptionError {
  ok: false;
  message: string;
}

export interface VerifySubscriptionRequestBody {
  razorpay_payment_id?: unknown;
  razorpay_subscription_id?: unknown;
  razorpay_signature?: unknown;
}

export interface VerifySubscriptionSuccess {
  ok: true;
  verified: true;
}

export interface VerifySubscriptionError {
  ok: false;
  verified: false;
  message: string;
}

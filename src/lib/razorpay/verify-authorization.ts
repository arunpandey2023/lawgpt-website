import {
  EntitlementSyncError,
  synchronizeUserEntitlement,
} from "@/lib/billing/synchronize-entitlement";
import { getRazorpayClient } from "@/lib/razorpay/client";
import { SubscriptionVerificationError } from "@/lib/razorpay/errors";
import { persistVerifiedSubscription } from "@/lib/razorpay/persist-subscription";
import {
  isAcceptableSubscriptionStatus,
  isConfiguredProPlanId,
  requireRazorpaySecret,
  verifySubscriptionPaymentSignature,
} from "@/lib/razorpay/verify";

export interface VerifySubscriptionAuthorizationInput {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}

export { SubscriptionVerificationError };

const PAYMENT_ID_PATTERN = /^pay_[A-Za-z0-9]+$/;
const SUBSCRIPTION_ID_PATTERN = /^sub_[A-Za-z0-9]+$/;
const SIGNATURE_PATTERN = /^[a-f0-9]{64}$/i;

function normalizeId(value: unknown, label: string): string {
  if (typeof value !== "string") {
    throw new SubscriptionVerificationError(`Missing ${label}.`);
  }
  const trimmed = value.trim();
  if (!trimmed) {
    throw new SubscriptionVerificationError(`Missing ${label}.`);
  }
  return trimmed;
}

export function parseVerifyAuthorizationBody(
  body: unknown,
): VerifySubscriptionAuthorizationInput {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new SubscriptionVerificationError("Invalid request body.");
  }

  const record = body as Record<string, unknown>;
  const paymentId = normalizeId(
    record.razorpay_payment_id,
    "razorpay_payment_id",
  );
  const subscriptionId = normalizeId(
    record.razorpay_subscription_id,
    "razorpay_subscription_id",
  );
  const signature = normalizeId(
    record.razorpay_signature,
    "razorpay_signature",
  );

  if (!PAYMENT_ID_PATTERN.test(paymentId)) {
    throw new SubscriptionVerificationError("Malformed razorpay_payment_id.");
  }
  if (!SUBSCRIPTION_ID_PATTERN.test(subscriptionId)) {
    throw new SubscriptionVerificationError(
      "Malformed razorpay_subscription_id.",
    );
  }
  if (!SIGNATURE_PATTERN.test(signature)) {
    throw new SubscriptionVerificationError("Malformed razorpay_signature.");
  }

  return {
    razorpay_payment_id: paymentId,
    razorpay_subscription_id: subscriptionId,
    razorpay_signature: signature,
  };
}

/**
 * Verifies Checkout authorization signature and confirms the subscription
 * exists in Razorpay against one of our configured Pro plan IDs and belongs
 * to the authenticated LawGPT user. Persists billing state and syncs Pro
 * entitlement when the subscription is entitlement-valid.
 */
export async function verifySubscriptionAuthorization(
  input: VerifySubscriptionAuthorizationInput,
  lawgptUserId: string,
): Promise<{ ok: true; verified: true }> {
  const secret = requireRazorpaySecret();

  const signatureValid = verifySubscriptionPaymentSignature({
    paymentId: input.razorpay_payment_id,
    subscriptionId: input.razorpay_subscription_id,
    signature: input.razorpay_signature,
    secret,
  });

  if (!signatureValid) {
    throw new SubscriptionVerificationError("Invalid payment signature.", 400);
  }

  const razorpay = getRazorpayClient();
  let subscription;

  try {
    subscription = await razorpay.subscriptions.fetch(
      input.razorpay_subscription_id,
    );
  } catch (error) {
    console.error("[subscriptions:verify] fetch failed", error);
    throw new SubscriptionVerificationError(
      "Unable to validate subscription with Razorpay.",
      502,
    );
  }

  if (!subscription?.id || subscription.id !== input.razorpay_subscription_id) {
    throw new SubscriptionVerificationError("Subscription not found.", 400);
  }

  if (!subscription.plan_id || !isConfiguredProPlanId(subscription.plan_id)) {
    throw new SubscriptionVerificationError(
      "Subscription is not linked to a LawGPT Pro plan.",
      400,
    );
  }

  if (!isAcceptableSubscriptionStatus(subscription.status)) {
    throw new SubscriptionVerificationError(
      "Subscription is not in an authorized state.",
      400,
    );
  }

  const ownerId =
    typeof subscription.notes?.lawgpt_user_id === "string"
      ? subscription.notes.lawgpt_user_id
      : null;

  if (!ownerId || ownerId !== lawgptUserId) {
    throw new SubscriptionVerificationError(
      "Subscription does not belong to the authenticated user.",
      403,
    );
  }

  // Persist only after every Razorpay check succeeds. Failure here fails verify.
  await persistVerifiedSubscription(
    {
      id: subscription.id,
      plan_id: subscription.plan_id,
      status: subscription.status,
      customer_id: subscription.customer_id ?? null,
      current_start: subscription.current_start ?? null,
      current_end: subscription.current_end ?? null,
      ended_at: subscription.ended_at ?? null,
      cancel_at_cycle_end:
        (subscription as { cancel_at_cycle_end?: number | boolean | null })
          .cancel_at_cycle_end ?? null,
    },
    lawgptUserId,
  );

  // authenticated/active checkout → grant Pro projection (idempotent).
  try {
    await synchronizeUserEntitlement(lawgptUserId);
  } catch (error) {
    if (error instanceof EntitlementSyncError) {
      throw new SubscriptionVerificationError(error.message, error.status);
    }
    throw new SubscriptionVerificationError(
      "Unable to activate Pro access. Please try again.",
      503,
    );
  }

  return { ok: true, verified: true };
}

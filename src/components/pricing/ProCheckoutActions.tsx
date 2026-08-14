"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { buildLawgptLoginUrl } from "@/lib/auth/config";
import {
  clearAuthHashFromUrl,
  clearCheckoutQueryParam,
  establishBrowserSessionFromHandoff,
  getAccessToken,
  parseAuthHandoffHash,
} from "@/lib/auth/browser";
import {
  buildHandoffClaimKey,
  claimHandoff,
  type CheckoutPlan as HandoffPlan,
} from "@/lib/auth/handoff-claim";
import {
  checkoutDescription,
  loadRazorpayCheckoutScript,
  type CheckoutPlan,
} from "@/lib/razorpay/checkout-client";
import { cn } from "@/lib/utils";

interface ProCheckoutActionsProps {
  highlighted?: boolean;
}

type CreateApiSuccess = {
  ok: true;
  keyId: string;
  subscriptionId: string;
  plan: CheckoutPlan;
};

type ApiError = {
  ok: false;
  message?: string;
};

type VerifyApiSuccess = {
  ok: true;
  verified: true;
};

type VerifyApiError = {
  ok: false;
  verified?: false;
  message?: string;
};

function isCheckoutPlan(value: string | null): value is CheckoutPlan {
  return value === "monthly" || value === "yearly";
}

function claimCheckoutResume(plan: CheckoutPlan): boolean {
  const handoff =
    typeof window !== "undefined"
      ? parseAuthHandoffHash(window.location.hash)
      : null;
  const key = buildHandoffClaimKey(
    plan as HandoffPlan,
    handoff?.access_token ?? null,
  );
  return claimHandoff(key);
}

export function ProCheckoutActions({ highlighted = false }: ProCheckoutActionsProps) {
  const searchParams = useSearchParams();
  const [busyPlan, setBusyPlan] = useState<CheckoutPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [handoffPlan, setHandoffPlan] = useState<CheckoutPlan | null>(null);

  const busy = busyPlan !== null;

  function redirectToLogin(plan: CheckoutPlan) {
    const loginUrl = buildLawgptLoginUrl(plan, window.location.origin);
    window.location.assign(loginUrl);
  }

  async function verifyAuthorization(
    paymentResponse: {
      razorpay_payment_id: string;
      razorpay_subscription_id: string;
      razorpay_signature: string;
    },
    accessToken: string,
  ) {
    const response = await fetch("/api/subscriptions/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_subscription_id: paymentResponse.razorpay_subscription_id,
        razorpay_signature: paymentResponse.razorpay_signature,
      }),
    });

    const data = (await response.json()) as VerifyApiSuccess | VerifyApiError;

    if (response.status === 401) {
      throw new Error("AUTH_REQUIRED");
    }

    if (!response.ok || !data.ok || !("verified" in data) || !data.verified) {
      throw new Error(
        !data.ok && data.message
          ? data.message
          : "Payment verification failed.",
      );
    }
  }

  async function startCheckout(plan: CheckoutPlan) {
    if (busy) return;

    setError(null);
    setSuccess(null);
    setBusyPlan(plan);

    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        redirectToLogin(plan);
        return;
      }

      await loadRazorpayCheckoutScript();

      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ plan }),
      });

      const data = (await response.json()) as CreateApiSuccess | ApiError;

      if (response.status === 401) {
        redirectToLogin(plan);
        return;
      }

      if (!response.ok || !data.ok) {
        throw new Error(
          !data.ok && data.message
            ? data.message
            : "We could not start checkout. Please try again.",
        );
      }

      if (!window.Razorpay) {
        throw new Error("Razorpay Checkout failed to initialize.");
      }

      const rzp = new window.Razorpay({
        key: data.keyId,
        subscription_id: data.subscriptionId,
        name: "LawGPT",
        description: checkoutDescription(plan),
        handler: (paymentResponse) => {
          void (async () => {
            try {
              const token = (await getAccessToken()) ?? accessToken;
              console.info("[razorpay:checkout] authorized", {
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_subscription_id:
                  paymentResponse.razorpay_subscription_id,
              });
              await verifyAuthorization(paymentResponse, token);
              setSuccess(
                "Payment verified successfully. Pro access will be activated in a later step.",
              );
            } catch (verifyError) {
              console.error("[razorpay:verify]", verifyError);
              setSuccess(null);
              if (
                verifyError instanceof Error &&
                verifyError.message === "AUTH_REQUIRED"
              ) {
                redirectToLogin(plan);
                return;
              }
              setError(
                "Payment verification failed. Please contact support if you were charged.",
              );
            } finally {
              setBusyPlan(null);
            }
          })();
        },
        modal: {
          ondismiss: () => {
            setBusyPlan(null);
          },
        },
      });

      rzp.on("payment.failed", (failure) => {
        console.error("[razorpay:checkout] payment.failed", failure);
        setError("Payment failed. Please try again or use a different method.");
        setBusyPlan(null);
      });

      rzp.open();
    } catch (err) {
      console.error("[razorpay:checkout]", err);
      setError(
        err instanceof Error
          ? err.message
          : "Checkout could not be started. Please try again.",
      );
      setBusyPlan(null);
    }
  }

  useEffect(() => {
    const plan = searchParams.get("checkout");
    if (!isCheckoutPlan(plan)) return;

    // One-shot claim (memory + sessionStorage) — stops Strict Mode and reload loops.
    if (!claimCheckoutResume(plan)) return;

    void (async () => {
      const result = await establishBrowserSessionFromHandoff();

      if (!result.ok) {
        // Clear tokens from the URL after recording the claim so reloads cannot
        // re-process the same handoff, and do NOT auto-redirect (avoids loops).
        if (result.handoffAttempted) {
          clearAuthHashFromUrl();
        }
        clearCheckoutQueryParam();
        setHandoffPlan(plan);
        setError(result.message);
        setBusyPlan(null);
        return;
      }

      clearCheckoutQueryParam();
      setHandoffPlan(null);
      await startCheckout(plan);
    })();
    // Intentionally once per return-from-login handoff.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="mt-8 space-y-3">
      <Button
        type="button"
        size="lg"
        disabled={busy}
        onClick={() => void startCheckout("monthly")}
        className="w-full"
        variant="secondary"
      >
        {busyPlan === "monthly" ? "Starting checkout…" : "Upgrade Monthly"}
      </Button>
      <Button
        type="button"
        size="lg"
        disabled={busy}
        onClick={() => void startCheckout("yearly")}
        className="w-full"
        variant={highlighted ? "onDark" : "outline"}
      >
        {busyPlan === "yearly" ? "Starting checkout…" : "Upgrade Yearly"}
      </Button>

      {error ? (
        <div className="space-y-2 text-center" role="alert">
          <p className="text-sm text-red-600">{error}</p>
          {handoffPlan ? (
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={busy}
              onClick={() => redirectToLogin(handoffPlan)}
            >
              Sign in again
            </Button>
          ) : null}
        </div>
      ) : null}

      {success ? (
        <p
          className={cn(
            "text-center text-sm",
            highlighted ? "text-accent-muted" : "text-success",
          )}
          role="status"
        >
          {success}
        </p>
      ) : null}
    </div>
  );
}

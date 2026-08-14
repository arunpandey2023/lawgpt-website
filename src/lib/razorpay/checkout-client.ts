/**
 * Client-only Razorpay Checkout helpers.
 * Never imports plan IDs, amounts, or key secrets.
 */

const CHECKOUT_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

export type CheckoutPlan = "monthly" | "yearly";

export function checkoutDescription(plan: CheckoutPlan): string {
  return plan === "monthly" ? "LawGPT Pro Monthly" : "LawGPT Pro Yearly";
}

export function loadRazorpayCheckoutScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Checkout is only available in the browser."));
  }

  if (window.Razorpay) {
    return Promise.resolve();
  }

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${CHECKOUT_SCRIPT_SRC}"]`,
  );

  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Razorpay Checkout.")),
        { once: true },
      );
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = CHECKOUT_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Razorpay Checkout."));
    document.body.appendChild(script);
  });
}

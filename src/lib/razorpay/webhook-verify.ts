import { createHmac, timingSafeEqual } from "crypto";

/**
 * Razorpay webhook signature:
 * HMAC-SHA256(raw request body, webhook_secret) as hex, compared to
 * X-Razorpay-Signature.
 *
 * MUST use the exact raw body bytes/text — never JSON.stringify(parsed).
 * Webhook secret is separate from RAZORPAY_KEY_SECRET.
 */

export function getRazorpayWebhookSecret(): string {
  return process.env.RAZORPAY_WEBHOOK_SECRET?.trim() || "";
}

export function assertRazorpayWebhookSecret(): string {
  const secret = getRazorpayWebhookSecret();
  if (!secret) {
    throw new Error(
      "Razorpay webhook is not configured. Missing: RAZORPAY_WEBHOOK_SECRET.",
    );
  }
  return secret;
}

export function computeRazorpayWebhookSignature(
  rawBody: string,
  secret: string,
): string {
  return createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
}

export function verifyRazorpayWebhookSignature(input: {
  rawBody: string;
  signature: string | null | undefined;
  secret: string;
}): boolean {
  const provided = input.signature?.trim() || "";
  if (!provided) return false;

  const expected = computeRazorpayWebhookSignature(input.rawBody, input.secret);
  const expectedBuf = Buffer.from(expected, "utf8");
  const actualBuf = Buffer.from(provided, "utf8");

  if (expectedBuf.length !== actualBuf.length) {
    return false;
  }

  return timingSafeEqual(expectedBuf, actualBuf);
}

import { NextResponse } from "next/server";
import { getRazorpayConfig } from "@/lib/razorpay/config";
import {
  assertWebhookModeAllowed,
  assertRazorpayMode,
} from "@/lib/razorpay/webhook-mode";
import {
  parseRazorpayWebhookJson,
  parseSubscriptionWebhookPayload,
  WebhookPayloadError,
} from "@/lib/razorpay/webhook-parse";
import {
  syncSubscriptionFromWebhook,
  WebhookSyncError,
} from "@/lib/razorpay/webhook-sync";
import {
  assertRazorpayWebhookSecret,
  verifyRazorpayWebhookSignature,
} from "@/lib/razorpay/webhook-verify";

export const runtime = "nodejs";

/**
 * POST /api/webhooks/razorpay
 *
 * Razorpay subscription lifecycle webhooks → public.user_subscriptions.
 * Signature verified against the exact raw body. Does not touch user_profiles.plan.
 */
export async function POST(request: Request) {
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to read webhook body." },
      { status: 400 },
    );
  }

  let webhookSecret: string;
  let mode;
  try {
    webhookSecret = assertRazorpayWebhookSecret();
    mode = assertRazorpayMode();
  } catch (error) {
    console.error("[webhooks:razorpay] misconfigured", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json(
      { ok: false, message: "Webhook endpoint is temporarily unavailable." },
      { status: 503 },
    );
  }

  const signature = request.headers.get("x-razorpay-signature");
  const signatureValid = verifyRazorpayWebhookSignature({
    rawBody,
    signature,
    secret: webhookSecret,
  });

  if (!signatureValid) {
    console.warn("[webhooks:razorpay] invalid or missing signature");
    return NextResponse.json(
      { ok: false, message: "Invalid webhook signature." },
      { status: 400 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = parseRazorpayWebhookJson(rawBody);
  } catch (error) {
    if (error instanceof WebhookPayloadError) {
      return NextResponse.json(
        { ok: false, message: error.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { ok: false, message: "Malformed webhook payload." },
      { status: 400 },
    );
  }

  const { keyId } = getRazorpayConfig();
  const modeCheck = assertWebhookModeAllowed({
    configuredMode: mode,
    keyId,
    payload,
  });

  if (!modeCheck.ok) {
    console.warn("[webhooks:razorpay] mode isolation", {
      reason: modeCheck.reason,
      mode,
    });
    // Acknowledge without mutating state (do not let wrong-mode events retry forever).
    return NextResponse.json({
      ok: true,
      ignored: true,
      reason: "mode_mismatch",
    });
  }

  let parsed;
  try {
    parsed = parseSubscriptionWebhookPayload(payload);
  } catch (error) {
    if (error instanceof WebhookPayloadError) {
      return NextResponse.json(
        { ok: false, message: error.message },
        { status: 400 },
      );
    }
    console.error("[webhooks:razorpay] parse failed");
    return NextResponse.json(
      { ok: false, message: "Malformed webhook payload." },
      { status: 400 },
    );
  }

  if (parsed === "ignored") {
    return NextResponse.json({ ok: true, ignored: true });
  }

  try {
    const result = await syncSubscriptionFromWebhook(parsed);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    if (error instanceof WebhookSyncError) {
      console.error("[webhooks:razorpay] sync failed", {
        status: error.status,
        message: error.message,
      });
      return NextResponse.json(
        { ok: false, message: error.message },
        { status: error.status },
      );
    }

    console.error("[webhooks:razorpay] unexpected error");
    return NextResponse.json(
      { ok: false, message: "Webhook processing failed." },
      { status: 500 },
    );
  }
}

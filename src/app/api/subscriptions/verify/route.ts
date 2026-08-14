import { NextResponse } from "next/server";
import { AuthError, requireAuthenticatedUser } from "@/lib/auth/server";
import {
  parseVerifyAuthorizationBody,
  SubscriptionVerificationError,
  verifySubscriptionAuthorization,
} from "@/lib/razorpay/verify-authorization";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function getClientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") ?? undefined;
}

/**
 * POST /api/subscriptions/verify
 * Auth: Bearer <Supabase access token>
 *
 * Verifies Checkout authorization for the authenticated LawGPT user only.
 */
export async function POST(request: Request) {
  const ip = getClientIp(request) ?? "unknown";
  const limited = checkRateLimit(
    `subscriptions-verify:${ip}`,
    30,
    60 * 60 * 1000,
  );
  if (!limited.ok) {
    return NextResponse.json(
      {
        ok: false,
        verified: false,
        message: "Too many requests. Please try again later.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let user;
  try {
    user = await requireAuthenticatedUser(request);
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        {
          ok: false,
          verified: false,
          message: error.message,
        },
        { status: error.status },
      );
    }
    throw error;
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        verified: false,
        message: "Invalid request body.",
      },
      { status: 400 },
    );
  }

  try {
    const payload = parseVerifyAuthorizationBody(rawBody);
    const result = await verifySubscriptionAuthorization(payload, user.id);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof SubscriptionVerificationError) {
      console.warn("[subscriptions:verify]", error.message);
      return NextResponse.json(
        {
          ok: false,
          verified: false,
          message: error.message,
        },
        { status: error.status },
      );
    }

    console.error("[subscriptions:verify]", error);
    const detail = error instanceof Error ? error.message : "";
    const missingConfig =
      detail.includes("not configured") || detail.includes("Missing:");

    return NextResponse.json(
      {
        ok: false,
        verified: false,
        message: missingConfig
          ? "Payment verification is temporarily unavailable."
          : "Payment verification failed. Please try again.",
      },
      { status: missingConfig ? 503 : 502 },
    );
  }
}

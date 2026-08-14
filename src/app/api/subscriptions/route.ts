import { NextResponse } from "next/server";
import { AuthError, requireAuthenticatedUser } from "@/lib/auth/server";
import { isSubscriptionPlan } from "@/lib/razorpay/config";
import { createProSubscription } from "@/lib/razorpay/subscriptions";
import type { CreateSubscriptionRequestBody } from "@/lib/razorpay/types";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function getClientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") ?? undefined;
}

/**
 * POST /api/subscriptions
 * Body: { "plan": "monthly" | "yearly" }
 * Auth: Bearer <Supabase access token>
 *
 * Creates a Razorpay subscription for the authenticated LawGPT user.
 */
export async function POST(request: Request) {
  const ip = getClientIp(request) ?? "unknown";
  const limited = checkRateLimit(`subscriptions:${ip}`, 20, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      {
        ok: false,
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
        { ok: false, message: error.message },
        { status: error.status },
      );
    }
    throw error;
  }

  let body: CreateSubscriptionRequestBody;

  try {
    body = (await request.json()) as CreateSubscriptionRequestBody;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  if (!isSubscriptionPlan(body.plan)) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Invalid plan. Use "monthly" or "yearly".',
      },
      { status: 400 },
    );
  }

  try {
    const result = await createProSubscription(body.plan, user.id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[subscriptions:api]", error);
    const detail = error instanceof Error ? error.message : "";
    const missingConfig =
      detail.includes("not configured") || detail.includes("Missing:");

    return NextResponse.json(
      {
        ok: false,
        message: missingConfig
          ? "Subscriptions are temporarily unavailable."
          : "We could not create a subscription right now. Please try again.",
      },
      { status: missingConfig ? 503 : 502 },
    );
  }
}

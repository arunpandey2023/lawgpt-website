import { NextResponse } from "next/server";
import { submitContactEnquiry } from "@/lib/contact/service";
import type { ContactFormPayload } from "@/lib/contact/types";
import {
  normalizeContactPayload,
  validateContactPayload,
} from "@/lib/contact/validate";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function getClientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") ?? undefined;
}

export async function POST(request: Request) {
  const ip = getClientIp(request) ?? "unknown";
  const limited = checkRateLimit(`contact:${ip}`, 8, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too many requests. Please try again later or email contact@lawgptapp.com.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let body: Partial<ContactFormPayload>;

  try {
    body = (await request.json()) as Partial<ContactFormPayload>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const errors = validateContactPayload(body);
  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, message: "Please correct the highlighted fields.", errors },
      { status: 400 },
    );
  }

  const payload = normalizeContactPayload(body as ContactFormPayload);

  try {
    const result = await submitContactEnquiry({
      ...payload,
      meta: {
        submittedAt: new Date().toISOString(),
        ipAddress: ip === "unknown" ? undefined : ip,
        userAgent: request.headers.get("user-agent") ?? undefined,
      },
    });

    console.info("[contact:api] sent", {
      provider: result.provider,
      internalMessageId: result.internalMessageId,
      confirmationMessageId: result.confirmationMessageId,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact:api]", error);
    const detail = error instanceof Error ? error.message : "";
    const missingConfig =
      detail.includes("RESEND_API_KEY") ||
      detail.includes("not configured") ||
      detail.includes("CONTACT_EMAIL_PROVIDER");

    return NextResponse.json(
      {
        ok: false,
        message: missingConfig
          ? "Contact email is temporarily unavailable. Please email contact@lawgptapp.com."
          : "We could not send your message right now. Please try again or email contact@lawgptapp.com.",
      },
      { status: missingConfig ? 503 : 502 },
    );
  }
}

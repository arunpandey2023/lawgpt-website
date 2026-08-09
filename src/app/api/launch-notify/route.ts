import { NextResponse } from "next/server";
import { subscribeLaunchNotify } from "@/lib/launch/notify";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function getClientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") ?? undefined;
}

export async function POST(request: Request) {
  const ip = getClientIp(request) ?? "unknown";
  const limited = checkRateLimit(`launch-notify:${ip}`, 12, 60 * 60 * 1000);
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

  let body: { email?: string; source?: string };

  try {
    body = (await request.json()) as { email?: string; source?: string };
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const result = await subscribeLaunchNotify({
    email: body.email ?? "",
    source: body.source,
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}

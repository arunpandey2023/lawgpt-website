import { NextResponse, type NextRequest } from "next/server";
import {
  getPreviewSecret,
  isLaunchGateForced,
  isSiteLaunched,
  PREVIEW_COOKIE_NAME,
} from "@/lib/launch/config";

const COMING_SOON_PATH = "/coming-soon";

/** Paths reachable while the public site is gated. */
const ALLOWED_PREFIXES = [
  "/coming-soon",
  "/privacy",
  "/terms",
  "/cookies",
  "/disclaimer",
  "/api/launch-notify",
];

function isAllowedPath(pathname: string): boolean {
  return ALLOWED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function isLocalHost(request: NextRequest): boolean {
  const host = request.headers.get("host")?.toLowerCase() ?? "";
  return (
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.startsWith("[::1]")
  );
}

function hasPreviewAccess(request: NextRequest): boolean {
  const secret = getPreviewSecret();
  if (!secret) return false;
  return request.cookies.get(PREVIEW_COOKIE_NAME)?.value === secret;
}

function withComingSoonHeader(request: NextRequest): Headers {
  const headers = new Headers(request.headers);
  headers.set("x-lawgpt-coming-soon", "1");
  return headers;
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Unlock full site via ?preview=SECRET (sets httpOnly cookie)
  const previewParam = searchParams.get("preview");
  const secret = getPreviewSecret();
  if (previewParam && secret && previewParam === secret) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("preview");
    const response = NextResponse.redirect(url);
    response.cookies.set(PREVIEW_COOKIE_NAME, secret, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  }

  if (isSiteLaunched()) {
    if (pathname === COMING_SOON_PATH) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Always render Coming Soon without global chrome when that route is requested
  if (
    pathname === COMING_SOON_PATH ||
    pathname.startsWith(`${COMING_SOON_PATH}/`)
  ) {
    return NextResponse.next({
      request: { headers: withComingSoonHeader(request) },
    });
  }

  // Local developers see the full site unless force-gated for QA
  if (isLocalHost(request) && !isLaunchGateForced()) {
    return NextResponse.next();
  }

  if (hasPreviewAccess(request)) {
    return NextResponse.next();
  }

  if (isAllowedPath(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = COMING_SOON_PATH;
  url.search = "";
  return NextResponse.rewrite(url, {
    request: { headers: withComingSoonHeader(request) },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};

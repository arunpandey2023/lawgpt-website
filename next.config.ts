import type { NextConfig } from "next";

/**
 * Allow browser calls to the configured Supabase project (Auth setSession/getUser).
 * Prefer the exact env origin; also allow *.supabase.co for project ref hosts / Realtime.
 */
function supabaseConnectSources(): string[] {
  const sources = new Set<string>([
    "https://*.supabase.co",
    "wss://*.supabase.co",
  ]);

  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) return [...sources];

  try {
    const url = new URL(raw);
    if (url.protocol === "https:") {
      sources.add(url.origin);
      sources.add(`wss://${url.host}`);
    }
  } catch {
    // Invalid URL — keep wildcard fallback only.
  }

  return [...sources];
}

const connectSrc = [
  "'self'",
  "https://www.google-analytics.com",
  "https://analytics.google.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://www.googletagmanager.com",
  "https://api.razorpay.com",
  "https://lumberjack.razorpay.com",
  "https://*.razorpay.com",
  ...supabaseConnectSources(),
].join(" ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://checkout.razorpay.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      `connect-src ${connectSrc}`,
      "frame-src 'self' https://api.razorpay.com https://checkout.razorpay.com https://*.razorpay.com",
      "media-src 'self' blob:",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/resources",
        destination: "/academy",
        permanent: true,
      },
      {
        source: "/resources/:path*",
        destination: "/academy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

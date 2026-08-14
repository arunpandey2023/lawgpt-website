import { siteConfig } from "@/data/site";
import type { CheckoutPlan } from "@/lib/razorpay/checkout-client";

export function getSupabasePublicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || "";
  return { url, anonKey };
}

export function assertSupabasePublicConfig() {
  const config = getSupabasePublicConfig();
  if (!config.url || !config.anonKey) {
    throw new Error(
      "Supabase is not configured. Missing NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }
  return config;
}

export function getLawgptAppUrl(): string {
  return (
    process.env.NEXT_PUBLIC_LAWGPT_APP_URL?.trim() ||
    siteConfig.appUrl
  ).replace(/\/$/, "");
}

/** Allowed destinations when returning from LawGPT app login. */
export function getAllowedAuthReturnOrigins(): string[] {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const origins = new Set<string>([
    siteConfig.url.replace(/\/$/, ""),
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ]);
  if (configured) {
    origins.add(configured.replace(/\/$/, ""));
  }
  return [...origins];
}

export function buildProCheckoutReturnPath(plan: CheckoutPlan): string {
  return `/pricing?checkout=${plan}`;
}

/**
 * Ordinary LawGPT app login (no checkout return_to).
 * Upgrade checkout continues to use buildLawgptLoginUrl(plan, origin).
 */
export function buildOrdinaryLawgptLoginUrl(): string {
  return new URL("/login", `${getLawgptAppUrl()}/`).toString();
}

/**
 * Sends the user to the existing LawGPT app login, preserving the plan so
 * checkout can resume after authentication.
 */
export function buildLawgptLoginUrl(plan: CheckoutPlan, siteOrigin: string): string {
  const returnTo = new URL(buildProCheckoutReturnPath(plan), siteOrigin).toString();
  const login = new URL("/login", `${getLawgptAppUrl()}/`);
  login.searchParams.set("return_to", returnTo);
  return login.toString();
}

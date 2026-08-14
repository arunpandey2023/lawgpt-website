"use client";

import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "@/lib/auth/config";

let browserClient: SupabaseClient | null = null;

export type BrowserHandoffResult =
  | { ok: true; session: Session; fromHandoff: boolean }
  | {
      ok: false;
      reason: "missing_config" | "set_session_failed" | "no_session";
      /** Safe public message — never includes tokens. */
      message: string;
      /** True when URL hash contained handoff tokens. */
      handoffAttempted: boolean;
    };

export function getBrowserSupabase(): SupabaseClient | null {
  const { url, anonKey } = getSupabasePublicConfig();
  if (!url || !anonKey) return null;

  if (!browserClient) {
    browserClient = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return browserClient;
}

/** Hostname only — safe for diagnostics (never logs keys). */
export function getBrowserSupabaseHostname(): string | null {
  const { url } = getSupabasePublicConfig();
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

/** Parse LawGPT app session handoff tokens from the URL hash fragment. */
export function parseAuthHandoffHash(
  hash: string,
): { access_token: string; refresh_token: string } | null {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!raw) return null;

  const params = new URLSearchParams(raw);
  const access_token = params.get("access_token")?.trim() || "";
  const refresh_token = params.get("refresh_token")?.trim() || "";
  if (!access_token || !refresh_token) return null;

  return { access_token, refresh_token };
}

/**
 * Remove auth tokens from the visible URL while preserving path + query
 * (including ?checkout=monthly|yearly).
 */
export function clearAuthHashFromUrl(): void {
  if (typeof window === "undefined") return;
  if (!window.location.hash) return;

  const url = new URL(window.location.href);
  url.hash = "";
  window.history.replaceState(
    window.history.state,
    "",
    `${url.pathname}${url.search}`,
  );
}

/** Drop ?checkout= after auto-resume has started (keeps path / other params). */
export function clearCheckoutQueryParam(): void {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  if (!url.searchParams.has("checkout")) return;

  url.searchParams.delete("checkout");
  const search = url.searchParams.toString();
  window.history.replaceState(
    window.history.state,
    "",
    `${url.pathname}${search ? `?${search}` : ""}${url.hash}`,
  );
}

function safeAuthErrorMessage(error: unknown): string {
  if (!error || typeof error !== "object") {
    return "Could not restore your session.";
  }
  const name = "name" in error ? String(error.name) : "";
  const message = "message" in error ? String(error.message) : "";

  // Never echo tokens / JWTs if a library ever puts them in message.
  if (/access_token|refresh_token|eyJ[a-zA-Z0-9_-]+\./i.test(message)) {
    return "Could not restore your session.";
  }

  if (name === "AuthRetryableFetchError" || /failed to fetch/i.test(message)) {
    return "Could not reach authentication service. Check your connection and try again.";
  }

  return "Could not restore your session. Please sign in again.";
}

/**
 * Establish a browser Supabase session from the LawGPT hash handoff (if present),
 * otherwise return any already-persisted session.
 *
 * On handoff failure the hash is left intact for the caller to clear after
 * recording a one-shot claim (avoids silent loss + infinite login redirect).
 */
export async function establishBrowserSessionFromHandoff(): Promise<BrowserHandoffResult> {
  const supabase = getBrowserSupabase();
  if (!supabase) {
    return {
      ok: false,
      reason: "missing_config",
      message: "Authentication is not configured on this site.",
      handoffAttempted: false,
    };
  }

  const handoff = parseAuthHandoffHash(
    typeof window !== "undefined" ? window.location.hash : "",
  );

  if (handoff) {
    const { data, error } = await supabase.auth.setSession({
      access_token: handoff.access_token,
      refresh_token: handoff.refresh_token,
    });

    if (error) {
      console.error("[auth] setSession from handoff failed", {
        name: error.name,
        status: "status" in error ? error.status : undefined,
        supabaseHost: getBrowserSupabaseHostname(),
      });
      return {
        ok: false,
        reason: "set_session_failed",
        message: safeAuthErrorMessage(error),
        handoffAttempted: true,
      };
    }

    if (data.session?.access_token) {
      clearAuthHashFromUrl();
      return { ok: true, session: data.session, fromHandoff: true };
    }

    return {
      ok: false,
      reason: "set_session_failed",
      message: "Could not restore your session. Please sign in again.",
      handoffAttempted: true,
    };
  }

  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("[auth] getSession failed", {
      name: error.name,
      supabaseHost: getBrowserSupabaseHostname(),
    });
    return {
      ok: false,
      reason: "no_session",
      message: safeAuthErrorMessage(error),
      handoffAttempted: false,
    };
  }

  if (data.session?.access_token) {
    return { ok: true, session: data.session, fromHandoff: false };
  }

  return {
    ok: false,
    reason: "no_session",
    message: "Please sign in to continue checkout.",
    handoffAttempted: false,
  };
}

export async function getBrowserSession(): Promise<Session | null> {
  const result = await establishBrowserSessionFromHandoff();
  return result.ok ? result.session : null;
}

export async function getAccessToken(): Promise<string | null> {
  const session = await getBrowserSession();
  return session?.access_token ?? null;
}

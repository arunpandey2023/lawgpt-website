/**
 * Test/Live isolation for Razorpay webhooks.
 *
 * Razorpay configures separate webhook endpoints + secrets per mode.
 * Payloads often omit `livemode`; when present we enforce it. Always require
 * RAZORPAY_MODE to match the deployment, and RAZORPAY_KEY_ID prefix as a
 * secondary server-side check (never from client input).
 */

export type RazorpayMode = "test" | "live";

export function getRazorpayMode(): RazorpayMode | null {
  const raw = process.env.RAZORPAY_MODE?.trim().toLowerCase() || "";
  if (raw === "test" || raw === "live") return raw;
  return null;
}

export function assertRazorpayMode(): RazorpayMode {
  const mode = getRazorpayMode();
  if (!mode) {
    throw new Error(
      "Razorpay webhook is not configured. Missing or invalid: RAZORPAY_MODE (test|live).",
    );
  }
  return mode;
}

/** Derive expected mode from configured Key ID (server env only). */
export function modeFromRazorpayKeyId(keyId: string): RazorpayMode | null {
  const id = keyId.trim();
  if (id.startsWith("rzp_test_")) return "test";
  if (id.startsWith("rzp_live_")) return "live";
  return null;
}

/**
 * Read livemode from a verified webhook payload when Razorpay provides it.
 * Accepts boolean or common string forms. Returns null when absent.
 */
export function extractLivemode(payload: unknown): boolean | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }
  const record = payload as Record<string, unknown>;

  const candidates: unknown[] = [
    record.livemode,
    record.live_mode,
  ];

  for (const value of candidates) {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") {
      const normalized = value.trim().toLowerCase();
      if (normalized === "true" || normalized === "1" || normalized === "live") {
        return true;
      }
      if (normalized === "false" || normalized === "0" || normalized === "test") {
        return false;
      }
    }
    if (value === 1) return true;
    if (value === 0) return false;
  }

  return null;
}

export type ModeIsolationResult =
  | { ok: true }
  | { ok: false; reason: string };

/**
 * Enforce Test/Live isolation after signature verification.
 * Does not mutate subscription state when mismatched.
 */
export function assertWebhookModeAllowed(input: {
  configuredMode: RazorpayMode;
  keyId: string;
  payload: unknown;
}): ModeIsolationResult {
  const keyMode = modeFromRazorpayKeyId(input.keyId);
  if (keyMode && keyMode !== input.configuredMode) {
    return {
      ok: false,
      reason: `RAZORPAY_KEY_ID mode (${keyMode}) does not match RAZORPAY_MODE (${input.configuredMode}).`,
    };
  }

  const livemode = extractLivemode(input.payload);
  if (livemode === true && input.configuredMode === "test") {
    return {
      ok: false,
      reason: "Live Mode webhook rejected in test configuration.",
    };
  }
  if (livemode === false && input.configuredMode === "live") {
    return {
      ok: false,
      reason: "Test Mode webhook rejected in live configuration.",
    };
  }

  return { ok: true };
}

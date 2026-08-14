import { razorpayUnixToIso } from "@/lib/razorpay/persist-subscription";

/**
 * Compare webhook event timestamps for ordering.
 * Returns:
 * - "stale" when incoming is older than stored
 * - "apply" when incoming is newer, equal, or ordering cannot be determined
 */
export function compareProviderEventTimestamps(input: {
  storedIso: string | null | undefined;
  incomingUnix: number | null | undefined;
}): "stale" | "apply" {
  const incomingIso = razorpayUnixToIso(input.incomingUnix ?? null);
  if (!incomingIso) {
    // No reliable provider timestamp — do not block; other safeguards still apply.
    return "apply";
  }

  if (!input.storedIso) {
    return "apply";
  }

  const storedMs = Date.parse(input.storedIso);
  const incomingMs = Date.parse(incomingIso);
  if (!Number.isFinite(storedMs) || !Number.isFinite(incomingMs)) {
    return "apply";
  }

  if (incomingMs < storedMs) {
    return "stale";
  }

  // Equal or newer → apply (equal remains idempotent).
  return "apply";
}

export function providerEventUnixToIso(
  eventCreatedAt: number | null | undefined,
): string | null {
  return razorpayUnixToIso(eventCreatedAt ?? null);
}

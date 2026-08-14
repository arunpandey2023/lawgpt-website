/**
 * Handoff claim / resume guards (module + sessionStorage).
 * Survives Strict Mode remounts and full reload retries of the same token handoff.
 */

const MEMORY_CLAIMS = new Set<string>();
const STORAGE_PREFIX = "lawgpt_checkout_handoff:";

export type CheckoutPlan = "monthly" | "yearly";

export function buildHandoffClaimKey(
  plan: CheckoutPlan,
  accessTokenPrefix: string | null,
): string {
  if (accessTokenPrefix) {
    return `${plan}:token:${accessTokenPrefix.slice(0, 32)}`;
  }
  return `${plan}:query-resume`;
}

function storageKey(claimKey: string): string {
  return `${STORAGE_PREFIX}${claimKey}`;
}

export function hasClaimedHandoff(claimKey: string): boolean {
  if (MEMORY_CLAIMS.has(claimKey)) return true;
  if (typeof sessionStorage === "undefined") return false;
  try {
    return sessionStorage.getItem(storageKey(claimKey)) === "1";
  } catch {
    return false;
  }
}

/** Returns true if this is the first claim (caller should proceed). */
export function claimHandoff(claimKey: string): boolean {
  if (hasClaimedHandoff(claimKey)) return false;
  MEMORY_CLAIMS.add(claimKey);
  if (typeof sessionStorage !== "undefined") {
    try {
      sessionStorage.setItem(storageKey(claimKey), "1");
    } catch {
      // private mode / blocked storage — memory claim still prevents remount loops
    }
  }
  return true;
}

/** Test helper — clears in-memory claims only. */
export function resetHandoffClaimsForTests(): void {
  MEMORY_CLAIMS.clear();
}

/**
 * Regression checks for auth handoff helpers (no network / secrets).
 * Run: npx tsx scripts/verify-auth-handoff.ts
 */
import assert from "node:assert/strict";
import { parseAuthHandoffHash } from "../src/lib/auth/browser";
import {
  buildHandoffClaimKey,
  claimHandoff,
  hasClaimedHandoff,
  resetHandoffClaimsForTests,
} from "../src/lib/auth/handoff-claim";

// --- hash parsing ---
assert.equal(parseAuthHandoffHash(""), null);
assert.equal(parseAuthHandoffHash("#"), null);

const parsed = parseAuthHandoffHash(
  "#access_token=access123&refresh_token=refresh456&token_type=bearer&type=magiclink&expires_in=3600",
);
assert.ok(parsed);
assert.equal(parsed.access_token, "access123");
assert.equal(parsed.refresh_token, "refresh456");
assert.equal(parseAuthHandoffHash("#access_token=only"), null);

// --- claim keys ---
const tokenKey = buildHandoffClaimKey("monthly", "abcdefghijklmnopqrstuvwxyz0123456789");
assert.equal(tokenKey, "monthly:token:abcdefghijklmnopqrstuvwxyz012345");
assert.equal(buildHandoffClaimKey("yearly", null), "yearly:query-resume");

// --- one-shot claim (Strict Mode / remount) ---
resetHandoffClaimsForTests();
assert.equal(claimHandoff(tokenKey), true, "first claim succeeds");
assert.equal(claimHandoff(tokenKey), false, "second claim blocked (Strict Mode)");
assert.equal(hasClaimedHandoff(tokenKey), true);

// Different token handoff can claim again (manual retry after Sign in again)
const otherKey = buildHandoffClaimKey("monthly", "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
assert.equal(claimHandoff(otherKey), true);

// Failed setSession path: same token must not auto-retry
assert.equal(claimHandoff(tokenKey), false, "failed handoff token stays claimed");

// Checkout must only proceed conceptually after ok session — encoded as:
// claim → establish → only then startCheckout (covered by ProCheckoutActions flow).
console.log("verify-auth-handoff: ok");

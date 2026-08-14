/**
 * Offline entitlement + ordering regression checks.
 * Run: npx tsx scripts/verify-entitlement.ts
 */
import assert from "node:assert/strict";
import {
  isSubscriptionEntitlementValid,
  resolveAppPlanFromSubscriptions,
} from "../src/lib/billing/entitlement";
import { compareProviderEventTimestamps } from "../src/lib/razorpay/webhook-ordering";
import {
  buildLawgptLoginUrl,
  buildOrdinaryLawgptLoginUrl,
} from "../src/lib/auth/config";
import {
  assertWebhookModeAllowed,
} from "../src/lib/razorpay/webhook-mode";
import {
  verifyRazorpayWebhookSignature,
  computeRazorpayWebhookSignature,
} from "../src/lib/razorpay/webhook-verify";

const NOW = new Date("2024-06-15T12:00:00.000Z");
const FUTURE = "2024-07-01T00:00:00.000Z";
const PAST = "2024-05-01T00:00:00.000Z";

// --- Grant / maintain Pro ---
assert.equal(
  isSubscriptionEntitlementValid({ status: "authenticated", current_period_end: FUTURE }, NOW),
  true,
  "authenticated → Pro",
);
assert.equal(
  isSubscriptionEntitlementValid({ status: "active", current_period_end: FUTURE }, NOW),
  true,
  "active / activated / charged → Pro",
);
assert.equal(
  isSubscriptionEntitlementValid({ status: "active", current_period_end: null }, NOW),
  true,
  "active without period end still Pro",
);

// resumed uses active status entity
assert.equal(
  isSubscriptionEntitlementValid({ status: "active", current_period_end: FUTURE }, NOW),
  true,
  "resumed (active) → Pro",
);

// pending inside paid period
assert.equal(
  isSubscriptionEntitlementValid({ status: "pending", current_period_end: FUTURE }, NOW),
  true,
  "pending inside paid period → remains Pro",
);
assert.equal(
  isSubscriptionEntitlementValid({ status: "pending", current_period_end: PAST }, NOW),
  false,
  "pending after paid period → not Pro",
);

// cancellation at period end
assert.equal(
  isSubscriptionEntitlementValid(
    {
      status: "cancelled",
      current_period_end: FUTURE,
      cancel_at_period_end: true,
    },
    NOW,
  ),
  true,
  "cancellation at period end → remains Pro until period end",
);
assert.equal(
  isSubscriptionEntitlementValid(
    { status: "cancelled", current_period_end: PAST },
    NOW,
  ),
  false,
  "expired cancelled subscription → Free (alone)",
);

assert.equal(
  isSubscriptionEntitlementValid(
    { status: "completed", current_period_end: PAST },
    NOW,
  ),
  false,
  "completed subscription → Free when entitlement ended",
);

assert.equal(
  isSubscriptionEntitlementValid(
    { status: "halted", current_period_end: FUTURE },
    NOW,
  ),
  true,
  "halted inside paid period → temporary Pro",
);
assert.equal(
  isSubscriptionEntitlementValid(
    { status: "halted", current_period_end: PAST },
    NOW,
  ),
  false,
  "halted after paid period → Free",
);

// multiple subscriptions
assert.equal(
  resolveAppPlanFromSubscriptions(
    [
      { status: "cancelled", current_period_end: PAST },
      { status: "active", current_period_end: FUTURE },
    ],
    NOW,
  ),
  "pro",
  "one cancelled + another active → remains Pro",
);

assert.equal(
  resolveAppPlanFromSubscriptions(
    [{ status: "cancelled", current_period_end: PAST }],
    NOW,
  ),
  "free_professional",
  "only expired cancelled → Free",
);

// --- Ordering ---
assert.equal(
  compareProviderEventTimestamps({
    storedIso: "2024-06-15T12:00:00.000Z",
    incomingUnix: 1_700_000_000, // older
  }),
  "stale",
  "stale webhook cannot apply",
);
assert.equal(
  compareProviderEventTimestamps({
    storedIso: "2024-01-01T00:00:00.000Z",
    incomingUnix: Math.floor(Date.parse("2024-06-15T12:00:00.000Z") / 1000),
  }),
  "apply",
  "newer event applies",
);
assert.equal(
  compareProviderEventTimestamps({
    storedIso: "2024-06-15T12:00:00.000Z",
    incomingUnix: Math.floor(Date.parse("2024-06-15T12:00:00.000Z") / 1000),
  }),
  "apply",
  "duplicate/equal timestamp remains idempotent",
);

// Terminal regression already covered in webhook parse tests; stale also blocks downgrade races.
assert.equal(
  compareProviderEventTimestamps({
    storedIso: "2024-06-20T00:00:00.000Z",
    incomingUnix: Math.floor(Date.parse("2024-06-10T00:00:00.000Z") / 1000),
  }),
  "stale",
  "stale webhook cannot upgrade/downgrade newer state",
);

// --- Signature / mode never change entitlement (pure guards) ---
const raw = JSON.stringify({ event: "subscription.cancelled", livemode: true });
const secret = "whsec_test";
const sig = computeRazorpayWebhookSignature(raw, secret);
assert.equal(
  verifyRazorpayWebhookSignature({
    rawBody: raw,
    signature: "00",
    secret,
  }),
  false,
  "invalid signature rejected",
);
assert.equal(
  verifyRazorpayWebhookSignature({ rawBody: raw, signature: sig, secret }),
  true,
);
assert.equal(
  assertWebhookModeAllowed({
    configuredMode: "test",
    keyId: "rzp_test_x",
    payload: { livemode: true },
  }).ok,
  false,
  "Test/Live mismatch ignored",
);

// --- Browser cannot set plan: no client API accepts plan; ordinary login has no return_to ---
const ordinary = buildOrdinaryLawgptLoginUrl();
assert.ok(ordinary.includes("/login"));
assert.ok(!ordinary.includes("return_to"), "ordinary Login has no checkout return_to");

const checkoutLogin = buildLawgptLoginUrl("monthly", "http://localhost:3000");
assert.ok(
  checkoutLogin.includes("return_to="),
  "Upgrade login keeps return_to",
);
assert.ok(
  decodeURIComponent(checkoutLogin).includes("/pricing?checkout=monthly"),
  "checkout return path preserved",
);

// /verify grants Pro only after trusted verification — enforced by call order in
// verifySubscriptionAuthorization (signature → fetch → plan → status → owner → persist → entitlement).

console.log("verify-entitlement: ok");

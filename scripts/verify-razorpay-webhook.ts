/**
 * Offline regression checks for Razorpay webhook handling (no network / secrets logged).
 * Run: npx tsx scripts/verify-razorpay-webhook.ts
 */
import assert from "node:assert/strict";
import { compareProviderEventTimestamps } from "../src/lib/razorpay/webhook-ordering";
import {
  assertWebhookModeAllowed,
  extractLivemode,
  modeFromRazorpayKeyId,
} from "../src/lib/razorpay/webhook-mode";
import {
  evaluateUnknownSubscriptionGate,
  isSupportedSubscriptionWebhookEvent,
  parseRazorpayWebhookJson,
  parseSubscriptionWebhookPayload,
  shouldApplyIncomingSubscriptionStatus,
  WebhookPayloadError,
} from "../src/lib/razorpay/webhook-parse";
import {
  computeRazorpayWebhookSignature,
  verifyRazorpayWebhookSignature,
} from "../src/lib/razorpay/webhook-verify";

const SECRET = "whsec_test_offline_only";
const USER_ID = "11111111-1111-4111-8111-111111111111";

function sampleSubscriptionPayload(overrides?: {
  event?: string;
  livemode?: boolean;
  planId?: string;
  status?: string;
  notes?: Record<string, unknown> | null;
  subId?: string;
}): string {
  const body = {
    entity: "event",
    account_id: "acc_test",
    event: overrides?.event ?? "subscription.activated",
    contains: ["subscription"],
    created_at: 1_700_000_000,
    ...(overrides?.livemode === undefined
      ? {}
      : { livemode: overrides.livemode }),
    payload: {
      subscription: {
        entity: {
          id: overrides?.subId ?? "sub_ABC123xyz",
          entity: "subscription",
          plan_id: overrides?.planId ?? "plan_monthly_test",
          status: overrides?.status ?? "active",
          customer_id: "cust_1",
          current_start: 1_700_000_000,
          current_end: 1_702_592_000,
          ended_at: null,
          notes: overrides?.notes === null
            ? null
            : (overrides?.notes ?? { lawgpt_user_id: USER_ID }),
        },
      },
    },
  };
  return JSON.stringify(body);
}

// --- Signature ---
{
  const raw = sampleSubscriptionPayload();
  const signature = computeRazorpayWebhookSignature(raw, SECRET);
  assert.equal(
    verifyRazorpayWebhookSignature({ rawBody: raw, signature, secret: SECRET }),
    true,
    "valid signature",
  );
  assert.equal(
    verifyRazorpayWebhookSignature({
      rawBody: raw,
      signature: "deadbeef",
      secret: SECRET,
    }),
    false,
    "invalid signature",
  );
  assert.equal(
    verifyRazorpayWebhookSignature({
      rawBody: raw + " ",
      signature,
      secret: SECRET,
    }),
    false,
    "modified raw body fails signature",
  );
  assert.equal(
    verifyRazorpayWebhookSignature({
      rawBody: raw,
      signature: null,
      secret: SECRET,
    }),
    false,
    "missing signature",
  );
}

// --- Mode isolation ---
{
  assert.equal(modeFromRazorpayKeyId("rzp_test_abc"), "test");
  assert.equal(modeFromRazorpayKeyId("rzp_live_abc"), "live");
  assert.equal(extractLivemode({ livemode: true }), true);
  assert.equal(extractLivemode({ livemode: false }), false);
  assert.equal(extractLivemode({ event: "x" }), null);

  assert.equal(
    assertWebhookModeAllowed({
      configuredMode: "test",
      keyId: "rzp_test_abc",
      payload: { livemode: false },
    }).ok,
    true,
    "test payload accepted in test configuration",
  );
  assert.equal(
    assertWebhookModeAllowed({
      configuredMode: "test",
      keyId: "rzp_test_abc",
      payload: { livemode: true },
    }).ok,
    false,
    "live payload rejected in test configuration",
  );
  assert.equal(
    assertWebhookModeAllowed({
      configuredMode: "live",
      keyId: "rzp_live_abc",
      payload: { livemode: false },
    }).ok,
    false,
    "test payload rejected in live configuration",
  );
  assert.equal(
    assertWebhookModeAllowed({
      configuredMode: "live",
      keyId: "rzp_live_abc",
      payload: { livemode: true },
    }).ok,
    true,
    "live payload accepted in live configuration",
  );
}

// --- Parse / events ---
{
  const raw = sampleSubscriptionPayload();
  const json = parseRazorpayWebhookJson(raw);
  const parsed = parseSubscriptionWebhookPayload(json);
  assert.notEqual(parsed, "ignored");
  if (parsed !== "ignored") {
    assert.equal(parsed.event, "subscription.activated");
    assert.equal(parsed.subscription.id, "sub_ABC123xyz");
    assert.equal(parsed.subscription.status, "active");
  }

  assert.equal(
    parseSubscriptionWebhookPayload(
      parseRazorpayWebhookJson(
        sampleSubscriptionPayload({ event: "payment.captured" }),
      ),
    ),
    "ignored",
    "irrelevant event safely ignored",
  );

  assert.equal(isSupportedSubscriptionWebhookEvent("subscription.updated"), true);

  assert.throws(
    () => parseRazorpayWebhookJson("{not-json"),
    (err: unknown) => err instanceof WebhookPayloadError,
    "malformed payload",
  );

  assert.throws(
    () =>
      parseSubscriptionWebhookPayload(
        parseRazorpayWebhookJson(
          JSON.stringify({
            entity: "event",
            event: "subscription.activated",
            payload: {},
          }),
        ),
      ),
    (err: unknown) => err instanceof WebhookPayloadError,
    "missing subscription entity",
  );
}

// --- Unknown subscription gates ---
{
  const resolve = (planId: string) =>
    planId === "plan_monthly_test"
      ? ("monthly" as const)
      : planId === "plan_yearly_test"
        ? ("yearly" as const)
        : null;

  assert.equal(
    evaluateUnknownSubscriptionGate({
      notes: { lawgpt_user_id: USER_ID },
      planId: "plan_monthly_test",
      resolveBillingInterval: resolve,
    }).ok,
    true,
    "unknown subscription with valid lawgpt_user_id",
  );

  assert.equal(
    evaluateUnknownSubscriptionGate({
      notes: null,
      planId: "plan_monthly_test",
      resolveBillingInterval: resolve,
    }).ok,
    false,
    "unknown subscription with missing user",
  );

  assert.equal(
    evaluateUnknownSubscriptionGate({
      notes: { lawgpt_user_id: "not-a-uuid" },
      planId: "plan_monthly_test",
      resolveBillingInterval: resolve,
    }).ok,
    false,
    "unknown subscription with invalid user",
  );

  assert.equal(
    evaluateUnknownSubscriptionGate({
      notes: { lawgpt_user_id: USER_ID },
      planId: "plan_other",
      resolveBillingInterval: resolve,
    }).ok,
    false,
    "unknown/invalid Plan ID",
  );
}

// --- Existing update / idempotency / ownership / ordering ---
{
  // Duplicate delivery: same status re-applied is allowed (idempotent update).
  assert.equal(
    shouldApplyIncomingSubscriptionStatus({
      existingStatus: "active",
      incomingStatus: "active",
    }),
    true,
    "duplicate delivery/idempotency",
  );

  // Ownership cannot change — enforced in sync by updating with eq(user_id)
  // and refusing insert when raced owner differs. Gate never accepts email/mobile.
  const gate = evaluateUnknownSubscriptionGate({
    notes: { email: "a@b.com", lawgpt_user_id: USER_ID },
    planId: "plan_monthly_test",
    resolveBillingInterval: (id) => (id === "plan_monthly_test" ? "monthly" : null),
  });
  assert.equal(gate.ok, true);
  if (gate.ok) assert.equal(gate.lawgptUserId, USER_ID);

  assert.equal(
    shouldApplyIncomingSubscriptionStatus({
      existingStatus: "cancelled",
      incomingStatus: "authenticated",
    }),
    false,
    "out-of-order: terminal not overwritten by earlier status",
  );

  assert.equal(
    shouldApplyIncomingSubscriptionStatus({
      existingStatus: "authenticated",
      incomingStatus: "active",
    }),
    true,
    "existing subscription update to newer status allowed",
  );
}

// --- last_provider_event_at ordering ---
{
  assert.equal(
    compareProviderEventTimestamps({
      storedIso: "2024-06-15T00:00:00.000Z",
      incomingUnix: Math.floor(Date.parse("2024-06-14T00:00:00.000Z") / 1000),
    }),
    "stale",
  );
  assert.equal(
    compareProviderEventTimestamps({
      storedIso: "2024-06-15T00:00:00.000Z",
      incomingUnix: Math.floor(Date.parse("2024-06-15T00:00:00.000Z") / 1000),
    }),
    "apply",
    "equal timestamp idempotent",
  );
}

console.log("verify-razorpay-webhook: ok");

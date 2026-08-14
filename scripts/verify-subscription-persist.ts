/**
 * Offline checks for subscription persistence helpers (no network / secrets).
 * Run: npx tsx scripts/verify-subscription-persist.ts
 */
import assert from "node:assert/strict";
import {
  buildUserSubscriptionRow,
  deriveCancelAtPeriodEnd,
  razorpayUnixToIso,
} from "../src/lib/razorpay/persist-subscription";

process.env.RAZORPAY_PRO_MONTHLY_PLAN_ID = "plan_monthly_test";
process.env.RAZORPAY_PRO_YEARLY_PLAN_ID = "plan_yearly_test";

assert.equal(razorpayUnixToIso(null), null);
assert.equal(razorpayUnixToIso(0), null);
assert.equal(razorpayUnixToIso("1577355871"), "2019-12-26T10:24:31.000Z");
assert.equal(razorpayUnixToIso(1577355871), "2019-12-26T10:24:31.000Z");

assert.equal(deriveCancelAtPeriodEnd({ id: "sub_x", plan_id: "p", status: "active" }), false);
assert.equal(
  deriveCancelAtPeriodEnd({
    id: "sub_x",
    plan_id: "p",
    status: "active",
    cancel_at_cycle_end: 1,
  }),
  true,
);

const row = buildUserSubscriptionRow(
  {
    id: "sub_abc123",
    plan_id: "plan_monthly_test",
    status: "authenticated",
    customer_id: "cust_1",
    current_start: 1577355871,
    current_end: 1582655400,
    ended_at: null,
  },
  "11111111-1111-1111-1111-111111111111",
);

assert.equal(row.provider, "razorpay");
assert.equal(row.billing_interval, "monthly");
assert.equal(row.provider_customer_id, "cust_1");
assert.equal(row.cancel_at_period_end, false);
assert.equal(row.current_period_start, "2019-12-26T10:24:31.000Z");
assert.equal(row.user_id, "11111111-1111-1111-1111-111111111111");

console.log("verify-subscription-persist: ok");

import type { RazorpaySubscriptionSnapshot } from "@/lib/razorpay/persist-subscription";

/**
 * Razorpay subscription webhook event names (dashboard / docs).
 * Also includes `subscription.updated` from the official subscriptions webhook list.
 */
export const SUPPORTED_SUBSCRIPTION_WEBHOOK_EVENTS = [
  "subscription.authenticated",
  "subscription.activated",
  "subscription.charged",
  "subscription.pending",
  "subscription.halted",
  "subscription.cancelled",
  "subscription.completed",
  "subscription.paused",
  "subscription.resumed",
  "subscription.updated",
] as const;

export type SupportedSubscriptionWebhookEvent =
  (typeof SUPPORTED_SUBSCRIPTION_WEBHOOK_EVENTS)[number];

export function isSupportedSubscriptionWebhookEvent(
  value: unknown,
): value is SupportedSubscriptionWebhookEvent {
  return (
    typeof value === "string" &&
    (SUPPORTED_SUBSCRIPTION_WEBHOOK_EVENTS as readonly string[]).includes(value)
  );
}

export interface ParsedRazorpayWebhook {
  event: string;
  /** Event envelope created_at (Unix seconds), when present. */
  eventCreatedAt: number | null;
  accountId: string | null;
  subscription: RazorpaySubscriptionSnapshot & {
    notes?: Record<string, unknown> | null;
  };
  raw: Record<string, unknown>;
}

export class WebhookPayloadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WebhookPayloadError";
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function readUnix(value: unknown): number | string | null {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number" || typeof value === "string") return value;
  return null;
}

export function parseRazorpayWebhookJson(rawBody: string): Record<string, unknown> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    throw new WebhookPayloadError("Malformed JSON webhook payload.");
  }

  const record = asRecord(parsed);
  if (!record) {
    throw new WebhookPayloadError("Webhook payload must be a JSON object.");
  }
  return record;
}

/**
 * Extract subscription entity from a verified Razorpay webhook payload.
 * Returns null when the event is valid JSON but not a supported subscription event
 * (caller should acknowledge with 200 and ignore).
 */
export function parseSubscriptionWebhookPayload(
  payload: Record<string, unknown>,
): ParsedRazorpayWebhook | "ignored" {
  const event = payload.event;
  if (typeof event !== "string" || !event.trim()) {
    throw new WebhookPayloadError("Missing webhook event name.");
  }

  if (!isSupportedSubscriptionWebhookEvent(event)) {
    return "ignored";
  }

  const body = asRecord(payload.payload);
  if (!body) {
    throw new WebhookPayloadError("Missing webhook payload object.");
  }

  const subscriptionWrapper = asRecord(body.subscription);
  const entity = asRecord(subscriptionWrapper?.entity);
  if (!entity) {
    throw new WebhookPayloadError("Missing subscription entity in webhook payload.");
  }

  const id = typeof entity.id === "string" ? entity.id.trim() : "";
  if (!id.startsWith("sub_")) {
    throw new WebhookPayloadError("Invalid subscription id in webhook payload.");
  }

  const planId = typeof entity.plan_id === "string" ? entity.plan_id.trim() : "";
  if (!planId) {
    throw new WebhookPayloadError("Missing plan_id on subscription entity.");
  }

  const status = typeof entity.status === "string" ? entity.status.trim() : "";
  if (!status) {
    throw new WebhookPayloadError("Missing status on subscription entity.");
  }

  const notesRaw = entity.notes;
  let notes: Record<string, unknown> | null = null;
  if (notesRaw && typeof notesRaw === "object" && !Array.isArray(notesRaw)) {
    notes = notesRaw as Record<string, unknown>;
  }

  const eventCreatedAt =
    typeof payload.created_at === "number" && Number.isFinite(payload.created_at)
      ? payload.created_at
      : typeof payload.created_at === "string" && payload.created_at.trim()
        ? Number(payload.created_at)
        : null;

  const accountId =
    typeof payload.account_id === "string" ? payload.account_id : null;

  return {
    event,
    eventCreatedAt:
      eventCreatedAt !== null && Number.isFinite(eventCreatedAt)
        ? eventCreatedAt
        : null,
    accountId,
    subscription: {
      id,
      plan_id: planId,
      status,
      customer_id:
        typeof entity.customer_id === "string" ? entity.customer_id : null,
      current_start: readUnix(entity.current_start),
      current_end: readUnix(entity.current_end),
      ended_at: readUnix(entity.ended_at),
      cancel_at_cycle_end:
        (entity.cancel_at_cycle_end as number | boolean | null | undefined) ??
        null,
      notes,
    },
    raw: payload,
  };
}

export function extractLawgptUserIdFromNotes(
  notes: Record<string, unknown> | null | undefined,
): string | null {
  if (!notes) return null;
  const value = notes.lawgpt_user_id;
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export type UnknownSubscriptionGate =
  | { ok: true; lawgptUserId: string; billingInterval: "monthly" | "yearly" }
  | { ok: false; reason: string };

export function evaluateUnknownSubscriptionGate(input: {
  notes: Record<string, unknown> | null | undefined;
  planId: string;
  resolveBillingInterval: (planId: string) => "monthly" | "yearly" | null;
}): UnknownSubscriptionGate {
  const lawgptUserId = extractLawgptUserIdFromNotes(input.notes);
  if (!lawgptUserId || !isUuid(lawgptUserId)) {
    return {
      ok: false,
      reason: "Unknown subscription missing valid notes.lawgpt_user_id.",
    };
  }

  const billingInterval = input.resolveBillingInterval(input.planId);
  if (!billingInterval) {
    return {
      ok: false,
      reason: "Unknown subscription plan_id is not a configured Pro plan.",
    };
  }

  return { ok: true, lawgptUserId, billingInterval };
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_RE.test(value);
}

/**
 * Soft lifecycle ranking for out-of-order protection without schema changes.
 * Terminal statuses should not be overwritten by earlier lifecycle statuses.
 */
const STATUS_RANK: Record<string, number> = {
  created: 1,
  authenticated: 2,
  active: 3,
  pending: 4,
  halted: 5,
  paused: 5,
  cancelled: 10,
  completed: 10,
};

export function subscriptionStatusRank(status: string): number {
  return STATUS_RANK[status] ?? 0;
}

export function shouldApplyIncomingSubscriptionStatus(input: {
  existingStatus: string;
  incomingStatus: string;
}): boolean {
  const existingRank = subscriptionStatusRank(input.existingStatus);
  const incomingRank = subscriptionStatusRank(input.incomingStatus);

  // Unknown statuses: allow update (idempotent sync of Razorpay truth).
  if (existingRank === 0 || incomingRank === 0) return true;

  // Do not regress from terminal cancelled/completed to earlier states.
  if (existingRank >= 10 && incomingRank < existingRank) {
    return false;
  }

  return true;
}

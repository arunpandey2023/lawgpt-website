export class SubscriptionVerificationError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "SubscriptionVerificationError";
    this.status = status;
  }
}

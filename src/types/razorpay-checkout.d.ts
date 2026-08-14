export interface RazorpayCheckoutSuccessResponse {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}

export interface RazorpayCheckoutOptions {
  key: string;
  subscription_id: string;
  name?: string;
  description?: string;
  handler?: (response: RazorpayCheckoutSuccessResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

export interface RazorpayCheckoutInstance {
  open: () => void;
  on: (
    event: "payment.failed",
    handler: (response: unknown) => void,
  ) => void;
}

export interface RazorpayCheckoutConstructor {
  new (options: RazorpayCheckoutOptions): RazorpayCheckoutInstance;
}

declare global {
  interface Window {
    Razorpay?: RazorpayCheckoutConstructor;
  }
}

export {};

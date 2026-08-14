import Razorpay from "razorpay";
import { assertRazorpayConfigured } from "@/lib/razorpay/config";

let client: Razorpay | null = null;

/** Singleton Razorpay SDK instance (server-only). */
export function getRazorpayClient(): Razorpay {
  if (client) return client;

  const { keyId, keySecret } = assertRazorpayConfigured();
  client = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  return client;
}

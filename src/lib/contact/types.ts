import type { ContactCategory } from "@/data/contact";

export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  category: ContactCategory;
  message: string;
  privacyAccepted: boolean;
  /** Honeypot — must remain empty. */
  website?: string;
  /** Future Turnstile/reCAPTCHA token. */
  captchaToken?: string;
}

export interface ContactSubmissionMeta {
  submittedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface ContactSubmission extends ContactFormPayload {
  meta: ContactSubmissionMeta;
}

export interface ContactValidationError {
  field: keyof ContactFormPayload | "form";
  message: string;
}

export interface SendEmailInput {
  to: string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

export interface SendEmailResult {
  id: string;
}

export interface EmailProvider {
  readonly name: string;
  send(input: SendEmailInput): Promise<SendEmailResult>;
}

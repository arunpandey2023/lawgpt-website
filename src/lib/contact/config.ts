/**
 * Server-side contact email configuration.
 * Internal recipients are never imported by public UI modules.
 *
 * Production default: Resend (CONTACT_EMAIL_PROVIDER=resend + RESEND_API_KEY).
 */

function splitEmails(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function parseFromAddress(): {
  from: string;
  fromName: string;
  fromEmail: string;
} {
  const combined = process.env.CONTACT_FROM?.trim();
  if (combined) {
    const match = combined.match(/^(.*?)\s*<([^>]+)>\s*$/);
    if (match) {
      const fromName = match[1].trim() || "LawGPT";
      const fromEmail = match[2].trim();
      return {
        from: `${fromName} <${fromEmail}>`,
        fromName,
        fromEmail,
      };
    }
    return {
      from: combined,
      fromName: "LawGPT",
      fromEmail: combined,
    };
  }

  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() || "noreply@lawgptapp.com";
  const fromName = process.env.CONTACT_FROM_NAME?.trim() || "LawGPT";
  return {
    from: `${fromName} <${fromEmail}>`,
    fromName,
    fromEmail,
  };
}

const defaultInternalRecipients = [
  "contact@lawgptapp.com",
  "alok.bharti@lawgptapp.com",
  "arun.pandey@lawgptapp.com",
];

const fromAddress = parseFromAddress();

export type ContactEmailProviderName =
  | "console"
  | "resend"
  | "sendgrid"
  | "ses"
  | "smtp";

export const contactEmailConfig = {
  /** Defaults to Resend for production. Override with CONTACT_EMAIL_PROVIDER. */
  provider: (process.env.CONTACT_EMAIL_PROVIDER ||
    "resend") as ContactEmailProviderName,
  from: fromAddress.from,
  fromEmail: fromAddress.fromEmail,
  fromName: fromAddress.fromName,
  replyToFallback: process.env.CONTACT_REPLY_TO || "contact@lawgptapp.com",
  /** Add more addresses via CONTACT_INTERNAL_RECIPIENTS without UI changes. */
  internalRecipients:
    splitEmails(process.env.CONTACT_INTERNAL_RECIPIENTS).length > 0
      ? splitEmails(process.env.CONTACT_INTERNAL_RECIPIENTS)
      : defaultInternalRecipients,
  resendApiKey: process.env.RESEND_API_KEY || "",
  sendgridApiKey: process.env.SENDGRID_API_KEY || "",
  /** Optional Turnstile/reCAPTCHA secret for future verification. */
  captchaSecret: process.env.CONTACT_CAPTCHA_SECRET || "",
  captchaProvider: process.env.CONTACT_CAPTCHA_PROVIDER || "",
} as const;

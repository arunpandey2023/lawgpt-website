import { Resend } from "resend";
import { contactEmailConfig } from "@/lib/contact/config";
import type {
  EmailProvider,
  SendEmailInput,
  SendEmailResult,
} from "@/lib/contact/types";

class ConsoleEmailProvider implements EmailProvider {
  readonly name = "console";

  async send(input: SendEmailInput): Promise<SendEmailResult> {
    const id = `console_${Date.now()}`;
    // Never log message bodies in production.
    console.info("[contact:email:console]", {
      id,
      to: input.to,
      subject: input.subject,
      replyTo: input.replyTo,
      ...(process.env.NODE_ENV !== "production"
        ? { text: input.text }
        : { textLength: input.text.length }),
    });
    return { id };
  }
}

class ResendEmailProvider implements EmailProvider {
  readonly name = "resend";
  private readonly client: Resend;

  constructor(apiKey: string) {
    this.client = new Resend(apiKey);
  }

  async send(input: SendEmailInput): Promise<SendEmailResult> {
    const { data, error } = await this.client.emails.send({
      from: contactEmailConfig.from,
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html,
      replyTo: input.replyTo,
    });

    if (error) {
      throw new Error(
        `Resend failed: ${error.message}${error.name ? ` (${error.name})` : ""}`,
      );
    }

    if (!data?.id) {
      throw new Error("Resend returned no message id.");
    }

    return { id: data.id };
  }
}

class SendGridEmailProvider implements EmailProvider {
  readonly name = "sendgrid";

  async send(input: SendEmailInput): Promise<SendEmailResult> {
    const apiKey = contactEmailConfig.sendgridApiKey;
    if (!apiKey) {
      throw new Error("SENDGRID_API_KEY is not configured.");
    }

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: input.to.map((email) => ({ email })) }],
        from: {
          email: contactEmailConfig.fromEmail,
          name: contactEmailConfig.fromName,
        },
        reply_to: input.replyTo ? { email: input.replyTo } : undefined,
        subject: input.subject,
        content: [
          { type: "text/plain", value: input.text },
          { type: "text/html", value: input.html },
        ],
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`SendGrid failed (${response.status}): ${body}`);
    }

    return {
      id: response.headers.get("x-message-id") ?? `sendgrid_${Date.now()}`,
    };
  }
}

/**
 * SES / SMTP providers can be added behind the same interface.
 * They intentionally throw until credentials and transport are configured.
 */
class UnconfiguredProvider implements EmailProvider {
  constructor(
    readonly name: string,
    private readonly message: string,
  ) {}

  async send(): Promise<SendEmailResult> {
    throw new Error(this.message);
  }
}

export function createEmailProvider(): EmailProvider {
  switch (contactEmailConfig.provider) {
    case "resend": {
      if (!contactEmailConfig.resendApiKey) {
        throw new Error(
          "RESEND_API_KEY is required when CONTACT_EMAIL_PROVIDER=resend.",
        );
      }
      return new ResendEmailProvider(contactEmailConfig.resendApiKey);
    }
    case "sendgrid":
      return new SendGridEmailProvider();
    case "ses":
      return new UnconfiguredProvider(
        "ses",
        "Amazon SES provider is reserved. Set CONTACT_EMAIL_PROVIDER=resend|sendgrid|console, or implement SES behind EmailProvider.",
      );
    case "smtp":
      return new UnconfiguredProvider(
        "smtp",
        "SMTP provider is reserved. Set CONTACT_EMAIL_PROVIDER=resend|sendgrid|console, or implement SMTP behind EmailProvider.",
      );
    case "console":
      return new ConsoleEmailProvider();
    default:
      throw new Error(
        `Unsupported CONTACT_EMAIL_PROVIDER: ${contactEmailConfig.provider}`,
      );
  }
}

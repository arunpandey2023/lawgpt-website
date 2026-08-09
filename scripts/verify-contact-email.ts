/**
 * End-to-end contact email verification via Resend.
 *
 * Usage:
 *   1. Create .env.local with RESEND_API_KEY and CONTACT_EMAIL_PROVIDER=resend
 *   2. npm run verify:contact-email
 *
 * Optional:
 *   CONTACT_VERIFY_TO=you@example.com  (confirmation recipient)
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(filename: string) {
  const path = resolve(process.cwd(), filename);
  if (!existsSync(path)) return;
  const text = readFileSync(path, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

async function main() {
  const { contactEmailConfig } = await import("../src/lib/contact/config");
  const { submitContactEnquiry } = await import("../src/lib/contact/service");

  if (contactEmailConfig.provider !== "resend") {
    throw new Error(
      `Expected CONTACT_EMAIL_PROVIDER=resend, got "${contactEmailConfig.provider}".`,
    );
  }

  if (!contactEmailConfig.resendApiKey) {
    throw new Error(
      "RESEND_API_KEY is missing. Add it to .env.local and re-run.",
    );
  }

  const confirmationTo =
    process.env.CONTACT_VERIFY_TO?.trim() ||
    contactEmailConfig.internalRecipients[0];

  if (!confirmationTo) {
    throw new Error("No confirmation recipient available.");
  }

  console.log("Provider:", contactEmailConfig.provider);
  console.log(
    "From:",
    `${contactEmailConfig.fromName} <${contactEmailConfig.fromEmail}>`,
  );
  console.log(
    "Internal recipients:",
    contactEmailConfig.internalRecipients.join(", "),
  );
  console.log("Confirmation to:", confirmationTo);

  const result = await submitContactEnquiry({
    name: "LawGPT Delivery Check",
    email: confirmationTo,
    phone: "+91 9880062570",
    company: "LawGPT AI Products (P.) Limited",
    subject: "Resend end-to-end delivery verification",
    category: "general",
    message:
      "This is an automated verification of the LawGPT contact form email pipeline (internal notification + user confirmation).",
    privacyAccepted: true,
    meta: {
      submittedAt: new Date().toISOString(),
      ipAddress: "127.0.0.1",
      userAgent: "verify-contact-email-script",
    },
  });

  console.log("OK");
  console.log("Internal message id:", result.internalMessageId);
  console.log("Confirmation message id:", result.confirmationMessageId);
  console.log("Check the Resend dashboard and inboxes for both emails.");
}

main().catch((error) => {
  console.error("Verification failed:", error);
  process.exit(1);
});

import { contactCategories } from "@/data/contact";
import { contactEmailConfig } from "@/lib/contact/config";
import { createEmailProvider } from "@/lib/contact/providers";
import type { ContactSubmission } from "@/lib/contact/types";

function categoryLabel(value: string): string {
  return (
    contactCategories.find((item) => item.value === value)?.label ?? value
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildInternalEmail(submission: ContactSubmission) {
  const rows: [string, string][] = [
    ["Name", submission.name],
    ["Email", submission.email],
    ["Phone", submission.phone || "—"],
    ["Company", submission.company || "—"],
    ["Category", categoryLabel(submission.category)],
    ["Subject", submission.subject],
    ["Message", submission.message],
    ["Date & Time", submission.meta.submittedAt],
    ["IP Address", submission.meta.ipAddress || "—"],
    ["User Agent", submission.meta.userAgent || "—"],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.5;color:#0a0a0b">
      <h2 style="margin:0 0 16px">New LawGPT contact enquiry</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 12px;border:1px solid #e4e4e7;font-weight:600;vertical-align:top;width:160px">${escapeHtml(label)}</td>
            <td style="padding:8px 12px;border:1px solid #e4e4e7;white-space:pre-wrap">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>
  `;

  return {
    subject: `[LawGPT Contact] ${categoryLabel(submission.category)} — ${submission.subject}`,
    text,
    html,
  };
}

function buildConfirmationEmail(submission: ContactSubmission) {
  const text = [
    `Hi ${submission.name},`,
    "",
    "Thank you for contacting LawGPT. We have received your enquiry and will respond as soon as we can.",
    "",
    `Subject: ${submission.subject}`,
    `Category: ${categoryLabel(submission.category)}`,
    "",
    "Our team typically replies within one business day (Monday–Friday, 9:00 AM – 5:00 PM IST).",
    "",
    "Regards,",
    "The LawGPT Team",
    "contact@lawgptapp.com",
  ].join("\n");

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0a0a0b">
      <p>Hi ${escapeHtml(submission.name)},</p>
      <p>Thank you for contacting LawGPT. We have received your enquiry and will respond as soon as we can.</p>
      <p><strong>Subject:</strong> ${escapeHtml(submission.subject)}<br/>
      <strong>Category:</strong> ${escapeHtml(categoryLabel(submission.category))}</p>
      <p>Our team typically replies within one business day (Monday–Friday, 9:00 AM – 5:00 PM IST).</p>
      <p>Regards,<br/>The LawGPT Team<br/>contact@lawgptapp.com</p>
    </div>
  `;

  return {
    subject: "We received your message — LawGPT",
    text,
    html,
  };
}

export interface ContactSubmitResult {
  provider: string;
  internalMessageId: string;
  confirmationMessageId: string;
}

export async function submitContactEnquiry(
  submission: ContactSubmission,
): Promise<ContactSubmitResult> {
  const provider = createEmailProvider();
  const internal = buildInternalEmail(submission);
  const confirmation = buildConfirmationEmail(submission);

  const internalResult = await provider.send({
    to: [...contactEmailConfig.internalRecipients],
    subject: internal.subject,
    text: internal.text,
    html: internal.html,
    replyTo: submission.email,
  });

  const confirmationResult = await provider.send({
    to: [submission.email],
    subject: confirmation.subject,
    text: confirmation.text,
    html: confirmation.html,
    replyTo: contactEmailConfig.replyToFallback,
  });

  return {
    provider: provider.name,
    internalMessageId: internalResult.id,
    confirmationMessageId: confirmationResult.id,
  };
}

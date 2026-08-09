import { contactCategories, type ContactCategory } from "@/data/contact";
import type {
  ContactFormPayload,
  ContactValidationError,
} from "@/lib/contact/types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const categoryValues = new Set(contactCategories.map((item) => item.value));

export function validateContactPayload(
  payload: Partial<ContactFormPayload>,
): ContactValidationError[] {
  const errors: ContactValidationError[] = [];

  if (payload.website && payload.website.trim().length > 0) {
    errors.push({ field: "form", message: "Unable to submit this request." });
    return errors;
  }

  if (!payload.name || payload.name.trim().length < 2) {
    errors.push({ field: "name", message: "Please enter your name." });
  }

  if (!payload.email || !emailPattern.test(payload.email.trim())) {
    errors.push({
      field: "email",
      message: "Please enter a valid email address.",
    });
  }

  if (!payload.subject || payload.subject.trim().length < 3) {
    errors.push({ field: "subject", message: "Please enter a subject." });
  }

  if (!payload.category || !categoryValues.has(payload.category as ContactCategory)) {
    errors.push({ field: "category", message: "Please select a category." });
  }

  if (!payload.message || payload.message.trim().length < 10) {
    errors.push({
      field: "message",
      message: "Please enter a message of at least 10 characters.",
    });
  }

  if (!payload.privacyAccepted) {
    errors.push({
      field: "privacyAccepted",
      message: "Please agree to the Privacy Policy.",
    });
  }

  if (payload.phone && payload.phone.trim().length > 0) {
    const phone = payload.phone.trim();
    if (phone.length < 7 || phone.length > 20) {
      errors.push({
        field: "phone",
        message: "Please enter a valid phone number.",
      });
    }
  }

  return errors;
}

export function normalizeContactPayload(
  payload: ContactFormPayload,
): ContactFormPayload {
  return {
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone?.trim() || undefined,
    company: payload.company?.trim() || undefined,
    subject: payload.subject.trim(),
    category: payload.category,
    message: payload.message.trim(),
    privacyAccepted: Boolean(payload.privacyAccepted),
    website: payload.website?.trim() || "",
    captchaToken: payload.captchaToken?.trim() || undefined,
  };
}

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useId, useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import {
  contactCategories,
  contactPage,
  type ContactCategory,
} from "@/data/contact";
import type { ContactValidationError } from "@/lib/contact/types";
import { cn } from "@/lib/utils";

function categoryFromSearchParam(
  value: string | null,
): ContactCategory | "" {
  if (
    value &&
    contactCategories.some((item) => item.value === value)
  ) {
    return value as ContactCategory;
  }
  return "";
}

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  category: ContactCategory | "";
  message: string;
  privacyAccepted: boolean;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  category: "",
  message: "",
  privacyAccepted: false,
  website: "",
};

const fieldClass =
  "w-full rounded-xl bg-white px-4 py-3 text-sm text-foreground shadow-sm ring-1 ring-border outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/30";

function fieldError(
  errors: ContactValidationError[],
  field: ContactValidationError["field"],
) {
  return errors.find((error) => error.field === field)?.message;
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const formId = useId();
  const categoryFromUrl = useMemo(
    () => categoryFromSearchParam(searchParams.get("category")),
    [searchParams],
  );
  const [form, setForm] = useState<FormState>(initialState);
  const [categoryTouched, setCategoryTouched] = useState(false);
  const [errors, setErrors] = useState<ContactValidationError[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const category = categoryTouched ? form.category : form.category || categoryFromUrl;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    if (key === "category") setCategoryTouched(true);
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setErrors([]);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          company: form.company || undefined,
          subject: form.subject,
          category,
          message: form.message,
          privacyAccepted: form.privacyAccepted,
          website: form.website,
        }),
      });

      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        errors?: ContactValidationError[];
      };

      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? []);
        setFormError(
          data.message ||
            "We could not send your message. Please try again.",
        );
        return;
      }

      setSuccess(true);
      setForm(initialState);
    } catch {
      setFormError(
        "We could not send your message right now. Please try again or email contact@lawgptapp.com.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div
        className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-border sm:p-10"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
          Message sent
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          Thank you for contacting LawGPT. We have received your enquiry and
          will respond typically within one business day. A confirmation email
          is on its way to you.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setSuccess(false)}
          >
            Send another message
          </Button>
          <Button href="/workflows" variant="outline">
            Explore workflows
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      onSubmit={onSubmit}
      className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label
            htmlFor={`${formId}-name`}
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Name <span className="text-accent">*</span>
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={cn(
              fieldClass,
              fieldError(errors, "name") && "ring-red-300 focus:ring-red-300",
            )}
            aria-invalid={Boolean(fieldError(errors, "name"))}
            aria-describedby={
              fieldError(errors, "name") ? `${formId}-name-error` : undefined
            }
          />
          {fieldError(errors, "name") && (
            <p
              id={`${formId}-name-error`}
              className="mt-1.5 text-sm text-red-600"
            >
              {fieldError(errors, "name")}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor={`${formId}-email`}
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Email <span className="text-accent">*</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={cn(
              fieldClass,
              fieldError(errors, "email") && "ring-red-300 focus:ring-red-300",
            )}
            aria-invalid={Boolean(fieldError(errors, "email"))}
            aria-describedby={
              fieldError(errors, "email") ? `${formId}-email-error` : undefined
            }
          />
          {fieldError(errors, "email") && (
            <p
              id={`${formId}-email-error`}
              className="mt-1.5 text-sm text-red-600"
            >
              {fieldError(errors, "email")}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${formId}-phone`}
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Phone <span className="font-normal text-muted">(Optional)</span>
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={cn(
              fieldClass,
              fieldError(errors, "phone") && "ring-red-300 focus:ring-red-300",
            )}
            aria-invalid={Boolean(fieldError(errors, "phone"))}
          />
          {fieldError(errors, "phone") && (
            <p className="mt-1.5 text-sm text-red-600">
              {fieldError(errors, "phone")}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${formId}-company`}
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Company <span className="font-normal text-muted">(Optional)</span>
          </label>
          <input
            id={`${formId}-company`}
            name="company"
            autoComplete="organization"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            className={fieldClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor={`${formId}-subject`}
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Subject <span className="text-accent">*</span>
          </label>
          <input
            id={`${formId}-subject`}
            name="subject"
            required
            value={form.subject}
            onChange={(e) => update("subject", e.target.value)}
            className={cn(
              fieldClass,
              fieldError(errors, "subject") &&
                "ring-red-300 focus:ring-red-300",
            )}
            aria-invalid={Boolean(fieldError(errors, "subject"))}
          />
          {fieldError(errors, "subject") && (
            <p className="mt-1.5 text-sm text-red-600">
              {fieldError(errors, "subject")}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor={`${formId}-category`}
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Category <span className="text-accent">*</span>
          </label>
          <select
            id={`${formId}-category`}
            name="category"
            required
            value={category}
            onChange={(e) =>
              update("category", e.target.value as ContactCategory | "")
            }
            className={cn(
              fieldClass,
              "appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10",
              fieldError(errors, "category") &&
                "ring-red-300 focus:ring-red-300",
            )}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
            }}
            aria-invalid={Boolean(fieldError(errors, "category"))}
          >
            <option value="" disabled>
              Select a category
            </option>
            {contactCategories.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          {fieldError(errors, "category") && (
            <p className="mt-1.5 text-sm text-red-600">
              {fieldError(errors, "category")}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor={`${formId}-message`}
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Message <span className="text-accent">*</span>
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            required
            rows={6}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={cn(
              fieldClass,
              "resize-y min-h-[140px]",
              fieldError(errors, "message") &&
                "ring-red-300 focus:ring-red-300",
            )}
            aria-invalid={Boolean(fieldError(errors, "message"))}
          />
          {fieldError(errors, "message") && (
            <p className="mt-1.5 text-sm text-red-600">
              {fieldError(errors, "message")}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot — leave empty */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="mt-5">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
          <input
            type="checkbox"
            name="privacyAccepted"
            checked={form.privacyAccepted}
            onChange={(e) => update("privacyAccepted", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent/30"
            aria-invalid={Boolean(fieldError(errors, "privacyAccepted"))}
          />
          <span>
            I agree to the{" "}
            <Link
              href={contactPage.form.privacyHref}
              className="font-medium text-accent transition-colors hover:text-accent-hover"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {fieldError(errors, "privacyAccepted") && (
          <p className="mt-1.5 text-sm text-red-600">
            {fieldError(errors, "privacyAccepted")}
          </p>
        )}
      </div>

      {/* Reserved slot for Turnstile / reCAPTCHA — no redesign needed later */}
      <div
        id="contact-captcha"
        data-captcha-slot
        className="mt-5 min-h-[1px]"
        aria-hidden
      />

      {formError && (
        <p
          className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100"
          role="alert"
        >
          {formError}
        </p>
      )}

      <div className="mt-6 flex justify-end">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? "Sending…" : contactPage.form.submitLabel}
        </Button>
      </div>
    </form>
  );
}

/**
 * Launch gate configuration.
 * Public visitors are gated until SITE_LAUNCHED=true.
 * See docs/launch-switch.md.
 */

/** Official public launch instant: 15 Aug 2026, 07:45 AM IST (UTC+05:30). */
export const LAUNCH_AT_UTC = new Date("2026-08-15T02:15:00.000Z");

export const LAUNCH_AT_LABEL = {
  date: "15 August 2026",
  time: "07:45 AM IST",
  combined: "15 August 2026 · 07:45 AM IST",
} as const;

export const PREVIEW_COOKIE_NAME = "lawgpt_site_preview";

export function isSiteLaunched(): boolean {
  return process.env.SITE_LAUNCHED === "true";
}

/** Force the Coming Soon gate even on localhost (for QA). */
export function isLaunchGateForced(): boolean {
  return process.env.SITE_LAUNCH_FORCE_GATE === "true";
}

export function getPreviewSecret(): string {
  return process.env.SITE_PREVIEW_SECRET?.trim() || "";
}

export const launchPage = {
  seo: {
    title: "LawGPT — Launching Soon",
    description:
      "LawGPT, the AI Operating System for Legal Services, launches 15 August 2026 at 07:45 AM IST.",
  },
  hero: {
    eyebrow: "Launching Soon",
    title: "AI Operating System for Legal Services",
    description:
      "LawGPT turns legal problems into guided workflows—AI intake, lawyer-grade documents, optional Lawyer Review+, and filing-ready packages in one product.",
  },
  features: [
    "AI Legal Guidance",
    "Lawyer-grade Documents",
    "Guided Legal Workflows",
    "Lawyer Review+",
    "Filing Packages",
  ],
  announcement:
    "The full LawGPT website and platform experience open to the public on 15 August 2026 at 07:45 AM IST. Until then, this page is your launch window.",
  preview: {
    eyebrow: "Product preview",
    title: "A glimpse of the workspace",
    description:
      "Guided questions, structured case context, and filing-aware documents—without revealing the full product surface before launch.",
    image: "/assets/workflows/cheque-bounce/chat-questions.png",
    imageAlt: "LawGPT guided workflow preview",
  },
  notify: {
    title: "Notify me at launch",
    description:
      "Leave your email and we will let you know when LawGPT opens.",
    placeholder: "you@example.com",
    submitLabel: "Notify me",
    success:
      "You are on the list. We will notify you when LawGPT launches.",
  },
} as const;

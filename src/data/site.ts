export const siteConfig = {
  name: "LawGPT",
  tagline: "The AI Operating System for Legal Services",
  description:
    "Understand your legal problem, answer guided AI questions, generate lawyer-grade documents, obtain lawyer review, and download complete filing packages.",
  url: "https://lawgpt.ai",
  appUrl: "https://app.lawgptapp.com",
  brand: {
    /** Official square mark (includes wordmark). */
    logo: "/brand/lawgpt-logo.png",
    /** Shared social / Open Graph image. */
    ogImage: "/brand/og.png",
  },
  cta: {
    primary: { label: "Start Free", href: "/#start" },
    secondary: { label: "Watch 30-second Demo", href: "/#demo" },
  },
} as const;

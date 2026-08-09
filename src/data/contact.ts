import type { FaqItem } from "@/types";
import { siteConfig } from "@/data/site";

export type ContactCategory =
  | "general"
  | "demo"
  | "partnerships"
  | "media"
  | "careers"
  | "support";

export interface ContactOption {
  id: ContactCategory;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  icon: "mail" | "demo" | "handshake" | "media" | "careers" | "support";
}

export interface ContactCategoryOption {
  value: ContactCategory;
  label: string;
}

/** Public company details only — never include internal notification addresses here. */
export const contactPublic = {
  companyName: "LawGPT AI Products (P.) Limited",
  registeredOffice: {
    lines: [
      "L-148,",
      "Sector-6,",
      "HSR Layout,",
      "Bengaluru,",
      "Bengaluru Urban,",
      "Karnataka,",
      "560102,",
      "INDIA",
    ],
  },
  phones: ["+91 9880062570", "+91 9986606069"],
  generalEmail: "contact@lawgptapp.com",
  supportEmail: "support@lawgptapp.com",
  supportHours: {
    days: "Monday – Friday",
    time: "9:00 AM – 5:00 PM (IST)",
    note: "We typically respond within one business day.",
  },
} as const;

export const contactCategories: ContactCategoryOption[] = [
  { value: "general", label: "General Enquiries" },
  { value: "demo", label: "Product Demo" },
  { value: "partnerships", label: "Partnerships" },
  { value: "media", label: "Media" },
  { value: "careers", label: "Careers" },
  { value: "support", label: "Technical Support" },
];

export const contactPage = {
  seo: {
    title: "Contact LawGPT — Demo, Partnerships & Support",
    description:
      "Contact LawGPT for product demos, partnerships, media, careers, or technical support. Reach our Bengaluru team at contact@lawgptapp.com.",
    keywords: [
      "Contact LawGPT",
      "LawGPT demo",
      "LawGPT support",
      "LawGPT partnerships",
      "LawGPT Bengaluru",
    ],
  },
  hero: {
    eyebrow: "Contact",
    title: "Let's Talk",
    description:
      "Whether you're looking for a product demo, partnership opportunities, business enquiries, technical support or simply want to learn more about LawGPT, we'd love to hear from you.",
  },
  options: {
    eyebrow: "How can we help?",
    title: "Choose the right conversation",
    description:
      "Pick a path and we will route your message to the right team.",
    items: [
      {
        id: "general",
        title: "General Enquiries",
        description: "Questions about LawGPT, pricing, or how the platform works.",
        ctaLabel: "Ask a question",
        href: "#contact-form",
        icon: "mail",
      },
      {
        id: "demo",
        title: "Product Demo",
        description: "See guided workflows, documents, and filing packages in action.",
        ctaLabel: "Request a demo",
        href: "#contact-form",
        icon: "demo",
      },
      {
        id: "partnerships",
        title: "Partnerships",
        description: "Explore collaboration, channel, or ecosystem opportunities.",
        ctaLabel: "Discuss partnerships",
        href: "#contact-form",
        icon: "handshake",
      },
      {
        id: "media",
        title: "Media",
        description: "Press, interviews, and briefing requests for LawGPT.",
        ctaLabel: "Media enquiry",
        href: "#contact-form",
        icon: "media",
      },
      {
        id: "careers",
        title: "Careers",
        description: "Join the team building the AI Operating System for Legal Services.",
        ctaLabel: "Get in touch",
        href: "#contact-form",
        icon: "careers",
      },
      {
        id: "support",
        title: "Technical Support",
        description: "Account, product, or workflow help from our support team.",
        ctaLabel: "Contact support",
        href: "#contact-form",
        icon: "support",
      },
    ] satisfies ContactOption[],
  },
  form: {
    eyebrow: "Send a message",
    title: "Tell us what you need",
    description:
      "Share a few details and we will get back to you. Required fields are marked.",
    privacyLabel: "I agree to the Privacy Policy.",
    privacyHref: "/privacy",
    submitLabel: "Send Message",
    captchaNote:
      "Spam protection can be connected here later without changing this layout.",
  },
  company: {
    eyebrow: "Company",
    title: "LawGPT AI Products (P.) Limited",
    description: "Registered office and primary public contact details.",
  },
  support: {
    eyebrow: "Support",
    title: "Support",
    description:
      "Our support team is available during business hours. Response times are typically within one business day.",
  },
  office: {
    eyebrow: "Office",
    title: "Registered office",
    description: "Visit or write to our Bengaluru registered office.",
    mapPlaceholder:
      "Google Maps embed will appear here. The layout is ready for a future map without redesign.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common contact questions",
    description: "Quick answers before you reach out.",
    items: [
      {
        id: "response-time",
        question: "How quickly do you respond?",
        answer:
          "We typically respond within one business day during Monday–Friday, 9:00 AM – 5:00 PM IST. Urgent technical issues can be sent to support@lawgptapp.com.",
      },
      {
        id: "demo",
        question: "Can I schedule a product demonstration?",
        answer:
          "Yes. Choose Product Demo in the contact form and tell us what you want to see—workflows, documents, filing packages, or Lawyer Review+. We will coordinate a suitable time.",
      },
      {
        id: "lawyer-review",
        question: "Do you offer Lawyer Review services?",
        answer:
          "Yes. Lawyer Review+ is an optional pay-per-use add-on. You can ask about it through the contact form or review current options on the Pricing page.",
      },
      {
        id: "partnerships",
        question: "How do I request business partnerships?",
        answer:
          "Select Partnerships in the contact form and share your organisation, proposal, and preferred next step. Our team will route the enquiry appropriately.",
      },
      {
        id: "tech-support",
        question: "How do I contact technical support?",
        answer:
          "Use the contact form with Technical Support selected, or email support@lawgptapp.com. Include your account email and a short description of the issue.",
      },
    ] satisfies FaqItem[],
  },
  cta: {
    eyebrow: "Ready to experience LawGPT?",
    title: "Start Your First Workflow",
    description:
      "Explore a launched legal workflow, answer guided questions, and see how LawGPT structures the path to a filing-ready package.",
    primaryLabel: "Start Your First Workflow",
    primaryHref: siteConfig.appUrl,
    secondaryLabel: "View pricing",
    secondaryHref: "/pricing",
  },
} as const;

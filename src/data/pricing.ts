import type { FaqItem, PricingPlan } from "@/types";
import { siteConfig } from "@/data/site";

/**
 * Launch pricing — edit amounts and copy here only.
 * Software = subscription (Free / Pro). Human expertise = pay-per-use add-on.
 */
export type PricingComparisonValue = boolean | string;

export interface PricingComparisonRow {
  id: string;
  feature: string;
  free: PricingComparisonValue;
  pro: PricingComparisonValue;
  review: PricingComparisonValue;
}

export interface PricingComparisonGroup {
  id: string;
  title: string;
  rows: PricingComparisonRow[];
}

export interface PricingWhyPoint {
  id: string;
  title: string;
  description: string;
}

export interface PricingBenefit {
  id: string;
  title: string;
  description: string;
}

export interface PricingAudience {
  id: string;
  label: string;
  title: string;
  description: string;
  points: string[];
}

export interface PricingPlanConfig extends PricingPlan {
  ctaHref: string;
  badge?: string;
  priceNote?: string;
}

export interface LawyerReviewService {
  id: string;
  name: string;
  price: string;
  description?: string;
}

/** Subscription plans only — shown in pricing cards. */
export const pricingPlans: PricingPlanConfig[] = [
  {
    id: "free",
    name: "Free",
    price: "Free",
    period: "",
    priceNote: "Experience LawGPT before you upgrade.",
    description:
      "Explore the platform with guided AI assistance and limited generation—so you can see how LawGPT works before committing.",
    features: [
      "Explore all available workflows",
      "Guided AI legal assistance",
      "Limited document generation",
      "Limited AI usage",
      "Limited filing package generation",
      "Community support",
    ],
    cta: "Start Free",
    ctaHref: siteConfig.appUrl,
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹999",
    period: "/month",
    priceNote: "or ₹7,999/year",
    description:
      "The primary LawGPT subscription—unlimited software access to workflows, AI guidance, lawyer-grade documents, and complete filing packages.",
    features: [
      "Unlimited legal workflows",
      "Unlimited AI guidance",
      "Unlimited lawyer-grade document generation",
      "Complete filing packages",
      "Legal research",
      "Secure document vault",
      "Case management",
      "Future workflow updates",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    ctaHref: siteConfig.appUrl,
    highlighted: true,
    badge: "Most Popular",
  },
];

/** Pay-per-use human expertise — not a subscription. */
export const lawyerReviewAddon = {
  id: "lawyer-review",
  eyebrow: "Optional add-on",
  title: "Need a Lawyer to Review Your Documents?",
  description:
    "Lawyer Review+ is human expertise you can add whenever you need it. LawGPT remains the software platform; review is pay-per-use—not another subscription tier.",
  note: "No subscription required. Pay only when you need professional lawyer review.",
  services: [
    {
      id: "notice",
      name: "Legal Notice Review",
      price: "Starting from ₹499",
    },
    {
      id: "package",
      name: "Filing Package Review",
      price: "Starting from ₹999",
    },
    {
      id: "complex",
      name: "Complex Matter Review",
      price: "Custom Pricing",
    },
  ] satisfies LawyerReviewService[],
  cta: { label: "Request Lawyer Review", href: siteConfig.appUrl },
};

export const pricingPage = {
  seo: {
    title: "Pricing — Free, Pro ₹999/month & Lawyer Review+",
    description:
      "Simple LawGPT pricing: Free to explore, Pro at ₹999/month (₹7,999/year) for unlimited software access, and optional Lawyer Review+ pay-per-use when you need human expertise.",
    keywords: [
      "LawGPT pricing",
      "LawGPT Pro ₹999",
      "legal AI subscription",
      "lawyer review India",
      "filing package review",
    ],
  },
  hero: {
    eyebrow: "Pricing",
    title: "Simple pricing. Software first. Lawyer review when you need it.",
    description:
      "LawGPT is a software subscription. Lawyer Review+ is optional human expertise—pay only when you want a professional to review your documents.",
    primaryCta: { label: "Start Free", href: siteConfig.appUrl },
    secondaryCta: { label: "See Pro", href: "#plans" },
  },
  why: {
    eyebrow: "Why LawGPT pricing",
    title: "Software = subscription. Human expertise = pay per use.",
    description:
      "We kept launch pricing extremely simple—so you understand it in seconds, not spreadsheets.",
    points: [
      {
        id: "software",
        title: "LawGPT is the software platform",
        description:
          "Free and Pro unlock the product: workflows, AI guidance, documents, research, vault, and filing packages.",
      },
      {
        id: "one-pro",
        title: "One Pro subscription",
        description:
          "No maze of tiers. Pro is the primary plan for unlimited software access at ₹999/month or ₹7,999/year.",
      },
      {
        id: "human",
        title: "Lawyer Review+ is optional",
        description:
          "Human review is an add-on service—not a subscription. Use it only when a matter needs professional eyes.",
      },
      {
        id: "clear",
        title: "Built to understand fast",
        description:
          "Explore free, upgrade to Pro for full software power, and request review only when you need it.",
      },
    ] satisfies PricingWhyPoint[],
  },
  plans: {
    eyebrow: "Subscriptions",
    title: "Two ways to access the LawGPT platform",
    description:
      "Start free to experience the product. Upgrade to Pro for unlimited software access.",
  },
  comparison: {
    eyebrow: "Compare",
    title: "Software features vs human review",
    description:
      "Free and Pro cover the LawGPT platform. Lawyer Review+ is a separate pay-per-use service.",
    columns: {
      free: "Free",
      pro: "Pro",
      review: "Lawyer Review+",
    },
    groups: [
      {
        id: "software",
        title: "Software features",
        rows: [
          {
            id: "workflows",
            feature: "Available legal workflows",
            free: "Explore all",
            pro: "Unlimited",
            review: "—",
          },
          {
            id: "ai",
            feature: "Guided AI legal assistance",
            free: "Limited",
            pro: "Unlimited",
            review: "—",
          },
          {
            id: "documents",
            feature: "Lawyer-grade document generation",
            free: "Limited",
            pro: "Unlimited",
            review: "—",
          },
          {
            id: "packages",
            feature: "Filing package generation",
            free: "Limited",
            pro: "Complete packages",
            review: "—",
          },
          {
            id: "research",
            feature: "Legal research",
            free: false,
            pro: true,
            review: "—",
          },
          {
            id: "vault",
            feature: "Secure document vault",
            free: false,
            pro: true,
            review: "—",
          },
          {
            id: "cases",
            feature: "Case management",
            free: false,
            pro: true,
            review: "—",
          },
          {
            id: "updates",
            feature: "Future workflow updates",
            free: false,
            pro: true,
            review: "—",
          },
          {
            id: "support",
            feature: "Support",
            free: "Community",
            pro: "Priority",
            review: "—",
          },
        ],
      },
      {
        id: "human",
        title: "Human review services",
        rows: [
          {
            id: "notice-review",
            feature: "Legal notice review",
            free: false,
            pro: false,
            review: "From ₹499",
          },
          {
            id: "package-review",
            feature: "Filing package review",
            free: false,
            pro: false,
            review: "From ₹999",
          },
          {
            id: "complex-review",
            feature: "Complex matter review",
            free: false,
            pro: false,
            review: "Custom",
          },
          {
            id: "subscription-needed",
            feature: "Requires a LawGPT subscription?",
            free: "—",
            pro: "—",
            review: "No",
          },
        ],
      },
    ] satisfies PricingComparisonGroup[],
  },
  benefits: {
    eyebrow: "Platform benefits",
    title: "What Pro software access unlocks",
    description:
      "Pro is built for continuous use of LawGPT—the AI operating system for legal services.",
    items: [
      {
        id: "workflows",
        title: "Unlimited workflows",
        description:
          "Run launched matters—Wrongful Termination, Consumer Complaint, Cheque Bounce, FIR refusal, Drunk Driving, and future workflows—without software caps.",
      },
      {
        id: "documents",
        title: "Unlimited lawyer-grade documents",
        description:
          "Generate notices, complaints, and supporting drafts from guided facts—not blank templates.",
      },
      {
        id: "packages",
        title: "Complete filing packages",
        description:
          "Download organized packages with drafts, research context, and next steps in one place.",
      },
      {
        id: "vault",
        title: "Vault and case management",
        description:
          "Keep documents and matter progress secure inside LawGPT as you move from intake to package.",
      },
    ] satisfies PricingBenefit[],
  },
  audiences: {
    eyebrow: "Who this is for",
    title: "Match Free, Pro, or Lawyer Review+ to the job",
    description:
      "Software for everyday platform use. Human review only when a matter needs it.",
    items: [
      {
        id: "for-free",
        label: "Free",
        title: "Try LawGPT first",
        description:
          "For anyone who wants to experience workflows and guided AI before upgrading.",
        points: [
          "You want to explore available workflows",
          "Limited generation is enough to evaluate the product",
          "Community support is fine while you learn",
        ],
      },
      {
        id: "for-pro",
        label: "Pro",
        title: "Use LawGPT as your legal OS",
        description:
          "For people who need unlimited software access to documents, packages, research, and case tools.",
        points: [
          "You will generate documents regularly",
          "You need complete filing packages",
          "You want vault, research, and priority support",
        ],
      },
      {
        id: "for-review",
        label: "Lawyer Review+",
        title: "Add human expertise on demand",
        description:
          "For moments when a professional should review a notice or filing package before you act.",
        points: [
          "You need lawyer review—not more software seats",
          "You prefer pay-per-use over another subscription",
          "Complex matters may need custom review pricing",
        ],
      },
    ] satisfies PricingAudience[],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Pricing questions, answered plainly",
    description:
      "How Free, Pro, and Lawyer Review+ work together.",
    items: [
      {
        id: "model",
        question: "How does LawGPT pricing work?",
        answer:
          "Software is a subscription (Free or Pro). Lawyer Review+ is optional human expertise priced per use. You do not need a separate review subscription.",
      },
      {
        id: "free",
        question: "What does Free include?",
        answer:
          "Free lets you explore all available workflows with guided AI assistance, limited document generation, limited AI usage, limited filing package generation, and community support.",
      },
      {
        id: "pro",
        question: "What does Pro cost?",
        answer:
          "Pro is ₹999 per month or ₹7,999 per year. It is the primary subscription for unlimited workflows, AI guidance, document generation, filing packages, research, vault, case management, updates, and priority support.",
      },
      {
        id: "review",
        question: "Is Lawyer Review+ a plan?",
        answer:
          "No. Lawyer Review+ is an add-on service. Request review when you need it—for example legal notice review starting from ₹499 or filing package review starting from ₹999.",
      },
      {
        id: "need-pro",
        question: "Do I need Pro to request Lawyer Review+?",
        answer:
          "No subscription is required for Lawyer Review+. Pay only when you need professional lawyer review.",
      },
      {
        id: "enterprise",
        question: "Do you offer enterprise or team pricing?",
        answer:
          "Not at launch. We are keeping pricing simple with Free, Pro, and optional Lawyer Review+. Team and enterprise options may be introduced later.",
      },
    ] satisfies FaqItem[],
  },
  cta: {
    eyebrow: "Ready to begin",
    title: "Start free. Upgrade to Pro when you are ready.",
    description:
      "Experience LawGPT on Free, unlock unlimited software access with Pro, and add Lawyer Review+ only when a matter needs human expertise.",
    primaryLabel: "Start Free",
    primaryHref: siteConfig.appUrl,
    secondaryLabel: "Upgrade to Pro",
    secondaryHref: siteConfig.appUrl,
  },
} as const;

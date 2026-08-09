import { contactPage } from "@/data/contact";
import { faqItems } from "@/data/faq";
import { allGuides } from "@/data/guides";
import { legalDocuments } from "@/data/legal";
import { platformPage } from "@/data/platform";
import { pricingPage } from "@/data/pricing";
import {
  chequeBouncePage,
  consumerComplaintPage,
  drunkDrivingPage,
  policeRefusingFirPage,
  wrongfulTerminationPage,
} from "@/data/workflowPages";
import { getLiveWorkflows } from "@/data/workflows";
import type { SearchItem } from "@/types/search";

const workflowPages = [
  wrongfulTerminationPage,
  consumerComplaintPage,
  chequeBouncePage,
  policeRefusingFirPage,
  drunkDrivingPage,
];

function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const workflow of getLiveWorkflows()) {
    items.push({
      id: `workflow-${workflow.slug}`,
      category: "workflows",
      title: workflow.title,
      description: workflow.shortDescription || workflow.description,
      href: workflow.href,
      keywords: [
        workflow.slug,
        ...workflow.documents,
        ...workflow.authorities,
        workflow.status,
      ],
    });
  }

  for (const guide of allGuides) {
    items.push({
      id: `guide-${guide.slug}`,
      category: "guides",
      title: guide.title,
      description: guide.excerpt,
      href: `/academy/${guide.slug}`,
      keywords: [
        guide.slug,
        guide.category,
        guide.workflowTitle,
        guide.workflowSlug,
        ...guide.seo.keywords,
      ],
    });
  }

  items.push(
    {
      id: "platform-home",
      category: "platform",
      title: platformPage.hero.title,
      description: platformPage.hero.description,
      href: "/platform",
      keywords: [...platformPage.seo.keywords, "platform", "operating system"],
    },
    {
      id: "platform-journey",
      category: "platform",
      title: platformPage.journey.title,
      description: platformPage.journey.description,
      href: "/platform#journey",
      keywords: ["journey", "how it works", "legal journey"],
    },
    {
      id: "platform-capabilities",
      category: "platform",
      title: "Platform capabilities",
      description:
        "Guided AI conversation, legal research, lawyer-grade documents, lawyer review, and filing packages.",
      href: "/platform",
      keywords: ["capabilities", "features", "documents", "research", "review"],
    },
    {
      id: "platform-security",
      category: "platform",
      title: platformPage.security.title,
      description: platformPage.security.description,
      href: "/platform#security",
      keywords: ["security", "privacy", "vault", "encryption"],
    },
    {
      id: "pricing",
      category: "platform",
      title: "Pricing — Free, Pro, and Lawyer Review+",
      description: pricingPage.hero.description,
      href: "/pricing",
      keywords: ["pricing", "pro", "subscription", "₹999", "lawyer review"],
    },
    {
      id: "legal-guides-home",
      category: "guides",
      title: "Legal Guides",
      description:
        "Practical Indian law explainers that lead into LawGPT workflows.",
      href: "/academy",
      keywords: ["academy", "guides", "knowledge center", "SEO"],
    },
    {
      id: "workflows-index",
      category: "workflows",
      title: "All workflows",
      description: "Browse launched LawGPT legal workflows.",
      href: "/workflows",
      keywords: ["workflows", "cases", "matters"],
    },
    {
      id: "contact",
      category: "platform",
      title: "Contact LawGPT",
      description: contactPage.hero.description,
      href: "/contact",
      keywords: [
        ...contactPage.seo.keywords,
        "demo",
        "support",
        "partnerships",
        "email",
      ],
    },
  );

  for (const doc of legalDocuments) {
    items.push({
      id: `legal-${doc.slug}`,
      category: "platform",
      title: doc.title,
      description: doc.description,
      href: `/${doc.slug}`,
      keywords: [...doc.seo.keywords, "legal", "compliance", doc.slug],
    });
  }

  for (const item of faqItems) {
    items.push({
      id: `faq-home-${item.id}`,
      category: "faq",
      title: item.question,
      description: item.answer,
      href: `/academy#faq`,
      keywords: ["faq", "homepage", "guides"],
    });
  }

  for (const item of platformPage.faq) {
    items.push({
      id: `faq-platform-${item.id}`,
      category: "faq",
      title: item.question,
      description: item.answer,
      href: "/platform#faq",
      keywords: ["faq", "platform"],
    });
  }

  for (const item of pricingPage.faq.items) {
    items.push({
      id: `faq-pricing-${item.id}`,
      category: "faq",
      title: item.question,
      description: item.answer,
      href: "/pricing",
      keywords: ["faq", "pricing"],
    });
  }

  for (const item of contactPage.faq.items) {
    items.push({
      id: `faq-contact-${item.id}`,
      category: "faq",
      title: item.question,
      description: item.answer,
      href: "/contact#faq",
      keywords: ["faq", "contact"],
    });
  }

  for (const page of workflowPages) {
    for (const item of page.faq) {
      items.push({
        id: `faq-${page.slug}-${item.id}`,
        category: "faq",
        title: item.question,
        description: item.answer,
        href: `/workflows/${page.slug}`,
        keywords: ["faq", page.slug, page.seo.keywords.slice(0, 4)].flat(),
      });
    }
  }

  return items;
}

/** Precomputed searchable entries for the command palette. */
export const searchIndex: SearchItem[] = buildSearchIndex();

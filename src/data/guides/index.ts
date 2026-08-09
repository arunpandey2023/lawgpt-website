import type { AcademyArticle, FaqItem } from "@/types";
import type { LegalGuide } from "@/types/guide";
import { chequeBounceGuides } from "@/data/guides/cheque-bounce";
import { consumerComplaintGuides } from "@/data/guides/consumer-complaint";
import { drunkDrivingGuides } from "@/data/guides/drunk-driving";
import { policeRefusingFirGuides } from "@/data/guides/police-refusing-fir";
import { wrongfulTerminationGuides } from "@/data/guides/wrongful-termination";

export const allGuides: LegalGuide[] = [
  ...wrongfulTerminationGuides,
  ...consumerComplaintGuides,
  ...chequeBounceGuides,
  ...policeRefusingFirGuides,
  ...drunkDrivingGuides,
];

const guideMap = new Map(allGuides.map((guide) => [guide.slug, guide]));

export function getGuideBySlug(slug: string): LegalGuide | undefined {
  return guideMap.get(slug);
}

export function getAllGuideSlugs(): string[] {
  return allGuides.map((guide) => guide.slug);
}

export function getGuidesByWorkflow(workflowSlug: string): LegalGuide[] {
  return allGuides.filter((guide) => guide.workflowSlug === workflowSlug);
}

export function getRelatedGuides(guide: LegalGuide): LegalGuide[] {
  const related = guide.relatedSlugs
    .map((slug) => guideMap.get(slug))
    .filter((item): item is LegalGuide => Boolean(item));

  if (related.length >= 3) return related.slice(0, 5);

  const fillers = allGuides.filter(
    (item) =>
      item.slug !== guide.slug &&
      item.workflowSlug === guide.workflowSlug &&
      !related.some((r) => r.slug === item.slug),
  );

  return [...related, ...fillers].slice(0, 5);
}

export function toArticleCard(guide: LegalGuide): AcademyArticle {
  return {
    id: guide.slug,
    slug: guide.slug,
    title: guide.title,
    excerpt: guide.excerpt,
    category: guide.category,
    readTime: guide.readTime,
    href: `/academy/${guide.slug}`,
  };
}

export const featuredGuides = allGuides.filter((guide) => guide.featured);

export const popularGuides = [...allGuides]
  .filter((guide) => guide.popular)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const latestGuides = [...allGuides].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

export const videoGuides = allGuides
  .filter((guide) => Boolean(guide.video))
  .filter(
    (guide, index, list) =>
      list.findIndex((item) => item.workflowSlug === guide.workflowSlug) ===
      index,
  );

export const guideWorkflowGroups = [
  {
    slug: "wrongful-termination",
    title: "Wrongful Termination",
    description:
      "Employee rights, legal notices, Labour Commissioner complaints, documents, and compensation.",
    href: "/workflows/wrongful-termination",
    image: "/assets/workflows/wrongful-termination/chat-questions.png",
    imageAlt: "Wrongful Termination workflow in LawGPT",
  },
  {
    slug: "consumer-complaint",
    title: "Consumer Complaint",
    description:
      "Consumer rights, refunds, defective goods, online disputes, and commission filing.",
    href: "/workflows/consumer-complaint",
    image: "/assets/workflows/consumer-complaint/consumer-complaint-doc.png",
    imageAlt: "Consumer Complaint workflow in LawGPT",
  },
  {
    slug: "cheque-bounce",
    title: "Cheque Bounce",
    description:
      "Section 138 NI Act, statutory notice, evidence, court process, and settlement options.",
    href: "/workflows/cheque-bounce",
    image: "/assets/workflows/cheque-bounce/legal-notice.png",
    imageAlt: "Cheque Bounce workflow in LawGPT",
  },
  {
    slug: "police-refusing-fir",
    title: "Police Refusing FIR",
    description:
      "Citizen rights, SP complaints, magistrate routes, evidence, and escalation timelines.",
    href: "/workflows/police-refusing-fir",
    image: "/assets/workflows/police-refusing-fir/sp-complaint.png",
    imageAlt: "Police Refusing FIR workflow in LawGPT",
  },
  {
    slug: "drunk-driving",
    title: "Drunk Driving",
    description:
      "MV Act penalties, first offence, bail, licence suspension, documents, and court prep.",
    href: "/workflows/drunk-driving",
    image: "/assets/workflows/drunk-driving/court-representation.png",
    imageAlt: "Drunk Driving workflow in LawGPT",
  },
] as const;

export const guideLandingFaq: FaqItem[] = [
  {
    id: "what-are-guides",
    question: "What are LawGPT Legal Guides?",
    answer:
      "Legal Guides are practical, long-form explainers for launched LawGPT workflows. They teach the problem, documents, forums, and timelines—then point you to the matching product workflow when you are ready to act.",
  },
  {
    id: "blog",
    question: "Is this a blog or news section?",
    answer:
      "No. Guides are a knowledge center tied to real LawGPT workflows, screenshots, documents, and videos—not generic news posts or unfocused AI essays.",
  },
  {
    id: "advice",
    question: "Do these guides replace a lawyer?",
    answer:
      "No. Guides are educational. For strategy, representation, or jurisdiction-specific advice, consult a qualified advocate. LawGPT can help structure facts and generate lawyer-grade drafts, including optional lawyer review.",
  },
  {
    id: "workflows",
    question: "How do guides connect to workflows?",
    answer:
      "Each guide belongs to one launched workflow—Wrongful Termination, Consumer Complaint, Cheque Bounce, Police Refusing FIR, or Drunk Driving. Related guides and a final CTA open that workflow path.",
  },
  {
    id: "videos",
    question: "Can I watch videos without leaving the site?",
    answer:
      "Yes. Where a workflow video exists, it is embedded and plays inside LawGPT Legal Guides and workflow pages—not via an off-site redirect.",
  },
];

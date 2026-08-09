import type { AcademyArticle, AcademyCategory } from "@/types";

export const academyCategories: AcademyCategory[] = [
  {
    id: "popular-problems",
    title: "Popular Legal Problems",
    description: "Guides for the issues people face most often.",
    href: "/academy#featured",
  },
  {
    id: "articles",
    title: "Latest Guides",
    description: "Practical explainers written for clarity, not jargon.",
    href: "/academy",
  },
  {
    id: "videos",
    title: "Videos",
    description: "Short demos and walkthroughs inside LawGPT.",
    href: "/academy",
  },
  {
    id: "guides",
    title: "Legal Guides",
    description: "Step-by-step playbooks for launched workflows.",
    href: "/academy",
  },
  {
    id: "faq",
    title: "FAQ",
    description: "Straight answers about guides and workflows.",
    href: "/academy",
  },
];

/** Homepage preview — stable links into Legal Guides. */
export const academyArticles: AcademyArticle[] = [
  {
    id: "wrongful-termination-in-india",
    slug: "wrongful-termination-in-india",
    title: "Wrongful Termination in India: A Practical Guide",
    excerpt:
      "Assess termination rights, documents, remedies, and careful next steps for employees in India.",
    category: "Employment",
    readTime: "10 min",
    href: "/academy/wrongful-termination-in-india",
  },
  {
    id: "cheque-bounce-complete-guide",
    slug: "cheque-bounce-complete-guide",
    title: "Cheque Bounce in India: A Complete Section 138 Guide",
    excerpt:
      "Dishonour, statutory notice, complaint filing, proof, and settlement—explained for India.",
    category: "Commercial",
    readTime: "14 min",
    href: "/academy/cheque-bounce-complete-guide",
  },
  {
    id: "consumer-complaint-complete-guide",
    slug: "consumer-complaint-complete-guide",
    title: "Consumer Complaint in India: Complete Practical Guide",
    excerpt:
      "Evidence, remedies, and filing considerations for refunds, defects, and service disputes.",
    category: "Consumer",
    readTime: "10 min",
    href: "/academy/consumer-complaint-complete-guide",
  },
];

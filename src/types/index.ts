export type WorkflowStatus = "live" | "coming-soon";

export interface WorkflowMedia {
  image: string;
  imageAlt: string;
  videoSrc?: string;
  videoPoster?: string;
}

export interface Workflow {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  documents: string[];
  authorities: string[];
  estimatedTime: string;
  videoId?: string;
  status: WorkflowStatus;
  href: string;
  media?: WorkflowMedia;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: "short" | "walkthrough";
  workflowSlug?: string;
  src?: string;
  poster?: string;
  thumbnailLabel: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: "guidance" | "documents" | "research" | "review" | "filing" | "secure";
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref?: string;
  highlighted?: boolean;
  badge?: string;
  priceNote?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface AcademyArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  href: string;
}

export interface AcademyCategory {
  id: string;
  title: string;
  description: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface TrustCapability {
  id: string;
  label: string;
}

export interface HowItWorksStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface ComparisonRow {
  id: string;
  capability: string;
  google: boolean | string;
  chatgpt: boolean | string;
  lawgpt: boolean | string;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  label: string;
  image: string;
  imageAlt: string;
}

export interface WorkflowPageVideo {
  title: string;
  description: string;
  src: string;
  poster: string;
  durationLabel: string;
}

export interface WorkflowPageDocument {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export interface WorkflowPageStep {
  id: string;
  step: number;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export interface WorkflowPageAuthority {
  id: string;
  name: string;
  role: string;
}

export interface WorkflowPageScreenshot {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface WorkflowPageWhyPoint {
  id: string;
  title: string;
  description: string;
}

export interface WorkflowPageData {
  slug: string;
  workflowId: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    image: string;
    imageAlt: string;
  };
  demoVideo?: WorkflowPageVideo;
  problem: {
    eyebrow: string;
    title: string;
    description: string;
    points: { id: string; title: string; description: string }[];
  };
  why: {
    eyebrow: string;
    title: string;
    description: string;
    points: WorkflowPageWhyPoint[];
  };
  preview: {
    eyebrow: string;
    title: string;
    description: string;
    stages: WorkflowPageScreenshot[];
  };
  documents: {
    eyebrow: string;
    title: string;
    description: string;
    items: WorkflowPageDocument[];
  };
  timeline: {
    eyebrow: string;
    title: string;
    description: string;
    steps: WorkflowPageStep[];
  };
  authorities: {
    eyebrow: string;
    title: string;
    description: string;
    items: WorkflowPageAuthority[];
  };
  screenshots: {
    eyebrow: string;
    title: string;
    description: string;
    items: WorkflowPageScreenshot[];
  };
  walkthrough: {
    eyebrow: string;
    title: string;
    description: string;
    video?: WorkflowPageVideo;
    stages: WorkflowPageScreenshot[];
  };
  faq: FaqItem[];
  relatedGuides: AcademyArticle[];
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
}

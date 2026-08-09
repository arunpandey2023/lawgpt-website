import type { FaqItem } from "@/types";

export type GuideSection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "callout"; title?: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "checklist"; title?: string; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string };

export interface GuideVideo {
  src: string;
  poster: string;
  title: string;
  durationLabel: string;
}

export interface GuideGalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface LegalGuide {
  slug: string;
  workflowSlug: string;
  workflowTitle: string;
  workflowHref: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishedAt: string;
  featured?: boolean;
  popular?: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  heroImage: string;
  heroImageAlt: string;
  video?: GuideVideo;
  gallery?: GuideGalleryItem[];
  sections: GuideSection[];
  faq: FaqItem[];
  relatedSlugs: string[];
}

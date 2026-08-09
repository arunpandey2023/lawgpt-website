export type SearchCategory =
  | "workflows"
  | "guides"
  | "platform"
  | "faq";

export interface SearchItem {
  id: string;
  category: SearchCategory;
  title: string;
  description: string;
  href: string;
  keywords?: string[];
}

export interface SearchHit extends SearchItem {
  score: number;
}

export const searchCategoryOrder: SearchCategory[] = [
  "workflows",
  "guides",
  "platform",
  "faq",
];

export const searchCategoryLabels: Record<SearchCategory, string> = {
  workflows: "Workflows",
  guides: "Legal Guides",
  platform: "Platform",
  faq: "FAQ",
};

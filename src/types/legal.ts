export interface LegalList {
  ordered?: boolean;
  items: string[];
}

export interface LegalBlock {
  paragraphs?: string[];
  lists?: LegalList[];
}

export interface LegalSubsection extends LegalBlock {
  id: string;
  title: string;
}

export interface LegalSection extends LegalBlock {
  id: string;
  title: string;
  subsections?: LegalSubsection[];
}

export interface LegalDocument {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  lastUpdated: string;
  lastUpdatedLabel: string;
  intro: string;
  sections: LegalSection[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

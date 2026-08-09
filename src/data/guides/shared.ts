import type { GuideGalleryItem, GuideVideo, LegalGuide } from "@/types/guide";

const base = (slug: string) => `/assets/workflows/${slug}` as const;

export type WorkflowGuideMeta = {
  workflowSlug: string;
  workflowTitle: string;
  workflowHref: string;
  category: string;
  assetSlug: string;
  video?: GuideVideo;
  defaultGallery: GuideGalleryItem[];
  defaultHero: { src: string; alt: string };
};

export const wrongfulTerminationMeta: WorkflowGuideMeta = {
  workflowSlug: "wrongful-termination",
  workflowTitle: "Wrongful Termination",
  workflowHref: "/workflows/wrongful-termination",
  category: "Employment",
  assetSlug: "wrongful-termination",
  video: {
    src: `${base("wrongful-termination")}/tutorial.mp4`,
    poster: `${base("wrongful-termination")}/chat-questions.png`,
    title: "Wrongful Termination tutorial",
    durationLabel: "3 min",
  },
  defaultHero: {
    src: `${base("wrongful-termination")}/chat-questions.png`,
    alt: "LawGPT Wrongful Termination guided Case Assistant",
  },
  defaultGallery: [
    {
      src: `${base("wrongful-termination")}/workflow-overview.png`,
      alt: "Selecting Wrongful Termination workflow",
      caption: "Start by selecting the matching employment workflow.",
    },
    {
      src: `${base("wrongful-termination")}/generate-documents.png`,
      alt: "Generated wrongful termination documents",
      caption: "Generate lawyer-grade notices and complaints from your facts.",
    },
    {
      src: `${base("wrongful-termination")}/legal-notice.png`,
      alt: "Wrongful termination legal notice draft",
      caption: "Review a structured legal notice draft before sending.",
    },
    {
      src: `${base("wrongful-termination")}/download-package.png`,
      alt: "Filing package download",
      caption: "Download the complete filing package in one place.",
    },
  ],
};

export const consumerComplaintMeta: WorkflowGuideMeta = {
  workflowSlug: "consumer-complaint",
  workflowTitle: "Consumer Complaint",
  workflowHref: "/workflows/consumer-complaint",
  category: "Consumer",
  assetSlug: "consumer-complaint",
  video: {
    src: `${base("consumer-complaint")}/tutorial.mp4`,
    poster: `${base("consumer-complaint")}/chat-questions.png`,
    title: "Consumer Complaint tutorial",
    durationLabel: "3 min",
  },
  defaultHero: {
    src: `${base("consumer-complaint")}/consumer-complaint-doc.png`,
    alt: "LawGPT consumer complaint document",
  },
  defaultGallery: [
    {
      src: `${base("consumer-complaint")}/chat-questions.png`,
      alt: "Consumer complaint guided questions",
      caption: "Capture purchase, seller, and deficiency facts with guided questions.",
    },
    {
      src: `${base("consumer-complaint")}/legal-notice.png`,
      alt: "Consumer legal notice",
      caption: "Generate a demand notice before commission filing when useful.",
    },
    {
      src: `${base("consumer-complaint")}/consumer-complaint-doc.png`,
      alt: "Consumer complaint draft",
      caption: "Build a structured consumer complaint draft from your case record.",
    },
    {
      src: `${base("consumer-complaint")}/download-package.png`,
      alt: "Consumer filing package",
      caption: "Export documents and next steps as one filing package.",
    },
  ],
};

export const chequeBounceMeta: WorkflowGuideMeta = {
  workflowSlug: "cheque-bounce",
  workflowTitle: "Cheque Bounce",
  workflowHref: "/workflows/cheque-bounce",
  category: "Commercial",
  assetSlug: "cheque-bounce",
  video: {
    src: `${base("cheque-bounce")}/tutorial.mp4`,
    poster: `${base("cheque-bounce")}/legal-notice.png`,
    title: "Cheque Bounce tutorial",
    durationLabel: "3 min",
  },
  defaultHero: {
    src: `${base("cheque-bounce")}/legal-notice.png`,
    alt: "Section 138 legal notice draft in LawGPT",
  },
  defaultGallery: [
    {
      src: `${base("cheque-bounce")}/chat-questions.png`,
      alt: "Cheque bounce guided intake",
      caption: "Record cheque details, dishonour facts, and limitation dates.",
    },
    {
      src: `${base("cheque-bounce")}/legal-notice.png`,
      alt: "Cheque bounce statutory notice",
      caption: "Generate the statutory notice that starts the Section 138 path.",
    },
    {
      src: `${base("cheque-bounce")}/generate-documents.png`,
      alt: "Cheque bounce document generation",
      caption: "Produce complaint-ready drafts from structured case facts.",
    },
    {
      src: `${base("cheque-bounce")}/download-package.png`,
      alt: "Cheque bounce filing package",
      caption: "Download notice, complaint materials, and case summary together.",
    },
  ],
};

export const policeRefusingFirMeta: WorkflowGuideMeta = {
  workflowSlug: "police-refusing-fir",
  workflowTitle: "Police Refusing FIR",
  workflowHref: "/workflows/police-refusing-fir",
  category: "Criminal procedure",
  assetSlug: "police-refusing-fir",
  video: {
    src: `${base("police-refusing-fir")}/tutorial.mp4`,
    poster: `${base("police-refusing-fir")}/sp-complaint.png`,
    title: "Police Refusing FIR tutorial",
    durationLabel: "3 min",
  },
  defaultHero: {
    src: `${base("police-refusing-fir")}/sp-complaint.png`,
    alt: "Complaint to Superintendent of Police draft",
  },
  defaultGallery: [
    {
      src: `${base("police-refusing-fir")}/chat-questions.png`,
      alt: "FIR refusal guided questions",
      caption: "Document the offence, refusal facts, and police station details.",
    },
    {
      src: `${base("police-refusing-fir")}/sp-complaint.png`,
      alt: "SP complaint draft",
      caption: "Generate a structured complaint to the Superintendent of Police.",
    },
    {
      src: `${base("police-refusing-fir")}/generate-documents.png`,
      alt: "FIR refusal document set",
      caption: "Prepare escalation documents when station-level registration fails.",
    },
    {
      src: `${base("police-refusing-fir")}/download-package.png`,
      alt: "FIR refusal filing package",
      caption: "Keep complaints, evidence notes, and next steps in one package.",
    },
  ],
};

export const drunkDrivingMeta: WorkflowGuideMeta = {
  workflowSlug: "drunk-driving",
  workflowTitle: "Drunk Driving",
  workflowHref: "/workflows/drunk-driving",
  category: "Traffic & criminal",
  assetSlug: "drunk-driving",
  video: {
    src: `${base("drunk-driving")}/preview.mp4`,
    poster: `${base("drunk-driving")}/court-representation.png`,
    title: "Drunk Driving 30-second demo",
    durationLabel: "30 sec",
  },
  defaultHero: {
    src: `${base("drunk-driving")}/court-representation.png`,
    alt: "Drunk driving court representation stage in LawGPT",
  },
  defaultGallery: [
    {
      src: `${base("drunk-driving")}/chat-questions.png`,
      alt: "Drunk driving guided intake",
      caption: "Capture stop, breath test, and charge facts with guided questions.",
    },
    {
      src: `${base("drunk-driving")}/evidence-analysis.png`,
      alt: "Evidence analysis for drunk driving case",
      caption: "Organize challan, medical, and licence materials early.",
    },
    {
      src: `${base("drunk-driving")}/court-representation.png`,
      alt: "Court representation stage",
      caption: "Prepare hearing-oriented materials from the case record.",
    },
    {
      src: `${base("drunk-driving")}/download-package.png`,
      alt: "Drunk driving filing package",
      caption: "Download the structured package for counsel and court prep.",
    },
  ],
};

type GuideDraft = Omit<
  LegalGuide,
  | "workflowSlug"
  | "workflowTitle"
  | "workflowHref"
  | "category"
  | "heroImage"
  | "heroImageAlt"
  | "video"
  | "gallery"
> & {
  heroImage?: string;
  heroImageAlt?: string;
  includeVideo?: boolean;
  gallery?: GuideGalleryItem[];
};

export function defineGuide(
  meta: WorkflowGuideMeta,
  draft: GuideDraft,
): LegalGuide {
  return {
    ...draft,
    workflowSlug: meta.workflowSlug,
    workflowTitle: meta.workflowTitle,
    workflowHref: meta.workflowHref,
    category: meta.category,
    heroImage: draft.heroImage ?? meta.defaultHero.src,
    heroImageAlt: draft.heroImageAlt ?? meta.defaultHero.alt,
    video: draft.includeVideo === true ? meta.video : undefined,
    gallery: draft.gallery ?? meta.defaultGallery,
  };
}

export function p(...paragraphs: string[]) {
  return paragraphs.map((text) => ({ type: "paragraph" as const, text }));
}

export function h2(text: string) {
  return { type: "heading" as const, level: 2 as const, text };
}

export function h3(text: string) {
  return { type: "heading" as const, level: 3 as const, text };
}

export function bullets(...items: string[]) {
  return { type: "list" as const, items };
}

export function steps(...items: string[]) {
  return { type: "list" as const, ordered: true, items };
}

export function callout(text: string, title = "Practical tip") {
  return { type: "callout" as const, title, text };
}

export function checklist(title: string, items: string[]) {
  return { type: "checklist" as const, title, items };
}

export function table(headers: string[], rows: string[][]) {
  return { type: "table" as const, headers, rows };
}

export function img(src: string, alt: string, caption?: string) {
  return { type: "image" as const, src, alt, caption };
}

export function faq(
  items: { id: string; question: string; answer: string }[],
) {
  return items;
}

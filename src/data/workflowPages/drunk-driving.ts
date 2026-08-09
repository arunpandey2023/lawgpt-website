import type { WorkflowPageData } from "@/types";
import { drunkDrivingAssets as assets } from "@/data/workflowPages/assets";

export const drunkDrivingPage: WorkflowPageData = {
  slug: "drunk-driving",
  workflowId: "drunk-driving",
  seo: {
    title: "Drunk Driving Workflow — Defense Brief, Documents & Filing Package",
    description:
      "Use LawGPT’s Drunk Driving workflow to answer guided AI questions, generate defense-oriented legal documents, request lawyer review, and download a complete filing package.",
    keywords: [
      "drunk driving",
      "DUI",
      "drink and drive case",
      "traffic offence defense",
      "AI legal documents",
      "LawGPT",
    ],
  },
  hero: {
    eyebrow: "Drunk Driving workflow",
    title: "Turn a drink-and-drive charge into a structured defense package",
    description:
      "Clarify the alleged offence, answer guided AI questions, generate lawyer-grade documents, request lawyer review, and download everything you need to move forward.",
    primaryCta: {
      label: "Start Drunk Driving",
      href: "https://app.lawgptapp.com",
    },
    secondaryCta: { label: "Watch 30-second Demo", href: "#hero-video" },
    image: assets.chatQuestions,
    imageAlt:
      "LawGPT Drunk Driving workflow with guided Case Assistant questions",
  },
  problem: {
    eyebrow: "The problem",
    title: "Drunk driving cases move fast—and feel overwhelming",
    description:
      "After a drink-and-drive allegation, people struggle to understand charges, gather procedural facts, and prepare clear documents for counsel or court.",
    points: [
      {
        id: "shock",
        title: "Facts are fuzzy under pressure",
        description:
          "Stop details, breathalyzer readings, notices, and timelines are often incomplete when you need them most.",
      },
      {
        id: "process",
        title: "Procedure is unfamiliar",
        description:
          "It is unclear what documents matter, which authority handles the matter, and what to prepare before the next hearing.",
      },
      {
        id: "documents",
        title: "Defense prep stalls",
        description:
          "Generic templates miss case-specific facts. Waiting for every draft from counsel can slow an already urgent matter.",
      },
    ],
  },
  why: {
    eyebrow: "Why LawGPT",
    title: "A software path—not another search result",
    description:
      "LawGPT runs Drunk Driving as a productized workflow: guided intake, research context, lawyer-grade drafts, optional review, and a downloadable filing package.",
    points: [
      {
        id: "guided",
        title: "Guided AI intake",
        description:
          "Answer focused questions about the stop, alleged offence, and evidence—so the case is structured from the start.",
      },
      {
        id: "docs",
        title: "Lawyer-grade outputs",
        description:
          "Generate representation drafts and defense-oriented documents tailored to the facts you provide.",
      },
      {
        id: "review",
        title: "Human review ready",
        description:
          "Hand the package to lawyer review when you want professional judgment on top of AI drafts.",
      },
      {
        id: "package",
        title: "Filing package",
        description:
          "Download generated documents, versions, and supporting materials in one organized package.",
      },
    ],
  },
  preview: {
    eyebrow: "Interactive preview",
    title: "Explore the Drunk Driving product flow",
    description:
      "Step through real LawGPT screens—from guided questions to downloading the filing package.",
    stages: [
      {
        id: "chat",
        label: "1 · Questions",
        title: "Answer guided AI questions",
        description:
          "Case Assistant collects the facts that matter for defense prep and next steps.",
        image: assets.chatQuestions,
        imageAlt: "Guided chat questions in Drunk Driving case",
      },
      {
        id: "summary",
        label: "2 · Summary",
        title: "Confirm the case summary",
        description:
          "Review structured facts before generating documents.",
        image: assets.caseSummary,
        imageAlt: "Drunk Driving case summary",
      },
      {
        id: "evidence",
        label: "3 · Evidence",
        title: "Upload and analyze evidence",
        description:
          "Add supporting materials and review evidence analysis in the workspace.",
        image: assets.evidenceAnalysis,
        imageAlt: "Evidence analysis for Drunk Driving",
      },
      {
        id: "generate",
        label: "4 · Documents",
        title: "Generate lawyer-grade drafts",
        description:
          "Produce representation and defense-oriented documents from your answers.",
        image: assets.generateDocuments,
        imageAlt: "Generate documents phase in LawGPT",
      },
      {
        id: "review",
        label: "5 · Review",
        title: "Lawyer edits and approval",
        description:
          "Send AI-prepared documents for professional review before you proceed.",
        image: assets.lawyerReview,
        imageAlt: "Lawyer review step for Drunk Driving",
      },
      {
        id: "download",
        label: "6 · Package",
        title: "Download the filing package",
        description:
          "Export a complete package with drafts, versions, and supporting materials.",
        image: assets.downloadPackage,
        imageAlt: "Download filing package for Drunk Driving",
      },
    ],
  },
  documents: {
    eyebrow: "Documents generated",
    title: "Lawyer-grade drafts built from your answers",
    description:
      "Drunk Driving produces structured legal documents you can edit, version, review, and download.",
    items: [
      {
        id: "authority-rep",
        title: "Representation to Authorities",
        description:
          "A formal representation capturing case facts and the position you are advancing.",
        image: assets.authorityRepresentation,
        imageAlt: "Generated representation to authorities in LawGPT",
      },
      {
        id: "court-rep",
        title: "Court Representation",
        description:
          "A court-facing draft aligned to your case summary and procedural facts.",
        image: assets.courtRepresentation,
        imageAlt: "Generated court representation draft",
      },
      {
        id: "case-summary",
        title: "Case Summary",
        description:
          "A structured summary of parties, alleged offence, and key facts used across the workflow.",
        image: assets.caseSummary,
        imageAlt: "Drunk Driving case summary screen",
      },
      {
        id: "evidence",
        title: "Evidence Analysis",
        description:
          "Organized evidence review so gaps and next steps are visible before filing.",
        image: assets.evidenceAnalysis,
        imageAlt: "Evidence analysis screen in LawGPT",
      },
    ],
  },
  timeline: {
    eyebrow: "Timeline",
    title: "From first question to filing package",
    description:
      "A clear sequence designed like software—not a maze of disconnected forms.",
    steps: [
      {
        id: "t1",
        step: 1,
        title: "Answer guided questions",
        description: "Complete intake with Case Assistant in the workspace.",
        image: assets.chatQuestions,
        imageAlt: "Answer guided drunk driving questions",
      },
      {
        id: "t2",
        step: 2,
        title: "Confirm case summary",
        description: "Review structured facts before generating documents.",
        image: assets.caseSummary,
        imageAlt: "Drunk Driving case summary",
      },
      {
        id: "t3",
        step: 3,
        title: "Upload evidence",
        description: "Add notices, reports, and supporting documents.",
        image: assets.documentsUpload,
        imageAlt: "Upload documents for drunk driving",
      },
      {
        id: "t4",
        step: 4,
        title: "Generate documents",
        description: "Produce representation drafts from your structured facts.",
        image: assets.generateDocuments,
        imageAlt: "Generate drunk driving documents",
      },
      {
        id: "t5",
        step: 5,
        title: "Lawyer review",
        description: "Optionally request professional edits and approval.",
        image: assets.lawyerReview,
        imageAlt: "Lawyer edits and approval",
      },
      {
        id: "t6",
        step: 6,
        title: "Download package",
        description: "Export a complete filing-ready package.",
        image: assets.downloadPackage,
        imageAlt: "Download drunk driving filing package",
      },
    ],
  },
  authorities: {
    eyebrow: "Authorities involved",
    title: "Know where this matter can go",
    description:
      "Drunk Driving workflows are structured with the forums commonly involved in traffic and related offences.",
    items: [
      {
        id: "a1",
        name: "Traffic Court",
        role: "Forum that commonly hears drink-and-drive and related traffic matters.",
      },
      {
        id: "a2",
        name: "Magistrate Court",
        role: "Judicial forum for certain offences and procedural steps depending on facts.",
      },
      {
        id: "a3",
        name: "Police / transport authorities",
        role: "Investigating and enforcing authorities that may issue notices or produce records.",
      },
    ],
  },
  screenshots: {
    eyebrow: "Real product screens",
    title: "Actual LawGPT UI—not mockups",
    description:
      "Every image below is from the live Drunk Driving workflow inside LawGPT.",
    items: [
      {
        id: "s1",
        label: "Dashboard",
        title: "Case workspace",
        description: "Start and manage drunk driving matters from one dashboard.",
        image: assets.dashboard,
        imageAlt: "LawGPT dashboard",
      },
      {
        id: "s2",
        label: "Chat",
        title: "Guided AI questions",
        description: "Collect offence and procedure facts through Case Assistant.",
        image: assets.chatQuestions,
        imageAlt: "Drunk Driving chat questions",
      },
      {
        id: "s3",
        label: "Evidence",
        title: "Evidence analysis",
        description: "Review uploaded materials before drafting.",
        image: assets.evidenceAnalysis,
        imageAlt: "Evidence analysis screen",
      },
      {
        id: "s4",
        label: "Documents",
        title: "Generated drafts",
        description: "Produce representation documents from your answers.",
        image: assets.authorityRepresentation,
        imageAlt: "Representation to authorities draft",
      },
      {
        id: "s5",
        label: "Research",
        title: "Legal research",
        description: "Context and next steps linked to your case.",
        image: assets.legalResearch,
        imageAlt: "Legal research screen",
      },
      {
        id: "s6",
        label: "Package",
        title: "Filing package",
        description: "Download the complete package when ready.",
        image: assets.downloadPackage,
        imageAlt: "Download filing package screen",
      },
    ],
  },
  walkthrough: {
    eyebrow: "Product screens",
    title: "Step through the Drunk Driving flow",
    description:
      "Explore every major product screen—from guided questions to filing package. Demo video plays in the hero above.",
    video: {
      title: "Drunk Driving product demo",
      description:
        "A 30-second look at how LawGPT structures a drunk driving matter.",
      src: assets.video,
      poster: assets.videoPoster,
      durationLabel: "0:30",
    },
    stages: [
      {
        id: "w1",
        label: "Dashboard",
        title: "Open Case Workspace",
        description: "Start from the LawGPT dashboard and open your matter.",
        image: assets.dashboard,
        imageAlt: "LawGPT dashboard for drunk driving",
      },
      {
        id: "w2",
        label: "Intake",
        title: "Complete guided questions",
        description: "Answer Case Assistant prompts about the alleged offence.",
        image: assets.chatQuestions,
        imageAlt: "Chat intake for drunk driving",
      },
      {
        id: "w3",
        label: "Summary",
        title: "Confirm the case summary",
        description: "Review structured facts before generating documents.",
        image: assets.caseSummary,
        imageAlt: "Case summary screen",
      },
      {
        id: "w4",
        label: "Evidence",
        title: "Upload and analyze evidence",
        description: "Attach records and review evidence analysis.",
        image: assets.evidenceAnalysis,
        imageAlt: "Evidence analysis screen",
      },
      {
        id: "w5",
        label: "Drafts",
        title: "Generate representation drafts",
        description: "Create authority and court-facing documents, then refine them.",
        image: assets.generateDocuments,
        imageAlt: "Generate documents screen",
      },
      {
        id: "w6",
        label: "Court",
        title: "Review court representation",
        description: "Inspect the court-oriented draft in the workspace.",
        image: assets.courtRepresentation,
        imageAlt: "Court representation draft",
      },
      {
        id: "w7",
        label: "Review",
        title: "Lawyer edits and approval",
        description: "Send prepared documents for professional review.",
        image: assets.lawyerReview,
        imageAlt: "Lawyer review screen",
      },
      {
        id: "w8",
        label: "File",
        title: "Download the package",
        description: "Export the complete filing-ready zip when approved.",
        image: assets.downloadPackage,
        imageAlt: "Download package screen",
      },
    ],
  },
  faq: [
    {
      id: "dd-faq-1",
      question: "What is the Drunk Driving workflow?",
      answer:
        "It is a guided LawGPT workflow that helps you structure a drink-and-drive matter, generate lawyer-grade documents, optionally request lawyer review, and download a filing package.",
    },
    {
      id: "dd-faq-2",
      question: "Which documents can LawGPT generate?",
      answer:
        "Typical outputs include representation drafts to authorities, court-oriented drafts, case summary materials, evidence analysis views, and organized package contents for download. Exact drafts depend on your answers and case facts.",
    },
    {
      id: "dd-faq-3",
      question: "Is this a substitute for a lawyer?",
      answer:
        "No. LawGPT helps you prepare structured drafts and packages. For legal advice, strategy, or representation, use lawyer review or consult independent counsel.",
    },
    {
      id: "dd-faq-4",
      question: "How long does the workflow take?",
      answer:
        "Most users can complete guided questions and generate an initial package in about 20–30 minutes, depending on how ready their facts and documents are.",
    },
    {
      id: "dd-faq-5",
      question: "Can I edit documents after they are generated?",
      answer:
        "Yes. Generated drafts can be reviewed and versioned in the workspace before lawyer review or download.",
    },
    {
      id: "dd-faq-6",
      question: "What authorities might be involved?",
      answer:
        "Depending on facts, matters may involve traffic courts, Magistrate courts, and police or transport authorities. LawGPT helps you prepare documents with those pathways in mind.",
    },
  ],
  relatedGuides: [
    {
      id: "rg-1",
      slug: "drunk-driving-complete-guide",
      title: "Drunk Driving in India: Complete Practical Guide",
      excerpt:
        "Laws, documents, court process, licence issues, and preparation after a drunk-driving charge.",
      category: "Traffic & criminal",
      readTime: "14 min",
      href: "/academy/drunk-driving-complete-guide",
    },
    {
      id: "rg-2",
      slug: "drunk-driving-laws-india",
      title: "Drunk Driving Laws in India",
      excerpt:
        "Understand MV Act offences, penalties, and what typically happens after a breath or blood test stop.",
      category: "Traffic & criminal",
      readTime: "11 min",
      href: "/academy/drunk-driving-laws-india",
    },
    {
      id: "rg-3",
      slug: "drunk-driving-court-process",
      title: "Drunk Driving Court Process",
      excerpt:
        "What to expect from challan to hearing—and how to organise a court-ready file.",
      category: "Traffic & criminal",
      readTime: "11 min",
      href: "/academy/drunk-driving-court-process",
    },
  ],
  cta: {
    eyebrow: "Ready to begin",
    title: "Start your Drunk Driving workflow free",
    description:
      "Answer guided questions, generate lawyer-grade documents, and leave with a package you can review, refine, and file.",
    primaryLabel: "Start Drunk Driving",
    primaryHref: "https://app.lawgptapp.com",
    secondaryLabel: "Explore all workflows",
    secondaryHref: "/workflows",
  },
};

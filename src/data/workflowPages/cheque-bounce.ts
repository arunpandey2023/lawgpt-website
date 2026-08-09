import type { WorkflowPageData } from "@/types";
import { chequeBounceAssets as assets } from "@/data/productMedia";

export const chequeBouncePage: WorkflowPageData = {
  slug: "cheque-bounce",
  workflowId: "cheque-bounce",
  seo: {
    title: "Cheque Bounce Workflow — Section 138 Notice, Complaint & Filing Package",
    description:
      "Use LawGPT’s Cheque Bounce workflow to answer guided AI questions, generate a Section 138 demand notice and complaint drafts, request lawyer review, and download a complete filing package.",
    keywords: [
      "cheque bounce",
      "section 138",
      "dishonour of cheque",
      "statutory notice",
      "AI legal documents",
      "LawGPT",
    ],
  },
  hero: {
    eyebrow: "Cheque Bounce workflow",
    title: "Turn a bounced cheque into a Section 138 filing package",
    description:
      "Track the timeline, answer guided AI questions, generate lawyer-grade notice and complaint drafts, request lawyer review, and download everything you need to move forward.",
    primaryCta: {
      label: "Start Cheque Bounce",
      href: "https://app.lawgptapp.com",
    },
    secondaryCta: { label: "Watch 3-minute Tutorial", href: "#hero-video" },
    image: assets.chatQuestions,
    imageAlt:
      "LawGPT Cheque Bounce workflow with guided Case Assistant questions",
  },
  problem: {
    eyebrow: "The problem",
    title: "Cheque bounce is deadline-driven—and easy to get wrong",
    description:
      "When a cheque is dishonoured, statutory timelines, notice requirements, and complaint structure leave little room for guesswork.",
    points: [
      {
        id: "deadlines",
        title: "Timelines are strict",
        description:
          "Demand notice and complaint windows under Section 138 are short. Missing a date can weaken the entire matter.",
      },
      {
        id: "procedure",
        title: "Procedure feels technical",
        description:
          "People often do not know what the notice must contain, which documents to attach, or when the cause of action begins.",
      },
      {
        id: "documents",
        title: "Drafts stall momentum",
        description:
          "Generic templates miss cheque details, bank memos, and chronology. Waiting for counsel for every draft costs critical days.",
      },
    ],
  },
  why: {
    eyebrow: "Why LawGPT",
    title: "A software path—not another search result",
    description:
      "LawGPT runs Cheque Bounce as a productized workflow: guided intake, research context, lawyer-grade drafts, optional review, and a downloadable filing package.",
    points: [
      {
        id: "guided",
        title: "Guided AI intake",
        description:
          "Answer focused questions about the cheque, dishonour, parties, and dates—so the case is structured from the start.",
      },
      {
        id: "docs",
        title: "Lawyer-grade outputs",
        description:
          "Generate a Section 138 demand notice and complaint-oriented drafts tailored to the facts you provide.",
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
    title: "Explore the Cheque Bounce product flow",
    description:
      "Step through real LawGPT screens—from creating the case to downloading the filing package.",
    stages: [
      {
        id: "select",
        label: "1 · Select",
        title: "Choose the workflow",
        description:
          "Create a case and select Cheque Bounce as the matching legal workflow.",
        image: assets.workflowOverview,
        imageAlt: "Create Case modal selecting Cheque Bounce workflow",
      },
      {
        id: "chat",
        label: "2 · Questions",
        title: "Answer guided AI questions",
        description:
          "Case Assistant collects the facts that matter for notice timelines, complaint drafting, and next steps.",
        image: assets.chatQuestions,
        imageAlt: "Guided chat questions in Cheque Bounce case",
      },
      {
        id: "research",
        label: "3 · Research",
        title: "Review legal context",
        description:
          "See research and recommended next steps tied to your matter—not a generic chat thread.",
        image: assets.legalResearch,
        imageAlt: "Legal research panel for Cheque Bounce",
      },
      {
        id: "generate",
        label: "4 · Documents",
        title: "Generate lawyer-grade drafts",
        description:
          "Produce Section 138 notice and related documents from your structured answers.",
        image: assets.generateDocuments,
        imageAlt: "Generate documents phase in LawGPT",
      },
      {
        id: "review",
        label: "5 · Review",
        title: "Request lawyer review",
        description:
          "Send AI-prepared documents for professional review before you file.",
        image: assets.lawyerReview,
        imageAlt: "Lawyer review step for Cheque Bounce",
      },
      {
        id: "download",
        label: "6 · Package",
        title: "Download the filing package",
        description:
          "Export a complete package with drafts, versions, and supporting materials.",
        image: assets.downloadPackage,
        imageAlt: "Download filing package for Cheque Bounce",
      },
    ],
  },
  documents: {
    eyebrow: "Documents generated",
    title: "Lawyer-grade drafts built from your answers",
    description:
      "Cheque Bounce produces structured legal documents you can edit, version, review, and download.",
    items: [
      {
        id: "legal-notice",
        title: "Section 138 Demand Notice",
        description:
          "A statutory demand notice capturing cheque details, dishonour facts, and the payment demand.",
        image: assets.legalNotice,
        imageAlt: "Generated Section 138 demand notice in LawGPT",
      },
      {
        id: "generate-docs",
        title: "Complaint-ready drafts",
        description:
          "Document generation for the complaint package aligned to your case summary and chronology.",
        image: assets.generateDocuments,
        imageAlt: "Generate Cheque Bounce documents screen",
      },
      {
        id: "case-summary",
        title: "Case Summary",
        description:
          "A structured summary of parties, cheque facts, and key dates used across the workflow.",
        image: assets.caseSummary,
        imageAlt: "Cheque Bounce case summary screen",
      },
      {
        id: "next-steps",
        title: "Next Steps Brief",
        description:
          "Recommended procedural next steps so you know what to do after documents are ready.",
        image: assets.nextSteps,
        imageAlt: "Next steps guidance in LawGPT",
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
        title: "Create the case",
        description: "Select Cheque Bounce and name your matter.",
        image: assets.workflowOverview,
        imageAlt: "Create Cheque Bounce case",
      },
      {
        id: "t2",
        step: 2,
        title: "Answer guided questions",
        description: "Complete intake with Case Assistant in the workspace.",
        image: assets.chatQuestions,
        imageAlt: "Answer guided cheque bounce questions",
      },
      {
        id: "t3",
        step: 3,
        title: "Upload evidence",
        description: "Add the cheque, bank memo, and supporting documents.",
        image: assets.documentsUpload,
        imageAlt: "Upload documents for cheque bounce",
      },
      {
        id: "t4",
        step: 4,
        title: "Generate documents",
        description: "Produce notice and complaint drafts from your structured facts.",
        image: assets.generateDocuments,
        imageAlt: "Generate cheque bounce documents",
      },
      {
        id: "t5",
        step: 5,
        title: "Lawyer review",
        description: "Optionally request professional review before filing.",
        image: assets.lawyerReview,
        imageAlt: "Request lawyer review",
      },
      {
        id: "t6",
        step: 6,
        title: "Download package",
        description: "Export a complete filing-ready package.",
        image: assets.downloadPackage,
        imageAlt: "Download cheque bounce filing package",
      },
    ],
  },
  authorities: {
    eyebrow: "Authorities involved",
    title: "Know where this matter can go",
    description:
      "Cheque Bounce workflows are structured with the forums commonly involved in Section 138 proceedings.",
    items: [
      {
        id: "a1",
        name: "Magistrate Court",
        role: "Primary criminal court forum for Section 138 cheque bounce complaints.",
      },
      {
        id: "a2",
        name: "Police / complaint filing channel",
        role: "Procedural pathway for lodging the complaint after statutory notice requirements are met.",
      },
      {
        id: "a3",
        name: "Bank records / payment evidence",
        role: "Supporting institutional records that establish dishonour and non-payment facts.",
      },
    ],
  },
  screenshots: {
    eyebrow: "Real product screens",
    title: "Actual LawGPT UI—not mockups",
    description:
      "Every image below is from the live Cheque Bounce workflow inside LawGPT.",
    items: [
      {
        id: "s1",
        label: "Dashboard",
        title: "Case workspace",
        description: "Start and manage cheque bounce matters from one dashboard.",
        image: assets.dashboard,
        imageAlt: "LawGPT dashboard",
      },
      {
        id: "s2",
        label: "Chat",
        title: "Guided AI questions",
        description: "Collect cheque and dishonour facts through Case Assistant.",
        image: assets.chatQuestions,
        imageAlt: "Cheque Bounce chat questions",
      },
      {
        id: "s3",
        label: "Notice",
        title: "Section 138 notice",
        description: "Edit a lawyer-grade demand notice generated from your answers.",
        image: assets.legalNotice,
        imageAlt: "Cheque Bounce legal notice",
      },
      {
        id: "s4",
        label: "Generate",
        title: "Document generation",
        description: "Produce the drafts that feed your complaint package.",
        image: assets.generateDocuments,
        imageAlt: "Generate documents screen",
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
    eyebrow: "Product walkthrough",
    title: "Step through the Cheque Bounce flow",
    description:
      "Explore every major product screen—from case creation to filing package.",
    video: {
      title: "Cheque Bounce tutorial",
      description:
        "A 3-minute walkthrough of the Cheque Bounce workflow inside LawGPT.",
      src: assets.tutorial,
      poster: assets.tutorialPoster,
      durationLabel: "3:00",
    },
    stages: [
      {
        id: "w1",
        label: "Dashboard",
        title: "Open Case Workspace",
        description: "Start from the LawGPT dashboard and create a new case.",
        image: assets.dashboard,
        imageAlt: "LawGPT dashboard for cheque bounce",
      },
      {
        id: "w2",
        label: "Create",
        title: "Select Cheque Bounce",
        description: "Choose the matching workflow and name the matter.",
        image: assets.workflowOverview,
        imageAlt: "Create cheque bounce case",
      },
      {
        id: "w3",
        label: "Intake",
        title: "Complete guided questions",
        description: "Answer Case Assistant prompts about the cheque and dishonour.",
        image: assets.chatQuestions,
        imageAlt: "Chat intake for cheque bounce",
      },
      {
        id: "w4",
        label: "Summary",
        title: "Confirm the case summary",
        description: "Review structured facts before generating documents.",
        image: assets.caseSummary,
        imageAlt: "Case summary screen",
      },
      {
        id: "w5",
        label: "Evidence",
        title: "Upload documents",
        description: "Attach the cheque, bank memo, and other evidence to the vault.",
        image: assets.documentsUpload,
        imageAlt: "Documents upload screen",
      },
      {
        id: "w6",
        label: "Drafts",
        title: "Generate and edit drafts",
        description: "Create the demand notice and related documents, then refine them.",
        image: assets.legalNotice,
        imageAlt: "Legal notice draft screen",
      },
      {
        id: "w7",
        label: "Review",
        title: "Request lawyer review",
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
      id: "cb-faq-1",
      question: "What is the Cheque Bounce workflow?",
      answer:
        "It is a guided LawGPT workflow that helps you structure a Section 138 matter, generate lawyer-grade documents, optionally request lawyer review, and download a filing package.",
    },
    {
      id: "cb-faq-2",
      question: "Which documents can LawGPT generate?",
      answer:
        "Typical outputs include a Section 138 demand notice, complaint-oriented drafts, case summary materials, and organized package contents for download. Exact drafts depend on your answers and case facts.",
    },
    {
      id: "cb-faq-3",
      question: "Is this a substitute for a lawyer?",
      answer:
        "No. LawGPT helps you prepare structured drafts and packages. For legal advice, strategy, or representation, use lawyer review or consult independent counsel.",
    },
    {
      id: "cb-faq-4",
      question: "How long does the workflow take?",
      answer:
        "Most users can complete guided questions and generate an initial package in about 20–30 minutes, depending on how ready their facts and documents are.",
    },
    {
      id: "cb-faq-5",
      question: "Can I edit documents after they are generated?",
      answer:
        "Yes. Generated drafts can be reviewed and versioned in the workspace before lawyer review or download.",
    },
    {
      id: "cb-faq-6",
      question: "What authorities might be involved?",
      answer:
        "Section 138 complaints are typically filed before a Magistrate Court after statutory notice requirements are met. LawGPT helps you prepare documents with that process in mind.",
    },
  ],
  relatedGuides: [
    {
      id: "rg-1",
      slug: "cheque-bounce-complete-guide",
      title: "Cheque Bounce in India: A Complete Section 138 Guide",
      excerpt:
        "A practical guide to dishonour, statutory notice, complaint filing, proof, and settlement.",
      category: "Commercial",
      readTime: "14 min",
      href: "/academy/cheque-bounce-complete-guide",
    },
    {
      id: "rg-2",
      slug: "section-138-ni-act-explained",
      title: "Section 138 of the NI Act Explained",
      excerpt:
        "Understand the ingredients, presumptions, timelines, and limits of a cheque dishonour case.",
      category: "Commercial",
      readTime: "11 min",
      href: "/academy/section-138-ni-act-explained",
    },
    {
      id: "rg-3",
      slug: "cheque-bounce-legal-notice-process",
      title: "Cheque Bounce Legal Notice Process",
      excerpt:
        "How to calculate the notice window, draft a demand, and retain reliable delivery proof.",
      category: "Commercial",
      readTime: "11 min",
      href: "/academy/cheque-bounce-legal-notice-process",
    },
  ],
  cta: {
    eyebrow: "Ready to begin",
    title: "Start your Cheque Bounce workflow free",
    description:
      "Answer guided questions, generate lawyer-grade documents, and leave with a package you can review, refine, and file.",
    primaryLabel: "Start Cheque Bounce",
    primaryHref: "https://app.lawgptapp.com",
    secondaryLabel: "Explore all workflows",
    secondaryHref: "/workflows",
  },
};

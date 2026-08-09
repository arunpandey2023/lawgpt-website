import type { WorkflowPageData } from "@/types";
import { wrongfulTerminationAssets as assets } from "@/data/workflowPages/assets";

export const wrongfulTerminationPage: WorkflowPageData = {
  slug: "wrongful-termination",
  workflowId: "wrongful-termination",
  seo: {
    title: "Wrongful Termination Workflow — AI Legal Documents & Filing Package",
    description:
      "Use LawGPT’s Wrongful Termination workflow to answer guided AI questions, generate lawyer-grade notices and complaints, request lawyer review, and download a complete filing package.",
    keywords: [
      "wrongful termination",
      "illegal termination",
      "labour commissioner complaint",
      "employment legal notice",
      "AI legal documents",
      "LawGPT",
    ],
  },
  hero: {
    eyebrow: "Wrongful Termination workflow",
    title: "Turn an unlawful termination into a filing-ready case package",
    description:
      "Map what happened, answer guided AI questions, generate lawyer-grade documents, request lawyer review, and download everything you need to move forward.",
    primaryCta: {
      label: "Start Wrongful Termination",
      href: "https://app.lawgptapp.com",
    },
    secondaryCta: { label: "Watch 3-minute Tutorial", href: "#hero-video" },
    image: assets.chatQuestions,
    imageAlt:
      "LawGPT Wrongful Termination workflow with guided Case Assistant questions",
  },
  problem: {
    eyebrow: "The problem",
    title: "Wrongful termination is urgent—and usually confusing",
    description:
      "When a job ends unfairly, people are left guessing about notices, evidence, forums, and timelines. Delay and incomplete paperwork make a hard situation worse.",
    points: [
      {
        id: "facts",
        title: "Facts are scattered",
        description:
          "Offer letters, emails, appraisal notes, and termination letters rarely sit in one clear timeline.",
      },
      {
        id: "procedure",
        title: "Procedure is unclear",
        description:
          "It is hard to know whether to send a notice, approach the Labour Commissioner, or prepare a formal complaint first.",
      },
      {
        id: "documents",
        title: "Documents stall momentum",
        description:
          "Generic templates miss case-specific facts. Waiting for counsel for every draft can take days you may not have.",
      },
    ],
  },
  why: {
    eyebrow: "Why LawGPT",
    title: "A software path—not another search result",
    description:
      "LawGPT runs Wrongful Termination as a productized workflow: guided intake, research context, lawyer-grade drafts, optional review, and a downloadable filing package.",
    points: [
      {
        id: "guided",
        title: "Guided AI intake",
        description:
          "Answer focused questions about employment terms, termination facts, and evidence—so the case is structured from the start.",
      },
      {
        id: "docs",
        title: "Lawyer-grade outputs",
        description:
          "Generate a legal notice and Labour Commissioner complaint drafts tailored to the facts you provide.",
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
    title: "Explore the Wrongful Termination product flow",
    description:
      "Step through real LawGPT screens—from creating the case to downloading the filing package.",
    stages: [
      {
        id: "select",
        label: "1 · Select",
        title: "Choose the workflow",
        description:
          "Create a case and select Wrongful Termination as the matching legal workflow.",
        image: assets.workflowOverview,
        imageAlt: "Create Case modal selecting Wrongful Termination workflow",
      },
      {
        id: "chat",
        label: "2 · Questions",
        title: "Answer guided AI questions",
        description:
          "Case Assistant collects the facts that matter for notices, complaints, and next steps.",
        image: assets.chatQuestions,
        imageAlt: "Guided chat questions in Wrongful Termination case",
      },
      {
        id: "research",
        label: "3 · Research",
        title: "Review legal context",
        description:
          "See research and recommended next steps tied to your matter—not a generic chat thread.",
        image: assets.legalResearch,
        imageAlt: "Legal research panel for Wrongful Termination",
      },
      {
        id: "generate",
        label: "4 · Documents",
        title: "Generate lawyer-grade drafts",
        description:
          "Produce legal notice and complaint documents from your structured answers.",
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
        imageAlt: "Lawyer review step for Wrongful Termination",
      },
      {
        id: "download",
        label: "6 · Package",
        title: "Download the filing package",
        description:
          "Export a complete package with drafts, versions, and supporting materials.",
        image: assets.downloadPackage,
        imageAlt: "Download filing package for Wrongful Termination",
      },
    ],
  },
  documents: {
    eyebrow: "Documents generated",
    title: "Lawyer-grade drafts built from your answers",
    description:
      "Wrongful Termination produces structured legal documents you can edit, version, review, and download.",
    items: [
      {
        id: "legal-notice",
        title: "Legal Notice",
        description:
          "A formal notice capturing employment facts, termination grounds, and the relief you are seeking.",
        image: assets.legalNotice,
        imageAlt: "Generated wrongful termination legal notice in LawGPT",
      },
      {
        id: "labour-complaint",
        title: "Labour Commissioner Complaint",
        description:
          "A complaint draft prepared for Labour Commissioner proceedings, aligned to your case summary.",
        image: assets.labourComplaint,
        imageAlt: "Generated Labour Commissioner complaint draft",
      },
      {
        id: "case-summary",
        title: "Case Summary",
        description:
          "A structured summary of parties, timeline, and key facts used across the workflow.",
        image: assets.caseSummary,
        imageAlt: "Wrongful Termination case summary screen",
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
        description: "Select Wrongful Termination and name your matter.",
        image: assets.workflowOverview,
        imageAlt: "Create Wrongful Termination case",
      },
      {
        id: "t2",
        step: 2,
        title: "Answer guided questions",
        description: "Complete intake with Case Assistant in the workspace.",
        image: assets.chatQuestions,
        imageAlt: "Answer guided wrongful termination questions",
      },
      {
        id: "t3",
        step: 3,
        title: "Upload evidence",
        description: "Add termination letters, contracts, and supporting documents.",
        image: assets.documentsUpload,
        imageAlt: "Upload documents for wrongful termination",
      },
      {
        id: "t4",
        step: 4,
        title: "Generate documents",
        description: "Produce notice and complaint drafts from your structured facts.",
        image: assets.generateDocuments,
        imageAlt: "Generate wrongful termination documents",
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
        imageAlt: "Download wrongful termination filing package",
      },
    ],
  },
  authorities: {
    eyebrow: "Authorities involved",
    title: "Know where this matter can go",
    description:
      "Wrongful Termination workflows are structured with the forums and authorities commonly involved in employment disputes.",
    items: [
      {
        id: "a1",
        name: "Labour Commissioner",
        role: "Primary forum for many employment and termination complaints.",
      },
      {
        id: "a2",
        name: "Labour Court",
        role: "Adjudicates industrial and employment disputes that proceed to court.",
      },
      {
        id: "a3",
        name: "Industrial Tribunal",
        role: "Handles specified industrial disputes depending on facts and jurisdiction.",
      },
    ],
  },
  screenshots: {
    eyebrow: "Real product screens",
    title: "Actual LawGPT UI—not mockups",
    description:
      "Every image below is from the live Wrongful Termination workflow inside LawGPT.",
    items: [
      {
        id: "s1",
        label: "Dashboard",
        title: "Case workspace",
        description: "Start and manage employment matters from one dashboard.",
        image: assets.dashboard,
        imageAlt: "LawGPT dashboard",
      },
      {
        id: "s2",
        label: "Chat",
        title: "Guided AI questions",
        description: "Collect termination facts through Case Assistant.",
        image: assets.chatQuestions,
        imageAlt: "Wrongful Termination chat questions",
      },
      {
        id: "s3",
        label: "Notice",
        title: "Legal notice draft",
        description: "Edit a lawyer-grade notice generated from your answers.",
        image: assets.legalNotice,
        imageAlt: "Wrongful Termination legal notice",
      },
      {
        id: "s4",
        label: "Complaint",
        title: "Labour complaint",
        description: "Review the Labour Commissioner complaint draft.",
        image: assets.labourComplaint,
        imageAlt: "Labour Commissioner complaint",
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
    title: "Step through the Wrongful Termination flow",
    description:
      "Explore every major product screen—from case creation to filing package.",
    video: {
      title: "Wrongful Termination tutorial",
      description:
        "A 3-minute walkthrough of the Wrongful Termination workflow inside LawGPT.",
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
        imageAlt: "LawGPT dashboard for wrongful termination",
      },
      {
        id: "w2",
        label: "Create",
        title: "Select Wrongful Termination",
        description: "Choose the matching workflow and name the matter.",
        image: assets.workflowOverview,
        imageAlt: "Create wrongful termination case",
      },
      {
        id: "w3",
        label: "Intake",
        title: "Complete guided questions",
        description: "Answer Case Assistant prompts about employment and termination.",
        image: assets.chatQuestions,
        imageAlt: "Chat intake for wrongful termination",
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
        description: "Attach contracts, letters, and other evidence to the vault.",
        image: assets.documentsUpload,
        imageAlt: "Documents upload screen",
      },
      {
        id: "w6",
        label: "Drafts",
        title: "Generate and edit drafts",
        description: "Create notice and complaint documents, then refine them.",
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
      id: "wt-faq-1",
      question: "What is the Wrongful Termination workflow?",
      answer:
        "It is a guided LawGPT workflow that helps you structure an unlawful termination matter, generate lawyer-grade documents, optionally request lawyer review, and download a filing package.",
    },
    {
      id: "wt-faq-2",
      question: "Which documents can LawGPT generate?",
      answer:
        "Typical outputs include a legal notice, Labour Commissioner complaint draft, case summary materials, and organized package contents for download. Exact drafts depend on your answers and case facts.",
    },
    {
      id: "wt-faq-3",
      question: "Is this a substitute for a lawyer?",
      answer:
        "No. LawGPT helps you prepare structured drafts and packages. For legal advice, strategy, or representation, use lawyer review or consult independent counsel.",
    },
    {
      id: "wt-faq-4",
      question: "How long does the workflow take?",
      answer:
        "Most users can complete guided questions and generate an initial package in about 25–40 minutes, depending on how ready their facts and documents are.",
    },
    {
      id: "wt-faq-5",
      question: "Can I edit documents after they are generated?",
      answer:
        "Yes. Generated drafts can be reviewed and versioned in the workspace before lawyer review or download.",
    },
    {
      id: "wt-faq-6",
      question: "What authorities might be involved?",
      answer:
        "Depending on facts and jurisdiction, matters may involve the Labour Commissioner, Labour Court, or Industrial Tribunal. LawGPT helps you prepare documents with those forums in mind.",
    },
  ],
  relatedGuides: [
    {
      id: "rg-1",
      slug: "wrongful-termination-in-india",
      title: "Wrongful Termination in India: A Practical Guide",
      excerpt:
        "Assess termination rights, documents, remedies, and careful next steps for employees in India.",
      category: "Employment",
      readTime: "10 min",
      href: "/academy/wrongful-termination-in-india",
    },
    {
      id: "rg-2",
      slug: "how-to-send-legal-notice-wrongful-termination",
      title: "How to Send a Legal Notice for Wrongful Termination",
      excerpt:
        "Prepare an evidence-led employment notice without undermining your position.",
      category: "Employment",
      readTime: "10 min",
      href: "/academy/how-to-send-legal-notice-wrongful-termination",
    },
    {
      id: "rg-3",
      slug: "labour-commissioner-complaint-process",
      title: "Labour Commissioner Complaint Process After Termination",
      excerpt:
        "Know when a labour authority route may be relevant and how to prepare the complaint package.",
      category: "Employment",
      readTime: "10 min",
      href: "/academy/labour-commissioner-complaint-process",
    },
  ],
  cta: {
    eyebrow: "Ready to begin",
    title: "Start your Wrongful Termination workflow free",
    description:
      "Answer guided questions, generate lawyer-grade documents, and leave with a package you can review, refine, and file.",
    primaryLabel: "Start Wrongful Termination",
    primaryHref: "https://app.lawgptapp.com",
    secondaryLabel: "Explore all workflows",
    secondaryHref: "/workflows",
  },
};

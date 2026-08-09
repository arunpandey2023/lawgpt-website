import type { WorkflowPageData } from "@/types";
import { consumerComplaintAssets as assets } from "@/data/workflowPages/assets";

export const consumerComplaintPage: WorkflowPageData = {
  slug: "consumer-complaint",
  workflowId: "consumer-complaint",
  seo: {
    title: "Consumer Complaint Workflow — AI Legal Documents & Filing Package",
    description:
      "Use LawGPT’s Consumer Complaint workflow to answer guided AI questions, generate lawyer-grade notices and Consumer Commission complaints, request lawyer review, and download a complete filing package.",
    keywords: [
      "consumer complaint",
      "consumer commission",
      "defective product complaint",
      "consumer protection",
      "AI legal documents",
      "LawGPT",
    ],
  },
  hero: {
    eyebrow: "Consumer Complaint workflow",
    title: "Turn a consumer dispute into a commission-ready filing package",
    description:
      "Capture the deficiency, answer guided AI questions, generate lawyer-grade documents, request lawyer review, and download everything you need to move forward.",
    primaryCta: {
      label: "Start Consumer Complaint",
      href: "https://app.lawgptapp.com",
    },
    secondaryCta: { label: "Watch 3-minute Tutorial", href: "#hero-video" },
    image: assets.chatQuestions,
    imageAlt:
      "LawGPT Consumer Complaint workflow with guided Case Assistant questions",
  },
  problem: {
    eyebrow: "The problem",
    title: "Consumer disputes are frustrating—and easy to mishandle",
    description:
      "When a product or service fails, people struggle to document the deficiency, quantify loss, and prepare a complaint that Consumer Commissions actually expect.",
    points: [
      {
        id: "evidence",
        title: "Evidence is incomplete",
        description:
          "Invoices, warranties, chat logs, and delivery proofs rarely sit in one clear record of what went wrong.",
      },
      {
        id: "procedure",
        title: "Procedure feels opaque",
        description:
          "It is unclear whether to send a notice first, what reliefs to claim, or which Consumer Commission has jurisdiction.",
      },
      {
        id: "documents",
        title: "Drafts take too long",
        description:
          "Generic templates miss case-specific facts. Waiting for counsel for every draft slows down a problem that already cost you money.",
      },
    ],
  },
  why: {
    eyebrow: "Why LawGPT",
    title: "A software path—not another search result",
    description:
      "LawGPT runs Consumer Complaint as a productized workflow: guided intake, research context, lawyer-grade drafts, optional review, and a downloadable filing package.",
    points: [
      {
        id: "guided",
        title: "Guided AI intake",
        description:
          "Answer focused questions about the product or service, the deficiency, and your loss—so the case is structured from the start.",
      },
      {
        id: "docs",
        title: "Lawyer-grade outputs",
        description:
          "Generate a legal notice and Consumer Commission complaint drafts tailored to the facts you provide.",
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
    title: "Explore the Consumer Complaint product flow",
    description:
      "Step through real LawGPT screens—from creating the case to downloading the filing package.",
    stages: [
      {
        id: "select",
        label: "1 · Select",
        title: "Choose the workflow",
        description:
          "Create a case and select Consumer Complaint as the matching legal workflow.",
        image: assets.workflowOverview,
        imageAlt: "Create Case modal selecting Consumer Complaint workflow",
      },
      {
        id: "chat",
        label: "2 · Questions",
        title: "Answer guided AI questions",
        description:
          "Case Assistant collects the facts that matter for notices, complaints, and reliefs.",
        image: assets.chatQuestions,
        imageAlt: "Guided chat questions in Consumer Complaint case",
      },
      {
        id: "research",
        label: "3 · Research",
        title: "Review legal context",
        description:
          "See research and recommended next steps tied to your matter—not a generic chat thread.",
        image: assets.legalResearch,
        imageAlt: "Legal research panel for Consumer Complaint",
      },
      {
        id: "generate",
        label: "4 · Documents",
        title: "Generate lawyer-grade drafts",
        description:
          "Produce legal notice and Consumer Commission complaint documents from your structured answers.",
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
        imageAlt: "Lawyer review step for Consumer Complaint",
      },
      {
        id: "download",
        label: "6 · Package",
        title: "Download the filing package",
        description:
          "Export a complete package with drafts, versions, and supporting materials.",
        image: assets.downloadPackage,
        imageAlt: "Download filing package for Consumer Complaint",
      },
    ],
  },
  documents: {
    eyebrow: "Documents generated",
    title: "Lawyer-grade drafts built from your answers",
    description:
      "Consumer Complaint produces structured legal documents you can edit, version, review, and download.",
    items: [
      {
        id: "legal-notice",
        title: "Legal Notice",
        description:
          "A formal notice capturing the deficiency, your loss, and the relief you are seeking from the opposite party.",
        image: assets.legalNotice,
        imageAlt: "Generated consumer complaint legal notice in LawGPT",
      },
      {
        id: "consumer-complaint",
        title: "Consumer Commission Complaint",
        description:
          "A complaint draft prepared for Consumer Commission proceedings, aligned to your case summary.",
        image: assets.consumerComplaintDoc,
        imageAlt: "Generated Consumer Commission complaint draft",
      },
      {
        id: "case-summary",
        title: "Case Summary",
        description:
          "A structured summary of parties, timeline, and key facts used across the workflow.",
        image: assets.caseSummary,
        imageAlt: "Consumer Complaint case summary screen",
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
        description: "Select Consumer Complaint and name your matter.",
        image: assets.workflowOverview,
        imageAlt: "Create Consumer Complaint case",
      },
      {
        id: "t2",
        step: 2,
        title: "Answer guided questions",
        description: "Complete intake with Case Assistant in the workspace.",
        image: assets.chatQuestions,
        imageAlt: "Answer guided consumer complaint questions",
      },
      {
        id: "t3",
        step: 3,
        title: "Upload evidence",
        description: "Add invoices, warranties, chats, and supporting documents.",
        image: assets.documentsUpload,
        imageAlt: "Upload documents for consumer complaint",
      },
      {
        id: "t4",
        step: 4,
        title: "Generate documents",
        description: "Produce notice and complaint drafts from your structured facts.",
        image: assets.generateDocuments,
        imageAlt: "Generate consumer complaint documents",
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
        imageAlt: "Download consumer complaint filing package",
      },
    ],
  },
  authorities: {
    eyebrow: "Authorities involved",
    title: "Know where this matter can go",
    description:
      "Consumer Complaint workflows are structured with the forums commonly involved in consumer protection disputes.",
    items: [
      {
        id: "a1",
        name: "District Consumer Commission",
        role: "Primary forum for many consumer complaints within the prescribed claim value.",
      },
      {
        id: "a2",
        name: "State Consumer Commission",
        role: "Handles higher-value disputes and certain appeals from the District Commission.",
      },
      {
        id: "a3",
        name: "National Consumer Commission",
        role: "Top consumer forum for specified high-value matters and further appeals.",
      },
    ],
  },
  screenshots: {
    eyebrow: "Real product screens",
    title: "Actual LawGPT UI—not mockups",
    description:
      "Every image below is from the live Consumer Complaint workflow inside LawGPT.",
    items: [
      {
        id: "s1",
        label: "Dashboard",
        title: "Case workspace",
        description: "Start and manage consumer matters from one dashboard.",
        image: assets.dashboard,
        imageAlt: "LawGPT dashboard",
      },
      {
        id: "s2",
        label: "Chat",
        title: "Guided AI questions",
        description: "Collect deficiency and loss facts through Case Assistant.",
        image: assets.chatQuestions,
        imageAlt: "Consumer Complaint chat questions",
      },
      {
        id: "s3",
        label: "Notice",
        title: "Legal notice draft",
        description: "Edit a lawyer-grade notice generated from your answers.",
        image: assets.legalNotice,
        imageAlt: "Consumer Complaint legal notice",
      },
      {
        id: "s4",
        label: "Complaint",
        title: "Commission complaint",
        description: "Review the Consumer Commission complaint draft.",
        image: assets.consumerComplaintDoc,
        imageAlt: "Consumer Commission complaint",
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
    title: "Step through the Consumer Complaint flow",
    description:
      "Explore every major product screen—from case creation to filing package.",
    video: {
      title: "Consumer Complaint tutorial",
      description:
        "A 3-minute walkthrough of the Consumer Complaint workflow inside LawGPT.",
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
        imageAlt: "LawGPT dashboard for consumer complaint",
      },
      {
        id: "w2",
        label: "Create",
        title: "Select Consumer Complaint",
        description: "Choose the matching workflow and name the matter.",
        image: assets.workflowOverview,
        imageAlt: "Create consumer complaint case",
      },
      {
        id: "w3",
        label: "Intake",
        title: "Complete guided questions",
        description: "Answer Case Assistant prompts about the dispute and loss.",
        image: assets.chatQuestions,
        imageAlt: "Chat intake for consumer complaint",
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
        description: "Attach invoices, proofs, and other evidence to the vault.",
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
      id: "cc-faq-1",
      question: "What is the Consumer Complaint workflow?",
      answer:
        "It is a guided LawGPT workflow that helps you structure a consumer dispute, generate lawyer-grade documents, optionally request lawyer review, and download a filing package.",
    },
    {
      id: "cc-faq-2",
      question: "Which documents can LawGPT generate?",
      answer:
        "Typical outputs include a legal notice, Consumer Commission complaint draft, case summary materials, and organized package contents for download. Exact drafts depend on your answers and case facts.",
    },
    {
      id: "cc-faq-3",
      question: "Is this a substitute for a lawyer?",
      answer:
        "No. LawGPT helps you prepare structured drafts and packages. For legal advice, strategy, or representation, use lawyer review or consult independent counsel.",
    },
    {
      id: "cc-faq-4",
      question: "How long does the workflow take?",
      answer:
        "Most users can complete guided questions and generate an initial package in about 25–40 minutes, depending on how ready their facts and documents are.",
    },
    {
      id: "cc-faq-5",
      question: "Can I edit documents after they are generated?",
      answer:
        "Yes. Generated drafts can be reviewed and versioned in the workspace before lawyer review or download.",
    },
    {
      id: "cc-faq-6",
      question: "What authorities might be involved?",
      answer:
        "Depending on claim value and facts, matters may involve the District, State, or National Consumer Commission. LawGPT helps you prepare documents with those forums in mind.",
    },
  ],
  relatedGuides: [
    {
      id: "rg-1",
      slug: "consumer-complaint-complete-guide",
      title: "Consumer Complaint in India: Complete Practical Guide",
      excerpt:
        "Prepare a clear consumer complaint with evidence, remedy, and filing considerations.",
      category: "Consumer",
      readTime: "10 min",
      href: "/academy/consumer-complaint-complete-guide",
    },
    {
      id: "rg-2",
      slug: "consumer-commission-process",
      title: "Consumer Commission Process: What to Expect",
      excerpt:
        "Prepare for complaint filing, responses, evidence, hearings, and practical outcomes.",
      category: "Consumer",
      readTime: "10 min",
      href: "/academy/consumer-commission-process",
    },
    {
      id: "rg-3",
      slug: "consumer-complaint-documents-required",
      title: "Documents Required for a Consumer Complaint",
      excerpt:
        "Build an indexed proof bundle before escalating a purchase or service dispute.",
      category: "Consumer",
      readTime: "10 min",
      href: "/academy/consumer-complaint-documents-required",
    },
  ],
  cta: {
    eyebrow: "Ready to begin",
    title: "Start your Consumer Complaint workflow free",
    description:
      "Answer guided questions, generate lawyer-grade documents, and leave with a package you can review, refine, and file.",
    primaryLabel: "Start Consumer Complaint",
    primaryHref: "https://app.lawgptapp.com",
    secondaryLabel: "Explore all workflows",
    secondaryHref: "/workflows",
  },
};

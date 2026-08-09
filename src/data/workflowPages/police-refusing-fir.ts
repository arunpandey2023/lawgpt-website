import type { WorkflowPageData } from "@/types";
import { policeRefusingFirAssets as assets } from "@/data/workflowPages/assets";

export const policeRefusingFirPage: WorkflowPageData = {
  slug: "police-refusing-fir",
  workflowId: "police-refusing-fir",
  seo: {
    title: "Police Refusing FIR Workflow — Escalation Complaint & Filing Package",
    description:
      "Use LawGPT’s Police Refusing FIR workflow to answer guided AI questions, generate escalation complaints to higher police authorities, request lawyer review, and download a complete filing package.",
    keywords: [
      "police refusing FIR",
      "FIR not registered",
      "complaint to SP",
      "section 154 CrPC",
      "AI legal documents",
      "LawGPT",
    ],
  },
  hero: {
    eyebrow: "Police Refusing FIR workflow",
    title: "Turn FIR refusal into a clear escalation package",
    description:
      "Document what happened, answer guided AI questions, generate lawyer-grade escalation filings, request lawyer review, and download everything you need to move forward.",
    primaryCta: {
      label: "Start Police Refusing FIR",
      href: "https://app.lawgptapp.com",
    },
    secondaryCta: { label: "Watch 3-minute Tutorial", href: "#hero-video" },
    image: assets.chatQuestions,
    imageAlt:
      "LawGPT Police Refusing FIR workflow with guided Case Assistant questions",
  },
  problem: {
    eyebrow: "The problem",
    title: "FIR refusal leaves people stuck—and unsure what to do next",
    description:
      "When police decline to register an FIR, citizens often do not know their rights, which authority to approach, or how to put the refusal on record correctly.",
    points: [
      {
        id: "refusal",
        title: "Refusal is informal",
        description:
          "Many refusals happen verbally at the station, with no clear written record of what was reported or why registration was denied.",
      },
      {
        id: "rights",
        title: "Rights are unclear",
        description:
          "People are unsure whether they can escalate to the SP/DCP, approach a Magistrate, or what documents they need first.",
      },
      {
        id: "documents",
        title: "Drafts are hard to start",
        description:
          "Generic letters miss incident chronology, refusal facts, and the precise ask. Waiting for counsel delays urgent escalation.",
      },
    ],
  },
  why: {
    eyebrow: "Why LawGPT",
    title: "A software path—not another search result",
    description:
      "LawGPT runs Police Refusing FIR as a productized workflow: guided intake, research context, lawyer-grade drafts, optional review, and a downloadable filing package.",
    points: [
      {
        id: "guided",
        title: "Guided AI intake",
        description:
          "Answer focused questions about the incident, refusal facts, and evidence—so the case is structured from the start.",
      },
      {
        id: "docs",
        title: "Lawyer-grade outputs",
        description:
          "Generate escalation complaints—such as a complaint to the Superintendent of Police—tailored to your facts.",
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
    title: "Explore the Police Refusing FIR product flow",
    description:
      "Step through real LawGPT screens—from creating the case to downloading the filing package.",
    stages: [
      {
        id: "select",
        label: "1 · Select",
        title: "Choose the workflow",
        description:
          "Create a case and select Police Refusing FIR as the matching legal workflow.",
        image: assets.workflowOverview,
        imageAlt: "Create Case modal selecting Police Refusing FIR workflow",
      },
      {
        id: "chat",
        label: "2 · Questions",
        title: "Answer guided AI questions",
        description:
          "Case Assistant collects the facts that matter for escalation filings and next steps.",
        image: assets.chatQuestions,
        imageAlt: "Guided chat questions in Police Refusing FIR case",
      },
      {
        id: "research",
        label: "3 · Research",
        title: "Review legal context",
        description:
          "See research and recommended next steps tied to your matter—not a generic chat thread.",
        image: assets.legalResearch,
        imageAlt: "Legal research panel for Police Refusing FIR",
      },
      {
        id: "generate",
        label: "4 · Documents",
        title: "Generate lawyer-grade drafts",
        description:
          "Produce escalation complaint documents from your structured answers.",
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
        imageAlt: "Lawyer review step for Police Refusing FIR",
      },
      {
        id: "download",
        label: "6 · Package",
        title: "Download the filing package",
        description:
          "Export a complete package with drafts, versions, and supporting materials.",
        image: assets.downloadPackage,
        imageAlt: "Download filing package for Police Refusing FIR",
      },
    ],
  },
  documents: {
    eyebrow: "Documents generated",
    title: "Lawyer-grade drafts built from your answers",
    description:
      "Police Refusing FIR produces structured legal documents you can edit, version, review, and download.",
    items: [
      {
        id: "sp-complaint",
        title: "Complaint to Superintendent of Police",
        description:
          "An escalation complaint capturing the incident, refusal facts, and the request for FIR registration.",
        image: assets.spComplaint,
        imageAlt: "Generated complaint to Superintendent of Police in LawGPT",
      },
      {
        id: "generate-docs",
        title: "Escalation drafts",
        description:
          "Document generation for the escalation package aligned to your case summary and chronology.",
        image: assets.generateDocuments,
        imageAlt: "Generate Police Refusing FIR documents screen",
      },
      {
        id: "case-summary",
        title: "Case Summary",
        description:
          "A structured summary of parties, incident facts, and key dates used across the workflow.",
        image: assets.caseSummary,
        imageAlt: "Police Refusing FIR case summary screen",
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
        description: "Select Police Refusing FIR and name your matter.",
        image: assets.workflowOverview,
        imageAlt: "Create Police Refusing FIR case",
      },
      {
        id: "t2",
        step: 2,
        title: "Answer guided questions",
        description: "Complete intake with Case Assistant in the workspace.",
        image: assets.chatQuestions,
        imageAlt: "Answer guided FIR refusal questions",
      },
      {
        id: "t3",
        step: 3,
        title: "Upload evidence",
        description: "Add complaint notes, messages, and supporting documents.",
        image: assets.documentsUpload,
        imageAlt: "Upload documents for FIR refusal",
      },
      {
        id: "t4",
        step: 4,
        title: "Generate documents",
        description: "Produce escalation complaint drafts from your structured facts.",
        image: assets.generateDocuments,
        imageAlt: "Generate FIR refusal documents",
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
        imageAlt: "Download FIR refusal filing package",
      },
    ],
  },
  authorities: {
    eyebrow: "Authorities involved",
    title: "Know where this matter can go",
    description:
      "Police Refusing FIR workflows are structured with the authorities commonly involved after an FIR is not registered.",
    items: [
      {
        id: "a1",
        name: "Police Station",
        role: "First point of report—and where refusal to register an FIR typically occurs.",
      },
      {
        id: "a2",
        name: "SP / DCP Office",
        role: "Higher police authority for written escalation when the station refuses registration.",
      },
      {
        id: "a3",
        name: "Magistrate",
        role: "Judicial forum that may be approached for directions regarding investigation or registration.",
      },
    ],
  },
  screenshots: {
    eyebrow: "Real product screens",
    title: "Actual LawGPT UI—not mockups",
    description:
      "Every image below is from the live Police Refusing FIR workflow inside LawGPT.",
    items: [
      {
        id: "s1",
        label: "Dashboard",
        title: "Case workspace",
        description: "Start and manage FIR refusal matters from one dashboard.",
        image: assets.dashboard,
        imageAlt: "LawGPT dashboard",
      },
      {
        id: "s2",
        label: "Chat",
        title: "Guided AI questions",
        description: "Collect incident and refusal facts through Case Assistant.",
        image: assets.chatQuestions,
        imageAlt: "Police Refusing FIR chat questions",
      },
      {
        id: "s3",
        label: "Complaint",
        title: "SP complaint draft",
        description: "Edit a lawyer-grade escalation complaint generated from your answers.",
        image: assets.spComplaint,
        imageAlt: "Complaint to Superintendent of Police",
      },
      {
        id: "s4",
        label: "Generate",
        title: "Document generation",
        description: "Produce the drafts that feed your escalation package.",
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
    title: "Step through the Police Refusing FIR flow",
    description:
      "Explore every major product screen—from case creation to filing package.",
    video: {
      title: "Police Refusing FIR tutorial",
      description:
        "A 3-minute walkthrough of the Police Refusing FIR workflow inside LawGPT.",
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
        imageAlt: "LawGPT dashboard for FIR refusal",
      },
      {
        id: "w2",
        label: "Create",
        title: "Select Police Refusing FIR",
        description: "Choose the matching workflow and name the matter.",
        image: assets.workflowOverview,
        imageAlt: "Create Police Refusing FIR case",
      },
      {
        id: "w3",
        label: "Intake",
        title: "Complete guided questions",
        description: "Answer Case Assistant prompts about the incident and refusal.",
        image: assets.chatQuestions,
        imageAlt: "Chat intake for FIR refusal",
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
        description: "Attach notes, proofs, and other evidence to the vault.",
        image: assets.documentsUpload,
        imageAlt: "Documents upload screen",
      },
      {
        id: "w6",
        label: "Drafts",
        title: "Generate and edit drafts",
        description: "Create the SP complaint and related documents, then refine them.",
        image: assets.spComplaint,
        imageAlt: "SP complaint draft screen",
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
      id: "fir-faq-1",
      question: "What is the Police Refusing FIR workflow?",
      answer:
        "It is a guided LawGPT workflow that helps you structure an FIR refusal matter, generate lawyer-grade escalation documents, optionally request lawyer review, and download a filing package.",
    },
    {
      id: "fir-faq-2",
      question: "Which documents can LawGPT generate?",
      answer:
        "Typical outputs include a complaint to the Superintendent of Police, escalation-oriented drafts, case summary materials, and organized package contents for download. Exact drafts depend on your answers and case facts.",
    },
    {
      id: "fir-faq-3",
      question: "Is this a substitute for a lawyer?",
      answer:
        "No. LawGPT helps you prepare structured drafts and packages. For legal advice, strategy, or representation, use lawyer review or consult independent counsel.",
    },
    {
      id: "fir-faq-4",
      question: "How long does the workflow take?",
      answer:
        "Most users can complete guided questions and generate an initial package in about 20–35 minutes, depending on how ready their facts and documents are.",
    },
    {
      id: "fir-faq-5",
      question: "Can I edit documents after they are generated?",
      answer:
        "Yes. Generated drafts can be reviewed and versioned in the workspace before lawyer review or download.",
    },
    {
      id: "fir-faq-6",
      question: "What authorities might be involved?",
      answer:
        "Matters may involve the local police station, SP/DCP office for escalation, and in some cases a Magistrate. LawGPT helps you prepare documents with those pathways in mind.",
    },
  ],
  relatedGuides: [
    {
      id: "rg-1",
      slug: "police-refusing-fir-complete-guide",
      title: "Police Refusing to Register FIR: Complete Guide",
      excerpt:
        "Rights, written complaints, SP/DCP escalation, Magistrate remedies, evidence, and timelines.",
      category: "Criminal procedure",
      readTime: "12 min",
      href: "/academy/police-refusing-fir-complete-guide",
    },
    {
      id: "rg-2",
      slug: "complaint-to-superintendent-of-police",
      title: "Complaint to the Superintendent of Police",
      excerpt:
        "How to escalate FIR refusal in writing and what an SP complaint packet typically needs.",
      category: "Criminal procedure",
      readTime: "10 min",
      href: "/academy/complaint-to-superintendent-of-police",
    },
    {
      id: "rg-3",
      slug: "fir-refusal-magistrate-process",
      title: "FIR Refusal: Magistrate Process Explained",
      excerpt:
        "When and how citizens approach the Magistrate after station-level refusal.",
      category: "Criminal procedure",
      readTime: "10 min",
      href: "/academy/fir-refusal-magistrate-process",
    },
  ],
  cta: {
    eyebrow: "Ready to begin",
    title: "Start your Police Refusing FIR workflow free",
    description:
      "Answer guided questions, generate lawyer-grade documents, and leave with a package you can review, refine, and file.",
    primaryLabel: "Start Police Refusing FIR",
    primaryHref: "https://app.lawgptapp.com",
    secondaryLabel: "Explore all workflows",
    secondaryHref: "/workflows",
  },
};

import type { FaqItem, WorkflowPageScreenshot } from "@/types";
import { chequeBounceAssets as assets } from "@/data/productMedia";

export interface PlatformJourneyStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface PlatformCapability {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface PlatformAudience {
  id: string;
  label: string;
}

export interface PlatformSecurityPoint {
  id: string;
  title: string;
  description: string;
}

export interface PlatformComparisonRow {
  id: string;
  capability: string;
  google: boolean | string;
  chatgpt: boolean | string;
  traditional: boolean | string;
  lawgpt: boolean | string;
}

export const platformPage = {
  seo: {
    title: "Platform — The AI Operating System for Legal Services",
    description:
      "Understand how LawGPT works end to end: guided AI conversation, legal reasoning, research, lawyer-grade documents, lawyer review, and a complete filing package.",
    keywords: [
      "LawGPT platform",
      "AI operating system for legal services",
      "legal document generation",
      "lawyer review",
      "filing package",
      "legal AI workspace",
    ],
  },
  hero: {
    eyebrow: "Platform",
    title: "The AI Operating System for Legal Services",
    description:
      "LawGPT is an end-to-end legal platform—not a chatbot and not a template library. It guides a matter from problem to filing-ready package inside one product workspace.",
    primaryCta: { label: "Start Free", href: "https://app.lawgptapp.com" },
    secondaryCta: { label: "Explore the journey", href: "#journey" },
    image: assets.chatQuestions,
    imageAlt: "LawGPT Case Assistant guiding a legal matter in the product workspace",
  },
  journey: {
    eyebrow: "The legal journey",
    title: "From legal problem to ready to use",
    description:
      "This is the story of the platform—how LawGPT turns confusion into a structured, filing-aware outcome.",
    steps: [
      {
        id: "problem",
        step: 1,
        title: "Legal Problem",
        description:
          "A real matter starts the journey—employment, consumer, cheque bounce, FIR refusal, and more.",
      },
      {
        id: "conversation",
        step: 2,
        title: "Guided AI Conversation",
        description:
          "Case Assistant asks focused questions so the facts that matter are captured first.",
      },
      {
        id: "extraction",
        step: 3,
        title: "Context-aware Fact Extraction",
        description:
          "Answers become a structured case summary instead of a loose chat transcript.",
      },
      {
        id: "reasoning",
        step: 4,
        title: "Legal Reasoning",
        description:
          "The platform maps procedure, gaps, and next steps against the workflow you selected.",
      },
      {
        id: "research",
        step: 5,
        title: "Legal Research",
        description:
          "Relevant context and recommended actions appear beside the matter—not in a separate browser tab.",
      },
      {
        id: "documents",
        step: 6,
        title: "Lawyer-grade Documents",
        description:
          "Notices, complaints, and representations are generated as editable drafts in the workspace.",
      },
      {
        id: "review",
        step: 7,
        title: "Lawyer Review",
        description:
          "Optional human review adds professional judgment on top of AI-prepared drafts.",
      },
      {
        id: "package",
        step: 8,
        title: "Complete Filing Package",
        description:
          "Documents, versions, and supporting materials assemble into one downloadable package.",
      },
      {
        id: "ready",
        step: 9,
        title: "Ready to Use",
        description:
          "You leave with a clear package for filing, counsel handoff, or the next procedural step.",
      },
    ] satisfies PlatformJourneyStep[],
  },
  explorer: {
    eyebrow: "Interactive platform explorer",
    title: "Explore the operating system",
    description:
      "Switch between core surfaces of LawGPT. Each view updates with a real product screenshot and description.",
    stages: [
      {
        id: "guidance",
        label: "AI Guidance",
        title: "Guided AI conversation",
        description:
          "Case Assistant runs a structured interview so intake is complete, calm, and matter-specific.",
        image: assets.chatQuestions,
        imageAlt: "LawGPT guided AI chat for a legal case",
      },
      {
        id: "documents",
        label: "Document Generation",
        title: "Lawyer-grade document drafts",
        description:
          "Generate notices and complaints as editable drafts—not disposable chat replies.",
        image: assets.legalNotice,
        imageAlt: "LawGPT generated legal notice editor",
      },
      {
        id: "research",
        label: "Research",
        title: "Matter-linked legal research",
        description:
          "Research and next steps stay attached to the case you are working through.",
        image: assets.legalResearch,
        imageAlt: "LawGPT legal research panel",
      },
      {
        id: "review",
        label: "Lawyer Review",
        title: "Professional review handoff",
        description:
          "Route AI-prepared documents for lawyer review before you finalize or file.",
        image: assets.lawyerReview,
        imageAlt: "LawGPT lawyer review step",
      },
      {
        id: "filing",
        label: "Filing Package",
        title: "Complete filing package",
        description:
          "Download drafts, versions, and supporting materials as one organized package.",
        image: assets.downloadPackage,
        imageAlt: "LawGPT download filing package",
      },
    ] satisfies WorkflowPageScreenshot[],
  },
  capabilities: {
    eyebrow: "Core platform capabilities",
    title: "Everything required to move a matter forward",
    description:
      "Capabilities are connected inside one workspace—so the journey stays continuous from intake to package.",
    items: [
      {
        id: "guidance",
        title: "AI Legal Guidance",
        description:
          "A guided path through the facts, procedure, and decisions that actually matter for the case.",
        image: assets.chatQuestions,
        imageAlt: "AI legal guidance in LawGPT",
      },
      {
        id: "questioning",
        title: "Context-aware Questioning",
        description:
          "Questions adapt to the workflow and prior answers instead of starting from a blank prompt.",
        image: assets.caseSummary,
        imageAlt: "Context-aware case summary in LawGPT",
      },
      {
        id: "reasoning",
        title: "Legal Reasoning Engine",
        description:
          "The platform structures next steps, gaps, and procedural direction from your matter facts.",
        image: assets.nextSteps,
        imageAlt: "Next steps and reasoning in LawGPT",
      },
      {
        id: "documents",
        title: "Lawyer-grade Documents",
        description:
          "Produce editable legal drafts designed for real proceedings—not generic chatbot text.",
        image: assets.legalNotice,
        imageAlt: "Lawyer-grade document draft",
      },
      {
        id: "research",
        title: "Legal Research",
        description:
          "Surface relevant context beside the case so research stays usable, not scattered.",
        image: assets.legalResearch,
        imageAlt: "Legal research in LawGPT",
      },
      {
        id: "review",
        title: "Lawyer Review",
        description:
          "Add human professional judgment when the matter needs more than AI drafts alone.",
        image: assets.lawyerReview,
        imageAlt: "Lawyer review in LawGPT",
      },
      {
        id: "package",
        title: "Complete Filing Package",
        description:
          "Assemble a downloadable package ready for filing or counsel handoff.",
        image: assets.downloadPackage,
        imageAlt: "Filing package download",
      },
      {
        id: "secure",
        title: "Secure Workspace",
        description:
          "Keep sensitive case materials inside a private product workspace built for legal work.",
        image: assets.dashboard,
        imageAlt: "LawGPT secure case workspace",
      },
      {
        id: "vault",
        title: "Document Vault",
        description:
          "Upload, organize, and reuse evidence across generation, review, and package download.",
        image: assets.documentsUpload,
        imageAlt: "Document vault upload in LawGPT",
      },
      {
        id: "progress",
        title: "Case Progress Tracking",
        description:
          "See phases, completion status, and what remains before the package is ready.",
        image: assets.generateDocuments,
        imageAlt: "Case progress and document generation",
      },
    ] satisfies PlatformCapability[],
  },
  showcase: {
    eyebrow: "Real product showcase",
    title: "Opening LawGPT—not a brochure",
    description:
      "Every screen below is from the live product. This is what using the operating system looks like.",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        title: "Case workspace",
        description: "Start matters and return to progress from one calm dashboard.",
        image: assets.dashboard,
        imageAlt: "LawGPT dashboard",
      },
      {
        id: "workflow",
        label: "Workflows",
        title: "Workflow selection",
        description: "Choose the matching legal workflow when you create a case.",
        image: assets.workflowOverview,
        imageAlt: "LawGPT workflow selection",
      },
      {
        id: "chat",
        label: "AI Chat",
        title: "Guided conversation",
        description: "Answer Case Assistant questions while phases update beside you.",
        image: assets.chatQuestions,
        imageAlt: "LawGPT AI chat",
      },
      {
        id: "documents",
        label: "Documents",
        title: "Generated documents",
        description: "Edit lawyer-grade drafts directly in the workspace.",
        image: assets.legalNotice,
        imageAlt: "Generated legal document",
      },
      {
        id: "research",
        label: "Research",
        title: "Research panel",
        description: "Keep research and recommended next steps attached to the matter.",
        image: assets.legalResearch,
        imageAlt: "Research panel",
      },
      {
        id: "package",
        label: "Filing",
        title: "Filing package",
        description: "Download the complete package when the matter is ready.",
        image: assets.downloadPackage,
        imageAlt: "Filing package",
      },
    ] satisfies WorkflowPageScreenshot[],
  },
  comparison: {
    eyebrow: "Why LawGPT is different",
    title: "Search finds. Chat answers. Services advise. LawGPT executes.",
    description:
      "Information alone does not finish legal work. LawGPT is built for structured execution—from intake to filing package.",
    rows: [
      {
        id: "p1",
        capability: "Structured legal workflows",
        google: "Search results",
        chatgpt: "Conversation only",
        traditional: "Appointment-driven",
        lawgpt: true,
      },
      {
        id: "p2",
        capability: "Legal reasoning on your facts",
        google: "Manual interpretation",
        chatgpt: "Prompt-dependent",
        traditional: "Counsel-led",
        lawgpt: true,
      },
      {
        id: "p3",
        capability: "Lawyer-grade document generation",
        google: "Forms / templates",
        chatgpt: "Generic drafts",
        traditional: "Counsel drafts",
        lawgpt: true,
      },
      {
        id: "p4",
        capability: "Lawyer review handoff",
        google: false,
        chatgpt: false,
        traditional: true,
        lawgpt: true,
      },
      {
        id: "p5",
        capability: "Complete filing package",
        google: false,
        chatgpt: false,
        traditional: "Manual assembly",
        lawgpt: true,
      },
      {
        id: "p6",
        capability: "Secure case workspace",
        google: false,
        chatgpt: false,
        traditional: "Fragmented tools",
        lawgpt: true,
      },
    ] satisfies PlatformComparisonRow[],
  },
  audiences: {
    eyebrow: "Built for everyone",
    title: "One operating system, many legal realities",
    description:
      "Whether you are facing a personal dispute or preparing a business matter, LawGPT gives structure without requiring you to become a legal expert first.",
    items: [
      { id: "individuals", label: "Individuals" },
      { id: "employees", label: "Employees" },
      { id: "consumers", label: "Consumers" },
      { id: "landlords", label: "Landlords" },
      { id: "tenants", label: "Tenants" },
      { id: "founders", label: "Founders" },
      { id: "startups", label: "Startups" },
      { id: "smes", label: "SMEs" },
      { id: "legal", label: "Legal Professionals" },
    ] satisfies PlatformAudience[],
  },
  security: {
    eyebrow: "Security & privacy",
    title: "Built for sensitive legal work",
    description:
      "Case materials deserve a private workspace—not a disposable chat window.",
    points: [
      {
        id: "workspace",
        title: "Private workspaces",
        description:
          "Matters live in a dedicated case workspace so context stays organized and contained.",
      },
      {
        id: "storage",
        title: "Secure document storage",
        description:
          "Uploads and generated drafts remain inside the product vault across phases.",
      },
      {
        id: "communication",
        title: "Encrypted communication",
        description:
          "Sensitive exchanges are designed for secure transmission as part of the platform foundation.",
      },
      {
        id: "enterprise",
        title: "Future-ready enterprise architecture",
        description:
          "The system is structured to grow into stronger controls, access models, and organizational deployments.",
      },
    ] satisfies PlatformSecurityPoint[],
  },
  faq: [
    {
      id: "pf-1",
      question: "What is the LawGPT platform?",
      answer:
        "LawGPT is an AI operating system for legal services. It guides users through structured workflows, generates lawyer-grade documents, supports research, enables lawyer review, and produces a complete filing package.",
    },
    {
      id: "pf-2",
      question: "How is this different from ChatGPT?",
      answer:
        "ChatGPT converses. LawGPT executes. It runs end-to-end workflows with intake, reasoning, research context, document generation, optional lawyer review, and package download.",
    },
    {
      id: "pf-3",
      question: "Does LawGPT replace a lawyer?",
      answer:
        "No. LawGPT helps you structure a matter and prepare drafts. For advice, strategy, or representation, use lawyer review or consult independent counsel.",
    },
    {
      id: "pf-4",
      question: "What do I get at the end of a workflow?",
      answer:
        "Depending on the matter, you can leave with editable drafts, research context, optional review notes, and a downloadable filing package organized for next steps.",
    },
    {
      id: "pf-5",
      question: "Who is LawGPT for?",
      answer:
        "Individuals, employees, consumers, landlords, tenants, founders, startups, SMEs, and legal professionals who need structured legal execution—not just information.",
    },
    {
      id: "pf-6",
      question: "Is my information kept private?",
      answer:
        "Case materials are designed to stay in a private workspace with secure document storage and encrypted communication as part of the platform foundation.",
    },
  ] satisfies FaqItem[],
  cta: {
    eyebrow: "Ready when you are",
    title: "Start using the LawGPT operating system",
    description:
      "Pick a live workflow, answer guided questions, and see how LawGPT turns a legal problem into a filing-aware package.",
    primaryLabel: "Start Free",
    primaryHref: "https://app.lawgptapp.com",
    secondaryLabel: "Browse workflows",
    secondaryHref: "/workflows",
  },
} as const;

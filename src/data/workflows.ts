import type { Workflow } from "@/types";
import { chequeBounceAssets } from "@/data/productMedia";
import {
  consumerComplaintAssets,
  drunkDrivingAssets,
  policeRefusingFirAssets,
  wrongfulTerminationAssets,
} from "@/data/workflowPages/assets";

export const workflows: Workflow[] = [
  {
    id: "wrongful-termination",
    slug: "wrongful-termination",
    title: "Wrongful Termination",
    shortDescription:
      "Build a structured claim when employment was ended unlawfully.",
    description:
      "Map your employment timeline, identify legal grounds, and generate a lawyer-grade complaint package ready for review and filing.",
    documents: [
      "Legal Notice",
      "Complaint Draft",
      "Evidence Checklist",
      "Filing Cover Note",
    ],
    authorities: ["Labour Court", "Industrial Tribunal", "Labour Commissioner"],
    estimatedTime: "25–40 min",
    videoId: "vid-wrongful-termination",
    status: "live",
    href: "/workflows/wrongful-termination",
    media: {
      image: wrongfulTerminationAssets.chatQuestions,
      imageAlt: "LawGPT Wrongful Termination guided questions",
      videoSrc: wrongfulTerminationAssets.video,
      videoPoster: wrongfulTerminationAssets.videoPoster,
    },
  },
  {
    id: "salary-not-paid",
    slug: "salary-not-paid",
    title: "Salary Not Paid",
    shortDescription:
      "Recover unpaid wages with guided notices and claim documents.",
    description:
      "Capture salary history, compute dues, and produce demand notices plus claim documents tailored to your employment facts.",
    documents: [
      "Demand Notice",
      "Wage Claim Draft",
      "Computation Sheet",
      "Evidence Index",
    ],
    authorities: ["Labour Commissioner", "Labour Court"],
    estimatedTime: "20–35 min",
    videoId: "vid-salary-not-paid",
    status: "live",
    href: "/workflows/salary-not-paid",
    media: {
      image: chequeBounceAssets.dashboard,
      imageAlt: "LawGPT case workspace — start a new legal case",
    },
  },
  {
    id: "consumer-complaint",
    slug: "consumer-complaint",
    title: "Consumer Complaint",
    shortDescription:
      "File a clear consumer dispute with structured evidence and reliefs.",
    description:
      "Define the defect or deficiency, quantify loss, and generate a tribunal-ready consumer complaint with supporting annexures.",
    documents: [
      "Consumer Complaint",
      "Relief Schedule",
      "Annexure Index",
      "Notice Draft",
    ],
    authorities: ["District Consumer Commission", "State Commission"],
    estimatedTime: "25–40 min",
    videoId: "vid-consumer-complaint",
    status: "live",
    href: "/workflows/consumer-complaint",
    media: {
      image: consumerComplaintAssets.chatQuestions,
      imageAlt: "LawGPT Consumer Complaint guided questions",
      videoSrc: consumerComplaintAssets.tutorial,
      videoPoster: consumerComplaintAssets.videoPoster,
    },
  },
  {
    id: "cheque-bounce",
    slug: "cheque-bounce",
    title: "Cheque Bounce",
    shortDescription:
      "Prepare a Section 138 package with timelines and statutory notice.",
    description:
      "Track statutory deadlines, draft the mandatory notice, and assemble a complaint package aligned to cheque bounce procedure.",
    documents: [
      "Statutory Notice",
      "Complaint Draft",
      "Timeline Memo",
      "Document Checklist",
    ],
    authorities: ["Magistrate Court"],
    estimatedTime: "20–30 min",
    videoId: "vid-cheque-bounce",
    status: "live",
    href: "/workflows/cheque-bounce",
    media: {
      image: chequeBounceAssets.chatQuestions,
      imageAlt: "LawGPT Cheque Bounce guided questions",
      videoSrc: chequeBounceAssets.tutorial,
      videoPoster: chequeBounceAssets.tutorialPoster,
    },
  },
  {
    id: "police-refusing-fir",
    slug: "police-refusing-fir",
    title: "Police Refusing FIR",
    shortDescription:
      "Escalate non-registration of FIR with precise legal filings.",
    description:
      "Document refusal facts, prepare representations, and generate escalation filings for higher police or court intervention.",
    documents: [
      "Representation Letter",
      "Escalation Petition",
      "Incident Chronology",
      "Supporting Affidavit Draft",
    ],
    authorities: ["Police Station", "SP / DCP Office", "Magistrate"],
    estimatedTime: "20–35 min",
    videoId: "vid-police-refusing-fir",
    status: "live",
    href: "/workflows/police-refusing-fir",
    media: {
      image: policeRefusingFirAssets.chatQuestions,
      imageAlt: "LawGPT Police Refusing FIR guided questions",
      videoSrc: policeRefusingFirAssets.tutorial,
      videoPoster: policeRefusingFirAssets.videoPoster,
    },
  },
  {
    id: "tenant-not-vacating",
    slug: "tenant-not-vacating",
    title: "Tenant Not Vacating",
    shortDescription:
      "Move from notice to eviction-ready documentation with clarity.",
    description:
      "Capture tenancy terms, default history, and generate notices plus petition drafts for reclaiming possession.",
    documents: [
      "Vacate Notice",
      "Eviction Petition Draft",
      "Rent Ledger Summary",
      "Evidence Checklist",
    ],
    authorities: ["Civil Court", "Rent Controller"],
    estimatedTime: "25–40 min",
    videoId: "vid-tenant-not-vacating",
    status: "live",
    href: "/workflows/tenant-not-vacating",
    media: {
      image: chequeBounceAssets.dashboard,
      imageAlt: "LawGPT case workspace — start a new legal case",
    },
  },
  {
    id: "drunk-driving",
    slug: "drunk-driving",
    title: "Drunk Driving",
    shortDescription:
      "Understand charges and prepare a structured defense package.",
    description:
      "Clarify the alleged offence, collect procedural facts, and generate defense-oriented documents for lawyer review.",
    documents: [
      "Case Brief",
      "Defense Outline",
      "Procedural Checklist",
      "Hearing Prep Note",
    ],
    authorities: ["Traffic Court", "Magistrate Court"],
    estimatedTime: "20–30 min",
    videoId: "vid-drunk-driving",
    status: "live",
    href: "/workflows/drunk-driving",
    media: {
      image: drunkDrivingAssets.chatQuestions,
      imageAlt: "LawGPT Drunk Driving guided questions",
      videoSrc: drunkDrivingAssets.video,
      videoPoster: drunkDrivingAssets.videoPoster,
    },
  },
];

export const comingSoonWorkflows: Workflow[] = [
  {
    id: "property-dispute",
    slug: "property-dispute",
    title: "Property Dispute",
    shortDescription: "Title conflicts, boundary issues, and possession claims.",
    description: "Coming soon — structured workflows for property disputes.",
    documents: [],
    authorities: [],
    estimatedTime: "—",
    status: "coming-soon",
    href: "/workflows",
  },
  {
    id: "divorce-petition",
    slug: "divorce-petition",
    title: "Divorce Petition",
    shortDescription: "Guided matrimonial filings with document packs.",
    description: "Coming soon — guided divorce petition workflows.",
    documents: [],
    authorities: [],
    estimatedTime: "—",
    status: "coming-soon",
    href: "/workflows",
  },
  {
    id: "cyber-fraud",
    slug: "cyber-fraud",
    title: "Cyber Fraud",
    shortDescription: "Report and escalate online financial fraud cases.",
    description: "Coming soon — cyber fraud complaint and escalation packs.",
    documents: [],
    authorities: [],
    estimatedTime: "—",
    status: "coming-soon",
    href: "/workflows",
  },
];

export function getWorkflowBySlug(slug: string): Workflow | undefined {
  return workflows.find((w) => w.slug === slug);
}

export function getLiveWorkflows(): Workflow[] {
  return workflows.filter((w) => w.status === "live");
}

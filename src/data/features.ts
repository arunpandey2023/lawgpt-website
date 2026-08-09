import type { Feature } from "@/types";

export const features: Feature[] = [
  {
    id: "ai-guidance",
    title: "AI Guidance",
    description:
      "Answer focused questions that clarify facts, jurisdiction, and next steps—without legal jargon getting in the way.",
    icon: "guidance",
  },
  {
    id: "lawyer-grade-docs",
    title: "Lawyer-grade Documents",
    description:
      "Generate structured notices, petitions, and checklists designed for real proceedings—not generic chat replies.",
    icon: "documents",
  },
  {
    id: "research",
    title: "Legal Research",
    description:
      "Surface relevant provisions and procedural context tied to your specific workflow and facts.",
    icon: "research",
  },
  {
    id: "lawyer-review",
    title: "Lawyer Review",
    description:
      "Route your package for professional review so human judgment sits on top of AI-generated drafts.",
    icon: "review",
  },
  {
    id: "filing-package",
    title: "Filing Package",
    description:
      "Download a complete, organized set of documents ready for filing or counsel handoff.",
    icon: "filing",
  },
  {
    id: "secure-workspace",
    title: "Secure Workspace",
    description:
      "Keep case materials in a private workspace built for sensitive legal information.",
    icon: "secure",
  },
];

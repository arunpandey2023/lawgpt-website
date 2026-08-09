import type { HowItWorksStep } from "@/types";

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: "questions",
    step: 1,
    title: "Answer Questions",
    description:
      "A guided intake captures the facts that matter for your specific legal problem.",
  },
  {
    id: "analysis",
    step: 2,
    title: "AI Analysis",
    description:
      "LawGPT structures your matter, flags gaps, and maps the procedural path ahead.",
  },
  {
    id: "research",
    step: 3,
    title: "Legal Research",
    description:
      "Relevant provisions and context are surfaced against your workflow and facts.",
  },
  {
    id: "documents",
    step: 4,
    title: "Lawyer-grade Documents",
    description:
      "Notices, petitions, and checklists are generated in a consistent, filing-aware format.",
  },
  {
    id: "review",
    step: 5,
    title: "Lawyer Review",
    description:
      "Optional human review adds professional judgment on top of AI drafts.",
  },
  {
    id: "filing",
    step: 6,
    title: "Filing Package",
    description:
      "Download a complete, organized package ready for filing or counsel handoff.",
  },
];

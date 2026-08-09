import type { ShowcaseItem } from "@/types";
import { chequeBounceAssets } from "@/data/productMedia";

export const showcaseItems: ShowcaseItem[] = [
  {
    id: "dashboard",
    title: "Case workspace",
    description:
      "Start a matter, track every case, and jump back into progress from one calm dashboard.",
    label: "Dashboard",
    image: chequeBounceAssets.dashboard,
    imageAlt: "LawGPT dashboard with case workspace",
  },
  {
    id: "chat",
    title: "Guided AI conversation",
    description:
      "Answer workflow questions in Case Assistant while phases and progress update beside you.",
    label: "AI Chat",
    image: chequeBounceAssets.chatQuestions,
    imageAlt: "LawGPT guided chat questions for cheque bounce",
  },
  {
    id: "documents",
    title: "Generated legal documents",
    description:
      "Edit lawyer-grade drafts like a Section 138 Demand Notice directly in the workspace.",
    label: "Documents",
    image: chequeBounceAssets.legalNotice,
    imageAlt: "LawGPT generated Section 138 legal notice",
  },
  {
    id: "research",
    title: "Research in context",
    description:
      "Surface relevant context and next steps tied to the matter you are working through.",
    label: "Research",
    image: chequeBounceAssets.legalResearch,
    imageAlt: "LawGPT legal research panel",
  },
  {
    id: "filing",
    title: "Filing package",
    description:
      "Download generated documents, versions, and evidence as one filing-ready package.",
    label: "Filing",
    image: chequeBounceAssets.downloadPackage,
    imageAlt: "LawGPT download filing package step",
  },
];

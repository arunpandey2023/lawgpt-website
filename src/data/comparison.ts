import type { ComparisonRow } from "@/types";

export const comparisonRows: ComparisonRow[] = [
  {
    id: "c1",
    capability: "End-to-end workflow execution",
    google: "Search results",
    chatgpt: "Conversation only",
    lawgpt: true,
  },
  {
    id: "c2",
    capability: "Guided legal intake",
    google: false,
    chatgpt: "Ad-hoc prompts",
    lawgpt: true,
  },
  {
    id: "c3",
    capability: "Lawyer-grade document generation",
    google: "Templates / forms",
    chatgpt: "Generic drafts",
    lawgpt: true,
  },
  {
    id: "c4",
    capability: "Matter-linked research context",
    google: "Manual searching",
    chatgpt: "Prompt-dependent",
    lawgpt: true,
  },
  {
    id: "c5",
    capability: "Lawyer review handoff",
    google: false,
    chatgpt: false,
    lawgpt: true,
  },
  {
    id: "c6",
    capability: "Complete filing package",
    google: false,
    chatgpt: false,
    lawgpt: true,
  },
];

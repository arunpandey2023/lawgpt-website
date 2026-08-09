import type { FaqItem } from "@/types";

export const faqItems: FaqItem[] = [
  {
    id: "what-is-lawgpt",
    question: "What is LawGPT?",
    answer:
      "LawGPT is an AI operating system for legal services. It guides you through structured workflows, generates lawyer-grade documents, supports research, and can route packages for lawyer review and filing.",
  },
  {
    id: "is-this-legal-advice",
    question: "Is LawGPT a substitute for a lawyer?",
    answer:
      "No. LawGPT helps you understand your problem and produce structured drafts. For advice, strategy, or court representation, use lawyer review or consult independent counsel.",
  },
  {
    id: "which-workflows",
    question: "Which problems can I solve today?",
    answer:
      "The MVP supports Wrongful Termination, Salary Not Paid, Consumer Complaint, Cheque Bounce, Police Refusing FIR, Tenant Not Vacating, and Drunk Driving. Additional workflows are marked Coming Soon.",
  },
  {
    id: "documents",
    question: "What documents does LawGPT generate?",
    answer:
      "Depending on the workflow, LawGPT generates notices, complaints, checklists, chronologies, computation sheets, and filing cover materials organized into a downloadable package.",
  },
  {
    id: "security",
    question: "How is my information protected?",
    answer:
      "Case materials stay in a private workspace designed for sensitive legal information. Access controls and secure transmission are part of the platform foundation.",
  },
  {
    id: "vs-chatgpt",
    question: "How is this different from ChatGPT?",
    answer:
      "General chat tools answer questions. LawGPT runs end-to-end legal workflows—structured intake, research context, document generation, optional lawyer review, and filing packages.",
  },
];

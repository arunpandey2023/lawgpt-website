/** Real product media currently available (Cheque Bounce workflow pack). */
export const chequeBounceAssets = {
  basePath: "/assets/workflows/cheque-bounce",
  dashboard: "/assets/workflows/cheque-bounce/dashboard.png",
  workflowOverview: "/assets/workflows/cheque-bounce/workflow-overview.png",
  chatQuestions: "/assets/workflows/cheque-bounce/chat-questions.png",
  caseSummary: "/assets/workflows/cheque-bounce/case-summary.png",
  nextSteps: "/assets/workflows/cheque-bounce/next-steps.png",
  documentsUpload: "/assets/workflows/cheque-bounce/documents-upload.png",
  legalResearch: "/assets/workflows/cheque-bounce/legal-research.png",
  generateDocuments: "/assets/workflows/cheque-bounce/generate-documents.png",
  legalNotice: "/assets/workflows/cheque-bounce/legal-notice.png",
  lawyerReview: "/assets/workflows/cheque-bounce/lawyer-review.png",
  downloadPackage: "/assets/workflows/cheque-bounce/download-package.png",
  video: "/assets/workflows/cheque-bounce/preview.mp4",
  tutorial: "/assets/workflows/cheque-bounce/tutorial.mp4",
  videoPoster: "/assets/workflows/cheque-bounce/chat-questions.png",
  tutorialPoster: "/assets/workflows/cheque-bounce/workflow-overview.png",
} as const;

export const heroShowcaseSlides = [
  {
    id: "select",
    label: "Workflow selection",
    caption: "Choose a guided legal workflow",
    src: chequeBounceAssets.workflowOverview,
  },
  {
    id: "chat",
    label: "Guided AI questions",
    caption: "Answer focused questions in Case Assistant",
    src: chequeBounceAssets.chatQuestions,
  },
  {
    id: "document",
    label: "Lawyer-grade document",
    caption: "Section 138 Demand Notice, ready to edit",
    src: chequeBounceAssets.legalNotice,
  },
  {
    id: "review",
    label: "Lawyer review",
    caption: "Hand off AI-prepared documents for review",
    src: chequeBounceAssets.lawyerReview,
  },
  {
    id: "package",
    label: "Filing package",
    caption: "Download a complete filing-ready zip",
    src: chequeBounceAssets.downloadPackage,
  },
] as const;

export const productDemo = {
  title: "See LawGPT in 30 seconds",
  description:
    "Watch a real Cheque Bounce workflow—from guided questions to a filing package—without leaving the site.",
  src: chequeBounceAssets.video,
  poster: chequeBounceAssets.videoPoster,
  workflowLabel: "Cheque Bounce",
} as const;

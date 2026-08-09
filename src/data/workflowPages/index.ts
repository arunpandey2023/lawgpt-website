import type { WorkflowPageData } from "@/types";
import { chequeBouncePage } from "@/data/workflowPages/cheque-bounce";
import { consumerComplaintPage } from "@/data/workflowPages/consumer-complaint";
import { drunkDrivingPage } from "@/data/workflowPages/drunk-driving";
import { policeRefusingFirPage } from "@/data/workflowPages/police-refusing-fir";
import { wrongfulTerminationPage } from "@/data/workflowPages/wrongful-termination";

const workflowPages: Record<string, WorkflowPageData> = {
  [wrongfulTerminationPage.slug]: wrongfulTerminationPage,
  [consumerComplaintPage.slug]: consumerComplaintPage,
  [chequeBouncePage.slug]: chequeBouncePage,
  [policeRefusingFirPage.slug]: policeRefusingFirPage,
  [drunkDrivingPage.slug]: drunkDrivingPage,
};

export function getWorkflowPage(slug: string): WorkflowPageData | undefined {
  return workflowPages[slug];
}

export function getAllWorkflowPageSlugs(): string[] {
  return Object.keys(workflowPages);
}

export {
  wrongfulTerminationPage,
  consumerComplaintPage,
  chequeBouncePage,
  policeRefusingFirPage,
  drunkDrivingPage,
};

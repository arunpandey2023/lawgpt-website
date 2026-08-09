import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkflowJsonLd } from "@/components/seo/WorkflowJsonLd";
import { WorkflowLandingPage } from "@/components/workflows/WorkflowLandingPage";
import { getWorkflowPage } from "@/data/workflowPages";
import { buildWorkflowPageMetadata } from "@/lib/seo";

const SLUG = "police-refusing-fir";

export function generateMetadata(): Metadata {
  const page = getWorkflowPage(SLUG);
  if (!page) return {};
  return buildWorkflowPageMetadata(page);
}

export default function PoliceRefusingFirPage() {
  const page = getWorkflowPage(SLUG);
  if (!page) notFound();

  return (
    <>
      <WorkflowJsonLd page={page} />
      <WorkflowLandingPage page={page} />
    </>
  );
}

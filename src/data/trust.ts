import type { TrustCapability } from "@/types";

/** Capability signals only — no invented customers, awards, or stats. */
export const trustCapabilities: TrustCapability[] = [
  { id: "docs", label: "Lawyer-grade Documents" },
  { id: "workflows", label: "Guided AI Workflows" },
  { id: "review", label: "Lawyer Review" },
  { id: "filing", label: "Filing Package" },
  { id: "secure", label: "Secure Workspace" },
];

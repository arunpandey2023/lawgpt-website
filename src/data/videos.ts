import type { Video } from "@/types";
import { chequeBounceAssets } from "@/data/productMedia";
import {
  consumerComplaintAssets,
  drunkDrivingAssets,
  policeRefusingFirAssets,
  wrongfulTerminationAssets,
} from "@/data/workflowPages/assets";

export const videos: Video[] = [
  {
    id: "vid-wrongful-termination",
    title: "Wrongful Termination — 30s",
    description: "See how LawGPT structures an employment termination claim.",
    duration: "0:30",
    type: "short",
    workflowSlug: "wrongful-termination",
    thumbnailLabel: "Wrongful Termination",
    src: wrongfulTerminationAssets.video,
    poster: wrongfulTerminationAssets.videoPoster,
  },
  {
    id: "vid-salary-not-paid",
    title: "Salary Not Paid — 30s",
    description: "Recover unpaid wages with guided document generation.",
    duration: "0:30",
    type: "short",
    workflowSlug: "salary-not-paid",
    thumbnailLabel: "Salary Not Paid",
  },
  {
    id: "vid-consumer-complaint",
    title: "Consumer Complaint Tutorial",
    description: "A 3-minute walkthrough of the Consumer Complaint workflow.",
    duration: "3:00",
    type: "walkthrough",
    workflowSlug: "consumer-complaint",
    thumbnailLabel: "Consumer Complaint",
    src: consumerComplaintAssets.tutorial,
    poster: consumerComplaintAssets.tutorialPoster,
  },
  {
    id: "vid-cheque-bounce",
    title: "Cheque Bounce — 30s",
    description: "Statutory notice and complaint flow for Section 138.",
    duration: "0:30",
    type: "short",
    workflowSlug: "cheque-bounce",
    thumbnailLabel: "Cheque Bounce",
    src: chequeBounceAssets.video,
    poster: chequeBounceAssets.videoPoster,
  },
  {
    id: "walkthrough-cheque-bounce",
    title: "Cheque Bounce Tutorial",
    description:
      "A 3-minute walkthrough of the Cheque Bounce workflow inside LawGPT.",
    duration: "3:00",
    type: "walkthrough",
    workflowSlug: "cheque-bounce",
    thumbnailLabel: "Cheque Bounce",
    src: chequeBounceAssets.tutorial,
    poster: chequeBounceAssets.tutorialPoster,
  },
  {
    id: "vid-police-refusing-fir",
    title: "Police Refusing FIR Tutorial",
    description:
      "A 3-minute walkthrough of the Police Refusing FIR workflow inside LawGPT.",
    duration: "3:00",
    type: "walkthrough",
    workflowSlug: "police-refusing-fir",
    thumbnailLabel: "Police Refusing FIR",
    src: policeRefusingFirAssets.tutorial,
    poster: policeRefusingFirAssets.tutorialPoster,
  },
  {
    id: "vid-tenant-not-vacating",
    title: "Tenant Not Vacating — 30s",
    description: "From vacate notice to eviction-ready documentation.",
    duration: "0:30",
    type: "short",
    workflowSlug: "tenant-not-vacating",
    thumbnailLabel: "Tenant Not Vacating",
  },
  {
    id: "vid-drunk-driving",
    title: "Drunk Driving — 30s",
    description: "Structure a defense package for drunk driving charges.",
    duration: "0:30",
    type: "short",
    workflowSlug: "drunk-driving",
    thumbnailLabel: "Drunk Driving",
    src: drunkDrivingAssets.video,
    poster: drunkDrivingAssets.videoPoster,
  },
  {
    id: "walkthrough-wrongful-termination",
    title: "Wrongful Termination Tutorial",
    description:
      "A 3-minute walkthrough of the Wrongful Termination workflow inside LawGPT.",
    duration: "3:00",
    type: "walkthrough",
    workflowSlug: "wrongful-termination",
    thumbnailLabel: "Wrongful Termination",
    src: wrongfulTerminationAssets.tutorial,
    poster: wrongfulTerminationAssets.tutorialPoster,
  },
  {
    id: "walkthrough-platform",
    title: "Platform Overview",
    description: "A full tour of the LawGPT operating system.",
    duration: "3:00",
    type: "walkthrough",
    thumbnailLabel: "Platform Overview",
  },
  {
    id: "walkthrough-documents",
    title: "Document Generation",
    description: "How lawyer-grade documents are produced from your answers.",
    duration: "3:00",
    type: "walkthrough",
    thumbnailLabel: "Documents",
  },
  {
    id: "walkthrough-review",
    title: "Lawyer Review Flow",
    description: "Hand off generated packages for professional review.",
    duration: "3:00",
    type: "walkthrough",
    thumbnailLabel: "Lawyer Review",
  },
  {
    id: "walkthrough-filing",
    title: "Filing Package",
    description: "Assemble and download a complete filing-ready package.",
    duration: "3:00",
    type: "walkthrough",
    thumbnailLabel: "Filing Package",
  },
];

export function getVideoById(id: string): Video | undefined {
  return videos.find((v) => v.id === id);
}

export function getShortVideos(): Video[] {
  return videos.filter((v) => v.type === "short");
}

export function getWalkthroughVideos(): Video[] {
  return videos.filter((v) => v.type === "walkthrough");
}

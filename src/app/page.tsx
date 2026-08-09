import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { HeroDemo } from "@/components/home/HeroDemo";
import {
  HomeGuidesPreview,
  HomePlatformPreview,
  HomePricingPreview,
} from "@/components/home/HomePreviews";
import { TrustedBy } from "@/components/home/TrustedBy";
import { WhyLawGPT } from "@/components/home/WhyLawGPT";
import { WhyNotChatGPT } from "@/components/home/WhyNotChatGPT";
import { WorkflowCards } from "@/components/home/WorkflowCards";
import { WorkflowExplorer } from "@/components/home/WorkflowExplorer";
import { HomeJsonLd } from "@/components/seo/HomeJsonLd";
import { siteConfig } from "@/data/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
  keywords: [
    "LawGPT",
    "AI legal workflows",
    "legal document generation India",
    "Lawyer Review+",
    "AI Operating System for Legal Services",
  ],
  card: "summary",
});

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <Hero />
      <HeroDemo />
      <TrustedBy />
      <WorkflowExplorer />
      <WorkflowCards />
      <WhyLawGPT />
      <WhyNotChatGPT />
      <HomePlatformPreview />
      <HomeGuidesPreview />
      <HomePricingPreview />
      <FinalCta />
    </>
  );
}

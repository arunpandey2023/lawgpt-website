import type { Metadata } from "next";
import { PricingLandingPage } from "@/components/pricing/PricingLandingPage";
import { PricingJsonLd } from "@/components/seo/PricingJsonLd";
import { pricingPage } from "@/data/pricing";
import { buildPageMetadata } from "@/lib/seo";

const page = pricingPage;

export const metadata: Metadata = buildPageMetadata({
  title: page.seo.title,
  description: page.seo.description,
  path: "/pricing",
  keywords: [...page.seo.keywords],
});

export default function PricingRoutePage() {
  return (
    <>
      <PricingJsonLd />
      <PricingLandingPage />
    </>
  );
}

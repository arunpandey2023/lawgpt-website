import type { Metadata } from "next";
import { PlatformLandingPage } from "@/components/platform/PlatformLandingPage";
import { PlatformJsonLd } from "@/components/seo/PlatformJsonLd";
import { platformPage } from "@/data/platform";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: platformPage.seo.title,
  description: platformPage.seo.description,
  path: "/platform",
  keywords: [...platformPage.seo.keywords],
  ogImage: {
    url: platformPage.hero.image,
    alt: platformPage.hero.imageAlt,
  },
  card: "summary_large_image",
});

export default function PlatformPage() {
  return (
    <>
      <PlatformJsonLd />
      <PlatformLandingPage />
    </>
  );
}

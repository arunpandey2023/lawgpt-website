import type { Metadata } from "next";
import { GuidesLandingPage } from "@/components/guides/GuidesLandingPage";
import { siteConfig } from "@/data/site";
import { allGuides } from "@/data/guides";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const title = "Legal Guides — Practical Indian Law Explainers";
const description =
  "LawGPT Legal Guides: authoritative explainers on wrongful termination, consumer complaints, cheque bounce, FIR refusal, and drunk driving—linked to real LawGPT workflows.";
const url = absoluteUrl("/academy");

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: "/academy",
  keywords: [
    "legal guides India",
    "wrongful termination guide",
    "consumer complaint guide",
    "cheque bounce Section 138",
    "police refusing FIR",
    "drunk driving laws India",
    "LawGPT Academy",
  ],
  ogImage: {
    url: "/assets/workflows/cheque-bounce/legal-research.png",
    alt: "LawGPT Legal Guides",
  },
  card: "summary_large_image",
});

export default function AcademyPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allGuides.slice(0, 20).map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/academy/${guide.slug}`,
        name: guide.title,
      })),
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Legal Guides",
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <GuidesLandingPage />
    </>
  );
}

import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { siteConfig } from "@/data/site";
import { brandSocialImage, withBrandSocialImages } from "@/lib/seo";
import type { LegalDocument } from "@/types/legal";

export function buildLegalMetadata(document: LegalDocument): Metadata {
  const url = `${siteConfig.url}/${document.slug}`;

  return withBrandSocialImages({
    title: document.seo.title,
    description: document.seo.description,
    keywords: [...document.seo.keywords],
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: document.seo.title,
      description: document.seo.description,
      url,
      siteName: siteConfig.name,
      type: "article",
      images: [brandSocialImage],
    },
    twitter: {
      card: "summary",
      title: document.seo.title,
      description: document.seo.description,
      images: [siteConfig.brand.ogImage],
    },
  });
}

export function LegalJsonLd({ document }: { document: LegalDocument }) {
  const url = `${siteConfig.url}/${document.slug}`;

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
        name: document.shortTitle,
        item: url,
      },
    ],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: document.title,
    description: document.seo.description,
    url,
    dateModified: document.lastUpdated,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
    </>
  );
}

export function LegalRoute({ document }: { document: LegalDocument }) {
  return (
    <>
      <LegalJsonLd document={document} />
      <LegalDocumentPage document={document} />
    </>
  );
}

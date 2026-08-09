import { siteConfig } from "@/data/site";
import type { WorkflowPageData } from "@/types";

interface WorkflowJsonLdProps {
  page: WorkflowPageData;
}

export function WorkflowJsonLd({ page }: WorkflowJsonLdProps) {
  const pageUrl = `${siteConfig.url}/workflows/${page.slug}`;

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
        name: "Workflows",
        item: `${siteConfig.url}/workflows`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.hero.eyebrow.replace(" workflow", ""),
        item: pageUrl,
      },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `LawGPT — ${page.hero.eyebrow.replace(" workflow", "")}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: page.seo.description,
    url: pageUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      description: "Start free with guided workflow access",
    },
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const schemas = [breadcrumb, faq, software];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

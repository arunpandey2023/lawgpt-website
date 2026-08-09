import { siteConfig } from "@/data/site";
import { platformPage } from "@/data/platform";

export function PlatformJsonLd() {
  const pageUrl = `${siteConfig.url}/platform`;

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
        name: "Platform",
        item: pageUrl,
      },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: platformPage.faq.map((item) => ({
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
    name: "LawGPT",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: platformPage.seo.description,
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

  return (
    <>
      {[breadcrumb, faq, software].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

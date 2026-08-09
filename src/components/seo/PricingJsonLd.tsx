import { siteConfig } from "@/data/site";
import { lawyerReviewAddon, pricingPage, pricingPlans } from "@/data/pricing";

export function PricingJsonLd() {
  const page = pricingPage;
  const pageUrl = `${siteConfig.url}/pricing`;
  const pro = pricingPlans.find((plan) => plan.id === "pro");

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
        name: "Pricing",
        item: pageUrl,
      },
    ],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.seo.title,
    description: page.seo.description,
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const offers = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: page.seo.description,
    url: pageUrl,
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        description: pricingPlans[0]?.description,
        price: "0",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: pricingPlans[0]?.ctaHref,
      },
      {
        "@type": "Offer",
        name: "Pro Monthly",
        description: pro?.description,
        price: "999",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: pro?.ctaHref,
      },
      {
        "@type": "Offer",
        name: "Pro Annual",
        description: pro?.description,
        price: "7999",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: pro?.ctaHref,
      },
      ...lawyerReviewAddon.services.map((service) => ({
        "@type": "Offer",
        name: service.name,
        description: lawyerReviewAddon.note,
        category: "Lawyer Review+",
        availability: "https://schema.org/InStock",
        url: lawyerReviewAddon.cta.href,
      })),
    ],
  };

  const schemas = [breadcrumb, webPage, faq, offers];

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

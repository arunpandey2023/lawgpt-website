import type { Metadata } from "next";
import { ContactLandingPage } from "@/components/contact/ContactLandingPage";
import { contactPage } from "@/data/contact";
import { siteConfig } from "@/data/site";
import {
  absoluteUrl,
  buildPageMetadata,
  organizationSchema,
} from "@/lib/seo";

const page = contactPage;

export const metadata: Metadata = buildPageMetadata({
  title: page.seo.title,
  description: page.seo.description,
  path: "/contact",
  keywords: [...page.seo.keywords],
});

export default function ContactRoutePage() {
  const url = absoluteUrl("/contact");

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
        name: "Contact",
        item: url,
      },
    ],
  };

  const organization = organizationSchema();

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: page.seo.title,
    description: page.seo.description,
    url,
    mainEntity: organization,
  };

  const faqSchema = {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ContactLandingPage />
    </>
  );
}

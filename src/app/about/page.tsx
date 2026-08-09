import type { Metadata } from "next";
import { AboutLandingPage } from "@/components/about/AboutLandingPage";
import { aboutPage } from "@/data/about";
import { siteConfig } from "@/data/site";
import {
  absoluteUrl,
  buildPageMetadata,
  organizationSchema,
} from "@/lib/seo";

const page = aboutPage;

export const metadata: Metadata = buildPageMetadata({
  title: page.seo.title,
  description: page.seo.description,
  path: "/about",
  keywords: [...page.seo.keywords],
});

export default function AboutRoutePage() {
  const url = absoluteUrl("/about");

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
        name: "About",
        item: url,
      },
    ],
  };

  const organization = {
    ...organizationSchema(),
    description: page.mission.paragraphs[0],
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: page.seo.title,
    description: page.seo.description,
    url,
    mainEntity: organization,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutLandingPage />
    </>
  );
}

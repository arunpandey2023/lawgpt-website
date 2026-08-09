import type { Metadata } from "next";
import { contactPublic } from "@/data/contact";
import { siteConfig } from "@/data/site";

export const brandSocialImage = {
  url: siteConfig.brand.ogImage,
  width: 512,
  height: 512,
  alt: siteConfig.name,
} as const;

export const indexableRobots: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

/** Use while SITE_LAUNCHED is not true so gated pages are not indexed. */
export const noindexRobots: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
};

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return siteConfig.url;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

interface BuildPageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** Absolute title (skip layout template). */
  absoluteTitle?: boolean;
  ogImage?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  type?: "website" | "article";
  card?: "summary" | "summary_large_image";
  robots?: Metadata["robots"];
}

/** Canonical + robots + Open Graph + Twitter for any route. */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  absoluteTitle = false,
  ogImage,
  type = "website",
  card,
  robots = indexableRobots,
}: BuildPageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const image = ogImage ?? brandSocialImage;
  const twitterCard =
    card ?? (ogImage ? "summary_large_image" : "summary");

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url },
    robots,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      images: [image],
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [image.url],
    },
  };
}

/** Default social images when a page has no dedicated cover art. */
export function withBrandSocialImages(
  metadata: Metadata,
  card: "summary" | "summary_large_image" = "summary",
): Metadata {
  return {
    ...metadata,
    robots: metadata.robots ?? indexableRobots,
    openGraph: {
      ...metadata.openGraph,
      images:
        metadata.openGraph &&
        "images" in metadata.openGraph &&
        metadata.openGraph.images
          ? metadata.openGraph.images
          : [brandSocialImage],
    },
    twitter: {
      card,
      ...metadata.twitter,
      images:
        metadata.twitter &&
        "images" in metadata.twitter &&
        metadata.twitter.images
          ? metadata.twitter.images
          : [siteConfig.brand.ogImage],
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: contactPublic.companyName,
    legalName: contactPublic.companyName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.brand.logo),
    image: absoluteUrl(siteConfig.brand.ogImage),
    description: siteConfig.description,
    email: contactPublic.generalEmail,
    telephone: contactPublic.phones,
    address: {
      "@type": "PostalAddress",
      streetAddress: "L-148, Sector-6, HSR Layout",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560102",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: contactPublic.supportEmail,
        telephone: contactPublic.phones[0],
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: contactPublic.generalEmail,
        telephone: contactPublic.phones[0],
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: contactPublic.companyName,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/academy?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function softwareApplicationSchema(overrides?: {
  name?: string;
  description?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: overrides?.name ?? siteConfig.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "LegalTech",
    operatingSystem: "Web",
    description: overrides?.description ?? siteConfig.description,
    url: overrides?.url ?? siteConfig.url,
    image: absoluteUrl(siteConfig.brand.logo),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      description: "Start free with guided workflow access",
    },
    provider: {
      "@type": "Organization",
      name: contactPublic.companyName,
      url: siteConfig.url,
    },
  };
}

export function buildWorkflowPageMetadata(page: {
  slug: string;
  seo: { title: string; description: string; keywords: readonly string[] };
  hero: { image: string; imageAlt: string };
}): Metadata {
  return buildPageMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: `/workflows/${page.slug}`,
    keywords: [...page.seo.keywords],
    ogImage: {
      url: page.hero.image,
      alt: page.hero.imageAlt,
    },
    card: "summary_large_image",
  });
}

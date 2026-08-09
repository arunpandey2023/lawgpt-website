import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SearchProvider } from "@/components/search/SearchProvider";
import { siteConfig } from "@/data/site";
import { isSiteLaunched } from "@/lib/launch/config";
import { indexableRobots, noindexRobots } from "@/lib/seo";
import "./globals.css";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1769ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export function generateMetadata(): Metadata {
  return {
    title: {
      default: `${siteConfig.name} — ${siteConfig.tagline}`,
      template: `%s · ${siteConfig.name}`,
    },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "legal technology",
    robots: isSiteLaunched() ? indexableRobots : noindexRobots,
    icons: {
      icon: [
        { url: "/icon.png", type: "image/png", sizes: "512x512" },
        { url: siteConfig.brand.logo, type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "512x512" }],
      shortcut: siteConfig.brand.logo,
    },
    manifest: "/site.webmanifest",
    appleWebApp: {
      capable: true,
      title: siteConfig.name,
      statusBarStyle: "default",
    },
    openGraph: {
      title: `${siteConfig.name} — ${siteConfig.tagline}`,
      description: siteConfig.description,
      type: "website",
      siteName: siteConfig.name,
      url: siteConfig.url,
      locale: "en_IN",
      images: [
        {
          url: siteConfig.brand.ogImage,
          width: 512,
          height: 512,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${siteConfig.name} — ${siteConfig.tagline}`,
      description: siteConfig.description,
      images: [siteConfig.brand.ogImage],
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const headerStore = await headers();
  const isComingSoonShell = headerStore.get("x-lawgpt-coming-soon") === "1";

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <SearchProvider>
          {!isComingSoonShell && <Navbar />}
          <main className="flex flex-1 flex-col">{children}</main>
          {!isComingSoonShell && <Footer />}
        </SearchProvider>
      </body>
      {gaMeasurementId ? <GoogleAnalytics gaId={gaMeasurementId} /> : null}
    </html>
  );
}

import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/launch/ComingSoonPage";
import { launchPage } from "@/lib/launch/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: launchPage.seo.title,
    description: launchPage.seo.description,
    path: "/coming-soon",
    absoluteTitle: true,
  }),
  robots: {
    index: false,
    follow: true,
  },
};

export default function ComingSoonRoutePage() {
  return <ComingSoonPage />;
}

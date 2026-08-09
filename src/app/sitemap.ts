import type { MetadataRoute } from "next";
import { allGuides } from "@/data/guides";
import { siteConfig } from "@/data/site";
import { getAllWorkflowPageSlugs } from "@/data/workflowPages";
import { isSiteLaunched } from "@/lib/launch/config";

const staticRoutes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/platform", changeFrequency: "weekly", priority: 0.9 },
  { path: "/workflows", changeFrequency: "weekly", priority: 0.9 },
  { path: "/academy", changeFrequency: "weekly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "weekly", priority: 0.85 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.4 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.4 },
  { path: "/disclaimer", changeFrequency: "yearly", priority: 0.4 },
];

/** Pre-launch: only list routes that remain publicly reachable. */
const preLaunchRoutes = [
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly" as const, priority: 0.2 },
  { path: "/disclaimer", changeFrequency: "yearly" as const, priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  if (!isSiteLaunched()) {
    return preLaunchRoutes.map((route) => ({
      url: `${siteConfig.url}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));
  }

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path === "/" ? "" : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const workflowEntries: MetadataRoute.Sitemap = getAllWorkflowPageSlugs().map(
    (slug) => ({
      url: `${siteConfig.url}/workflows/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    }),
  );

  const guideEntries: MetadataRoute.Sitemap = allGuides.map((guide) => ({
    url: `${siteConfig.url}/academy/${guide.slug}`,
    lastModified: new Date(guide.publishedAt),
    changeFrequency: "monthly",
    priority: guide.featured || guide.popular ? 0.8 : 0.7,
  }));

  return [...staticEntries, ...workflowEntries, ...guideEntries];
}

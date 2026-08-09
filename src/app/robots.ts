import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { isSiteLaunched } from "@/lib/launch/config";

export default function robots(): MetadataRoute.Robots {
  if (!isSiteLaunched()) {
    return {
      rules: [
        {
          userAgent: "*",
          allow: ["/coming-soon", "/privacy", "/terms", "/cookies", "/disclaimer"],
          disallow: "/",
        },
      ],
      host: siteConfig.url,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/resources", "/coming-soon"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}

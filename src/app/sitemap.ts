import type { MetadataRoute } from "next";
import { site, insights } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/services", "/about", "/team", "/insights", "/faq", "/contact"];

  const staticEntries = staticPaths.map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: new Date(),
  }));

  const insightEntries = insights.map((post) => ({
    url: new URL(`/insights/${post.slug}`, site.url).toString(),
    lastModified: new Date(),
  }));

  return [...staticEntries, ...insightEntries];
}

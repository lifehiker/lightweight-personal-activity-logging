import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = [
  "",
  "/pricing",
  "/signin",
  "/private-reading-log-app",
  "/goodreads-alternative",
  "/storygraph-alternative",
  "/book-tracker-app",
  "/app-to-track-books-read",
  "/reading-log-template",
  "/reading-log-app-no-social",
  "/features/history",
  "/features/streaks",
  "/features/export",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}

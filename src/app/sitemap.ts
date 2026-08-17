import type { MetadataRoute } from "next";
import { tools } from "../data/tools";

export const dynamic = "force-static";

const baseUrl = "https://contractorsafetytools.com";

const staticRoutes = [
  "/",
  "/tools",
  "/tools/safety-calculators",
  "/tools/inspection-checklists",
  "/about",
  "/methodology",
  "/disclaimer",
  "/privacy",
  "/terms",
  "/contact",
  "/faq",
] as const;

function canonicalUrl(route: string) {
  if (route === "/") {
    return `${baseUrl}/`;
  }

  return `${baseUrl}${route}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes,
    ...tools.map((tool) => tool.href),
  ];

  return routes.map((route) => ({
    url: canonicalUrl(route),
  }));
}

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kaderos.io";

  const pages = [
    "",
    "/landing",
    "/landing/features",
    "/landing/pricing",
    "/landing/templates",
    "/landing/blog",
    "/landing/changelog",
    "/landing/impressum",
    "/landing/datenschutz",
    "/landing/agb",
  ];

  const blogSlugs = [
    "ai-agents-schweiz",
    "ai-team-aufbauen",
    "ndsg-ai-konform",
    "ai-kosten-kmu",
    "crewai-vs-kaderos",
    "ai-automatisierung-agentur",
    "zukunft-arbeit-schweiz",
    "open-source-ai-tools",
  ];

  return [
    ...pages.map((p) => ({
      url: `${base}${p}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: p === "/landing" ? 1 : p === "" ? 0.9 : 0.7,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${base}/landing/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

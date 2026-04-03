import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kaderos.io";

  const pages = [
    "",
    "/features",
    "/pricing",
    "/templates",
    "/blog",
    "/changelog",
    "/impressum",
    "/datenschutz",
    "/agb",
  ];

  const blogSlugs = [
    "ai-agents-schweiz", "ai-team-aufbauen", "ndsg-ai-konform",
    "ai-kosten-kmu", "crewai-vs-kaderos", "ai-automatisierung-agentur",
    "zukunft-arbeit-schweiz", "open-source-ai-tools",
    "ai-onboarding-guide", "kmu-digitalisierung-2026", "ai-budget-planen",
    "ai-governance-kmu", "solo-founder-ai-stack", "ai-agent-vs-chatbot",
    "schweizer-startups-ai", "ai-risiken-kmu", "produktivitaet-ai-tools",
    "ai-mitarbeiter-zukunft",
  ];

  return [
    ...pages.map((p) => ({
      url: `${base}${p}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${base}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

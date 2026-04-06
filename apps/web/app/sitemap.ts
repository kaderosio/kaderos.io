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

  const blogPosts: { slug: string; date: string }[] = [
    { slug: "ai-agents-schweiz", date: "2026-03-28" },
    { slug: "ai-team-aufbauen", date: "2026-03-28" },
    { slug: "ndsg-ai-konform", date: "2026-03-29" },
    { slug: "ai-kosten-kmu", date: "2026-03-29" },
    { slug: "crewai-vs-kaderos", date: "2026-03-30" },
    { slug: "ai-automatisierung-agentur", date: "2026-03-30" },
    { slug: "zukunft-arbeit-schweiz", date: "2026-03-30" },
    { slug: "open-source-ai-tools", date: "2026-03-31" },
    { slug: "ai-onboarding-guide", date: "2026-03-31" },
    { slug: "kmu-digitalisierung-2026", date: "2026-03-31" },
    { slug: "ai-budget-planen", date: "2026-04-01" },
    { slug: "ai-governance-kmu", date: "2026-04-01" },
    { slug: "solo-founder-ai-stack", date: "2026-04-01" },
    { slug: "ai-agent-vs-chatbot", date: "2026-04-02" },
    { slug: "schweizer-startups-ai", date: "2026-04-02" },
    { slug: "ai-risiken-kmu", date: "2026-04-02" },
    { slug: "produktivitaet-ai-tools", date: "2026-04-02" },
    { slug: "ai-mitarbeiter-zukunft", date: "2026-04-03" },
  ];

  return [
    ...pages.map((p) => ({
      url: `${base}${p}`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : p === "/pricing" ? 0.9 : 0.7,
    })),
    ...blogPosts.map(({ slug, date }) => ({
      url: `${base}/blog/${slug}`,
      lastModified: new Date(date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

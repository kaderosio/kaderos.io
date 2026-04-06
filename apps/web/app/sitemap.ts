import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kaderos.io";

  const pages = [
    "",
    "/features",
    "/pricing",
    "/templates",
    "/enterprise",
    "/blog",
    "/changelog",
    "/impressum",
    "/datenschutz",
    "/agb",
  ];

  const blogPosts: { slug: string; date: string }[] = [
    // Original posts
    { slug: "warum-kaderos", date: "2026-04-02" },
    { slug: "paperclip-vs-kaderos", date: "2026-04-03" },
    { slug: "ai-agents-schweiz-2026", date: "2026-04-04" },
    { slug: "ndsg-ai-compliance", date: "2026-04-05" },
    { slug: "solo-founder-ai-team", date: "2026-04-07" },
    { slug: "confidence-gate-erklaert", date: "2026-04-08" },
    // Atlas batch
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
    // Leyla SEO batch
    { slug: "ai-fuer-kmu-schweiz", date: "2026-04-06" },
    { slug: "agent-memory", date: "2026-04-06" },
    { slug: "ndsg-ai-schweiz", date: "2026-04-06" },
    { slug: "ai-agent-kosten", date: "2026-04-06" },
    { slug: "open-source-ai-schweiz", date: "2026-04-06" },
    { slug: "bexio-ai-automatisierung", date: "2026-04-06" },
    { slug: "pgvector-vs-pinecone", date: "2026-04-06" },
    { slug: "kaderos-vs-crewai-n8n", date: "2026-04-06" },
  ];

  const useCasePages = [
    "startup",
    "agentur",
    "treuhand",
    "freelancer",
    "ecommerce",
  ];

  const comparePages = [
    "crewai",
    "autogen",
    "n8n",
    "relevance-ai",
    "langchain",
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
    {
      url: `${base}/tools/ai-team-calculator`,
      lastModified: new Date("2026-04-06"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${base}/compare`,
      lastModified: new Date("2026-04-06"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...comparePages.map((slug) => ({
      url: `${base}/compare/${slug}`,
      lastModified: new Date("2026-04-06"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${base}/use-cases`,
      lastModified: new Date("2026-04-06"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...useCasePages.map((slug) => ({
      url: `${base}/use-cases/${slug}`,
      lastModified: new Date("2026-04-06"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

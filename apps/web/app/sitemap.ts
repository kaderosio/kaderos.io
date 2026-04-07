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
    { slug: "warum-ki-assistent-alles-vergisst", date: "2026-04-07" },
    // Leyla SEO batch
    { slug: "ai-fuer-kmu-schweiz", date: "2026-04-06" },
    { slug: "agent-memory", date: "2026-04-06" },
    { slug: "ndsg-ai-schweiz", date: "2026-04-06" },
    { slug: "ai-agent-kosten", date: "2026-04-06" },
    { slug: "open-source-ai-schweiz", date: "2026-04-06" },
    { slug: "bexio-ai-automatisierung", date: "2026-04-06" },
    { slug: "pgvector-vs-pinecone", date: "2026-04-06" },
    { slug: "kaderos-vs-crewai-n8n", date: "2026-04-06" },
    { slug: "ai-agent-memory-price-comparison-2026", date: "2026-04-07" },
    { slug: "ki-automatisierung-schweizer-kmu-2026", date: "2026-04-07" },
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
    "mem0",
  ];

  const aiTeamCityPages = [
    "zuerich",
    "bern",
    "basel",
    "luzern",
    "st-gallen",
    "winterthur",
    "lausanne",
    "genf",
    "lugano",
    "zug",
  ];

  // AI Team: 5 Rollen x 10 Branchen = 50 Seiten
  const aiTeamRollenPages = [
    // CTO
    "cto-fuer-treuhand", "cto-fuer-immobilien", "cto-fuer-gastronomie",
    "cto-fuer-handel", "cto-fuer-handwerk", "cto-fuer-beratung",
    "cto-fuer-it", "cto-fuer-pharma", "cto-fuer-logistik", "cto-fuer-bildung",
    // CMO
    "cmo-fuer-treuhand", "cmo-fuer-immobilien", "cmo-fuer-gastronomie",
    "cmo-fuer-handel", "cmo-fuer-handwerk", "cmo-fuer-beratung",
    "cmo-fuer-it", "cmo-fuer-pharma", "cmo-fuer-logistik", "cmo-fuer-bildung",
    // CFO
    "cfo-fuer-treuhand", "cfo-fuer-immobilien", "cfo-fuer-gastronomie",
    "cfo-fuer-handel", "cfo-fuer-handwerk", "cfo-fuer-beratung",
    "cfo-fuer-it", "cfo-fuer-pharma", "cfo-fuer-logistik", "cfo-fuer-bildung",
    // Sales Lead
    "sales-lead-fuer-treuhand", "sales-lead-fuer-immobilien", "sales-lead-fuer-gastronomie",
    "sales-lead-fuer-handel", "sales-lead-fuer-handwerk", "sales-lead-fuer-beratung",
    "sales-lead-fuer-it", "sales-lead-fuer-pharma", "sales-lead-fuer-logistik", "sales-lead-fuer-bildung",
    // Content Lead
    "content-lead-fuer-treuhand", "content-lead-fuer-immobilien", "content-lead-fuer-gastronomie",
    "content-lead-fuer-handel", "content-lead-fuer-handwerk", "content-lead-fuer-beratung",
    "content-lead-fuer-it", "content-lead-fuer-pharma", "content-lead-fuer-logistik", "content-lead-fuer-bildung",
  ];

  // Multilingual landing pages
  const langPages = [
    { path: "/en", lang: "en" },
    { path: "/fr", lang: "fr" },
    { path: "/it", lang: "it" },
  ];

  return [
    ...pages.map((p) => ({
      url: `${base}${p}`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : p === "/pricing" ? 0.9 : 0.7,
    })),
    ...langPages.map(({ path }) => ({
      url: `${base}${path}`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "weekly" as const,
      priority: 0.9,
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
    // AI Team Hub
    {
      url: `${base}/ai-team`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    // AI Team Stadt-Seiten
    ...aiTeamCityPages.map((slug) => ({
      url: `${base}/ai-team/${slug}`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // AI Team Rollen x Branchen Seiten
    ...aiTeamRollenPages.map((slug) => ({
      url: `${base}/ai-team/${slug}`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

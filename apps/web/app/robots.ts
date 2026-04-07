import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "PerplexityBot",
          "Claude-SearchBot",
          "Google-Extended",
          "Amazonbot",
          "Applebot",
          "Bingbot",
        ],
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
    ],
    sitemap: "https://kaderos.io/sitemap.xml",
  };
}

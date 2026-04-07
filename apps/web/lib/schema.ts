/**
 * JSON-LD Schema utilities for KaderOS blog posts and pages.
 */

interface ArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
  readingTimeMinutes?: number;
}

/**
 * Generates Article JSON-LD schema for blog posts.
 *
 * Usage in a blog page.tsx:
 * ```tsx
 * import { generateArticleSchema } from "@/lib/schema";
 *
 * // In your component's <head> or as a <script> tag:
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{
 *     __html: JSON.stringify(generateArticleSchema({
 *       title: "AI für KMU Schweiz",
 *       description: "...",
 *       slug: "ai-fuer-kmu-schweiz",
 *       datePublished: "2026-04-06",
 *     })),
 *   }}
 * />
 * ```
 */
export function generateArticleSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  authorName = "KaderOS Team",
  imageUrl,
  readingTimeMinutes,
}: ArticleSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `https://kaderos.io/blog/${slug}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: authorName,
      url: "https://kaderos.io",
    },
    publisher: {
      "@type": "Organization",
      name: "KaderOS",
      url: "https://kaderos.io",
      logo: {
        "@type": "ImageObject",
        url: "https://kaderos.io/favicon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://kaderos.io/blog/${slug}`,
    },
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
      },
    }),
    ...(readingTimeMinutes && {
      timeRequired: `PT${readingTimeMinutes}M`,
    }),
    inLanguage: "de-CH",
    isPartOf: {
      "@type": "Blog",
      name: "KaderOS Blog",
      url: "https://kaderos.io/blog",
    },
  };
}

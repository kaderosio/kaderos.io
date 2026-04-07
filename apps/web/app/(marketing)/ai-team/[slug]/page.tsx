import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allPages, getPageBySlug } from "../all-pages";
import AITeamPageTemplate from "../ai-team-template";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    return { title: "Nicht gefunden" };
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `https://kaderos.io/ai-team/${page.slug}`,
      type: "article",
    },
    alternates: {
      canonical: `https://kaderos.io/ai-team/${page.slug}`,
    },
  };
}

export default async function AITeamDynamicPage({ params }: Props) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <AITeamPageTemplate page={page} />;
}

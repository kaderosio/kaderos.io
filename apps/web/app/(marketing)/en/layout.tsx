import type { Metadata } from "next";
import EnglishShell from "./english-shell";

export const metadata: Metadata = {
  title: "KaderOS -- The Operating System for Your AI Team | Swiss Made",
  description:
    "4 AI agents. CHF 79/month. Working while you sleep. Open Source. Swiss Made. Built for Swiss SMEs.",
  alternates: {
    canonical: "https://kaderos.io/en",
    languages: {
      "de-CH": "https://kaderos.io",
      "en": "https://kaderos.io/en",
    },
  },
  openGraph: {
    title: "KaderOS -- Your AI Team. For Your Company.",
    description:
      "4 AI agents. CHF 79/month. Working while you sleep. Open Source. Swiss Made.",
    url: "https://kaderos.io/en",
    siteName: "KaderOS",
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "KaderOS -- Your AI Team. For Your Company.",
    description:
      "4 AI agents. CHF 79/month. Working while you sleep. Open Source. Swiss Made.",
  },
};

export default function EnglishLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EnglishShell>{children}</EnglishShell>;
}

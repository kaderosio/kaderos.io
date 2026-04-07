import type { Metadata } from "next";
import ItalianShell from "./italian-shell";

export const metadata: Metadata = {
  title: "KaderOS -- Il sistema operativo per il tuo team AI | Swiss Made",
  description:
    "4 agenti AI. CHF 79/mese. Lavorano mentre dormi. Open Source. Swiss Made. Creato per le PMI svizzere.",
  alternates: {
    canonical: "https://kaderos.io/it",
    languages: {
      "de-CH": "https://kaderos.io",
      "en": "https://kaderos.io/en",
      "it": "https://kaderos.io/it",
    },
  },
  openGraph: {
    title: "KaderOS -- Il tuo team AI. Per la tua azienda.",
    description:
      "4 agenti AI. CHF 79/mese. Lavorano mentre dormi. Open Source. Swiss Made.",
    url: "https://kaderos.io/it",
    siteName: "KaderOS",
    locale: "it",
  },
  twitter: {
    card: "summary_large_image",
    title: "KaderOS -- Il tuo team AI. Per la tua azienda.",
    description:
      "4 agenti AI. CHF 79/mese. Lavorano mentre dormi. Open Source. Swiss Made.",
  },
};

export default function ItalianLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ItalianShell>{children}</ItalianShell>;
}

import type { Metadata } from "next";
import { NavbarFr, FooterFr } from "./components";

export const metadata: Metadata = {
  title: "KaderOS — Votre equipe AI. Pour votre entreprise.",
  description:
    "Le systeme d'exploitation AI pour les entreprises suisses. 4 agents. CHF 79/mois. Ils travaillent pendant que vous dormez. Open Source. Swiss Made.",
  alternates: {
    canonical: "https://kaderos.io/fr",
    languages: {
      "de-CH": "https://kaderos.io",
      "fr-CH": "https://kaderos.io/fr",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_CH",
    siteName: "KaderOS",
    title: "KaderOS — Votre equipe AI. Pour votre entreprise.",
    description:
      "4 agents. CHF 79/mois. Ils travaillent pendant que vous dormez. Avec memoire a 7 couches. Swiss Made. Open Source.",
    url: "https://kaderos.io/fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "KaderOS — Votre equipe AI. Pour votre entreprise.",
    description:
      "4 agents. CHF 79/mois. Ils travaillent pendant que vous dormez. Swiss Made. Open Source.",
  },
};

export default function FrLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-white text-[#1D1D1F]"
      lang="fr"
      style={{
        fontFamily:
          "var(--font-outfit, 'Outfit'), -apple-system, sans-serif",
      }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        .gradient-text { background: linear-gradient(135deg, #000088 0%, #000088 50%, #0891B2 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 6s linear infinite; }
        @keyframes shimmer { from { background-position:-200% center; } to { background-position:200% center; } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
      <NavbarFr />
      <main role="main" className="pt-14 sm:pt-16">
        {children}
      </main>
      <FooterFr />
    </div>
  );
}

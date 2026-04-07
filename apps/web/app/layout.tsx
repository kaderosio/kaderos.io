import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KaderOS — Dein AI-Team. Für dein Unternehmen.",
    template: "%s | KaderOS",
  },
  description: "Das AI-Betriebssystem für Schweizer Unternehmen. 4 Kader-Mitglieder. CHF 79/Monat. Arbeiten während du schläfst. Open Source. Swiss Made.",
  metadataBase: new URL("https://kaderos.io"),
  keywords: ["AI Betriebssystem", "KI für KMU", "AI Team", "Swiss Made AI", "KaderOS", "AI Agents Schweiz", "nDSG AI", "Open Source AI"],
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: "KaderOS",
    title: "KaderOS — Dein AI-Team. Für dein Unternehmen.",
    description: "4 Kader-Mitglieder. CHF 79/Monat. Arbeiten während du schläfst. Mit 7-Schichten-Gedächtnis. Swiss Made. Open Source.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KaderOS — Dein AI-Team. Für dein Unternehmen.",
    description: "4 Kader-Mitglieder. CHF 79/Monat. Arbeiten während du schläfst. Swiss Made. Open Source.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "de-CH": "/",
      "en": "/en",
      "fr": "/fr",
      "it": "/it",
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de-CH" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "KaderOS",
                  url: "https://kaderos.io",
                  logo: "https://kaderos.io/favicon.svg",
                  description: "AI-Betriebssystem für Schweizer Unternehmen. Open Source. Swiss Made.",
                  foundingDate: "2025",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Zürich",
                    addressRegion: "ZH",
                    addressCountry: "CH",
                  },
                  sameAs: [
                    "https://github.com/kaderosio/kaderos.io",
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    email: "hello@kaderos.io",
                    contactType: "customer service",
                    availableLanguage: ["de", "en"],
                  },
                },
                {
                  "@type": "WebSite",
                  name: "KaderOS",
                  url: "https://kaderos.io",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://kaderos.io/blog?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "SoftwareApplication",
                  name: "KaderOS",
                  url: "https://kaderos.io",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Web",
                  description: "AI-Betriebssystem für Schweizer Unternehmen. Bau dein AI-Team mit Rollen, Budget und Gedächtnis.",
                  softwareVersion: "1.0",
                  license: "https://www.gnu.org/licenses/agpl-3.0.html",
                  offers: [
                    {
                      "@type": "Offer",
                      name: "Free",
                      description: "1 Agent, 100 Runs/Monat",
                      price: "0",
                      priceCurrency: "CHF",
                      priceValidUntil: "2027-12-31",
                      availability: "https://schema.org/InStock",
                    },
                    {
                      "@type": "Offer",
                      name: "Pro",
                      description: "5 Agents, 1000 Runs/Monat, Brain Memory",
                      price: "79",
                      priceCurrency: "CHF",
                      billingIncrement: "P1M",
                      priceValidUntil: "2027-12-31",
                      availability: "https://schema.org/InStock",
                    },
                    {
                      "@type": "Offer",
                      name: "Business",
                      description: "Unlimited Agents & Runs",
                      price: "199",
                      priceCurrency: "CHF",
                      billingIncrement: "P1M",
                      priceValidUntil: "2027-12-31",
                      availability: "https://schema.org/InStock",
                    },
                  ],
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.8",
                    ratingCount: "12",
                  },
                },
              ],
            }),
          }}
        />
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="G01gRQjtOuz8tanoRH8X_K2eIsG0ooEQtV2CHCIotNY" />
        {/* Plausible Analytics — no cookies, nDSG-compliant */}
        <script defer data-domain="kaderos.io" src="https://plausible.io/js/script.tagged-events.js"></script>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SCGELNL610"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-SCGELNL610');` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

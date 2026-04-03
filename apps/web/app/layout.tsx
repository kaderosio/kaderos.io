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
    default: "KaderOS — Dein nächster Mitarbeiter ist kein Mensch.",
    template: "%s | KaderOS",
  },
  description: "Bau ein Unternehmen aus AI Agents. Open Source. Lokal. Swiss Made. CHF 0 bis CHF 349/Monat.",
  metadataBase: new URL("https://kaderos.io"),
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: "https://kaderos.io",
    siteName: "KaderOS",
    title: "KaderOS — Dein nächster Mitarbeiter ist kein Mensch.",
    description: "Bau ein Unternehmen aus AI Agents. Open Source. Lokal. Swiss Made.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KaderOS — Dein nächster Mitarbeiter ist kein Mensch.",
    description: "Bau ein Unternehmen aus AI Agents. Open Source. Lokal. Swiss Made.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://kaderos.io",
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
                  description: "Swiss AI Workforce Orchestration Platform. Bau ein Unternehmen aus AI Agents.",
                  foundingDate: "2026",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Zürich",
                    addressCountry: "CH",
                  },
                  sameAs: ["https://github.com/kaderosio/kaderos.io"],
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
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Web",
                  offers: [
                    {
                      "@type": "Offer",
                      name: "Community",
                      price: "0",
                      priceCurrency: "CHF",
                    },
                    {
                      "@type": "Offer",
                      name: "Pro",
                      price: "49",
                      priceCurrency: "CHF",
                      billingIncrement: "P1M",
                    },
                    {
                      "@type": "Offer",
                      name: "Team",
                      price: "149",
                      priceCurrency: "CHF",
                      billingIncrement: "P1M",
                    },
                    {
                      "@type": "Offer",
                      name: "Agency",
                      price: "349",
                      priceCurrency: "CHF",
                      billingIncrement: "P1M",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

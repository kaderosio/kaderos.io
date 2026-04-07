import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Brain — 7-Schichten-Gedächtnis für AI-Agents | KaderOS",
  description:
    "Dein AI Agent vergisst alles. Jedes. Einzelne. Mal. Der Agent Brain gibt deinem Agent ein Gedächtnis mit 7 Schichten — gebaut wie ein echtes Gehirn. CHF 5/Monat. Kein LLM. Swiss Hosted. Open Source.",
  openGraph: {
    title: "Agent Brain — Das Gedächtnis, das AI-Agents gefehlt hat",
    description:
      "7 Schichten. Inspiriert vom menschlichen Gehirn. Gebaut für AI-Agents. CHF 5/Monat. Kein LLM. Swiss Hosted.",
    url: "https://kaderos.io/humanaibrain",
  },
  alternates: {
    canonical: "https://kaderos.io/humanaibrain",
  },
  other: {
    "script:ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Brauche ich Programmierkenntnisse?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nein. Du verbindest deinen Agent per API. Ein Endpoint rein, ein Endpoint raus. Dokumentation ist da, Beispiele sind da.",
            },
          },
          {
            "@type": "Question",
            name: "Funktioniert das mit meinem bestehenden Agent?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ja. Der Brain ist agent-agnostisch. Egal ob du GPT-4, Claude, Mistral, Llama oder deinen eigenen Agent nutzt — der Brain liefert das Gedächtnis. Der Agent liefert das Denken.",
            },
          },
          {
            "@type": "Question",
            name: "Braucht der Agent Brain ein LLM wie GPT-4?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nein. Der Brain nutzt kein Sprachmodell. Alles basiert auf sentence-transformers, spaCy für Entity Extraction, PostgreSQL/pgvector für Vektorsuche und Graph-Algorithmen. Kein API-Call nach aussen.",
            },
          },
          {
            "@type": "Question",
            name: "Was kostet der Agent Brain?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CHF 5 pro Monat. Zum Vergleich: Mem0 Pro kostet $249/Monat, Cognee On-Prem EUR 1970/Monat. Swiss Hosting inklusive.",
            },
          },
          {
            "@type": "Question",
            name: "Ist das wirklich nDSG-konform?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ja. Swiss Hosting. Keine API-Calls nach aussen. Keine Daten bei US-Anbietern. Kein LLM verarbeitet deine Erinnerungen. Reine Datenbankoperationen in der Schweiz.",
            },
          },
          {
            "@type": "Question",
            name: "Was passiert, wenn ich kündige?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Deine Daten gehören dir. Export jederzeit möglich. Kein Lock-in. Du nimmst dein Gedächtnis mit.",
            },
          },
          {
            "@type": "Question",
            name: "Was, wenn der Brain etwas Falsches lernt?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Jede Regel, jede Verbindung, jede Vorhersage ist sichtbar und überschreibbar. Du korrigierst es direkt. Der Brain lernt aus der Korrektur.",
            },
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "KaderOS Agent Brain",
        description:
          "7-Schichten Gedächtnissystem für AI-Agents nach dem Vorbild des menschlichen Gehirns. Kein LLM. Swiss Hosted. Open Source.",
        offers: {
          "@type": "Offer",
          price: "5",
          priceCurrency: "CHF",
          availability: "https://schema.org/InStock",
        },
      },
    ]),
  },
};

export default function HumanAIBrainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Human AI Brain — 7-Schichten-Gedächtnis nach dem Vorbild des menschlichen Gehirns | KaderOS",
  description:
    "Wie KaderOS das menschliche Gehirn in ein AI-Gedächtnis übersetzt. 7 Schichten: Perception Gate, Working Memory, Episodisches Gedächtnis, Knowledge Graph, Prozedurales Lernen, Predictive Engine, Dream Cycle. Keine LLMs. Reine Neurowissenschaft.",
  openGraph: {
    title: "Human AI Brain — Das Gedächtnis, das AI-Agents gefehlt hat",
    description: "7 Schichten. Inspiriert vom menschlichen Gehirn. Gebaut für AI-Agents. CHF 5/Monat.",
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
            name: "Was ist der Human AI Brain?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Der Human AI Brain ist ein 7-Schichten Gedächtnissystem für AI-Agents, das nach dem Vorbild des menschlichen Gehirns gebaut wurde. Er nutzt keine LLMs, sondern reine Mathematik: Vektorsuche, Graphen und neurowissenschaftliche Prinzipien.",
            },
          },
          {
            "@type": "Question",
            name: "Warum 7 Schichten?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Das menschliche Gedächtnis arbeitet in Schichten: sensorisch, kurzzeitig, episodisch, semantisch, prozedural, prädiktiv, konsolidierend. Der Human AI Brain bildet jede dieser Funktionen als technische Schicht ab.",
            },
          },
          {
            "@type": "Question",
            name: "Braucht der Human AI Brain ein LLM wie GPT-4?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nein. Der Brain nutzt kein Sprachmodell. Alles basiert auf sentence-transformers (384d Embeddings), spaCy für Entity Extraction, PostgreSQL/pgvector für Vektorsuche und Graph-Algorithmen. Kein API-Call nach aussen.",
            },
          },
          {
            "@type": "Question",
            name: "Was kostet der Human AI Brain?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CHF 5 pro Monat. Zum Vergleich: Mem0 Pro kostet $249/Monat, Zep Pro $50/Monat. Swiss Hosting inklusive.",
            },
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "KaderOS Human AI Brain",
        description: "7-Schichten Gedächtnissystem für AI-Agents nach dem Vorbild des menschlichen Gehirns",
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

export default function HumanAIBrainLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

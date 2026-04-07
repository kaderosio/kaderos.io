import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  RelatedLinks,
  getRelatedCityLinks,
  getRelatedBranchenLinks,
} from "@/components/related-links";

export const metadata = {
  title: "AI Team für Unternehmen in Lugano — KaderOS",
  description:
    "KaderOS baut AI-Teams für Unternehmen in Lugano und dem Tessin. Fintech, Blockchain, Tourismus — dein AI-Kader versteht die Südschweiz. Swiss Made.",
};

const faqs = [
  {
    q: "Funktioniert KaderOS auch für Tessiner Unternehmen?",
    a: "Ja. KaderOS ist für die gesamte Schweiz gebaut — auch für das Tessin. Die AI-Agents arbeiten mehrsprachig: Deutsch, Italienisch, Französisch und Englisch. Das Interface ist aktuell auf Deutsch, die italienische Lokalisierung ist geplant.",
  },
  {
    q: "Wie unterstützt KaderOS die Lugano-Blockchain-Szene?",
    a: "KaderOS gibt Blockchain-Startups ein ganzes AI-Team: CTO-Agent für Code Reviews, Marketing-Agent für Community Building und Content, Operations-Agent für Admin und Compliance. Ideal für die wachsende Web3-Community in Lugano.",
  },
  {
    q: "Ist KaderOS nDSG-konform für Fintech-Unternehmen?",
    a: "Ja. KaderOS ist Swiss Made Software mit nDSG-Konformität ab Tag 1. Für Fintech-Unternehmen in Lugano, die mit sensiblen Finanzdaten arbeiten, bietet KaderOS die nötige Transparenz und Compliance.",
  },
];

export default function LuganoPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const relatedLinks = [
    ...getRelatedCityLinks("lugano"),
    ...getRelatedBranchenLinks("lugano"),
  ];

  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "AI Team", href: "/ai-team" },
          { label: "Lugano" },
        ]}
      />

      <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
        Standort
      </div>
      <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
        AI Team für Unternehmen in Lugano
      </h1>
      <p className="text-[#6E6E73] text-[16px] leading-relaxed mb-10 max-w-2xl">
        Lugano ist die Wirtschaftshauptstadt des Tessins und ein aufstrebender Blockchain-Hub.
        KaderOS hilft Südschweizer Unternehmen, mit AI-Agents effizienter zu arbeiten —
        vom Fintech-Startup bis zum Tourismusbetrieb.
      </p>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Luganos Wirtschaft: Finanzplatz mit Blockchain-Zukunft</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Lugano ist der drittgrösste Finanzplatz der Schweiz. Traditionell stark im
          Private Banking und in der Vermögensverwaltung, hat sich die Stadt in den
          letzten Jahren als einer der führenden Blockchain-Standorte Europas positioniert.
          Das «Plan B»-Programm der Stadt Lugano macht Bitcoin und Stablecoins zu
          akzeptierten Zahlungsmitteln und zieht Crypto- und Web3-Unternehmen aus der
          ganzen Welt an.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Das Tessin verbindet Schweizer Qualität mit mediterranem Flair — und mit der
          Nähe zu Norditalien einen einzigartigen wirtschaftlichen Vorteil. Viele Tessiner
          Unternehmen operieren grenzüberschreitend und bedienen sowohl den Schweizer als
          auch den italienischen Markt.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Neben Finanz und Tech ist Tourismus ein zentraler Pfeiler der Luganeser
          Wirtschaft. Hotels, Gastronomie und Erlebnisanbieter rund um den Luganersee
          ziehen ganzjährig Gäste an. Dazu kommt ein starkes KMU-Gewerbe mit Handwerks-,
          Bau- und Handelsbetrieben.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Herausforderungen für Unternehmen im Tessin</h2>
        <div className="grid gap-4">
          {[
            {
              title: "Kleinerer Markt, grösserer Effort",
              desc: "Das Tessin hat weniger Einwohner als Zürich allein. Unternehmen müssen effizienter arbeiten, um profitabel zu bleiben — oder den Sprung über die Sprachgrenze schaffen, was zusätzliche Ressourcen braucht.",
            },
            {
              title: "Grenzgänger-Dynamik und Lohnstrukturen",
              desc: "Das Tessin hat eine einzigartige Arbeitsmarktdynamik mit vielen Grenzgängern aus Italien. Die Lohnstruktur ist anders als in der Deutschschweiz — aber qualifizierte Tech-Fachkräfte sind trotzdem rar.",
            },
            {
              title: "Blockchain-Boom braucht operative Kapazität",
              desc: "Die vielen Crypto- und Blockchain-Startups in Lugano sind oft klein, ambitioniert und ressourcenknapp. Gründer brauchen operative Unterstützung, die sie sich als Vollzeitstellen nicht leisten können.",
            },
          ].map((p) => (
            <div key={p.title} className="border border-[#E5E5EA] rounded-2xl p-6">
              <h3 className="text-[16px] font-semibold mb-2">{p.title}</h3>
              <p className="text-[14px] text-[#6E6E73] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Wie KaderOS Luganeser Unternehmen hilft</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          KaderOS gibt dir ein AI-Team, das mehrsprachig arbeitet — Deutsch, Italienisch,
          Französisch und Englisch. Ideal für den Tessiner Kontext, wo Unternehmen oft
          über Sprachgrenzen hinweg operieren.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Für <Link href="/ai-team/cto-fuer-startup" className="text-[#000088] font-medium hover:underline">Blockchain-Startups</Link> übernimmt
          dein AI-CTO Code Reviews, Smart-Contract-Dokumentation und Infrastruktur-Monitoring.
          Der Marketing-Agent baut deine Community auf, während der Operations-Agent
          Admin, Compliance und Reporting erledigt.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Für Tourismusbetriebe am Luganersee automatisieren AI-Agents
          Gästekommunikation, Buchungsmanagement und Social-Media-Content — in der
          Hochsaison ein enormer Vorteil.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Als Swiss Made Software bietet KaderOS die nDSG-Konformität, die gerade für
          Fintech- und Blockchain-Unternehmen im regulierten Schweizer Umfeld wichtig ist.
          Open Source bedeutet volle Transparenz — kein Widerspruch zum Crypto-Ethos.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-6">Häufige Fragen — Lugano</h2>
        <div className="grid gap-4">
          {faqs.map((f) => (
            <div key={f.q} className="border border-[#E5E5EA] rounded-2xl p-6">
              <h3 className="text-[16px] font-semibold mb-2">{f.q}</h3>
              <p className="text-[14px] text-[#6E6E73] leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-2xl border border-[#000088]/20 bg-[#000088]/5 p-8 text-center">
        <h2 className="text-[22px] font-bold mb-2">
          AI Team für dein Unternehmen in Lugano aufsetzen
        </h2>
        <p className="text-[#6E6E73] text-[14px] mb-6">
          Kostenlos starten. nDSG-konform ab Tag 1. Swiss Made — auch für das Tessin.
        </p>
        <Link
          href="/signup"
          className="inline-block px-8 py-3 bg-[#000088] text-white text-[14px] font-semibold rounded-xl hover:bg-[#000066] transition-colors"
        >
          Jetzt AI Team aufsetzen
        </Link>
      </div>

      <RelatedLinks links={relatedLinks} />
    </article>
  );
}

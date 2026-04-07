import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  RelatedLinks,
  getRelatedCityLinks,
  getRelatedBranchenLinks,
} from "@/components/related-links";

export const metadata = {
  title: "AI Team für Unternehmen in Genf — KaderOS",
  description:
    "KaderOS baut AI-Teams für Genfer Unternehmen. Finanzplatz, internationale Organisationen, Rohstoffhandel — dein AI-Kader versteht Genfs Wirtschaft.",
};

const faqs = [
  {
    q: "Funktioniert KaderOS für internationale Unternehmen in Genf?",
    a: "Ja. KaderOS AI-Agents arbeiten mehrsprachig — Deutsch, Französisch, Englisch und weitere Sprachen. Für Genfs internationale Wirtschaft mit UN, WTO und multinationalen Unternehmen ist das besonders relevant.",
  },
  {
    q: "Ist KaderOS auch für die Romandie verfügbar?",
    a: "Ja. KaderOS ist für die gesamte Schweiz gebaut, inklusive Romandie. Die AI-Agents kommunizieren in der Sprache deiner Wahl. Das Interface ist aktuell primär auf Deutsch, die vollständige Französisch-Lokalisierung ist in Planung.",
  },
  {
    q: "Wie hilft KaderOS dem Genfer Finanzsektor?",
    a: "KaderOS automatisiert Compliance-Checks, Reporting und Kundenkommunikation im Finanzsektor. Das Confidence-Gate-System sorgt dafür, dass regulatorisch relevante Entscheidungen immer von einem Menschen freigegeben werden.",
  },
];

export default function GenfPage() {
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
    ...getRelatedCityLinks("genf"),
    ...getRelatedBranchenLinks("genf"),
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
          { label: "Genf" },
        ]}
      />

      <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
        Standort
      </div>
      <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
        AI Team für Unternehmen in Genf
      </h1>
      <p className="text-[#6E6E73] text-[16px] leading-relaxed mb-10 max-w-2xl">
        Genf ist die internationalste Stadt der Schweiz. KaderOS hilft Genfer Unternehmen —
        vom Finanzsektor bis zur NGO — mit AI-Agents effizienter und wettbewerbsfähiger
        zu werden. Auch für die Romandie verfügbar.
      </p>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Genfs Wirtschaft: Global denken, lokal handeln</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Genf ist einzigartig in der Schweiz — und in der Welt. Die Stadt beherbergt über
          40 internationale Organisationen, darunter die UNO, WHO, WTO und das IKRK.
          Dieser internationale Kontext prägt die gesamte Wirtschaft: Genf ist ein globaler
          Hub für Diplomatie, Finanzen und Rohstoffhandel.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Der Finanzsektor ist eine der tragenden Säulen. Private Banking, Vermögensverwaltung
          und Commodity Trading sind in Genf tief verwurzelt. Dazu kommt eine starke
          Luxusgüterbranche — von der Uhrenindustrie bis zu High-End-Retail.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Neben den grossen Playern gibt es tausende KMUs, die im Schatten der
          internationalen Organisationen operieren: Beratungsunternehmen, Übersetzungsbüros,
          Eventfirmen, Legal Services und spezialisierte Dienstleister, die das
          internationale Ökosystem bedienen.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Herausforderungen für Genfer Unternehmen</h2>
        <div className="grid gap-4">
          {[
            {
              title: "Extrem hohe Kosten",
              desc: "Genf ist eine der teuersten Städte der Welt. Mieten, Löhne und Lebenshaltungskosten sind selbst für Schweizer Verhältnisse hoch. Für KMUs ist jede Effizienzsteigerung bares Geld.",
            },
            {
              title: "Mehrsprachigkeit als Anforderung",
              desc: "In Genf wird Französisch, Englisch und oft auch Deutsch gesprochen — manchmal in derselben Sitzung. Unternehmen brauchen Teams und Tools, die nahtlos zwischen Sprachen wechseln können.",
            },
            {
              title: "Regulatorische Komplexität im Finanzsektor",
              desc: "Private Banking und Vermögensverwaltung unterliegen strengen Regulierungen: FINMA-Vorgaben, AML-Compliance, Cross-Border-Regeln. Der administrative Aufwand ist enorm.",
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
        <h2 className="text-[24px] font-bold mb-4">Wie KaderOS Genfer Unternehmen hilft</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          KaderOS gibt dir ein AI-Team, das mehrsprachig arbeitet und den internationalen
          Kontext von Genf versteht. Deine AI-Agents erledigen Aufgaben auf Französisch,
          Deutsch und Englisch — nahtlos und ohne Übersetzungskosten.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Für den <Link href="/ai-team/cto-fuer-treuhand" className="text-[#000088] font-medium hover:underline">Finanz- und Treuhandsektor</Link> automatisiert
          KaderOS Compliance-Checks, Reporting und Kundenkommunikation. Das
          Confidence-Gate-System ist gerade im regulierten Umfeld unverzichtbar: Dein
          AI-Team arbeitet autonom bei Routine und eskaliert bei kritischen Entscheidungen.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Für Beratungsunternehmen und Dienstleister übernehmen AI-Agents Research,
          Dokumentenerstellung und Projektmanagement. Das spart Stunden pro Woche — in
          einer Stadt, in der jede Stunde teuer ist.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          KaderOS ist auch für die Romandie verfügbar. Als Swiss Made Software erfüllt es
          alle nDSG-Anforderungen und bietet die Transparenz, die der regulierte Genfer
          Markt verlangt.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-6">Häufige Fragen — Genf</h2>
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
          AI Team für dein Unternehmen in Genf aufsetzen
        </h2>
        <p className="text-[#6E6E73] text-[14px] mb-6">
          Kostenlos starten. nDSG-konform ab Tag 1. Swiss Made — auch für die Romandie.
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

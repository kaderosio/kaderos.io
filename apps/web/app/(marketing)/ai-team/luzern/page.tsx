import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  RelatedLinks,
  getRelatedCityLinks,
  getRelatedBranchenLinks,
} from "@/components/related-links";

export const metadata = {
  title: "AI Team für Unternehmen in Luzern — KaderOS",
  description:
    "KaderOS baut AI-Teams für Luzerner KMUs. Tourismus, Gewerbe, Treuhand — dein AI-Kader versteht die Zentralschweiz. Swiss Made, nDSG-konform.",
};

const faqs = [
  {
    q: "Eignet sich KaderOS für Tourismusunternehmen in Luzern?",
    a: "Ja. AI-Agents können Gästekommunikation, Buchungsmanagement und Social-Media-Content automatisieren. Gerade in der Hochsaison hilft das, den Ansturm ohne zusätzliche Temporärkräfte zu bewältigen.",
  },
  {
    q: "Wie hilft KaderOS dem Luzerner Gewerbe?",
    a: "Ob Handwerksbetrieb, Bauunternehmen oder Einzelhandel — KaderOS automatisiert Offerten, Rechnungen, Kundenkommunikation und Terminplanung. Das spart Zeit und reduziert Fehler.",
  },
  {
    q: "Brauche ich IT-Kenntnisse, um KaderOS in Luzern einzusetzen?",
    a: "Nein. KaderOS ist so gebaut, dass du kein Entwickler sein musst. Du wählst ein Template, passt es an dein Unternehmen an und dein AI-Team ist sofort einsatzbereit.",
  },
];

export default function LuzernPage() {
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
    ...getRelatedCityLinks("luzern"),
    ...getRelatedBranchenLinks("luzern"),
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
          { label: "Luzern" },
        ]}
      />

      <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
        Standort
      </div>
      <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
        AI Team für Unternehmen in Luzern
      </h1>
      <p className="text-[#6E6E73] text-[16px] leading-relaxed mb-10 max-w-2xl">
        Luzern verbindet Tourismus-Tradition mit modernem Unternehmertum. KaderOS hilft
        Zentralschweizer KMUs, mit AI-Agents produktiver zu werden — ohne den persönlichen
        Touch zu verlieren.
      </p>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Luzerns Wirtschaft: Tourismus trifft KMU-Kultur</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Luzern ist das Tor zur Zentralschweiz und eine der meistbesuchten Städte der Schweiz.
          Tourismus ist ein zentraler Wirtschaftsfaktor — von der Hotellerie über Gastronomie
          bis zu Erlebnisanbietern am Vierwaldstättersee und auf dem Pilatus.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Daneben hat sich Luzern als starker KMU-Standort etabliert. Die Region beherbergt
          zahlreiche Handwerks- und Gewerbebetriebe, Treuhandgesellschaften und eine wachsende
          Tech-Szene rund um die Hochschule Luzern. Der Kanton bietet attraktive Steuersätze
          und eine pragmatische Verwaltung — ein Magnet für Jungunternehmer.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Die Nähe zu Zürich (unter einer Stunde mit dem Zug) macht Luzern zur attraktiven
          Alternative für Unternehmen, die tiefere Kosten suchen, ohne auf Anbindung zu
          verzichten.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Herausforderungen für Luzerner KMUs</h2>
        <div className="grid gap-4">
          {[
            {
              title: "Saisonale Schwankungen im Tourismus",
              desc: "Hotels, Gastrobetriebe und Erlebnisanbieter erleben massive Nachfrageschwankungen. In der Hochsaison fehlen Hände, in der Nebensaison fehlen Aufträge. Flexibilität ist überlebenswichtig.",
            },
            {
              title: "Kleinstrukturiertes Gewerbe unter Druck",
              desc: "Viele Luzerner KMUs sind Familienbetriebe mit 5-20 Mitarbeitenden. Administration, Buchhaltung und Kundenkommunikation fressen einen überproportionalen Anteil der Arbeitszeit.",
            },
            {
              title: "Digitalisierungsrückstand im Gewerbe",
              desc: "Während Zürich und Basel bei der Digitalisierung vorpreschen, hinken viele Zentralschweizer Gewerbe- und Tourismusbetriebe hinterher. Nicht aus Desinteresse, sondern weil die passenden, einfachen Lösungen fehlen.",
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
        <h2 className="text-[24px] font-bold mb-4">Wie KaderOS Luzerner Unternehmen hilft</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          KaderOS gibt dir ein AI-Team, das sich an deine Auslastung anpasst. In der Hochsaison
          skaliert dein Kader mit — ohne Temporärstellen und Einarbeitungszeit. In ruhigeren
          Phasen konzentrierst du dich auf Strategie und Planung.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Für <Link href="/ai-team/cto-fuer-treuhand" className="text-[#000088] font-medium hover:underline">Treuhandbüros</Link> in
          der Zentralschweiz automatisiert KaderOS Belegverarbeitung und Mandanten-Reporting.
          Für Tourismusbetriebe übernehmen AI-Agents die Gästekommunikation in mehreren Sprachen.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Keine IT-Abteilung nötig. KaderOS ist in 5 Minuten eingerichtet und so einfach zu
          bedienen, dass auch der traditionellste Gewerbebetrieb sofort loslegen kann.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-6">Häufige Fragen — Luzern</h2>
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
          AI Team für dein Unternehmen in Luzern aufsetzen
        </h2>
        <p className="text-[#6E6E73] text-[14px] mb-6">
          Kostenlos starten. nDSG-konform ab Tag 1. Swiss Made.
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

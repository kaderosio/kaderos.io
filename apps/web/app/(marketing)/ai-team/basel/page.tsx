import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  RelatedLinks,
  getRelatedCityLinks,
  getRelatedBranchenLinks,
} from "@/components/related-links";

export const metadata = {
  title: "AI Team für Unternehmen in Basel — KaderOS",
  description:
    "KaderOS baut AI-Teams für Basler KMUs. Pharma, Life Sciences, Logistik — dein AI-Kader versteht die Region Nordwestschweiz. Swiss Made, nDSG-konform.",
};

const faqs = [
  {
    q: "Wie unterstützt KaderOS Unternehmen im Pharma-Umfeld Basel?",
    a: "KaderOS automatisiert Dokumentation, Compliance-Checks und Reporting — Aufgaben, die im regulierten Pharma-Umfeld besonders zeitintensiv sind. Das Confidence-Gate-System stellt sicher, dass kritische Entscheidungen immer von Fachpersonen abgesegnet werden.",
  },
  {
    q: "Ist KaderOS für den trinationalen Raum Basel geeignet?",
    a: "Ja. KaderOS arbeitet sprachübergreifend und versteht den trinationalen Kontext von Basel. Ob dein Team Deutsch, Französisch oder Englisch kommuniziert — die AI-Agents passen sich an.",
  },
  {
    q: "Wie schnell kann ein Basler KMU mit KaderOS starten?",
    a: "In 5 Minuten. Du wählst ein Template für deine Branche, passt die Agents an und dein AI-Team ist einsatzbereit. Keine lange Implementierung, keine IT-Projekte.",
  },
];

export default function BaselPage() {
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
    ...getRelatedCityLinks("basel"),
    ...getRelatedBranchenLinks("basel"),
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
          { label: "Basel" },
        ]}
      />

      <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
        Standort
      </div>
      <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
        AI Team für Unternehmen in Basel
      </h1>
      <p className="text-[#6E6E73] text-[16px] leading-relaxed mb-10 max-w-2xl">
        Basel ist die Pharma-Hauptstadt der Schweiz und ein Tor zu Europa. KaderOS hilft
        Unternehmen in der Region Nordwestschweiz, mit AI-Agents schneller und effizienter
        zu arbeiten.
      </p>

      {/* Wirtschaftsstruktur */}
      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Basels Wirtschaft: Pharma, Logistik und mehr</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Basel ist Sitz von Roche und Novartis — zwei der grössten Pharmaunternehmen der Welt.
          Rund um diese Giganten hat sich ein dichtes Ökosystem aus Biotech-Startups,
          Zulieferern, CROs und spezialisierten Dienstleistern gebildet. Life Sciences
          sind der Motor der Basler Wirtschaft.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Doch Basel ist auch eine Logistik-Drehscheibe. Der Rheinhafen ist der grösste
          Binnenhafen der Schweiz, und die Dreiländereck-Lage macht die Stadt zu einem
          wichtigen Handelsknoten. Speditions- und Logistikunternehmen sind stark vertreten.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Dazu kommen eine lebendige Kreativwirtschaft — Basel ist eine der wichtigsten
          Kunstmessen-Städte der Welt — und ein wachsender Tech-Sektor mit dem
          Switzerland Innovation Park an der Schnittstelle von Pharma und Technologie.
        </p>
      </section>

      {/* Challenges */}
      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Herausforderungen für Basler KMUs</h2>
        <div className="grid gap-4">
          {[
            {
              title: "Regulatorisches Umfeld der Life Sciences",
              desc: "Pharma-Zulieferer und Dienstleister müssen GxP-Richtlinien, Qualitätsdokumentation und Audit-Trails einhalten. Der Aufwand für Compliance ist enorm — gerade für kleine Teams.",
            },
            {
              title: "Trinationale Komplexität",
              desc: "Viele Basler Unternehmen arbeiten über drei Länder hinweg. Das bedeutet unterschiedliche Rechtsräume, Sprachen und Steuersysteme — ein Verwaltungsaufwand, der KMUs überproportional belastet.",
            },
            {
              title: "Talentknappheit durch Grosskonzerne",
              desc: "Roche, Novartis und Co. ziehen die besten Talente an. KMUs kämpfen darum, qualifizierte Fachkräfte zu finden — und können im Lohnwettbewerb mit den Pharma-Riesen oft nicht mithalten.",
            },
          ].map((p) => (
            <div key={p.title} className="border border-[#E5E5EA] rounded-2xl p-6">
              <h3 className="text-[16px] font-semibold mb-2">{p.title}</h3>
              <p className="text-[14px] text-[#6E6E73] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KaderOS Lösung */}
      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Wie KaderOS Basler Unternehmen hilft</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          KaderOS gibt dir ein Team aus AI-Agents, die deine Branche verstehen. Für
          Life-Sciences-Zulieferer automatisieren die Agents Dokumentation und Quality Checks.
          Für Logistikunternehmen übernehmen sie Auftragsverarbeitung und Tracking.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Das <Link href="/ai-team/cto-fuer-ecommerce" className="text-[#000088] font-medium hover:underline">E-Commerce-Template</Link> hilft
          Basler Handelsunternehmen, ihren Online-Kanal zu skalieren. Für Treuhandbüros
          gibt es ein eigenes <Link href="/ai-team/cto-fuer-treuhand" className="text-[#000088] font-medium hover:underline">Treuhand-Template</Link> mit
          MWST-Prüfung und Mandanten-Reporting.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Als Swiss Made Software erfüllt KaderOS die strengen Compliance-Anforderungen des
          Pharma-Umfelds. Open Source bedeutet volle Auditierbarkeit — ein Pluspunkt
          in einer Branche, in der Transparenz keine Option, sondern Pflicht ist.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-6">Häufige Fragen — Basel</h2>
        <div className="grid gap-4">
          {faqs.map((f) => (
            <div key={f.q} className="border border-[#E5E5EA] rounded-2xl p-6">
              <h3 className="text-[16px] font-semibold mb-2">{f.q}</h3>
              <p className="text-[14px] text-[#6E6E73] leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-[#000088]/20 bg-[#000088]/5 p-8 text-center">
        <h2 className="text-[22px] font-bold mb-2">
          AI Team für dein Unternehmen in Basel aufsetzen
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

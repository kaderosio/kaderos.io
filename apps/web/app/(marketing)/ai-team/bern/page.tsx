import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  RelatedLinks,
  getRelatedCityLinks,
  getRelatedBranchenLinks,
} from "@/components/related-links";

export const metadata = {
  title: "AI Team für Unternehmen in Bern — KaderOS",
  description:
    "KaderOS baut AI-Teams für Berner KMUs. Verwaltung, Gesundheit, Bildung — dein AI-Kader versteht die Bundesstadt. Swiss Made, nDSG-konform.",
};

const faqs = [
  {
    q: "Eignet sich KaderOS für Unternehmen im öffentlichen Umfeld in Bern?",
    a: "Absolut. Gerade für Unternehmen, die mit der Bundesverwaltung zusammenarbeiten oder im regulierten Umfeld tätig sind, ist nDSG-Konformität Pflicht. KaderOS ist Swiss Made, Open Source und bietet volle Transparenz — ideal für das Berner Umfeld.",
  },
  {
    q: "Wie unterstützt KaderOS Berner KMUs bei der Digitalisierung?",
    a: "KaderOS stellt dir AI-Agents zusammen, die Routinearbeit automatisieren — von Buchhaltung über Kundenkommunikation bis Reporting. So hast du mehr Zeit für das, was zählt: dein Kerngeschäft und deine Mandanten.",
  },
  {
    q: "Kann ich KaderOS als Beratungsunternehmen in Bern nutzen?",
    a: "Ja. Viele Beratungsunternehmen in Bern nutzen KaderOS, um Research, Analyse und Report-Erstellung zu automatisieren. Dein AI-Team übernimmt die Vorarbeit, du lieferst die Expertise.",
  },
];

export default function BernPage() {
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
    ...getRelatedCityLinks("bern"),
    ...getRelatedBranchenLinks("bern"),
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
          { label: "Bern" },
        ]}
      />

      <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
        Standort
      </div>
      <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
        AI Team für Unternehmen in Bern
      </h1>
      <p className="text-[#6E6E73] text-[16px] leading-relaxed mb-10 max-w-2xl">
        Bern ist Bundesstadt, Verwaltungszentrum und Heimat tausender KMUs. KaderOS hilft
        Berner Unternehmen, mit AI-Agents effizienter zu arbeiten — ohne Kompromisse bei
        Datenschutz und Compliance.
      </p>

      {/* Wirtschaftsstruktur */}
      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Berns Wirtschaft: Zwischen Bundeshaus und KMU</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Bern ist mehr als Politik. Die Bundesstadt beherbergt einen starken Dienstleistungssektor
          mit Schwerpunkten in Beratung, Gesundheitswesen, Bildung und IT. Rund um die
          Bundesverwaltung hat sich ein Ökosystem aus Beratungsfirmen, IT-Dienstleistern und
          spezialisierten Agenturen gebildet, die für öffentliche und private Auftraggeber arbeiten.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Die Universität Bern, das Inselspital und diverse Forschungseinrichtungen machen die
          Stadt zu einem Zentrum für MedTech und Gesundheitsinnovation. Gleichzeitig ist Bern
          ein wichtiger Standort für Versicherungen — mit der Mobiliar, der Visana und weiteren
          grossen Anbietern.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Für KMUs in Bern heisst das: hohe Qualitätsansprüche, regulatorische Anforderungen
          und der Druck, in einem kompetitiven Umfeld effizient zu bleiben. Genau hier setzt
          KaderOS an.
        </p>
      </section>

      {/* Challenges */}
      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Herausforderungen für Berner KMUs</h2>
        <div className="grid gap-4">
          {[
            {
              title: "Verwaltungsnähe und Compliance-Anforderungen",
              desc: "Wer im Umfeld der Bundesverwaltung arbeitet, muss strenge Vorgaben einhalten. nDSG, Informationssicherheit und Datenschutz sind keine Option, sondern Pflicht — auch für Zulieferer und Partner.",
            },
            {
              title: "Fachkräftewettbewerb mit dem Bund",
              desc: "Die Bundesverwaltung ist einer der grössten Arbeitgeber der Region. KMUs konkurrieren direkt mit dem Bund um qualifizierte Mitarbeitende — und können bei Löhnen und Sozialleistungen oft nicht mithalten.",
            },
            {
              title: "Digitalisierungsdruck bei knappen Ressourcen",
              desc: "Berner KMUs wissen, dass Digitalisierung nötig ist. Aber das Budget für ein eigenes IT-Team fehlt oft. Es braucht Lösungen, die sofort Wirkung zeigen, ohne monatelange Projekte.",
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
        <h2 className="text-[24px] font-bold mb-4">Wie KaderOS Berner Unternehmen hilft</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          KaderOS gibt dir ein AI-Team, das sofort produktiv ist. Statt monatelang eine Stelle
          auszuschreiben, hast du in 5 Minuten spezialisierte Agents für Buchhaltung, Kommunikation,
          Research und mehr.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Für <Link href="/ai-team/cto-fuer-treuhand" className="text-[#000088] font-medium hover:underline">Treuhandgesellschaften</Link> und
          Beratungsunternehmen automatisiert KaderOS die zeitintensivsten Prozesse. Für
          IT-Dienstleister übernimmt dein AI-CTO Monitoring und Infrastrukturaufgaben.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Das Confidence-Gate-System sorgt dafür, dass dein AI-Team bei komplexen Entscheidungen
          immer einen Menschen einbezieht. So behältst du die Kontrolle — genau wie es das
          regulatorische Umfeld in Bern verlangt.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Als Open-Source-Lösung bietet KaderOS die Transparenz, die Unternehmen im
          verwaltungsnahen Umfeld brauchen. Kein Vendor Lock-in, keine Black Box.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-6">Häufige Fragen — Bern</h2>
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
          AI Team für dein Unternehmen in Bern aufsetzen
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

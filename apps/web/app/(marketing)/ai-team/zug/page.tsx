import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  RelatedLinks,
  getRelatedCityLinks,
  getRelatedBranchenLinks,
} from "@/components/related-links";

export const metadata = {
  title: "AI Team für Unternehmen in Zug — KaderOS",
  description:
    "KaderOS baut AI-Teams für Zuger Unternehmen. Crypto Valley, Startups, Rohstoffhandel — dein AI-Kader versteht Zugs einzigartige Wirtschaft. Swiss Made.",
};

const faqs = [
  {
    q: "Wie hilft KaderOS Startups im Crypto Valley Zug?",
    a: "KaderOS gibt Crypto-Valley-Startups ein ganzes AI-Team: CTO-Agent für Code Reviews und Smart-Contract-Dokumentation, Marketing-Agent für Community und Content, Operations-Agent für Admin und Compliance. Ohne zusätzliche Burn Rate.",
  },
  {
    q: "Ist KaderOS für regulierte Unternehmen in Zug geeignet?",
    a: "Ja. KaderOS ist Swiss Made, nDSG-konform und Open Source. Das Confidence-Gate-System stellt sicher, dass regulatorisch relevante Entscheidungen immer von einem Menschen freigegeben werden — ideal für Finanz- und Crypto-Unternehmen.",
  },
  {
    q: "Was kostet ein AI-Team für ein Zuger Startup?",
    a: "KaderOS startet kostenlos. Professionelle Pläne gibt es ab CHF 49/Monat. Im Vergleich zu Zuger Gehaltsniveaus — wo selbst Juniorstellen schnell CHF 100K+ kosten — eine massive Ersparnis für ressourcenschonende Startups.",
  },
];

export default function ZugPage() {
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
    ...getRelatedCityLinks("zug"),
    ...getRelatedBranchenLinks("zug"),
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
          { label: "Zug" },
        ]}
      />

      <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
        Standort
      </div>
      <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
        AI Team für Unternehmen in Zug
      </h1>
      <p className="text-[#6E6E73] text-[16px] leading-relaxed mb-10 max-w-2xl">
        Zug ist das Crypto Valley, ein Steuerparadies und Heimat von Tausenden innovativer
        Unternehmen. KaderOS hilft Zuger Firmen, mit AI-Agents schneller zu skalieren —
        ohne die Burn Rate zu sprengen.
      </p>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Zugs Wirtschaft: Wo Crypto auf Commodity trifft</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Zug ist einer der aussergewöhnlichsten Wirtschaftsstandorte der Welt. Auf engstem
          Raum treffen sich drei völlig unterschiedliche Welten: Das Crypto Valley mit
          Ethereum Foundation, Polkadot und hunderten Blockchain-Startups. Der Rohstoffhandel
          mit Glencore und weiteren globalen Playern. Und ein starker Mittelstand mit
          MedTech, Biotech und traditionellem Gewerbe.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Die tiefen Steuersätze ziehen Unternehmen aus aller Welt an. Zug hat mehr
          registrierte Unternehmen pro Einwohner als fast jeder andere Ort der Schweiz.
          Das schafft ein einzigartiges, dichtes Ökosystem — aber auch einen intensiven
          Wettbewerb um Talente und Aufmerksamkeit.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Die Nähe zu Zürich (25 Minuten mit dem Zug) gibt Zuger Unternehmen Zugang zum
          grössten Talentpool der Schweiz, während sie von den Zuger Standortvorteilen
          profitieren.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Herausforderungen für Zuger Unternehmen</h2>
        <div className="grid gap-4">
          {[
            {
              title: "Extremer Talent-Wettbewerb",
              desc: "In Zug konkurrieren Crypto-Startups, Rohstoffgiganten und Tech-Scale-ups um dieselben Talente. Gute Entwickler und Operations-Leute sind heiss umkämpft und teuer — selbst für gut finanzierte Startups.",
            },
            {
              title: "Schnelles Wachstum, knappe Kapazitäten",
              desc: "Viele Zuger Startups wachsen schneller als ihre Teams. Die Lücke zwischen Ambitionen und operativer Kapazität wird zum Engpass — gerade bei Admin, Compliance und Reporting.",
            },
            {
              title: "Regulierung im Crypto-Bereich",
              desc: "Blockchain-Unternehmen müssen sich im komplexen Geflecht von FINMA-Regulierung, AML-Vorschriften und Token-Klassifizierungen zurechtfinden. Compliance ist zeitintensiv und braucht Expertise.",
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
        <h2 className="text-[24px] font-bold mb-4">Wie KaderOS Zuger Unternehmen hilft</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          KaderOS ist wie eine Geheimwaffe für das Crypto Valley: Du bekommst ein ganzes
          AI-Team, ohne teure Vollzeitstellen zu besetzen. Dein AI-CTO reviewt Code und
          überwacht die Infrastruktur, dein Marketing-Agent baut Community und Content,
          dein Operations-Agent kümmert sich um Admin und Reporting.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Für <Link href="/ai-team/cto-fuer-startup" className="text-[#000088] font-medium hover:underline">Crypto-Startups</Link> ist
          das Confidence-Gate-System besonders wertvoll: Dein AI-Team arbeitet autonom bei
          Standardaufgaben und holt sich bei kritischen Entscheidungen — wie Compliance-
          Fragen oder Sicherheits-Reviews — dein OK.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Auch für etablierte Unternehmen in Zug — ob <Link href="/ai-team/cto-fuer-treuhand" className="text-[#000088] font-medium hover:underline">Treuhandgesellschaften</Link>, MedTech-
          Firmen oder Handelsunternehmen — automatisiert KaderOS die zeitintensivsten
          Prozesse und gibt dir Kapazität für Wachstum zurück.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Open Source und Swiss Made — KaderOS passt zum Ethos des Crypto Valley:
          Transparent, dezentral denkend und auf Eigenverantwortung gebaut.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-6">Häufige Fragen — Zug</h2>
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
          AI Team für dein Unternehmen in Zug aufsetzen
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

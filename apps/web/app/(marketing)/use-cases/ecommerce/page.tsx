import Link from "next/link";

export const metadata = {
  title: "AI-Team für E-Commerce — Produkttexte, Support & Analytics | KaderOS",
  description:
    "KaderOS automatisiert E-Commerce-Arbeit: Produktbeschreibungen, Kundensupport, Bestandsanalysen. Spare CHF 10'000+/Mt. mit deinem AI-Team.",
};

const painPoints = [
  {
    title: "Hunderte Produkttexte, kein Copywriter",
    desc: "Jedes Produkt braucht eine Beschreibung, SEO-optimiert, in mehreren Sprachen. Bei 500+ Produkten ist das ein Vollzeitjob.",
  },
  {
    title: "Support-Anfragen stapeln sich",
    desc: "«Wo ist mein Paket?», «Kann ich umtauschen?», «Passt Grösse M?» — 80% der Anfragen sind repetitiv, aber Kunden erwarten schnelle Antworten.",
  },
  {
    title: "Daten gibt es genug — Insights nicht",
    desc: "Google Analytics, Shop-Daten, Ad-Performance — alles da, aber niemand hat Zeit, die Zahlen zu analysieren und Massnahmen abzuleiten.",
  },
];

const agents = [
  { name: "Leyla", role: "Content Creator", tasks: "Produkttexte, Kategorie-Beschreibungen, SEO-Meta" },
  { name: "Support", role: "Kundenservice Agent", tasks: "FAQ-Antworten, Retouren-Abwicklung, Live-Chat" },
  { name: "Noah", role: "Analytics Agent", tasks: "Umsatz-Reports, Conversion-Analyse, Bestseller-Tracking" },
  { name: "Ava", role: "Marktanalyse", tasks: "Wettbewerbspreise, Trend-Produkte, Saisonalität" },
];

export default function EcommerceUseCasePage() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      {/* Header */}
      <div className="mb-12">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Use Case
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          AI-Team für E-Commerce
        </h1>
        <p className="text-[#6E6E73] text-[16px] leading-relaxed max-w-2xl">
          Produkttexte, Kundensupport und Analytics auf Autopilot. KaderOS gibt deinem
          Online-Shop ein AI-Team, das 24/7 arbeitet — für einen Bruchteil der Personalkosten.
        </p>
      </div>

      {/* Pain Points */}
      <div className="mb-12">
        <h2 className="text-[24px] font-bold mb-6">Das Problem</h2>
        <div className="grid gap-4">
          {painPoints.map((p) => (
            <div key={p.title} className="border border-[#E5E5EA] rounded-2xl p-6">
              <h3 className="text-[16px] font-semibold mb-2">{p.title}</h3>
              <p className="text-[14px] text-[#6E6E73] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Solution */}
      <div className="mb-12">
        <h2 className="text-[24px] font-bold mb-4">Die Lösung: Dein AI-Kader</h2>
        <p className="text-[#6E6E73] text-[16px] leading-relaxed mb-6">
          Das <strong className="text-[#1D1D1F]">E-Commerce-Template</strong> von KaderOS stellt dir
          4 spezialisierte Agents bereit. Sie schreiben Produkttexte, beantworten Kundenanfragen,
          analysieren deine Shop-Daten und beobachten den Markt — rund um die Uhr.
        </p>
        <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-[#E5E5EA]">
          <p className="text-[13px] text-[#86868B] mb-1">Template-Beispiel</p>
          <p className="text-[15px] font-semibold">
            &laquo;E-Commerce Engine&raquo; — 4 Agents für Content, Support, Analytics und Marktanalyse
          </p>
        </div>
      </div>

      {/* Agent Table */}
      <div className="mb-12">
        <h2 className="text-[24px] font-bold mb-6">So sieht dein Kader aus</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[14px] border-collapse">
            <thead>
              <tr className="border-b-2 border-[#000088]/20">
                <th className="text-left py-3 pr-4 font-semibold text-[#1D1D1F]">Agent</th>
                <th className="text-left py-3 px-4 font-semibold text-[#000088]">Rolle</th>
                <th className="text-left py-3 pl-4 font-semibold text-[#6E6E73]">Aufgaben</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((a, i) => (
                <tr key={a.name} className={i % 2 === 0 ? "bg-[#FAFAFA]" : ""}>
                  <td className="py-3 pr-4 font-medium text-[#1D1D1F]">{a.name}</td>
                  <td className="py-3 px-4 text-[#1D1D1F]">{a.role}</td>
                  <td className="py-3 pl-4 text-[#6E6E73]">{a.tasks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Savings */}
      <div className="mb-12 rounded-2xl border border-[#E5E5EA] p-8 text-center">
        <p className="text-[13px] text-[#86868B] uppercase tracking-widest mb-2">Monatliche Ersparnis</p>
        <p className="text-[48px] font-bold text-[#000088]">CHF 10&apos;800+</p>
        <p className="text-[14px] text-[#6E6E73] mt-2 max-w-md mx-auto">
          Basierend auf 25h/Woche automatisierter Produkttexte, Support und Reporting
          zu Schweizer E-Commerce-Raten von CHF 105/h.
        </p>
        <Link
          href="/tools/ai-team-calculator"
          className="inline-block mt-4 text-[13px] text-[#000088] font-semibold hover:underline"
        >
          Deine Ersparnis berechnen &rarr;
        </Link>
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-[#000088]/20 bg-[#000088]/5 p-8 text-center">
        <h2 className="text-[22px] font-bold mb-2">Starte mit dem E-Commerce-Template</h2>
        <p className="text-[#6E6E73] text-[14px] mb-6">
          Keine Kreditkarte nötig. Dein AI-Shop-Team in 30 Minuten.
        </p>
        <Link
          href="/signup"
          className="inline-block px-8 py-3 bg-[#000088] text-white text-[14px] font-semibold rounded-xl hover:bg-[#000066] transition-colors"
        >
          Kostenlos starten
        </Link>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between text-[13px]">
        <Link href="/use-cases" className="text-[#86868B] hover:text-[#000088] transition-colors">
          &larr; Alle Use Cases
        </Link>
        <Link href="/tools/ai-team-calculator" className="text-[#86868B] hover:text-[#000088] transition-colors">
          AI-Team Kalkulator &rarr;
        </Link>
      </div>
    </article>
  );
}

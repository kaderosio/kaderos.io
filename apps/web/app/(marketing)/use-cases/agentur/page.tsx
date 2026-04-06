import Link from "next/link";

export const metadata = {
  title: "AI-Team für Agenturen — Mehr Kunden, gleich viele Leute | KaderOS",
  description:
    "KaderOS automatisiert repetitive Agentur-Arbeit: Content, Reporting, Client-Kommunikation. Spare CHF 12'000+/Mt. pro Team.",
};

const painPoints = [
  {
    title: "Jeder Kunde will Custom — aber du hast kein Team dafür",
    desc: "Copywriting, Social Media, Reportings — für 10+ Kunden gleichzeitig. Jeder Kunde fühlt sich wie der Einzige, aber dein Team ist am Limit.",
  },
  {
    title: "Mitarbeiter kommen und gehen",
    desc: "Hohe Fluktuation in Agenturen bedeutet: Wissen geht verloren, Onboarding kostet Zeit, Qualität schwankt.",
  },
  {
    title: "Margen sinken bei steigendem Aufwand",
    desc: "Kunden erwarten mehr Output für weniger Budget. Ohne Automatisierung schrumpfen deine Margen jedes Quartal.",
  },
];

const agents = [
  { name: "Leyla", role: "Content Creator", tasks: "Blogartikel, Social Posts, Newsletter" },
  { name: "Noah", role: "Reporting Agent", tasks: "Kunden-Reports, KPI-Dashboards, Analysen" },
  { name: "Zara", role: "Client Manager", tasks: "E-Mail-Entwürfe, Follow-ups, Briefings" },
  { name: "Ava", role: "Research Analyst", tasks: "Wettbewerbsanalysen, Trend-Reports, Marktdaten" },
];

export default function AgenturUseCasePage() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      {/* Header */}
      <div className="mb-12">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Use Case
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          AI-Team für Agenturen
        </h1>
        <p className="text-[#6E6E73] text-[16px] leading-relaxed max-w-2xl">
          Mehr Kunden betreuen, ohne mehr Leute einzustellen. KaderOS gibt deiner Agentur
          AI Agents für Content, Reporting und Client Management.
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
          Das <strong className="text-[#1D1D1F]">Agentur-Template</strong> von KaderOS gibt dir
          4 spezialisierte Agents. Sie schreiben Content, erstellen Reports und managen Client-Kommunikation —
          mit deinem Brand Voice, konsistent über alle Kunden.
        </p>
        <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-[#E5E5EA]">
          <p className="text-[13px] text-[#86868B] mb-1">Template-Beispiel</p>
          <p className="text-[15px] font-semibold">
            &laquo;Agentur Powerhouse&raquo; — 4 Agents für Content, Reporting, Clients und Research
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
        <p className="text-[48px] font-bold text-[#000088]">CHF 12&apos;400+</p>
        <p className="text-[14px] text-[#6E6E73] mt-2 max-w-md mx-auto">
          Basierend auf 30h/Woche automatisierter Content-Produktion und Reporting
          zu Schweizer Agentur-Raten von CHF 120/h.
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
        <h2 className="text-[22px] font-bold mb-2">Starte mit dem Agentur-Template</h2>
        <p className="text-[#6E6E73] text-[14px] mb-6">
          Keine Kreditkarte nötig. In 30 Minuten steht dein AI-Team.
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

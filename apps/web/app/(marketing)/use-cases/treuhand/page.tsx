import Link from "next/link";

export const metadata = {
  title: "AI-Team für Treuhänder — Buchhaltung automatisieren | KaderOS",
  description:
    "KaderOS automatisiert Treuhand-Arbeit: Belegverarbeitung, MWST-Kontrolle, Mandanten-Reporting. Spare CHF 6'000+/Mt. pro Mitarbeiter.",
};

const painPoints = [
  {
    title: "Belegberge und Deadlines",
    desc: "Quartalsabschlüsse, MWST-Abrechnungen, Jahresabschlüsse — alles gleichzeitig. Dein Team ertrinkt in repetitiver Arbeit.",
  },
  {
    title: "Fachkräftemangel in der Treuhandbranche",
    desc: "Gute Treuhänder sind rar. Offene Stellen bleiben monatelang unbesetzt, während die Mandanten mehr werden.",
  },
  {
    title: "Mandanten erwarten mehr Service",
    desc: "Proaktive Beratung statt nur Buchhaltung — aber dafür fehlt die Zeit, wenn 80% des Tages in Routinearbeit fliesst.",
  },
];

const agents = [
  { name: "Finn", role: "Buchhaltungs-Agent", tasks: "Belegerfassung, Kontierung, Abstimmungen" },
  { name: "Compliance", role: "MWST-Prüfer", tasks: "MWST-Kontrolle, Vorsteuerabzug, Plausibilitätschecks" },
  { name: "Noah", role: "Reporting Agent", tasks: "Mandanten-Reports, Quartalsübersichten, Kennzahlen" },
];

export default function TreuhandUseCasePage() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      {/* Header */}
      <div className="mb-12">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Use Case
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          AI-Team für Treuhänder
        </h1>
        <p className="text-[#6E6E73] text-[16px] leading-relaxed max-w-2xl">
          Mehr Mandanten betreuen, weniger Routine. KaderOS automatisiert Belegverarbeitung,
          MWST-Prüfung und Reporting — nDSG-konform und Swiss Made.
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
          Das <strong className="text-[#1D1D1F]">Treuhand-Template</strong> von KaderOS stellt dir
          3 spezialisierte Agents zur Seite. Sie verarbeiten Belege, prüfen MWST-Abrechnungen und
          erstellen Mandanten-Reports — mit Confidence Gates für kritische Entscheidungen.
        </p>
        <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-[#E5E5EA]">
          <p className="text-[13px] text-[#86868B] mb-1">Template-Beispiel</p>
          <p className="text-[15px] font-semibold">
            &laquo;Treuhand Digital&raquo; — 3 Agents für Buchhaltung, Compliance und Reporting
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
        <p className="text-[48px] font-bold text-[#000088]">CHF 6&apos;500+</p>
        <p className="text-[14px] text-[#6E6E73] mt-2 max-w-md mx-auto">
          Basierend auf 15h/Woche automatisierter Belegverarbeitung und Reporting
          zu Schweizer Treuhand-Raten von CHF 110/h.
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
        <h2 className="text-[22px] font-bold mb-2">Starte mit dem Treuhand-Template</h2>
        <p className="text-[#6E6E73] text-[14px] mb-6">
          Keine Kreditkarte nötig. nDSG-konform ab Tag 1.
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

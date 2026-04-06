import Link from "next/link";

export const metadata = {
  title: "AI-Team für Freelancer — Ein ganzes Team, null Gehälter | KaderOS",
  description:
    "KaderOS gibt Freelancern ein AI-Team für Admin, Akquise, Buchhaltung und Content. Spare CHF 4'000+/Mt. und fokussiere dich auf dein Kerngeschäft.",
};

const painPoints = [
  {
    title: "Du bist alles gleichzeitig",
    desc: "Projektarbeit, Akquise, Offerten, Buchhaltung, Social Media — als Freelancer machst du alles allein. Deine billable Hours leiden.",
  },
  {
    title: "Admin frisst deine beste Zeit",
    desc: "Rechnungen schreiben, Steuern vorbereiten, E-Mails beantworten: 10-15h pro Woche gehen für Admin drauf, nicht für bezahlte Arbeit.",
  },
  {
    title: "Keine Sichtbarkeit ohne Marketing",
    desc: "Du weisst, dass du online präsent sein solltest — LinkedIn, Blog, Portfolio. Aber nach einem langen Projekttag fehlt die Energie.",
  },
];

const agents = [
  { name: "Leyla", role: "Marketing Agent", tasks: "LinkedIn-Posts, Portfolio-Texte, Akquise-Mails" },
  { name: "Finn", role: "Admin Assistant", tasks: "Rechnungen, Zeiterfassung, Steuer-Vorbereitung" },
  { name: "Zara", role: "Client Manager", tasks: "Offerten, Follow-ups, Projekt-Updates" },
];

export default function FreelancerUseCasePage() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      {/* Header */}
      <div className="mb-12">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Use Case
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          AI-Team für Freelancer
        </h1>
        <p className="text-[#6E6E73] text-[16px] leading-relaxed max-w-2xl">
          Ein ganzes Team — ohne ein einziges Gehalt. KaderOS gibt dir AI Agents für
          Marketing, Admin und Client Management, damit du dich auf dein Kerngeschäft fokussierst.
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
          Das <strong className="text-[#1D1D1F]">Freelancer-Template</strong> von KaderOS stellt dir
          3 AI Agents zur Seite. Sie kümmern sich um Marketing, Admin und Client-Kommunikation —
          du fokussierst dich auf das, wofür Kunden dich bezahlen.
        </p>
        <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-[#E5E5EA]">
          <p className="text-[13px] text-[#86868B] mb-1">Template-Beispiel</p>
          <p className="text-[15px] font-semibold">
            &laquo;Freelancer Pro&raquo; — 3 Agents für Marketing, Admin und Clients
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
        <p className="text-[48px] font-bold text-[#000088]">CHF 4&apos;200+</p>
        <p className="text-[14px] text-[#6E6E73] mt-2 max-w-md mx-auto">
          Basierend auf 10h/Woche automatisierter Admin- und Marketing-Arbeit
          zu einem Opportunitätskosten-Satz von CHF 100/h.
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
        <h2 className="text-[22px] font-bold mb-2">Starte mit dem Freelancer-Template</h2>
        <p className="text-[#6E6E73] text-[14px] mb-6">
          Keine Kreditkarte nötig. Dein AI-Team steht in 30 Minuten.
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

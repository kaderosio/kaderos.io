import Link from "next/link";

export const metadata = {
  title: "KaderOS vs Mem0 — Ehrlicher Vergleich 2026",
  description:
    "Mem0 und KaderOS im direkten Vergleich: Pricing, Memory Layers, Schweiz-Tauglichkeit und mehr. Ehrlich und ohne Marketing-Blabla.",
};

const rows = [
  { feature: "Pricing", kaderos: "Free Tier + ab CHF 5/Mt.", competitor: "Free Tier + Pro $249/Mt." },
  { feature: "Memory Layers", kaderos: "7 Schichten (Perception → Dream)", competitor: "Key-Value + Graph Memory" },
  { feature: "LLM Required", kaderos: "Nein — reine Datenbank", competitor: "Ja — braucht OpenAI/Anthropic API" },
  { feature: "Swiss/DACH Focus", kaderos: "Ja — gebaut für die Schweiz", competitor: "Nein — US-fokussiert" },
  { feature: "Knowledge Graph", kaderos: "Ja — lebendes Entity-Netz", competitor: "Basic Graph (seit 2025)" },
  { feature: "Dream Cycle", kaderos: "Ja — nächtliche Konsolidierung", competitor: "Nein" },
  { feature: "Predictive Engine", kaderos: "Ja — proaktive Alerts", competitor: "Nein" },
  { feature: "Procedural Memory", kaderos: "Ja — 3x = Regel", competitor: "Nein" },
  { feature: "CHF Support", kaderos: "Ja — native", competitor: "Nein — nur USD" },
  { feature: "nDSG Compliance", kaderos: "Ja — Swiss Hosting", competitor: "Nein — US Hosting" },
  { feature: "Open Source", kaderos: "Ja (AGPLv3)", competitor: "Teilweise (SDK)" },
  { feature: "Target Audience", kaderos: "KMU-Gründer", competitor: "Enterprise Developers" },
];

export default function CompareMem0() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Vergleich
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          KaderOS vs Mem0
        </h1>
        <p className="text-[#6E6E73] text-[16px] leading-relaxed">
          Mem0 ist der bekannteste AI Memory Service. Aber $249/Monat für Pro. Braucht ein
          Schweizer KMU das?
        </p>
      </div>

      <div className="overflow-x-auto mb-12">
        <table className="w-full text-[14px] border-collapse">
          <thead>
            <tr className="border-b-2 border-[#000088]/20">
              <th className="text-left py-3 pr-4 font-semibold text-[#1D1D1F]">Feature</th>
              <th className="text-left py-3 px-4 font-semibold text-[#000088]">KaderOS</th>
              <th className="text-left py-3 pl-4 font-semibold text-[#6E6E73]">Mem0</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.feature} className={i % 2 === 0 ? "bg-[#FAFAFA]" : ""}>
                <td className="py-3 pr-4 font-medium text-[#1D1D1F]">{r.feature}</td>
                <td className="py-3 px-4 text-[#1D1D1F]">{r.kaderos}</td>
                <td className="py-3 pl-4 text-[#6E6E73]">{r.competitor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:text-[#6E6E73] [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-[#6E6E73] [&_strong]:text-[#1D1D1F]">
        <h2>Für wen ist Mem0 besser?</h2>
        <ul className="space-y-2 mb-8 list-disc pl-5">
          <li>Du bist Enterprise-Developer und brauchst eine Memory-API für deine bestehende App.</li>
          <li>Du arbeitest bereits mit OpenAI oder Anthropic und willst nur eine Memory-Schicht dazuschalten.</li>
          <li>Budget spielt keine Rolle — $249/Monat für Pro ist OK.</li>
        </ul>

        <h2>Für wen ist KaderOS besser?</h2>
        <ul className="space-y-2 mb-8 list-disc pl-5">
          <li>Du bist KMU-Gründer und willst ein komplettes AI-Team mit Gedächtnis — nicht nur eine API.</li>
          <li>Du brauchst nDSG-Konformität, Swiss Hosting und CHF-Support.</li>
          <li>Du willst 7 Memory-Schichten (inkl. Dream Cycle und Predictive Engine) für einen Bruchteil der Kosten.</li>
        </ul>

        <h2>Fazit</h2>
        <p>
          Mem0 ist stark für Enterprise-Developer die eine Memory-API brauchen. KaderOS ist für
          KMU-Gründer die ein komplettes AI-Team mit Gedächtnis wollen — für einen Bruchteil der Kosten.
        </p>
      </div>

      {/* CTA Box */}
      <div className="mt-12 rounded-2xl border border-[#000088]/20 bg-[#000088]/5 p-8 text-center">
        <h2 className="text-[22px] font-bold mb-2">Teste den KaderOS Brain kostenlos</h2>
        <p className="text-[#6E6E73] text-[14px] mb-6">
          7 Memory-Schichten. Swiss Hosting. Ab CHF 5/Monat.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup"
            className="inline-block px-8 py-3 bg-[#000088] text-white text-[14px] font-semibold rounded-xl hover:bg-[#000066] transition-colors"
          >
            Kostenlos starten
          </Link>
          <Link
            href="/brain"
            className="inline-block px-8 py-3 border border-[#000088] text-[#000088] text-[14px] font-semibold rounded-xl hover:bg-[#000088]/5 transition-colors"
          >
            Brain entdecken
          </Link>
        </div>
      </div>

      <div className="mt-8 flex justify-between text-[13px]">
        <Link href="/compare" className="text-[#86868B] hover:text-[#000088] transition-colors">
          &larr; Alle Vergleiche
        </Link>
        <Link href="/pricing" className="text-[#86868B] hover:text-[#000088] transition-colors">
          Preise &rarr;
        </Link>
      </div>
    </article>
  );
}

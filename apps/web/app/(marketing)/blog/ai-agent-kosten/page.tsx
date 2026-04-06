import Link from "next/link";

export const metadata = {
  title: "Was kostet ein AI-Agent vs. ein Mitarbeiter? | KaderOS",
  description:
    "CHF 6'500 Grundlohn plus Sozialabgaben vs. CHF 49/Monat für ein AI-Kader. Die ehrliche Rechnung für Schweizer KMU — mit konkreten Zahlen.",
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Blog
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          Was kostet ein AI-Agent vs. ein Mitarbeiter?
        </h1>
        <div className="text-[14px] text-[#86868B]">
          6. April 2026 · 8 min Lesezeit
        </div>
      </div>
      <div className="prose prose-lg max-w-none [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-[#6E6E73] [&_p]:leading-relaxed [&_p]:mb-6 [&_li]:text-[#6E6E73] [&_strong]:text-[#1D1D1F]">
        <p>
          CHF 6&apos;500 Grundlohn. Plus Sozialabgaben. Plus Büro. Plus Hardware. Plus drei Monate Einarbeitung bei halber Leistung.
        </p>
        <p>
          Ein Junior-Mitarbeiter kostet dich über CHF 100&apos;000 pro Jahr. Bevor er oder sie eine einzige Aufgabe autonom erledigt.
        </p>
        <p>
          Ein AI-Kader bei KaderOS kostet CHF 49 pro Monat. Und arbeitet ab Tag 1.
        </p>
        <p>
          Klingt nach einem unfairen Vergleich? Ist es auch. Aber die Zahlen stimmen. Und genau darum lohnt es sich, sie durchzurechnen.
        </p>

        <h2>Was ein Junior-Mitarbeiter in der Schweiz wirklich kostet</h2>
        <p>
          Die meisten Gründer rechnen mit dem Bruttolohn. Das ist ein Fehler. Die tatsächlichen Kosten liegen 40-60% darüber. Hier die ehrliche Rechnung:
        </p>
        <p>
          <strong>Grundlohn:</strong> CHF 6&apos;500 pro Monat (CHF 78&apos;000/Jahr)
        </p>
        <p>
          <strong>Sozialabgaben (~21%):</strong>
        </p>
        <ul>
          <li>AHV/IV/EO: 5.3%</li>
          <li>ALV: 1.1%</li>
          <li>BVG (Pensionskasse): ~10-12%</li>
          <li>UVG/NBU: ~2-3%</li>
          <li>Familienzulagen: ~1.2%</li>
        </ul>
        <p>
          Total Sozialabgaben: ca. CHF 1&apos;365 pro Monat. CHF 16&apos;380 pro Jahr.
        </p>
        <p>
          <strong>Büro und Infrastruktur:</strong> Arbeitsplatz, Hardware, Software-Lizenzen — ca. CHF 600-800 pro Monat. CHF 7&apos;200-9&apos;600 pro Jahr.
        </p>
        <p>
          <strong>Einarbeitung:</strong> Die ersten 3 Monate bei ca. 50% Produktivität. Effektiver Verlust: ca. CHF 10&apos;000-15&apos;000.
        </p>
        <p>
          <strong>Ferienanspruch:</strong> 4-5 Wochen pro Jahr. Kosten: ca. CHF 7&apos;500-9&apos;750 pro Jahr.
        </p>
        <p>
          <strong>Krankheit und Abwesenheit:</strong> Durchschnittlich 5% Abwesenheit pro Jahr. Kosten: ca. CHF 3&apos;900 pro Jahr.
        </p>

        <h3>Total: CHF 115&apos;000-130&apos;000 im ersten Jahr</h3>
        <p>
          Ab dem zweiten Jahr stabilisiert sich das bei CHF 100&apos;000-110&apos;000. Ohne Lohnerhöhung. Ohne Bonus. Ohne Weiterbildung.
        </p>

        <h2>Was ein AI-Kader bei KaderOS kostet</h2>
        <p>
          <strong>KaderOS Pro Plan:</strong> CHF 49 pro Monat
        </p>
        <p>
          Darin enthalten: 4 AI-Kader-Mitglieder (z.B. CEO-Agent, Finanz-Kader, Marketing-Kader, Operations-Kader), Gedächtnis über alle Gespräche, Heartbeat Engine für automatische Status-Updates, Budget-Tracking, Entscheidungs-Logbuch.
        </p>
        <p>
          <strong>API-Kosten (BYOK):</strong> Bei normaler Nutzung CHF 5-15 pro Monat. Bei intensiver Nutzung CHF 20-40 pro Monat.
        </p>
        <p>
          <strong>Total pro Jahr: CHF 660-780</strong>
        </p>
        <p>
          Das sind weniger als 1% der Kosten eines Junior-Mitarbeiters.
        </p>

        <h2>Der direkte Vergleich</h2>
        <div className="overflow-x-auto my-8">
          <table className="min-w-full text-[14px] border-collapse">
            <thead>
              <tr className="border-b border-[#E5E5E7]">
                <th className="text-left py-3 pr-4 font-semibold text-[#1D1D1F]">Kriterium</th>
                <th className="text-left py-3 pr-4 font-semibold text-[#1D1D1F]">Junior-Mitarbeiter</th>
                <th className="text-left py-3 pr-4 font-semibold text-[#1D1D1F]">AI-Kader (KaderOS)</th>
              </tr>
            </thead>
            <tbody className="[&_td]:py-2 [&_td]:pr-4 [&_td]:text-[#6E6E73] [&_tr]:border-b [&_tr]:border-[#F0F0F0]">
              <tr><td><strong>Kosten pro Jahr</strong></td><td>CHF 115'000-130'000</td><td>CHF 660-780</td></tr>
              <tr><td><strong>Verfügbarkeit</strong></td><td>8h/Tag, Mo-Fr</td><td>24/7, 365 Tage</td></tr>
              <tr><td><strong>Skalierung</strong></td><td>Neuer Headcount = neue Kosten</td><td>4 Kader inklusive</td></tr>
              <tr><td><strong>Einarbeitung</strong></td><td>3 Monate, 50% Produktivität</td><td>Sofort einsatzbereit</td></tr>
              <tr><td><strong>Kündigung</strong></td><td>1-3 Monate Kündigungsfrist</td><td>Monatlich kündbar</td></tr>
              <tr><td><strong>Audit Trail</strong></td><td>Verstreut (E-Mails, Notizen)</td><td>Jede Entscheidung dokumentiert</td></tr>
              <tr><td><strong>Konsistenz</strong></td><td>Tagesform-abhängig</td><td>Gleiche Qualität, immer</td></tr>
              <tr><td><strong>Urlaub/Krankheit</strong></td><td>5-6 Wochen Ausfall/Jahr</td><td>Kein Ausfall</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Was ein AI-Kader NICHT kann</h2>
        <p>
          Hier wird es ehrlich. Und diese Ehrlichkeit ist wichtig, bevor du Entscheidungen triffst.
        </p>
        <p>
          <strong>Kundenbeziehungen pflegen.</strong> Kein AI-Kader ruft deinen wichtigsten Kunden an. Beziehungen brauchen Menschen.
        </p>
        <p>
          <strong>Kreative Strategie entwickeln.</strong> Ein AI-Kader kann Daten auswerten, Muster erkennen, Optionen vorschlagen. Aber die Vision für dein Unternehmen kommt von dir.
        </p>
        <p>
          <strong>Verhandlungen führen.</strong> Preisverhandlungen, Partnerschaftsgespräche, Konfliktlösung. Das erfordert Empathie, Intuition, menschliches Gespür.
        </p>
        <p>
          <strong>Physische Arbeit.</strong> Kein AI-Kader packt Pakete, repariert Maschinen oder schüttelt Hände an einer Messe.
        </p>
        <p>
          AI-Kader ergänzen. Sie ersetzen nicht. Wer etwas anderes behauptet, verkauft dir etwas.
        </p>

        <h2>Der Sweet Spot: AI-Kader + Mensch</h2>
        <p>
          <strong>AI-Kader übernehmen:</strong>
        </p>
        <ul>
          <li>Tägliche Reports und Statusberichte</li>
          <li>Budget-Überwachung und Warnungen</li>
          <li>E-Mail-Entwürfe und Follow-ups</li>
          <li>Datenaufbereitung und Analyse</li>
          <li>Meeting-Vorbereitung und Protokolle</li>
          <li>Routine-Entscheidungen nach klaren Regeln</li>
          <li>Dokumentation und Compliance-Checks</li>
        </ul>
        <p>
          <strong>Menschen übernehmen:</strong>
        </p>
        <ul>
          <li>Kundengespräche und Beziehungspflege</li>
          <li>Strategische Entscheidungen</li>
          <li>Kreative Arbeit und Innovation</li>
          <li>Verhandlungen und Partnerschaften</li>
          <li>Teamführung und Kultur</li>
        </ul>

        <h2>Die Rechnung für dein KMU</h2>
        <p>
          Sagen wir, du hast 3 Mitarbeitende, die jeweils 30% ihrer Zeit mit repetitiven Aufgaben verbringen.
        </p>
        <p>
          30% von 3 Stellen = ca. 1 Vollzeitstelle repetitive Arbeit. Kosten: ca. CHF 100&apos;000 pro Jahr.
        </p>
        <p>
          Kosten eines AI-Kaders, das diese Arbeit übernimmt: CHF 660-780 pro Jahr.
        </p>
        <p>
          <strong>Ersparnis: über CHF 99&apos;000 pro Jahr.</strong>
        </p>
        <p>
          Und deine 3 Mitarbeitenden haben plötzlich 30% mehr Zeit für die Arbeit, die wirklich zählt.
        </p>

        <h2>Fazit</h2>
        <p>
          CHF 49 pro Monat. 4 AI-Kader. 24/7 verfügbar. Sofort einsatzbereit. Monatlich kündbar.
        </p>
        <p>
          Das ersetzt keinen einzigen Menschen. Aber es macht jede Person in deinem Team deutlich produktiver.
        </p>
        <p>
          Die Frage ist nicht, ob du dir einen AI-Kader leisten kannst. Die Frage ist, ob du dir leisten kannst, darauf zu verzichten.
        </p>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#000088]/5 to-white border border-[#000088]/10">
          <h3 className="text-[20px] font-bold text-[#1D1D1F] mb-3">
            Dein nächster Schritt
          </h3>
          <p className="text-[15px] text-[#6E6E73] mb-5">
            Platz sichern und dein AI-Kader in 5 Minuten aufsetzen. Swiss Made. Lokal. Dein.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#000088] text-white text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-[#2D2F9E] transition-colors"
          >
            Kostenlos starten
          </Link>
        </div>
      </div>
    </article>
  );
}

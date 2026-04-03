import Link from "next/link";

export const metadata = {
  title: "AI Budget planen: So kalkulierst du realistisch | KaderOS",
  description:
    "AI Budget für Schweizer KMU realistisch planen. Von API-Kosten über Personalaufwand bis ROI — mit konkreten CHF-Zahlen und Rechenbeispielen.",
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Blog
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          AI Budget planen: So kalkulierst du realistisch
        </h1>
        <div className="text-[14px] text-[#86868B]">
          13. April 2026 · 7 min Lesezeit
        </div>
      </div>
      <div className="prose prose-lg max-w-none [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-[#6E6E73] [&_p]:leading-relaxed [&_p]:mb-6 [&_li]:text-[#6E6E73] [&_strong]:text-[#1D1D1F]">
        <p>
          «Was kostet AI?» Die häufigste Frage, die wir hören. Und die
          ehrliche Antwort: Es kommt drauf an. Aber das hilft dir nicht bei der
          Budgetplanung. Deshalb hier konkrete Zahlen, echte Szenarien und eine
          Formel, die funktioniert.
        </p>

        <h2>Die drei Kostenbereiche</h2>
        <p>
          Jedes AI-Budget besteht aus drei Blöcken. Wer einen davon vergisst,
          hat am Ende eine böse Überraschung.
        </p>

        <h3>1. Direkte Kosten: APIs und Tools</h3>
        <p>
          Das sind die Kosten, die du an Anbieter zahlst. API-Calls bei OpenAI,
          Anthropic oder Mistral. SaaS-Lizenzen für Agent-Frameworks. Hosting
          für eigene Modelle.
        </p>
        <ul>
          <li>
            <strong>LLM API-Kosten:</strong> CHF 50–500 pro Monat für ein
            typisches KMU. Abhängig von Volumen und Modellwahl. GPT-4o kostet
            mehr als Claude Haiku. Wähle das Modell nach Aufgabe, nicht nach
            Hype.
          </li>
          <li>
            <strong>Agent-Framework:</strong> CHF 0 (Open Source) bis CHF 300
            pro Monat (managed). KaderOS startet bei CHF 149/Monat.
          </li>
          <li>
            <strong>Hosting und Infrastruktur:</strong> CHF 20–200 pro Monat.
            Cloud-basiert ist günstiger als On-Premise.
          </li>
        </ul>

        <h3>2. Indirekte Kosten: Zeit und Personal</h3>
        <p>
          Der grösste Posten — und der am häufigsten vergessene. Jemand muss
          die Agents einrichten, Prompts schreiben, Workflows testen und
          Ergebnisse überwachen. Das braucht Zeit.
        </p>
        <ul>
          <li>
            <strong>Setup:</strong> 20–40 Stunden für den ersten Agent. Danach
            5–10 Stunden pro weiterem Agent.
          </li>
          <li>
            <strong>Laufende Betreuung:</strong> 2–5 Stunden pro Woche. Monitoring,
            Anpassungen, Feedback verarbeiten.
          </li>
          <li>
            <strong>Training:</strong> 4–8 Stunden pro Team-Mitglied für das
            initiale Onboarding.
          </li>
        </ul>

        <h3>3. Versteckte Kosten: Was niemand einplant</h3>
        <p>
          Datenbereinigung. Bevor ein Agent deine Kundendaten nutzen kann,
          müssen die Daten sauber sein. Und das sind sie nie. Rechne mit 10–20
          Stunden für die initiale Bereinigung.
        </p>
        <p>
          Compliance-Prüfung. Das nDSG verlangt eine Datenschutz-Folgenabschätzung
          für AI-Systeme. Ein Anwalt kostet CHF 2'000–5'000 dafür. Oder du
          nutzt ein Framework, das Compliance eingebaut hat.
        </p>

        <h2>Drei Szenarien: Klein, Mittel, Gross</h2>
        <h3>Solo-Founder / Micro-KMU (1–3 Personen)</h3>
        <ul>
          <li>API-Kosten: CHF 50–100/Monat</li>
          <li>Framework: CHF 0–149/Monat</li>
          <li>Zeitaufwand: 5h/Woche eigene Zeit</li>
          <li>
            <strong>Total: CHF 200–400/Monat + eigene Zeit</strong>
          </li>
        </ul>

        <h3>KMU (10–50 Personen)</h3>
        <ul>
          <li>API-Kosten: CHF 200–500/Monat</li>
          <li>Framework: CHF 149–500/Monat</li>
          <li>Teilzeit AI-Verantwortlicher: CHF 2'000/Monat (40%)</li>
          <li>
            <strong>Total: CHF 2'500–3'000/Monat</strong>
          </li>
        </ul>

        <h3>Grösseres Unternehmen (50+ Personen)</h3>
        <ul>
          <li>API-Kosten: CHF 500–2'000/Monat</li>
          <li>Framework: CHF 500–1'500/Monat</li>
          <li>Dedizierter AI-Manager: CHF 8'000/Monat</li>
          <li>
            <strong>Total: CHF 9'000–12'000/Monat</strong>
          </li>
        </ul>

        <h2>Die ROI-Formel</h2>
        <p>
          ROI messen ist nicht kompliziert. Du brauchst zwei Zahlen:
        </p>
        <ul>
          <li>
            <strong>Gesparte Stunden pro Monat</strong> x interner Stundensatz
          </li>
          <li>
            <strong>Minus</strong> AI-Kosten pro Monat (direkt + indirekt)
          </li>
        </ul>
        <p>
          Beispiel: Ein Agent spart 40 Stunden pro Monat. Interner Stundensatz:
          CHF 80. Das sind CHF 3'200 Ersparnis. Minus CHF 500 AI-Kosten.
          Netto-ROI: CHF 2'700 pro Monat. Payback in unter einem Monat.
        </p>

        <h2>Fünf Tipps für die Budgetplanung</h2>
        <h3>1. Klein starten, schnell messen</h3>
        <p>
          Starte mit CHF 500/Monat. Wenn der ROI da ist, skalierst du. Wenn
          nicht, hast du wenig verloren.
        </p>

        <h3>2. API-Kosten überwachen</h3>
        <p>
          API-Kosten können explodieren, wenn Agents in Schleifen laufen oder
          unnötig grosse Modelle nutzen. Setze Budget-Limits. Jedes
          vernünftige Framework bietet das.
        </p>

        <h3>3. Opportunitätskosten einrechnen</h3>
        <p>
          Was kostet es, NICHT in AI zu investieren? Wenn dein Konkurrent
          mit drei Leuten das schafft, wofür du zehn brauchst — dann ist
          Nichtstun die teuerste Option.
        </p>

        <h3>4. Quartalsweise planen</h3>
        <p>
          AI entwickelt sich schnell. Was im Januar teuer war, ist im April
          vielleicht halb so teuer. Plane in 3-Monats-Zyklen, nicht in
          Jahresbudgets.
        </p>

        <h3>5. Puffer einplanen</h3>
        <p>
          20% Puffer auf das geplante Budget. Immer. Es kommen Dinge, die
          du nicht erwartet hast. Datenbereinigung dauert länger. Ein Agent
          braucht mehr Tuning. Das ist normal.
        </p>

        <h2>Fazit</h2>
        <p>
          AI ist nicht gratis. Aber es ist deutlich günstiger, als die meisten
          denken. Ein realistisches Budget für ein KMU liegt zwischen CHF 500
          und CHF 3'000 pro Monat. Der ROI kommt oft innerhalb der ersten
          Wochen. Aber nur, wenn du planst — nicht rätst.
        </p>
      </div>
      <div className="mt-16 p-8 rounded-2xl bg-[#FAFAFA] border border-[#E5E5EA] text-center">
        <h3 className="text-[20px] font-bold mb-2">
          Bereit für dein AI-Team?
        </h3>
        <p className="text-[14px] text-[#86868B] mb-4">
          Sichere dir deinen Platz auf der Waitlist.
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 bg-[#000088] text-white text-[14px] font-semibold rounded-xl hover:bg-[#000066] transition-all"
        >
          Platz sichern →
        </Link>
      </div>
    </article>
  );
}

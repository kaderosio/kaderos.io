import Link from "next/link";

export const metadata = {
  title: "Was kostet AI wirklich? Ein ehrlicher Vergleich für KMU | KaderOS",
  description:
    "AI-Kosten für Schweizer KMU transparent aufgeschlüsselt. Von API-Kosten bis TCO — mit konkreten CHF-Zahlen und einem ehrlichen ROI-Vergleich.",
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Blog
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          Was kostet AI wirklich? Ein ehrlicher Vergleich für KMU
        </h1>
        <div className="text-[14px] text-[#86868B]">
          6. April 2026 · 7 min Lesezeit
        </div>
      </div>
      <div className="prose prose-lg max-w-none [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-[#6E6E73] [&_p]:leading-relaxed [&_p]:mb-6 [&_li]:text-[#6E6E73] [&_strong]:text-[#1D1D1F]">
        <p>
          &quot;AI ist günstig.&quot; &quot;AI spart dir Millionen.&quot; &quot;AI kostet fast nichts.&quot; Das liest du überall. Aber stimmt das? Besonders für ein Schweizer KMU mit 5–50 Mitarbeitern, das nicht in Dollar denkt und keine VC-Millionen hat.
        </p>
        <p>
          Wir machen Klartext. Hier sind die echten Kosten, aufgeschlüsselt in CHF, mit konkreten Beispielen und einem ehrlichen ROI-Vergleich.
        </p>

        <h2>Die drei Kostenblöcke von AI</h2>

        <h3>1. API-Kosten (die offensichtlichen Kosten)</h3>
        <p>
          Jeder AI Agent braucht ein Sprachmodell im Hintergrund. Die grossen Anbieter — OpenAI, Anthropic, Google — berechnen nach Token. Ein Token ist ungefähr ein Wort.
        </p>
        <p>
          Aktuelle Preise (Stand April 2026, gerundet):
        </p>
        <ul>
          <li><strong>GPT-4.1:</strong> ca. CHF 2.00 pro 1M Input-Tokens, CHF 8.00 pro 1M Output-Tokens</li>
          <li><strong>Claude Opus 4:</strong> ca. CHF 14.00 pro 1M Input-Tokens, CHF 70.00 pro 1M Output-Tokens</li>
          <li><strong>Claude Sonnet 4:</strong> ca. CHF 3.00 pro 1M Input-Tokens, CHF 15.00 pro 1M Output-Tokens</li>
          <li><strong>Gemini 2.5 Pro:</strong> ca. CHF 1.25 pro 1M Input-Tokens, CHF 10.00 pro 1M Output-Tokens</li>
          <li><strong>Open Source (selbst gehostet):</strong> Hardware-Kosten, ca. CHF 200–500/Monat für einen dedizierten Server</li>
        </ul>
        <p>
          Was heisst das in der Praxis? Ein Content Agent, der täglich einen Blogpost und drei Social-Media-Posts erstellt, verbraucht ca. 500K–1M Tokens pro Tag. Das sind CHF 50–150 pro Monat bei Sonnet-Niveau. Absolut machbar.
        </p>
        <p>
          Ein Research Agent, der viel liest und analysiert, braucht mehr Input-Tokens. Rechne mit CHF 100–300 pro Monat.
        </p>

        <h3>2. Infrastrukturkosten (die versteckten Kosten)</h3>
        <p>
          API-Kosten sind nur die Spitze. Dazu kommen:
        </p>
        <ul>
          <li><strong>Orchestrierung:</strong> Ein System, das deine Agents koordiniert. CHF 50–200/Monat je nach Anbieter.</li>
          <li><strong>Tool-Integrationen:</strong> Dein Agent braucht Zugang zu deinem CRM, E-Mail, Dateisystem. Manche Integrationen sind gratis, andere kosten CHF 20–50/Monat pro Connector.</li>
          <li><strong>Speicher:</strong> Agents brauchen Kontext. Vergangene Gespräche, Dokumente, Daten. Vector-Datenbanken kosten CHF 20–100/Monat.</li>
          <li><strong>Monitoring:</strong> Du willst wissen, was deine Agents tun. Logging, Dashboards, Alerts. CHF 30–80/Monat.</li>
        </ul>

        <h3>3. Zeitkosten (die unterschätzten Kosten)</h3>
        <p>
          Der grösste Kostenpunkt wird selten erwähnt: deine eigene Zeit. Agents einrichten, testen, optimieren, überwachen — das kostet Stunden. Besonders am Anfang.
        </p>
        <p>
          Rechne mit 10–20 Stunden für den initialen Setup eines Agents. Dann 2–4 Stunden pro Woche für Optimierung und Monitoring. Nach 4–6 Wochen sinkt der Aufwand auf 1–2 Stunden pro Woche.
        </p>
        <p>
          Bei einem Stundensatz von CHF 150 (Founder-Opportunitätskosten) sind das CHF 1&apos;500–3&apos;000 für den Setup und CHF 600–900 pro Monat laufend. Diese Kosten werden oft vergessen.
        </p>

        <h2>Gesamtkosten: Drei Szenarien</h2>

        <h3>Szenario 1: Solo-Founder, 1 Agent</h3>
        <p>
          Ein Content Agent auf Sonnet-Basis. Erstellt tägliche Social-Media-Posts und wöchentliche Blogposts.
        </p>
        <ul>
          <li>API-Kosten: CHF 80/Monat</li>
          <li>Orchestrierung: CHF 50/Monat</li>
          <li>Tools: CHF 30/Monat</li>
          <li>Zeitkosten Setup: CHF 2&apos;000 (einmalig)</li>
          <li>Zeitkosten laufend: CHF 300/Monat</li>
        </ul>
        <p>
          <strong>Total laufend: ca. CHF 460/Monat</strong>
        </p>
        <p>
          Zum Vergleich: Ein Freelance-Texter kostet CHF 2&apos;000–4&apos;000/Monat für den gleichen Output.
        </p>

        <h3>Szenario 2: KMU, 3 Agents</h3>
        <p>
          Content Agent, Operations Agent, Research Agent. Team von 10 Personen.
        </p>
        <ul>
          <li>API-Kosten: CHF 350/Monat</li>
          <li>Orchestrierung: CHF 150/Monat</li>
          <li>Tools & Integrationen: CHF 120/Monat</li>
          <li>Speicher & Monitoring: CHF 100/Monat</li>
          <li>Zeitkosten Setup: CHF 5&apos;000 (einmalig)</li>
          <li>Zeitkosten laufend: CHF 800/Monat</li>
        </ul>
        <p>
          <strong>Total laufend: ca. CHF 1&apos;520/Monat</strong>
        </p>
        <p>
          Die drei Agents ersetzen ca. 50–60 Stunden manuelle Arbeit pro Monat. Bei CHF 80/Stunde sind das CHF 4&apos;000–4&apos;800 an Einsparungen. ROI: positiv ab Monat 2.
        </p>

        <h3>Szenario 3: Agentur, 5+ Agents</h3>
        <p>
          Content, Research, Operations, Analyse, Client Reporting. Team von 15–25 Personen.
        </p>
        <ul>
          <li>API-Kosten: CHF 800/Monat</li>
          <li>Orchestrierung: CHF 300/Monat</li>
          <li>Tools & Integrationen: CHF 250/Monat</li>
          <li>Speicher & Monitoring: CHF 150/Monat</li>
          <li>Zeitkosten Setup: CHF 10&apos;000 (einmalig)</li>
          <li>Zeitkosten laufend: CHF 1&apos;200/Monat</li>
        </ul>
        <p>
          <strong>Total laufend: ca. CHF 2&apos;700/Monat</strong>
        </p>
        <p>
          Zum Vergleich: Ein zusätzlicher Mitarbeiter all-in: CHF 8&apos;000–12&apos;000/Monat.
        </p>

        <h2>Der ehrliche ROI-Check</h2>
        <p>
          AI lohnt sich nicht immer. Hier sind die Fragen, die du dir stellen solltest:
        </p>
        <p>
          <strong>Lohnt es sich?</strong> Wenn dein Agent dir weniger als 10 Stunden pro Monat spart, lohnt es sich wahrscheinlich nicht. Der Overhead für Setup und Maintenance frisst den Gewinn.
        </p>
        <p>
          <strong>Wann ist der Break-even?</strong> Für die meisten KMU liegt der Break-even bei 2–3 Monaten. Wenn du nach 3 Monaten keinen klaren Nutzen siehst, stimmt etwas mit dem Setup nicht.
        </p>
        <p>
          <strong>Was ist der versteckte Nutzen?</strong> Nicht alles lässt sich in CHF messen. Schnellere Antwortzeiten, konsistentere Qualität, weniger Stress — das hat auch einen Wert. Aber sei vorsichtig mit &quot;weichen&quot; Benefits als Rechtfertigung für harte Kosten.
        </p>

        <h2>Die grössten Kostenfallen</h2>
        <p>
          <strong>Zu teures Modell.</strong> Nicht jede Aufgabe braucht das beste Modell. Ein Kategorisierungs-Agent braucht kein Opus. Sonnet oder sogar Haiku reicht oft.
        </p>
        <p>
          <strong>Zu viele Tokens.</strong> Schlecht geschriebene Prompts verschwenden Tokens. Ein Agent, der jedes Mal den kompletten Kontext mitschickt, kostet 3–5x mehr als nötig.
        </p>
        <p>
          <strong>Enterprise-Tools für KMU-Probleme.</strong> Du brauchst kein CHF 2&apos;000/Monat Enterprise-Abo für einen Newsletter-Agent. Skaliere mit dem Bedarf.
        </p>
        <p>
          <strong>Keine Kosten-Limits.</strong> Setze Budget-Caps für deine Agents. Ein Agent, der einen Loop hat und 10&apos;000 API-Calls macht, kann deine Monatsrechnung sprengen.
        </p>

        <h2>Tipps, um Kosten zu senken</h2>
        <ul>
          <li><strong>Caching:</strong> Gleiche Anfragen nicht doppelt an die API senden. Spart 20–40% der Kosten.</li>
          <li><strong>Modell-Routing:</strong> Einfache Aufgaben an günstige Modelle, komplexe an teure. Automatisch.</li>
          <li><strong>Prompt-Optimierung:</strong> Kürzere, präzisere Prompts = weniger Tokens = weniger Kosten.</li>
          <li><strong>Batch-Processing:</strong> Statt Echtzeit-Verarbeitung: Aufgaben sammeln und in Batches abarbeiten.</li>
          <li><strong>Open Source für Standardaufgaben:</strong> Llama, Mistral, Phi — für viele Aufgaben gut genug und deutlich günstiger.</li>
        </ul>

        <h2>Fazit</h2>
        <p>
          AI ist nicht gratis. Aber es ist drastisch günstiger als die Alternative — wenn du es richtig machst. Für ein typisches Schweizer KMU liegen die Kosten bei CHF 500–3&apos;000 pro Monat. Das ist ein Bruchteil eines zusätzlichen Mitarbeiters.
        </p>
        <p>
          Der Schlüssel: Klein anfangen, Kosten tracken, ROI messen. Nicht blind investieren, weil alle sagen, du musst AI machen. Investiere, weil du den konkreten Nutzen siehst.
        </p>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#000088]/5 to-white border border-[#000088]/10">
          <h3 className="text-[20px] font-bold text-[#1D1D1F] mb-3">
            Transparente AI-Kosten mit KaderOS
          </h3>
          <p className="text-[15px] text-[#6E6E73] mb-5">
            KaderOS zeigt dir genau, was jeder Agent kostet. Pro Task, pro Tag,
            pro Monat. In CHF. Keine Überraschungen.
          </p>
          <Link
            href="/landing"
            className="inline-flex items-center gap-2 bg-[#000088] text-white text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-[#2D2F9E] transition-colors"
          >
            Auf die Waitlist
          </Link>
        </div>
      </div>
    </article>
  );
}

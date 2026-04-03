import Link from "next/link";

export const metadata = {
  title: "Confidence Gate: Wann dein Agent autonom handelt",
  description:
    "Über 90%: auto-execute. 70-89%: inform. Unter 70%: eskalieren. Wie du die richtige Balance zwischen Autonomie und Kontrolle findest.",
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Blog
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          Confidence Gate: Wann dein Agent autonom handelt
        </h1>
        <div className="text-[14px] text-[#86868B]">
          8. April 2026 · 5 min Lesezeit
        </div>
      </div>
      <div className="prose prose-lg max-w-none [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-[#6E6E73] [&_p]:leading-relaxed [&_p]:mb-6 [&_li]:text-[#6E6E73] [&_strong]:text-[#1D1D1F]">
        <p>
          Die grösste Angst beim Einsatz von AI Agents: Was, wenn der Agent etwas Falsches macht? Eine falsche E-Mail verschickt. Eine falsche Rechnung erstellt. Eine falsche Entscheidung trifft. Diese Angst ist berechtigt. Und genau dafür haben wir das Confidence Gate gebaut.
        </p>

        <h2>Das Grundprinzip</h2>
        <p>
          Jeder Agent in KaderOS hat ein Confidence Gate. Es ist ein einstellbarer Schwellenwert, der bestimmt, wie autonom der Agent handeln darf. Das System funktioniert in drei Stufen:
        </p>
        <p>
          <strong>Über 90% Confidence: Auto-Execute.</strong> Der Agent ist sich sicher. Er handelt sofort. Du wirst informiert, aber nicht gefragt. Beispiel: Ein Standard-Reply auf eine FAQ-Anfrage.
        </p>
        <p>
          <strong>70–89% Confidence: Inform.</strong> Der Agent ist ziemlich sicher, aber nicht ganz. Er führt die Aktion aus und informiert dich sofort. Du kannst rückgängig machen. Beispiel: Ein Blogpost-Draft, der von der üblichen Tonalität abweicht.
        </p>
        <p>
          <strong>Unter 70% Confidence: Eskalieren.</strong> Der Agent ist unsicher. Er stoppt und fragt dich um Erlaubnis. Keine Aktion ohne dein OK. Beispiel: Eine ungewöhnliche Kundenanfrage, die er noch nie gesehen hat.
        </p>

        <h2>Warum feste Regeln nicht funktionieren</h2>
        <p>
          Viele Automatisierungs-Tools arbeiten mit If-Then-Regeln. "Wenn Betreff enthält 'Rechnung', dann weiterleiten an Buchhaltung." Das funktioniert für einfache Fälle. Aber die Realität ist komplex.
        </p>
        <p>
          Was, wenn die E-Mail "Rechnung" im Betreff hat, aber eigentlich eine Beschwerde ist? Was, wenn der Kunde Deutsch und Französisch mischt? Was, wenn der Kontext zweideutig ist? Feste Regeln scheitern an Nuancen. Confidence Gates nicht.
        </p>

        <h2>Wie Confidence berechnet wird</h2>
        <p>
          Der Confidence-Score basiert auf mehreren Faktoren:
        </p>
        <p>
          <strong>Ähnlichkeit zu bisherigen Tasks:</strong> Hat der Agent diese Art von Aufgabe schon mal gelöst? Je mehr Erfahrung, desto höher die Confidence.
        </p>
        <p>
          <strong>Eindeutigkeit des Inputs:</strong> Ist die Anfrage klar formuliert? Oder gibt es mehrere mögliche Interpretationen?
        </p>
        <p>
          <strong>Risiko der Aktion:</strong> E-Mail beantworten hat ein niedrigeres Risiko als eine Rechnung verschicken. Der Agent gewichtet das automatisch.
        </p>
        <p>
          <strong>Dein Feedback:</strong> Jedes Mal, wenn du eine Aktion bestätigst oder korrigierst, lernt der Agent. Seine Confidence-Berechnung wird mit der Zeit präziser.
        </p>

        <h2>Confidence Gates konfigurieren</h2>
        <p>
          Jeder Agent hat individuelle Schwellenwerte. Du kannst sie pro Agent und pro Aktionstyp einstellen:
        </p>
        <p>
          <strong>Konservativ (Anfang):</strong> Auto-Execute ab 95%. Inform ab 80%. Eskalieren unter 80%. Ideal für die ersten Wochen, wenn du dem System noch nicht vertraust.
        </p>
        <p>
          <strong>Balanced (Standard):</strong> Auto-Execute ab 90%. Inform ab 70%. Eskalieren unter 70%. Der Sweet Spot für die meisten Use Cases.
        </p>
        <p>
          <strong>Autonom (Erfahren):</strong> Auto-Execute ab 80%. Inform ab 60%. Eskalieren unter 60%. Für Agents, die sich bewährt haben und dein Vertrauen verdient haben.
        </p>

        <h2>Praxis-Beispiel: Support Agent</h2>
        <p>
          Dein Support-Agent bekommt eine Kundenanfrage: "Wo ist meine Bestellung?" Er prüft das CRM, findet die Tracking-Nummer und formuliert eine Antwort. Confidence: 94%. Auto-Execute. Die Antwort geht raus. Du siehst es im Log.
        </p>
        <p>
          Nächste Anfrage: "Ich möchte mein Abo kündigen und meine Daten löschen lassen." Das ist komplex — Kündigung plus DSGVO/nDSG-Anfrage. Confidence: 62%. Eskalieren. Der Agent formuliert einen Antwort-Entwurf und wartet auf dein OK.
        </p>
        <p>
          So behältst du die Kontrolle, ohne jeden einzelnen Fall selbst bearbeiten zu müssen.
        </p>

        <h2>Fazit</h2>
        <p>
          Confidence Gates sind der Unterschied zwischen einem nützlichen AI-Agent und einem gefährlichen. Sie geben dir die Kontrolle zurück, ohne die Geschwindigkeit zu opfern. Je länger dein Agent arbeitet, desto besser wird seine Einschätzung. Und desto mehr kannst du ihm vertrauen.
        </p>
        <p>
          Vertrauen kommt nicht auf Knopfdruck. Es wird verdient. Schritt für Schritt. Task für Task. Genau wie bei menschlichen Mitarbeitern.
        </p>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#000088]/5 to-white border border-[#000088]/10">
          <h3 className="text-[20px] font-bold text-[#1D1D1F] mb-3">
            Kontrolle ohne Micromanagement
          </h3>
          <p className="text-[15px] text-[#6E6E73] mb-5">
            Confidence Gates in KaderOS: Deine Agents handeln autonom — aber nur so weit, wie du es erlaubst.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#000088] text-white text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-[#2D2F9E] transition-colors"
          >
            Auf die Waitlist
          </Link>
        </div>
      </div>
    </article>
  );
}

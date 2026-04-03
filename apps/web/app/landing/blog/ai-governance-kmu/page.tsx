import Link from "next/link";

export const metadata = {
  title: "AI Governance für KMU: Regeln ohne Bürokratie | KaderOS",
  description:
    "AI Governance muss nicht kompliziert sein. Praktische Regeln für Schweizer KMU — ohne 50-seitiges Dokument, aber mit klaren Leitplanken.",
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Blog
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          AI Governance für KMU: Regeln ohne Bürokratie
        </h1>
        <div className="text-[14px] text-[#86868B]">
          14. April 2026 · 8 min Lesezeit
        </div>
      </div>
      <div className="prose prose-lg max-w-none [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-[#6E6E73] [&_p]:leading-relaxed [&_p]:mb-6 [&_li]:text-[#6E6E73] [&_strong]:text-[#1D1D1F]">
        <p>
          AI Governance klingt nach Konzern. Nach Compliance-Abteilung,
          Richtlinien-Ordnern und monatelangen Workshops. Aber als KMU
          brauchst du das nicht. Du brauchst drei Seiten. Maximal.
        </p>
        <p>
          Hier ist, wie du AI Governance aufbaust, die funktioniert — ohne
          dein Tagesgeschäft lahmzulegen.
        </p>

        <h2>Warum Governance überhaupt?</h2>
        <p>
          Ohne Regeln passieren Dinge wie: Ein Mitarbeiter füttert ChatGPT mit
          Kundendaten. Ein Agent verschickt eine Mail mit falschen Zahlen. Oder
          du wirst vom EDÖB angeschrieben, weil dein AI-System Personendaten
          ohne Rechtsgrundlage verarbeitet.
        </p>
        <p>
          Governance ist kein Luxus. Es ist Risikomanagement. Und für ein KMU
          ist das Risiko sogar grösser als für Konzerne — weil ein einziger
          Vorfall existenzbedrohend sein kann.
        </p>

        <h2>Die Minimal-Governance: 5 Regeln</h2>
        <p>
          Du brauchst kein 50-seitiges Dokument. Du brauchst fünf klare Regeln,
          die jeder versteht.
        </p>

        <h3>Regel 1: Welche Daten dürfen rein?</h3>
        <p>
          Definiere eine Ampel. Grün: Öffentliche Informationen, interne
          Prozessdaten ohne Personenbezug. Gelb: Anonymisierte Kundendaten,
          aggregierte Statistiken. Rot: Personendaten, Gesundheitsdaten,
          Finanzdaten von Kunden.
        </p>
        <p>
          Alles, was rot ist, geht nicht in ein externes AI-System. Punkt.
          Grün und gelb nur in Systeme, die nDSG-konform sind.
        </p>

        <h3>Regel 2: Wer darf was?</h3>
        <p>
          Nicht jeder braucht Zugang zu jedem Agent. Definiere Rollen:
        </p>
        <ul>
          <li>
            <strong>Admin:</strong> Kann Agents erstellen, konfigurieren und
            löschen. Typischerweise 1–2 Personen.
          </li>
          <li>
            <strong>User:</strong> Kann Agents nutzen und Feedback geben.
            Das ganze Team.
          </li>
          <li>
            <strong>Viewer:</strong> Kann Ergebnisse sehen, aber nicht
            interagieren. Für externe Partner.
          </li>
        </ul>

        <h3>Regel 3: Was darf der Agent alleine?</h3>
        <p>
          Das ist die wichtigste Regel. Definiere für jeden Agent einen
          Autonomie-Level:
        </p>
        <ul>
          <li>
            <strong>Vollautomatisch:</strong> Agent handelt ohne Rückfrage.
            Nur für risikoarme, repetitive Aufgaben.
          </li>
          <li>
            <strong>Halb-automatisch:</strong> Agent bereitet vor, Mensch
            bestätigt. Für Kundeninteraktionen und finanzielle Entscheidungen.
          </li>
          <li>
            <strong>Assistenz:</strong> Agent liefert Vorschläge, Mensch
            entscheidet. Für strategische und kreative Aufgaben.
          </li>
        </ul>

        <h3>Regel 4: Wie wird protokolliert?</h3>
        <p>
          Jede Aktion eines AI Agents muss nachvollziehbar sein. Nicht weil
          du paranoid bist — sondern weil du es brauchst, wenn etwas
          schiefgeht. Audit-Logs sind Pflicht. Wer hat wann welchen Agent
          genutzt? Was war der Input? Was der Output?
        </p>
        <p>
          Bei KaderOS sind Audit-Logs eingebaut. Bei anderen Tools musst du
          das separat einrichten. Mach es von Anfang an.
        </p>

        <h3>Regel 5: Was passiert bei Fehlern?</h3>
        <p>
          Definiere einen Eskalationspfad. Agent macht einen Fehler → wer wird
          informiert? → wer entscheidet, ob der Agent gestoppt wird? → wer
          kommuniziert an Betroffene?
        </p>
        <p>
          Das muss kein komplizierter Prozess sein. Aber es muss einen geben.
          Bevor der erste Fehler passiert.
        </p>

        <h2>nDSG: Was du wissen musst</h2>
        <p>
          Das neue Datenschutzgesetz der Schweiz gilt seit September 2023. Für
          AI bedeutet das:
        </p>
        <ul>
          <li>
            <strong>Transparenz:</strong> Kunden müssen wissen, wenn sie mit
            AI interagieren.
          </li>
          <li>
            <strong>Datensparsamkeit:</strong> Nur die Daten verwenden, die
            wirklich nötig sind.
          </li>
          <li>
            <strong>Zweckbindung:</strong> Daten nur für den Zweck nutzen,
            für den sie erhoben wurden.
          </li>
          <li>
            <strong>Datenschutz-Folgenabschätzung:</strong> Bei hohem Risiko
            Pflicht. AI-Systeme mit Personendaten fallen fast immer darunter.
          </li>
        </ul>

        <h2>Governance in der Praxis: Ein Beispiel</h2>
        <p>
          Eine Treuhand-Firma mit 12 Mitarbeitern. Sie nutzen drei AI Agents:
        </p>
        <ul>
          <li>
            <strong>Beleg-Agent:</strong> Scannt Belege, kontiert automatisch.
            Vollautomatisch, weil Fehler leicht erkennbar sind.
          </li>
          <li>
            <strong>Mail-Agent:</strong> Sortiert Kundenmails, bereitet
            Antworten vor. Halb-automatisch, weil der Treuhänder die Antwort
            prüft.
          </li>
          <li>
            <strong>Research-Agent:</strong> Sucht aktuelle Steuer-Infos für
            Mandanten. Assistenz-Modus, weil Steuerberatung immer menschliches
            Urteil braucht.
          </li>
        </ul>
        <p>
          Governance-Dokument: Eine Seite. Ampel-System für Daten. Drei
          Autonomie-Level. Ein Eskalationspfad. Fertig.
        </p>

        <h2>Die häufigsten Fehler</h2>
        <h3>Zu viel Governance</h3>
        <p>
          Wenn dein Governance-Dokument länger ist als 5 Seiten, liest es
          niemand. Und was niemand liest, befolgt niemand.
        </p>

        <h3>Keine Governance</h3>
        <p>
          «Wir sind ja nur ein kleines Team, das brauchen wir nicht.» Doch.
          Gerade kleine Teams. Weil dort ein Fehler überproportional
          schadet.
        </p>

        <h3>Governance ohne Review</h3>
        <p>
          Regeln, die du im Januar 2026 schreibst, sind im Juli 2026 veraltet.
          AI entwickelt sich schnell. Plane quartalsweise einen 30-Minuten-Review
          ein.
        </p>

        <h2>So startest du</h2>
        <p>
          Nimm dir eine Stunde. Schreib die fünf Regeln auf. Nicht perfekt —
          gut genug. Teile sie mit deinem Team. Lebe sie vor. Und überprüfe
          sie alle drei Monate.
        </p>
        <p>
          AI Governance ist kein Projekt mit einem Enddatum. Es ist eine
          Gewohnheit. Und Gewohnheiten baut man auf, indem man anfängt.
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
          href="/landing"
          className="inline-flex px-6 py-3 bg-[#000088] text-white text-[14px] font-semibold rounded-xl hover:bg-[#000066] transition-all"
        >
          Platz sichern →
        </Link>
      </div>
    </article>
  );
}

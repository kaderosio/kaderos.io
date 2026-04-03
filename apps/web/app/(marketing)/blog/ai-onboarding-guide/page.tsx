import Link from "next/link";

export const metadata = {
  title: "AI Onboarding: So machst du dein Team in 7 Tagen AI-ready | KaderOS",
  description:
    "Schritt-für-Schritt Anleitung für AI Onboarding in Schweizer KMU. In 7 Tagen vom Kickoff bis zum produktiven AI-Team — ohne Chaos und Widerstand.",
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Blog
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          AI Onboarding: So machst du dein Team in 7 Tagen AI-ready
        </h1>
        <div className="text-[14px] text-[#86868B]">
          11. April 2026 · 8 min Lesezeit
        </div>
      </div>
      <div className="prose prose-lg max-w-none [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-[#6E6E73] [&_p]:leading-relaxed [&_p]:mb-6 [&_li]:text-[#6E6E73] [&_strong]:text-[#1D1D1F]">
        <p>
          Du hast dich entschieden: AI kommt ins Team. Aber jetzt sitzt du vor
          der Frage — wie? Du kannst nicht einfach ein Tool installieren und
          hoffen, dass alle mitmachen. AI Onboarding braucht Struktur. Nicht
          viel, aber die richtige.
        </p>
        <p>
          Die gute Nachricht: Du brauchst keine drei Monate. Sieben Tage
          reichen, um dein Team AI-ready zu machen. Hier ist der Plan.
        </p>

        <h2>Warum AI Onboarding scheitert</h2>
        <p>
          Die meisten Firmen scheitern nicht an der Technologie. Sie scheitern am
          Menschen. Das Team versteht nicht, warum AI kommt. Oder schlimmer: Sie
          haben Angst davor. Verständlich. Wenn niemand erklärt, was AI kann und
          was nicht, füllt die Fantasie die Lücke. Und Fantasie ist selten
          optimistisch.
        </p>
        <p>
          Der zweite Fehler: Zu viel auf einmal. Drei Tools, fünf Workflows,
          zehn Schulungen. Das überfordert. Und überforderte Leute machen dicht.
        </p>

        <h2>Tag 1–2: Kickoff und Erwartungen klären</h2>
        <p>
          Am ersten Tag geht es nicht um Tools. Es geht um Kontext. Setz dich
          mit deinem Team zusammen und erkläre drei Dinge:
        </p>
        <ul>
          <li>
            <strong>Warum AI?</strong> Nicht weil es trendig ist. Sondern weil
            euer spezifisches Problem X damit besser gelöst wird.
          </li>
          <li>
            <strong>Was ändert sich?</strong> Welche Aufgaben werden anders —
            und welche bleiben genau gleich.
          </li>
          <li>
            <strong>Was ändert sich nicht?</strong> Niemand verliert seinen Job.
            AI übernimmt repetitive Arbeit, nicht kreative Entscheidungen.
          </li>
        </ul>
        <p>
          Tag 2 nutzt du für eine ehrliche Bestandsaufnahme. Welche Workflows
          kosten am meisten Zeit? Wo passieren die meisten Fehler? Wo wartet
          immer jemand auf jemand anderen? Das sind deine AI-Kandidaten.
        </p>

        <h2>Tag 3–4: Einen Pilot-Workflow auswählen</h2>
        <p>
          Nicht zehn. Einen. Such dir den Workflow raus, der drei Kriterien
          erfüllt:
        </p>
        <ul>
          <li>
            <strong>Hoher Zeitaufwand:</strong> Mindestens 5 Stunden pro Woche.
          </li>
          <li>
            <strong>Klare Regeln:</strong> Der Prozess folgt einer Logik, die
            man beschreiben kann.
          </li>
          <li>
            <strong>Sichtbares Ergebnis:</strong> Das Team sieht sofort, dass
            es funktioniert.
          </li>
        </ul>
        <p>
          Beispiel: E-Mail-Triage. Jeden Morgen sortiert jemand 50 Mails. Ein
          AI Agent kann das in 30 Sekunden — kategorisieren, priorisieren,
          Entwürfe vorbereiten. Das spart sofort eine Stunde pro Tag. Und das
          Team sieht es.
        </p>

        <h3>Den Pilot richtig aufsetzen</h3>
        <p>
          Definiere klare Erfolgskriterien: Wie viel Zeit soll gespart werden?
          Wie hoch darf die Fehlerrate sein? Was passiert, wenn der Agent
          unsicher ist? Bei KaderOS nutzen wir dafür Confidence Gates — der
          Agent handelt nur autonom, wenn er sich sicher ist. Alles andere geht
          zurück ans Team.
        </p>

        <h2>Tag 5: Hands-on Training</h2>
        <p>
          Jetzt wird es praktisch. Aber nicht mit einer PowerPoint. Sondern mit
          echten Aufgaben. Jede Person im Team arbeitet 30 Minuten mit dem AI
          Agent. Echte Mails, echte Daten, echte Entscheidungen.
        </p>
        <p>
          Wichtig: Lass Fehler zu. Der Agent wird nicht alles richtig machen.
          Das ist normal und sogar gut — denn so lernt dein Team, wann sie
          eingreifen müssen und wann sie vertrauen können.
        </p>

        <h3>Die richtigen Fragen stellen</h3>
        <p>
          Nach dem Hands-on sammelst du Feedback. Nicht «Hat es euch gefallen?»
          — das ist irrelevant. Sondern:
        </p>
        <ul>
          <li>Wo hat der Agent etwas falsch gemacht?</li>
          <li>Wo hat er euch überrascht?</li>
          <li>Was würdet ihr anders machen?</li>
        </ul>

        <h2>Tag 6: Anpassen und Feintunen</h2>
        <p>
          Basierend auf dem Feedback vom Vortag passt du den Workflow an. Vielleicht
          braucht der Agent klarere Anweisungen. Vielleicht muss die Confidence-Schwelle
          höher sein. Vielleicht gibt es Edge Cases, an die niemand gedacht hat.
        </p>
        <p>
          Das ist der wichtigste Tag. Denn hier zeigst du deinem Team: Wir
          hören zu. AI wird nicht über euren Kopf hinweg eingeführt. Ihr
          gestaltet mit.
        </p>

        <h2>Tag 7: Go-Live und Monitoring</h2>
        <p>
          Der Agent läuft jetzt produktiv. Aber du bist noch nicht fertig. Die
          erste Woche nach Go-Live ist kritisch. Plane tägliche Check-ins von 10
          Minuten. Drei Fragen:
        </p>
        <ul>
          <li>Was lief gut?</li>
          <li>Was lief schief?</li>
          <li>Was braucht ihr?</li>
        </ul>
        <p>
          Nach zwei Wochen hast du genug Daten für eine ehrliche Bilanz. Wie
          viel Zeit wurde gespart? Wie zufrieden ist das Team? Und — die
          wichtigste Frage — welcher Workflow kommt als nächstes?
        </p>

        <h2>Die drei grössten Fehler beim AI Onboarding</h2>
        <h3>1. Zu schnell skalieren</h3>
        <p>
          Ein Pilot funktioniert. Sofort werden zehn weitere Workflows
          automatisiert. Das Team kommt nicht hinterher. Ergebnis: Frust und
          Rückschritt. Besser: Ein neuer Workflow pro Monat.
        </p>
        <h3>2. Kein Champion im Team</h3>
        <p>
          Du brauchst eine Person, die AI im Alltag vertritt. Nicht der CEO. Jemand
          aus dem Team, der Fragen beantwortet, Feedback sammelt und als Brücke
          zwischen Technik und Praxis funktioniert.
        </p>
        <h3>3. Erfolge nicht feiern</h3>
        <p>
          Wenn der Agent in der ersten Woche 8 Stunden spart — sag es. Laut.
          Zeig die Zahlen. Menschen brauchen Beweise, dass Veränderung sich
          lohnt.
        </p>

        <h2>Fazit: AI Onboarding ist Change Management</h2>
        <p>
          AI einzuführen ist kein IT-Projekt. Es ist ein Kulturprojekt. Die
          Technologie funktioniert. Die Frage ist, ob dein Team mitzieht. Und
          das hängt davon ab, wie du den Prozess gestaltest.
        </p>
        <p>
          Sieben Tage. Ein Workflow. Echtes Feedback. Das ist alles, was du
          brauchst, um zu starten.
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

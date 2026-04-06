import Link from "next/link";

export const metadata = {
  title: "AI Agent vs Chatbot: Was ist der Unterschied? | KaderOS",
  description:
    "AI Agent und Chatbot werden oft verwechselt. Hier erfährst du den Unterschied — und warum er für dein Business entscheidend ist.",
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Blog
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          AI Agent vs Chatbot: Was ist der Unterschied?
        </h1>
        <div className="text-[14px] text-[#86868B]">
          16. April 2026 · 6 min Lesezeit
        </div>
      </div>
      <div className="prose prose-lg max-w-none [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-[#6E6E73] [&_p]:leading-relaxed [&_p]:mb-6 [&_li]:text-[#6E6E73] [&_strong]:text-[#1D1D1F]">
        <p>
          «Wir haben ja schon einen Chatbot.» Diesen Satz hören wir oft. Und
          er zeigt das grösste Missverständnis in der AI-Welt: Ein Chatbot
          und ein AI Agent sind nicht dasselbe. Nicht mal annähernd.
        </p>
        <p>
          Der Unterschied ist wie zwischen einem Telefonbeantworter und einem
          Mitarbeiter. Beide nehmen Anrufe entgegen. Aber nur einer kann
          wirklich handeln.
        </p>

        <h2>Was ist ein Chatbot?</h2>
        <p>
          Ein Chatbot reagiert auf Eingaben. Du schreibst etwas, er antwortet.
          Basierend auf vordefinierten Regeln oder — bei moderneren Versionen
          — auf einem Sprachmodell. Aber: Er bleibt im Chat. Er kann nichts
          tun ausserhalb des Textfensters.
        </p>
        <p>
          Typische Chatbot-Aufgaben:
        </p>
        <ul>
          <li>FAQ beantworten</li>
          <li>Öffnungszeiten nennen</li>
          <li>An die richtige Abteilung weiterleiten</li>
          <li>Einfache Formulare ausfüllen lassen</li>
        </ul>
        <p>
          Das ist nützlich. Aber es ist begrenzt. Ein Chatbot weiss nicht, was
          gestern passiert ist. Er kann keine Entscheidungen treffen. Er
          lernt nicht aus Fehlern.
        </p>

        <h2>Was ist ein AI Agent?</h2>
        <p>
          Ein AI Agent denkt und handelt. Er hat Zugang zu Tools, Daten und
          Systemen. Er kann Aufgaben über mehrere Schritte hinweg erledigen.
          Und er weiss, wann er nachfragen muss.
        </p>
        <p>
          Was ein AI Agent kann, was ein Chatbot nicht kann:
        </p>
        <ul>
          <li>
            <strong>Aktionen ausführen:</strong> E-Mails senden, Einträge
            in Datenbanken erstellen, Dateien verarbeiten.
          </li>
          <li>
            <strong>Kontext verstehen:</strong> Er weiss, wer der Kunde ist,
            was die letzte Bestellung war und welches Problem gerade offen ist.
          </li>
          <li>
            <strong>Entscheidungen treffen:</strong> Basierend auf Regeln und
            Confidence-Levels — nicht nur auf Mustererkennung.
          </li>
          <li>
            <strong>Mehrstufige Prozesse:</strong> Bestellung prüfen →
            Lager checken → Versandlabel erstellen → Kunden informieren.
            Alles in einem Durchgang.
          </li>
          <li>
            <strong>Aus Feedback lernen:</strong> Ein Agent wird besser.
            Ein Chatbot bleibt gleich.
          </li>
        </ul>

        <h2>Der Vergleich im Detail</h2>
        <h3>Intelligenz</h3>
        <p>
          <strong>Chatbot:</strong> Reagiert auf Keywords und Muster. Kann
          nicht «denken». Wenn die Frage nicht zum Training passt, kommt eine
          generische Antwort.
        </p>
        <p>
          <strong>AI Agent:</strong> Analysiert die Situation, wägt Optionen
          ab und wählt die beste Aktion. Kann mit Unsicherheit umgehen und
          eskaliert, wenn nötig.
        </p>

        <h3>Fähigkeiten</h3>
        <p>
          <strong>Chatbot:</strong> Text rein, Text raus. Mehr nicht.
        </p>
        <p>
          <strong>AI Agent:</strong> Text, Daten, APIs, Dateien, E-Mails,
          Datenbanken. Ein Agent ist so mächtig wie die Tools, die du ihm
          gibst.
        </p>

        <h3>Autonomie</h3>
        <p>
          <strong>Chatbot:</strong> Null. Jede Interaktion ist isoliert.
        </p>
        <p>
          <strong>AI Agent:</strong> Konfigurierbar. Von «frag immer nach»
          bis «handle selbständig». Bei KaderOS nutzen wir dafür Confidence
          Gates — der Agent entscheidet basierend auf seiner Sicherheit,
          ob er autonom handelt oder den Menschen einbezieht.
        </p>

        <h3>Gedächtnis</h3>
        <p>
          <strong>Chatbot:</strong> Vergisst alles nach dem Gespräch. Oder
          hat ein sehr begrenztes Session-Gedächtnis.
        </p>
        <p>
          <strong>AI Agent:</strong> Hat Langzeitgedächtnis. Weiss, was
          letzte Woche besprochen wurde. Kennt die Vorlieben des Kunden.
          Lernt aus jedem Kontakt.
        </p>

        <h2>Wann reicht ein Chatbot?</h2>
        <p>
          Chatbots sind nicht schlecht. Sie sind gut für:
        </p>
        <ul>
          <li>Websites mit hohem Traffic und repetitiven Fragen</li>
          <li>Erste Kontaktpunkte vor der menschlichen Betreuung</li>
          <li>Interne FAQ-Systeme</li>
          <li>Situations, in denen du kein Backend-Zugang brauchst</li>
        </ul>
        <p>
          Wenn dein Use Case rein textbasiert ist und keine Aktionen
          erfordert — ein Chatbot reicht.
        </p>

        <h2>Wann brauchst du einen AI Agent?</h2>
        <p>
          Sobald du eine dieser Fragen mit Ja beantwortest:
        </p>
        <ul>
          <li>Muss die AI auf externe Systeme zugreifen?</li>
          <li>Muss sie Entscheidungen treffen?</li>
          <li>Muss sie sich an vergangene Interaktionen erinnern?</li>
          <li>Muss sie mehrstufige Prozesse abarbeiten?</li>
          <li>Muss sie Daten verändern, nicht nur lesen?</li>
        </ul>
        <p>
          Wenn ja: Du brauchst einen Agent. Kein Chatbot der Welt kann das.
        </p>

        <h2>Die Entwicklung: Vom Chatbot zum Agent</h2>
        <p>
          Viele Firmen starten mit einem Chatbot und merken nach sechs
          Monaten: Das reicht nicht. Der Chatbot beantwortet Fragen, aber
          er löst keine Probleme. Kunden sind genervt, weil sie trotzdem
          anrufen müssen.
        </p>
        <p>
          Der natürliche nächste Schritt ist ein AI Agent. Nicht als Ersatz
          für den Chatbot — sondern als Upgrade. Der Agent nutzt die gleiche
          Wissensbasis, kann aber handeln. Er beantwortet nicht nur «Wo ist
          meine Bestellung?», sondern schaut nach und schickt das Tracking.
        </p>

        <h2>Kosten im Vergleich</h2>
        <ul>
          <li>
            <strong>Chatbot:</strong> CHF 0–100/Monat (Tidio, Crisp,
            Intercom Lite)
          </li>
          <li>
            <strong>AI Agent:</strong> CHF 100–500/Monat (inkl. API-Kosten
            und Framework)
          </li>
        </ul>
        <p>
          Der Agent kostet mehr. Aber er ersetzt nicht nur einen Chatbot —
          er ersetzt Stunden manueller Arbeit. Der ROI ist eine andere
          Liga.
        </p>

        <h2>Fazit</h2>
        <p>
          Ein Chatbot ist ein Textfenster. Ein AI Agent ist ein Teamkollege.
          Beide haben ihre Berechtigung. Aber wenn du willst, dass AI
          wirklich etwas für dein Business tut — nicht nur antwortet,
          sondern handelt — dann brauchst du einen Agent.
        </p>
        <p>
          Die Frage ist nicht ob, sondern wann. Und 2026 ist die Antwort: jetzt.
        </p>
      </div>

        <div className="mt-12 p-6 rounded-2xl bg-[#F5F5F7]">
          <h3 className="text-[16px] font-bold mb-3">Weiterlesen</h3>
          <ul className="space-y-2">
            <li><Link href="/blog/ai-agents-schweiz" className="text-[14px] text-[#000088] hover:underline">AI Agents für Schweizer KMU: Was sie können und was nicht</Link></li>
            <li><Link href="/blog/ai-mitarbeiter-zukunft" className="text-[14px] text-[#000088] hover:underline">AI Mitarbeiter: Hype oder die Zukunft deines Teams?</Link></li>
            <li><Link href="/blog/ai-fuer-kmu-schweiz" className="text-[14px] text-[#000088] hover:underline">AI für KMU Schweiz: Was funktioniert 2026</Link></li>
          </ul>
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

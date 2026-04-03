import Link from "next/link";

export const metadata = {
  title: "AI Risiken für KMU: Was schiefgehen kann und wie du dich schützt | KaderOS",
  description:
    "AI Risiken für Schweizer KMU ehrlich aufgezeigt. Halluzinationen, Datenschutz, Abhängigkeiten — und konkrete Massnahmen dagegen.",
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Blog
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          AI Risiken für KMU: Was schiefgehen kann und wie du dich schützt
        </h1>
        <div className="text-[14px] text-[#86868B]">
          18. April 2026 · 8 min Lesezeit
        </div>
      </div>
      <div className="prose prose-lg max-w-none [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-[#6E6E73] [&_p]:leading-relaxed [&_p]:mb-6 [&_li]:text-[#6E6E73] [&_strong]:text-[#1D1D1F]">
        <p>
          AI ist mächtig. Und genau das macht es riskant. Nicht weil AI böse
          ist — sondern weil die meisten Firmen AI einsetzen, ohne die
          Risiken zu kennen. Das ist wie Autofahren ohne Sicherheitsgurt.
          Es geht gut — bis es nicht mehr geht.
        </p>
        <p>
          Hier sind die sieben grössten AI-Risiken für KMU. Und was du
          konkret dagegen tun kannst.
        </p>

        <h2>Risiko 1: Halluzinationen</h2>
        <p>
          AI Modelle erfinden Dinge. Das ist keine Frage von «ob», sondern
          «wann». Sie generieren Zahlen, die nicht stimmen. Zitieren Quellen,
          die nicht existieren. Behaupten Fakten, die falsch sind. Überzeugend
          und selbstsicher.
        </p>
        <h3>Wie du dich schützt</h3>
        <ul>
          <li>
            <strong>Fact-Checking Layer:</strong> Jeder Output, der nach
            aussen geht, wird geprüft. Automatisch oder manuell.
          </li>
          <li>
            <strong>Quellen verlangen:</strong> Konfiguriere deine Agents
            so, dass sie Quellen angeben. Ohne Quelle = nicht vertrauenswürdig.
          </li>
          <li>
            <strong>Confidence Gates:</strong> Agent-Outputs mit niedriger
            Sicherheit gehen zur menschlichen Prüfung. Nicht ins Postfach
            des Kunden.
          </li>
        </ul>

        <h2>Risiko 2: Datenschutz-Verletzungen</h2>
        <p>
          Dein Agent verarbeitet Kundendaten. Wo landen die? In welchem
          Rechenzentrum? Werden sie zum Trainieren neuer Modelle verwendet?
          Das nDSG verlangt Antworten auf diese Fragen.
        </p>
        <h3>Wie du dich schützt</h3>
        <ul>
          <li>
            <strong>Schweizer oder EU-Hosting:</strong> Keine Daten in den
            USA, wenn es Personendaten sind.
          </li>
          <li>
            <strong>Opt-out vom Training:</strong> Stelle sicher, dass deine
            Daten nicht zum Training verwendet werden. Die meisten APIs
            bieten das — aber du musst es aktivieren.
          </li>
          <li>
            <strong>Datenschutz-Folgenabschätzung:</strong> Pflicht bei
            hohem Risiko. Mach sie proaktiv — nicht erst, wenn der EDÖB
            anklopft.
          </li>
        </ul>

        <h2>Risiko 3: Vendor Lock-in</h2>
        <p>
          Du baust dein ganzes System auf OpenAI. Dann verdoppeln sie die
          Preise. Oder ändern ihre AGB. Oder gehen offline. Was jetzt?
        </p>
        <h3>Wie du dich schützt</h3>
        <ul>
          <li>
            <strong>Abstraktions-Layer:</strong> Nutze ein Framework, das
            verschiedene LLMs unterstützt. Nicht direkt gegen eine API
            programmieren.
          </li>
          <li>
            <strong>Prompts dokumentieren:</strong> Deine Prompts sind dein
            geistiges Eigentum. Speichere sie zentral. So kannst du jederzeit
            den Anbieter wechseln.
          </li>
          <li>
            <strong>Open Source evaluieren:</strong> Modelle wie Llama oder
            Mistral als Backup. Nicht als Ersatz — aber als Exit-Strategie.
          </li>
        </ul>

        <h2>Risiko 4: Über-Automatisierung</h2>
        <p>
          Alles automatisieren, was geht. Klingt gut. Ist es nicht. Wenn ein
          Agent eine falsche Rechnung verschickt oder einem Kunden eine
          peinliche Mail sendet — dann wird es teuer. Nicht finanziell.
          Reputationsmässig.
        </p>
        <h3>Wie du dich schützt</h3>
        <ul>
          <li>
            <strong>Human-in-the-Loop:</strong> Bei allem, was nach aussen
            geht oder Geld kostet — Mensch prüft.
          </li>
          <li>
            <strong>Stufenweise Autonomie:</strong> Start mit Assistenz.
            Nach drei Monaten: Halb-automatisch. Nach sechs Monaten:
            Vollautomatisch — aber nur für bewährte Prozesse.
          </li>
          <li>
            <strong>Kill Switch:</strong> Jeder Agent muss sofort stoppbar
            sein. Keine Diskussion.
          </li>
        </ul>

        <h2>Risiko 5: Qualitätsverlust</h2>
        <p>
          AI Output ist gut genug. Aber «gut genug» wird über Zeit zum
          Standard. Deine Texte klingen generisch. Deine Analysen sind
          oberflächlich. Dein Kundenservice verliert die persönliche Note.
        </p>
        <h3>Wie du dich schützt</h3>
        <ul>
          <li>
            <strong>Qualitäts-Reviews:</strong> Stichproben. Mindestens
            10% aller Agent-Outputs manuell prüfen.
          </li>
          <li>
            <strong>Brand Voice dokumentieren:</strong> Je klarer deine
            Vorgaben, desto besser der Output. Investiere Zeit in die
            Konfiguration, nicht nur in die Nutzung.
          </li>
          <li>
            <strong>Feedback-Loop:</strong> Gib deinen Agents regelmässig
            Rückmeldung. Was war gut? Was nicht? Ohne Feedback stagniert
            die Qualität.
          </li>
        </ul>

        <h2>Risiko 6: Kosten-Explosion</h2>
        <p>
          API-Kosten sind variabel. Ein Agent, der in einer Schleife hängt,
          kann in einer Nacht CHF 500 verbrennen. Ein Team, das zu grosse
          Modelle für zu kleine Aufgaben nutzt, zahlt dreifach.
        </p>
        <h3>Wie du dich schützt</h3>
        <ul>
          <li>
            <strong>Budget-Limits:</strong> Setze maximale Ausgaben pro Tag
            und pro Agent. Kein Agent ohne Limit.
          </li>
          <li>
            <strong>Modell-Matching:</strong> Kleine Aufgabe = kleines Modell.
            E-Mail sortieren braucht kein GPT-4. Claude Haiku reicht.
          </li>
          <li>
            <strong>Monitoring:</strong> Täglicher Blick aufs Dashboard.
            Fünf Minuten. Keine Überraschungen am Monatsende.
          </li>
        </ul>

        <h2>Risiko 7: Abhängigkeit</h2>
        <p>
          Dein Team verliert Kompetenzen. Wenn der Agent die Buchhaltung
          macht, kann irgendwann niemand mehr buchen. Wenn der Agent die
          E-Mails schreibt, verlernt das Team zu kommunizieren.
        </p>
        <h3>Wie du dich schützt</h3>
        <ul>
          <li>
            <strong>Skill-Rotation:</strong> Regelmässig Aufgaben ohne AI
            erledigen. Nicht als Strafe — sondern als Training.
          </li>
          <li>
            <strong>Dokumentation:</strong> Alles, was der Agent kann,
            muss auch ein Mensch nachvollziehen können.
          </li>
          <li>
            <strong>Notfallplan:</strong> Was passiert, wenn alle AI-Systeme
            24 Stunden offline sind? Wenn du keine Antwort hast, hast du
            ein Problem.
          </li>
        </ul>

        <h2>Fazit: Risiken managen, nicht vermeiden</h2>
        <p>
          AI nicht einzusetzen ist auch ein Risiko. Deine Konkurrenz macht
          es. Der Markt erwartet es. Und die Vorteile sind real.
        </p>
        <p>
          Aber AI ohne Risikobewusstsein ist fahrlässig. Du brauchst keine
          Angst. Du brauchst einen Plan. Sieben Risiken, sieben Massnahmen.
          Das ist machbar — auch für ein kleines Team.
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

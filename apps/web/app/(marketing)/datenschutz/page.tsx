export const metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung von KaderOS nach Schweizer Datenschutzgesetz (nDSG).",
};

export default function DatenschutzPage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[36px] font-extrabold tracking-tight mb-2">Datenschutz­erklärung</h1>
        <p className="text-[14px] text-[#86868B] mb-10">Gültig ab 2. April 2026 · Basierend auf dem Schweizer Datenschutzgesetz (nDSG/FADP)</p>

        <div className="space-y-8 text-[14px] text-[#6E6E73] leading-relaxed">
          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">1. Grundsatz</h2>
            <p>KaderOS nimmt den Schutz deiner Daten ernst. Wir behandeln deine personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
            <p className="mt-2 p-3 bg-[#000088]/5 rounded-lg text-[#000088] text-[13px] font-medium">Kernprinzip: KaderOS speichert keine deiner Business-Daten in der Cloud. Die Software läuft lokal auf deiner Maschine. Wir haben keinen Zugriff auf deine Agents, Tasks, Budgets oder sonstigen Inhalte.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">2. Welche Daten wir erheben</h2>
            <p><strong className="text-[#1D1D1F]">Website (kaderos.io):</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>E-Mail-Adresse (bei Waitlist-Anmeldung)</li>
              <li>Anonymisierte Nutzungsdaten (Plausible Analytics — kein Google Analytics)</li>
              <li>Technische Logdaten (IP-Adresse anonymisiert, Browser-Typ)</li>
            </ul>
            <p className="mt-3"><strong className="text-[#1D1D1F]">Software (KaderOS):</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>License Key Validierung (nur Key-Hash, keine Inhalte)</li>
              <li>Optional: Anonymisierte Telemetrie (deaktivierbar)</li>
              <li>Keine Agent-Daten, keine Task-Daten, keine Chat-Inhalte</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">3. Zweck der Datenverarbeitung</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Bereitstellung der Waitlist und Benachrichtigung bei Beta-Start</li>
              <li>Validierung aktiver Lizenzen</li>
              <li>Verbesserung der Software (nur mit anonymisierten Daten)</li>
              <li>Kommunikation zu Produktupdates (nur mit Einwilligung)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">4. Datenweitergabe</h2>
            <p>Wir geben keine personenbezogenen Daten an Dritte weiter, verkaufen sie nicht und tauschen sie nicht. Ausnahmen:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Hosting-Provider für kaderos.io (Infomaniak, Schweiz)</li>
              <li>E-Mail-Versand für Waitlist-Benachrichtigungen</li>
            </ul>
            <p className="mt-2">Alle Auftragsverarbeiter befinden sich in der Schweiz oder im EU/EWR-Raum mit angemessenem Datenschutzniveau.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">5. Deine Rechte</h2>
            <p>Gemäss dem Schweizer Datenschutzgesetz (nDSG) hast du folgende Rechte:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Recht auf Auskunft über deine gespeicherten Daten</li>
              <li>Recht auf Berichtigung unrichtiger Daten</li>
              <li>Recht auf Löschung deiner Daten</li>
              <li>Recht auf Datenübertragbarkeit</li>
              <li>Recht auf Widerspruch gegen die Datenverarbeitung</li>
            </ul>
            <p className="mt-2">Kontakt: datenschutz@kaderos.io</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">6. Cookies</h2>
            <p>kaderos.io verwendet nur technisch notwendige Cookies. Keine Tracking-Cookies. Kein Google Analytics. Wir verwenden Plausible Analytics — datenschutzkonform, cookiefrei, in der EU gehostet.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">7. Änderungen</h2>
            <p>Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen. Die aktuelle Version ist immer auf kaderos.io/datenschutz verfügbar.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">8. Kontakt</h2>
            <p>KaderOS / Thesh AI<br />Zürich, Schweiz<br />datenschutz@kaderos.io</p>
          </section>
        </div>
      </div>
    </div>
  );
}

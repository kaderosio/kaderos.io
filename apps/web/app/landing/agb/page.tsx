export default function AGBPage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[36px] font-extrabold tracking-tight mb-2">Allgemeine Geschäfts­bedingungen</h1>
        <p className="text-[14px] text-[#86868B] mb-10">Gültig ab 2. April 2026</p>

        <div className="space-y-8 text-[14px] text-[#6E6E73] leading-relaxed">
          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">1. Geltungsbereich</h2>
            <p>Diese AGB gelten für die Nutzung der Software KaderOS sowie der Website kaderos.io, betrieben von Thesh AI, Zürich, Schweiz.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">2. Leistungsbeschreibung</h2>
            <p>KaderOS ist eine Open-Source-Software (AGPLv3) zur Orchestrierung von AI Agents. Die Software wird lokal auf der Infrastruktur des Nutzers installiert und betrieben. KaderOS bietet zusätzlich kostenpflichtige Lizenz-Tiers mit erweiterten Funktionen an.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">3. Lizenz-Modell</h2>
            <div className="space-y-2">
              <p><strong className="text-[#1D1D1F]">Community (kostenlos):</strong> Unbegrenzte Nutzung mit bis zu 3 Agents. Open Source unter AGPLv3.</p>
              <p><strong className="text-[#1D1D1F]">Pro / Team / Agency:</strong> Kostenpflichtige Lizenzen mit erweiterten Funktionen. Die Lizenz wird über einen License Key aktiviert, der bei Erstellung eines Accounts auf kaderos.io ausgegeben wird.</p>
              <p>Der License Key berechtigt zur Nutzung auf einer Installation. Multi-Installation erfordert separate Lizenzen.</p>
            </div>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">4. Preise und Zahlung</h2>
            <p>Alle Preise sind in Schweizer Franken (CHF) angegeben und verstehen sich inklusive Mehrwertsteuer. Die Abrechnung erfolgt monatlich oder jährlich im Voraus. Bei jährlicher Zahlung gilt ein Rabatt von 20%.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">5. Kündigung</h2>
            <p>Kostenpflichtige Lizenzen können jederzeit zum Ende der laufenden Abrechnungsperiode gekündigt werden. Nach Kündigung wird die Installation automatisch auf den Community-Tier (3 Agents) zurückgestuft. Bestehende Daten bleiben erhalten.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">6. Datenhaltung</h2>
            <p>Sämtliche Nutzerdaten (Agents, Tasks, Goals, Budgets, Audit Logs etc.) werden ausschliesslich lokal auf der Infrastruktur des Nutzers gespeichert. KaderOS hat keinen Zugriff auf diese Daten. Die einzige Verbindung zu KaderOS-Servern ist die License Key Validierung.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">7. Haftung</h2>
            <p>KaderOS wird "as is" bereitgestellt. Wir übernehmen keine Gewähr für die Verfügbarkeit, Fehlerfreiheit oder Eignung für einen bestimmten Zweck. Die Haftung ist auf den Betrag der in den letzten 12 Monaten bezahlten Lizenzgebühren beschränkt. Ausgenommen sind Schäden durch Vorsatz oder grobe Fahrlässigkeit.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">8. Open Source</h2>
            <p>Der KaderOS Quellcode ist unter der GNU Affero General Public License v3 (AGPLv3) lizenziert. Dies bedeutet: Du darfst den Code verwenden, ändern und verteilen, musst aber Änderungen ebenfalls unter AGPLv3 veröffentlichen. Für kommerzielle Nutzung ohne AGPLv3-Pflichten ist eine separate kommerzielle Lizenz erforderlich.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">9. Anwendbares Recht</h2>
            <p>Es gilt Schweizer Recht. Gerichtsstand ist Zürich, Schweiz.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">10. Kontakt</h2>
            <p>KaderOS / Thesh AI<br />Zürich, Schweiz<br />legal@kaderos.io</p>
          </section>
        </div>
      </div>
    </div>
  );
}

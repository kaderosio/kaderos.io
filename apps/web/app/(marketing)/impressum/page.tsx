export default function ImpressumPage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[36px] font-extrabold tracking-tight mb-8">Impressum</h1>
        <div className="prose prose-sm text-[#6E6E73] space-y-6 text-[14px] leading-relaxed">
          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">Angaben gemäss Art. 3 Abs. 1 UWG</h2>
            <p><strong className="text-[#1D1D1F]">KaderOS</strong><br />
            Ein Produkt von Thesh AI<br />
            Zürich, Schweiz</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">Kontakt</h2>
            <p>E-Mail: hello@kaderos.io<br />
            Web: kaderos.io</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">Verantwortlich für den Inhalt</h2>
            <p>Thesh Sritharan<br />
            Zürich, Schweiz</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">Haftungsausschluss</h2>
            <p>Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen entstanden sind, werden grundsätzlich ausgeschlossen.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">Urheberrechte</h2>
            <p>Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf dieser Website gehören ausschliesslich KaderOS / Thesh AI oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1D1D1F] mb-3">Open Source</h2>
            <p>KaderOS ist Open Source unter der AGPLv3 Lizenz. Der Quellcode ist auf GitHub verfügbar.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

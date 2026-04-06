import Link from "next/link";

export const metadata = {
  title: "pgvector vs. Pinecone: Warum wir PostgreSQL für Agent Memory nutzen | KaderOS",
  description:
    "Jedes AI-System braucht ein Gedächtnis. Wir haben uns für pgvector entschieden. Kein Drittanbieter. Kein US-Cloud-Service. Hier ist warum.",
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Blog
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          pgvector vs. Pinecone: Warum wir PostgreSQL für Agent Memory nutzen
        </h1>
        <div className="text-[14px] text-[#86868B]">
          6. April 2026 · 8 min Lesezeit
        </div>
      </div>
      <div className="prose prose-lg max-w-none [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-[#6E6E73] [&_p]:leading-relaxed [&_p]:mb-6 [&_li]:text-[#6E6E73] [&_strong]:text-[#1D1D1F]">
        <p>
          Jedes AI-System braucht ein Gedächtnis. Ohne Gedächtnis ist dein Agent wie ein Praktikant am ersten Tag. Jeden Tag. Er weiss nichts über dein Unternehmen. Nichts über deine Kunden. Nichts über letzte Woche.
        </p>
        <p>
          Die Frage ist nicht ob dein Agent ein Gedächtnis braucht. Die Frage ist: Wo speicherst du es?
        </p>
        <p>
          Wir haben uns für pgvector entschieden. PostgreSQL. Keine separate Datenbank. Kein Drittanbieter. Kein US-Cloud-Service. Hier ist warum.
        </p>

        <h2>Was Vector Databases machen</h2>
        <p>
          Dein Agent liest Text. Ein Kundengespräch. Eine E-Mail. Ein Dokument. Dieser Text wird in einen <strong>Embedding</strong> umgewandelt — eine mathematische Darstellung des Inhalts. Statt Wörter speicherst du Zahlen. Einen Vektor mit 384 Dimensionen.
        </p>
        <p>
          Warum? Weil du dann <strong>semantisch suchen</strong> kannst. Klassische Suche: Du tippst &quot;Rechnung&quot; und findest alles mit dem Wort &quot;Rechnung&quot;. Vector-Suche: Du tippst &quot;offene Zahlungen&quot; und findest auch Dokumente über &quot;ausstehende Fakturen&quot; oder &quot;unbezahlte Invoices&quot;. Weil die Bedeutung ähnlich ist.
        </p>

        <h2>Die Optionen auf dem Markt</h2>

        <h3>Pinecone</h3>
        <p>
          Der Marktführer. Cloud-basiert. Gehostet in den USA. Funktioniert gut. Skaliert gut. Kostet Geld. Du zahlst pro Query. Du schickst deine Daten an einen US-Server. Für ein Schweizer KMU mit sensiblen Geschäftsdaten ist das ein Problem.
        </p>

        <h3>Weaviate</h3>
        <p>
          Open Source. Mächtig. Komplex. Du brauchst einen separaten Service, einen separaten Server, separates Monitoring. Für ein KMU — Overkill.
        </p>

        <h3>Chroma</h3>
        <p>
          Leichtgewichtig. Embedded. Python-native. Perfekt für Prototypen. Aber: Chroma skaliert begrenzt. Keine native SQL-Integration.
        </p>

        <h3>pgvector</h3>
        <p>
          Eine PostgreSQL-Extension. Kein neues System. Kein neuer Service. Eine Zeile SQL:
        </p>
        <pre className="bg-[#F5F5F7] rounded-xl p-4 text-[13px] overflow-x-auto my-6">
          <code>CREATE EXTENSION vector;</code>
        </pre>
        <p>
          Fertig. Deine bestehende PostgreSQL-Datenbank kann jetzt Vektoren speichern und durchsuchen. Gleiche Datenbank. Gleiche Backups. Gleiche Zugriffsrechte.
        </p>

        <h2>Warum KaderOS pgvector nutzt</h2>

        <h3>1. Kein separater Service nötig</h3>
        <p>
          Jeder neue Service in deiner Infrastruktur ist ein weiterer Punkt, der ausfallen kann. pgvector läuft in deiner bestehenden PostgreSQL-Datenbank. Kein neuer Container. Kein neuer Port.
        </p>

        <h3>2. Supabase hat pgvector eingebaut</h3>
        <p>
          KaderOS läuft auf Supabase. Supabase nutzt PostgreSQL. pgvector ist standardmässig verfügbar. Zero Setup.
        </p>

        <h3>3. Deine Daten bleiben bei dir</h3>
        <p>
          Pinecone-Server stehen in den USA. Deine Embeddings liegen auf fremden Servern. Mit pgvector bleiben deine Daten dort, wo deine Datenbank ist.
        </p>

        <h3>4. SQL + Vector in einer Datenbank</h3>
        <p>
          Mit Pinecone hast du zwei Systeme. Zwischen den beiden musst du synchronisieren. Mit pgvector? Eine Query:
        </p>
        <pre className="bg-[#F5F5F7] rounded-xl p-4 text-[13px] overflow-x-auto my-6">
          <code>{`SELECT 
  documents.title,
  documents.content,
  1 - (documents.embedding <=> query_embedding) AS similarity
FROM documents
WHERE documents.project_id = 'xyz'
ORDER BY documents.embedding <=> query_embedding
LIMIT 5;`}</code>
        </pre>
        <p>
          SQL-Filter und Vector-Suche in einer Query. Keine Sync-Probleme.
        </p>

        <h3>5. Keine API-Kosten pro Query</h3>
        <p>
          Pinecone kostet. Pro gespeichertem Vektor. Pro Query. Pro Monat. pgvector kostet nichts. Es ist eine Open-Source-Extension.
        </p>

        <h2>Technische Details</h2>
        <p>
          <strong>Embedding-Modell:</strong> sentence-transformers (all-MiniLM-L6-v2). 384 Dimensionen. Läuft lokal. Keine externe API.
        </p>
        <p>
          <strong>Similarity-Metrik:</strong> Cosine Similarity. Standard für Textsuche.
        </p>
        <p>
          <strong>Index-Typ:</strong> IVFFlat oder HNSW — je nach Datenmenge.
        </p>
        <pre className="bg-[#F5F5F7] rounded-xl p-4 text-[13px] overflow-x-auto my-6">
          <code>{`CREATE TABLE memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id),
  content TEXT NOT NULL,
  embedding VECTOR(384),
  memory_type TEXT CHECK (memory_type IN ('conversation', 'document', 'decision')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX ON memories 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);`}</code>
        </pre>
        <p>
          Keine externe Dependency. Keine API-Keys. Keine Rate Limits.
        </p>

        <h2>Vergleichstabelle</h2>
        <div className="overflow-x-auto my-8">
          <table className="min-w-full text-[14px] border-collapse">
            <thead>
              <tr className="border-b border-[#E5E5E7]">
                <th className="text-left py-3 pr-4 font-semibold text-[#1D1D1F]">Kriterium</th>
                <th className="text-left py-3 pr-4 font-semibold text-[#1D1D1F]">Pinecone</th>
                <th className="text-left py-3 pr-4 font-semibold text-[#1D1D1F]">Weaviate</th>
                <th className="text-left py-3 pr-4 font-semibold text-[#1D1D1F]">Chroma</th>
                <th className="text-left py-3 pr-4 font-semibold text-[#1D1D1F]">pgvector</th>
              </tr>
            </thead>
            <tbody className="[&_td]:py-2 [&_td]:pr-4 [&_td]:text-[#6E6E73] [&_tr]:border-b [&_tr]:border-[#F0F0F0]">
              <tr><td><strong>Typ</strong></td><td>Managed Cloud</td><td>Self-hosted / Cloud</td><td>Embedded</td><td>PostgreSQL Extension</td></tr>
              <tr><td><strong>Setup</strong></td><td>Account + API Key</td><td>Eigener Server</td><td>pip install</td><td>CREATE EXTENSION</td></tr>
              <tr><td><strong>Hosting</strong></td><td>USA</td><td>Flexibel</td><td>Lokal</td><td>Flexibel</td></tr>
              <tr><td><strong>Kosten</strong></td><td>Ab $70/Mo</td><td>Infrastruktur</td><td>Gratis</td><td>Gratis</td></tr>
              <tr><td><strong>SQL-Integration</strong></td><td>Nein</td><td>Nein</td><td>Nein</td><td>Nativ</td></tr>
              <tr><td><strong>Separater Service</strong></td><td>Ja</td><td>Ja</td><td>Nein</td><td>Nein</td></tr>
              <tr><td><strong>Skalierung</strong></td><td>Sehr gut</td><td>Gut</td><td>Begrenzt</td><td>Gut</td></tr>
              <tr><td><strong>nDSG-konform</strong></td><td>Schwierig</td><td>Möglich</td><td>Ja</td><td>Ja</td></tr>
              <tr><td><strong>Supabase-nativ</strong></td><td>Nein</td><td>Nein</td><td>Nein</td><td>Ja</td></tr>
              <tr><td><strong>Open Source</strong></td><td>Nein</td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Wann Pinecone trotzdem Sinn macht</h2>
        <p>
          Ehrlichkeit gehört dazu. Pinecone ist nicht schlecht. Es ist falsch für unseren Use Case.
        </p>
        <p>
          Wenn du Millionen von Vektoren speicherst und globale Verfügbarkeit brauchst — Pinecone. Wenn du ein Enterprise-Team mit eigenem DevOps hast — Pinecone. Wenn nDSG kein Thema ist — Pinecone.
        </p>
        <p>
          Für alles andere: pgvector.
        </p>

        <h2>Das Ergebnis</h2>
        <p>
          KaderOS speichert Agent Memory in der gleichen Datenbank wie alles andere. Benutzer, Projekte, Kader, Budgets, Entscheidungen — und Gedächtnis. Alles an einem Ort.
        </p>
        <p>
          Kein Vendor Lock-in. Keine Überraschungskosten. Keine Daten in den USA.
        </p>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#000088]/5 to-white border border-[#000088]/10">
          <h3 className="text-[20px] font-bold text-[#1D1D1F] mb-3">
            Willst du sehen, wie Agent Memory in der Praxis funktioniert?
          </h3>
          <p className="text-[15px] text-[#6E6E73] mb-5">
            Open Source. Autonom. Lokal. Dein Gedächtnis.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#000088] text-white text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-[#2D2F9E] transition-colors"
          >
            Platz sichern
          </Link>
        </div>
      </div>
    </article>
  );
}

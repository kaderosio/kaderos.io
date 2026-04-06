"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  Upload,
  FileText,
  Trash2,
  Loader2,
  Info,
  File,
} from "lucide-react";
import { useCompany } from "../layout";
import { useToast } from "../_components/toast";

interface KnowledgeDoc {
  id: string;
  company_id: string;
  name: string;
  file_type: string;
  size_bytes: number | null;
  status: string;
  created_at: string;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  uploaded: { bg: "bg-blue-100", text: "text-blue-700", label: "Hochgeladen" },
  processing: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Verarbeitung" },
  ready: { bg: "bg-green-100", text: "text-green-700", label: "Bereit" },
  error: { bg: "bg-red-100", text: "text-red-700", label: "Fehler" },
};

function formatSize(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function WissensbasisPage() {
  const { companyId, loading: companyLoading } = useCompany();
  const { toast } = useToast();

  const [documents, setDocuments] = useState<KnowledgeDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchDocuments = useCallback(async () => {
    if (!companyId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/knowledge?companyId=${companyId}`);
      if (!res.ok) throw new Error("Fehler beim Laden der Dokumente");
      const data = await res.json();
      setDocuments(data.documents ?? []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  async function handleUpload(file: File) {
    if (!companyId) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "unknown";
      const res = await fetch("/api/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId,
          name: file.name,
          fileType: ext,
          sizeBytes: file.size,
        }),
      });
      if (!res.ok) throw new Error("Upload fehlgeschlagen");
      const { document } = await res.json();
      setDocuments((prev) => [document, ...prev]);
      toast("Dokument hochgeladen", "success");
    } catch {
      toast("Upload fehlgeschlagen", "error");
    } finally {
      setUploading(false);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/knowledge/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setDocuments((prev) => prev.filter((d) => d.id !== id));
      toast("Dokument gelöscht", "success");
    } catch {
      toast("Löschen fehlgeschlagen", "error");
    } finally {
      setDeletingId(null);
    }
  }

  const isLoading = companyLoading || loading;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Wissensbasis
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Dokumente und Wissen für deine AI-Agents verwalten
        </p>
      </div>

      {/* Info Banner */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
        <p className="text-sm text-blue-700">
          Wissensbasis — Lade Dokumente hoch, die deine Agents als Kontext
          nutzen. Brain Integration kommt bald.
        </p>
      </div>

      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`mb-8 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-12 transition-colors ${
          dragOver
            ? "border-[#000088] bg-blue-50"
            : "border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50"
        }`}
      >
        {uploading ? (
          <Loader2 className="mb-3 h-10 w-10 animate-spin text-gray-400" />
        ) : (
          <Upload className="mb-3 h-10 w-10 text-gray-400" />
        )}
        <p className="text-sm font-medium text-gray-700">
          {uploading ? "Wird hochgeladen..." : "Dokument hochladen"}
        </p>
        <p className="mt-1 text-xs text-gray-500">PDF, TXT, CSV</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt,.csv"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && documents.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-20 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <File className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-900">
            Noch keine Dokumente
          </h3>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            Lade dein erstes Dokument hoch.
          </p>
        </div>
      )}

      {/* Document Table */}
      {!isLoading && !error && documents.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Typ
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Grösse
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Hochgeladen
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {documents.map((doc) => {
                const statusSt =
                  STATUS_STYLES[doc.status] ?? STATUS_STYLES.uploaded;
                return (
                  <tr key={doc.id} className="transition-colors hover:bg-gray-50">
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <FileText className="h-4 w-4 shrink-0 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {doc.name}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="text-sm uppercase text-gray-500">
                        {doc.file_type}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                      {formatSize(doc.size_bytes)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusSt.bg} ${statusSt.text}`}
                      >
                        {statusSt.label}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                      {formatDate(doc.created_at)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-right">
                      <button
                        onClick={() => handleDelete(doc.id)}
                        disabled={deletingId === doc.id}
                        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                      >
                        {deletingId === doc.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                        Löschen
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

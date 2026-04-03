"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState, useMemo, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCompany } from "../layout";
import {
  Send,
  Square,
  Bot,
  User,
  Loader2,
  ChevronRight,
  ChevronLeft,
  Activity,
  Zap,
  Clock,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Agent = {
  id: string;
  name: string;
  role: string;
  type: string;
  accent_color: string | null;
  status: string;
};

type TraceEvent = {
  event: string;
  runId?: string;
  agentName?: string;
  agentRole?: string;
  tokens?: number;
  ts: number;
};

function MeetingRoomContent() {
  const { companyId, loading: companyLoading } = useCompany();
  const searchParams = useSearchParams();
  const preselectedAgentId = searchParams.get("agentId");

  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string>(
    preselectedAgentId || ""
  );
  const [loadingAgents, setLoadingAgents] = useState(true);
  const [showTrace, setShowTrace] = useState(true);
  const [input, setInput] = useState("");
  const [traceEvents, setTraceEvents] = useState<TraceEvent[]>([]);
  const [chatError, setChatError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedAgent = useMemo(
    () => agents.find((a) => a.id === selectedAgentId),
    [agents, selectedAgentId]
  );

  // Build transport with current agentId
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { agentId: selectedAgentId },
      }),
    [selectedAgentId]
  );

  // Load agents
  useEffect(() => {
    if (!companyId) return;
    fetch(`/api/agents?companyId=${companyId}`)
      .then((r) => r.json())
      .then((d) => {
        setAgents(d.agents ?? []);
        if (preselectedAgentId) setSelectedAgentId(preselectedAgentId);
        else if (d.agents?.length && !selectedAgentId)
          setSelectedAgentId(d.agents[0].id);
      })
      .finally(() => setLoadingAgents(false));
  }, [companyId]);

  // Chat
  const { messages, sendMessage, status, stop, setMessages } = useChat({
    transport,
    onError: (error) => {
      console.error("Chat error:", error);
      const msg = error?.message || "Verbindungsfehler. Prüfe deinen API Key unter Connectors.";
      setChatError(msg);
      setTimeout(() => setChatError(null), 8000);
    },
  });

  const isStreaming = status === "streaming" || status === "submitted";

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset chat when agent changes
  function handleAgentChange(newAgentId: string) {
    setSelectedAgentId(newAgentId);
    setMessages([]);
    setTraceEvents([]);
    setInput("");
  }

  // Extract text content from message parts
  function getMessageText(message: (typeof messages)[number]): string {
    return message.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("");
  }

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isStreaming || !selectedAgentId) return;
      setChatError(null);
      sendMessage({ text: input });
      setInput("");
    },
    [input, isStreaming, selectedAgentId, sendMessage]
  );

  if (companyLoading || loadingAgents) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center p-8">
        <Bot className="h-12 w-12 text-gray-300 mb-4" />
        <h2 className="text-lg font-semibold text-gray-900">
          Keine Agenten vorhanden
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Erstelle zuerst einen Agenten unter Team.
        </p>
      </div>
    );
  }

  const accent = selectedAgent?.accent_color || "#000088";

  return (
    <div className="flex h-full">
      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Agent Selector Header */}
        <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
          {selectedAgent && (
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: accent }}
            >
              {selectedAgent.name.charAt(0).toUpperCase()}
            </div>
          )}
          <select
            value={selectedAgentId}
            onChange={(e) => handleAgentChange(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#000088]/20"
          >
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} — {a.role}
              </option>
            ))}
          </select>
          {selectedAgent && (
            <span className="text-xs text-gray-500">
              {selectedAgent.type.toUpperCase()}
            </span>
          )}
          <div className="flex-1" />
          <button
            onClick={() => setShowTrace(!showTrace)}
            className="hidden md:flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            {showTrace ? (
              <ChevronRight className="h-3.5 w-3.5" />
            ) : (
              <ChevronLeft className="h-3.5 w-3.5" />
            )}
            {showTrace ? "Trace ausblenden" : "Trace einblenden"}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mx-auto max-w-3xl space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white"
                  style={{ backgroundColor: accent }}
                >
                  {selectedAgent?.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedAgent?.name}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedAgent?.role}
                </p>
                <p className="mt-4 max-w-md text-sm text-gray-400">
                  Schreib eine Nachricht, um {selectedAgent?.name} zu starten.
                </p>
              </div>
            )}

            {messages.map((m) => {
              const text = getMessageText(m);
              return (
                <div
                  key={m.id}
                  className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: accent }}
                    >
                      {selectedAgent?.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2.5 max-w-[80%] text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-[#000088] text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {m.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:mb-2 prose-headings:mt-3">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      text
                    )}
                  </div>
                  {m.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {status === "submitted" && (
              <div className="flex gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: accent }}
                >
                  {selectedAgent?.name.charAt(0).toUpperCase()}
                </div>
                <div className="rounded-2xl bg-gray-100 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    {selectedAgent?.name} denkt nach...
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Error Banner */}
        {chatError && (
          <div className="mx-4 mb-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center gap-2">
            <span className="shrink-0">⚠</span>
            <span>{chatError}</span>
            <button onClick={() => setChatError(null)} className="ml-auto shrink-0 text-red-400 hover:text-red-600">&times;</button>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-gray-200 bg-white p-4">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-3xl items-end gap-2"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Nachricht an ${selectedAgent?.name || "Agent"}...`}
              rows={1}
              className="flex-1 resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-shadow placeholder:text-gray-400 focus:border-[#000088] focus:ring-2 focus:ring-[#000088]/20"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (input.trim() && !isStreaming) {
                    sendMessage({ text: input });
                    setInput("");
                  }
                }
              }}
              style={{ minHeight: "44px", maxHeight: "200px" }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "44px";
                target.style.height =
                  Math.min(target.scrollHeight, 200) + "px";
              }}
            />
            {isStreaming ? (
              <button
                type="button"
                onClick={() => stop()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white transition-colors hover:bg-red-600"
              >
                <Square className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim() || !selectedAgentId}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#000088] text-white transition-colors hover:bg-[#0000aa] disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Trace Sidebar */}
      {showTrace && (
        <div className="hidden w-72 flex-col border-l border-gray-200 bg-white md:flex">
          <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-3">
            <Activity className="h-4 w-4 text-[#000088]" />
            <h3 className="text-sm font-semibold text-gray-900">
              Execution Trace
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {traceEvents.length === 0 ? (
              <div className="text-center py-12">
                <Zap className="mx-auto h-8 w-8 text-gray-200" />
                <p className="mt-2 text-xs text-gray-400">
                  Trace-Events erscheinen hier sobald ein Agent laeuft.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {traceEvents.map((event, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-gray-100 bg-gray-50 p-3"
                  >
                    <div className="flex items-center gap-2">
                      {event.event === "run_start" && (
                        <Zap className="h-3.5 w-3.5 text-green-500" />
                      )}
                      {event.event === "run_complete" && (
                        <Activity className="h-3.5 w-3.5 text-blue-500" />
                      )}
                      <span className="text-xs font-medium text-gray-700">
                        {event.event === "run_start" &&
                          `${event.agentName} gestartet`}
                        {event.event === "run_complete" &&
                          `Fertig — ${event.tokens} Tokens`}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-400">
                      <Clock className="h-2.5 w-2.5" />
                      {new Date(event.ts).toLocaleTimeString("de-CH")}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MeetingRoomPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      }
    >
      <MeetingRoomContent />
    </Suspense>
  );
}

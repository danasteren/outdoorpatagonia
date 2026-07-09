"use client";

import { useState } from "react";
import { Mail, Send, Loader2, CheckCheck } from "lucide-react";

export function NewsletterComposer({ activeCount }: { activeCount: number }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [lastSent, setLastSent] = useState<{ mode: string; count: number } | null>(null);

  async function send(mode: "test" | "broadcast") {
    if (!subject.trim() || !body.trim()) return;
    if (mode === "broadcast" && !confirm(`¿Enviar a los ${activeCount} suscriptores activos? No se puede deshacer.`)) {
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, body, mode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al enviar");
      setStatus("sent");
      setLastSent({ mode, count: data.sent });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar");
      setStatus("error");
    }
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden mb-6">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
        <Mail className="w-4 h-4 text-muted-foreground" />
        <h2 className="font-medium text-sm">Redactar newsletter</h2>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Asunto"
          className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={8}
          placeholder="Contenido del newsletter (texto plano, los párrafos se separan con una línea en blanco)"
          className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background resize-none"
        />

        {status === "error" && <p className="text-sm text-[var(--color-terracotta)]">{error}</p>}
        {status === "sent" && lastSent && (
          <p className="text-sm text-teal flex items-center gap-1.5">
            <CheckCheck className="w-4 h-4" />
            {lastSent.mode === "test"
              ? "Prueba enviada."
              : `Enviado a ${lastSent.count} suscriptores.`}
          </p>
        )}

        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={() => send("test")}
            disabled={status === "sending" || !subject.trim() || !body.trim()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted/40 transition-colors disabled:opacity-50"
          >
            {status === "sending" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Enviar prueba a mi correo
          </button>
          <button
            onClick={() => send("broadcast")}
            disabled={status === "sending" || !subject.trim() || !body.trim() || activeCount === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-teal)] text-[var(--color-cream)] text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status === "sending" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Enviar a todos los activos ({activeCount})
          </button>
        </div>
      </div>
    </div>
  );
}

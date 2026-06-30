"use client";

import { useState } from "react";
import { Reply, Send, Loader2, CheckCheck } from "lucide-react";

export function ReplyBox({
  source,
  id,
  to,
  defaultSubject,
  alreadyReplied,
}: {
  source: "contact" | "operator";
  id: string;
  to: string;
  defaultSubject: string;
  alreadyReplied: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  if (alreadyReplied && !open) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-teal font-medium">
        <CheckCheck className="w-3.5 h-3.5" />
        Respondido
      </span>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <Reply className="w-3.5 h-3.5" />
        Responder
      </button>
    );
  }

  async function handleSend() {
    if (!body.trim()) return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/admin/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, id, to, subject, body }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al enviar");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-teal font-medium">
        <CheckCheck className="w-3.5 h-3.5" />
        Enviado
      </span>
    );
  }

  return (
    <div className="space-y-2 min-w-[260px]">
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full text-xs px-2 py-1.5 rounded-lg border border-border bg-background"
        placeholder="Asunto"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        className="w-full text-xs px-2 py-1.5 rounded-lg border border-border bg-background"
        placeholder={`Respuesta para ${to}...`}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
      <div className="flex items-center gap-2">
        <button
          onClick={handleSend}
          disabled={status === "sending" || !body.trim()}
          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-teal text-white disabled:opacity-50 transition-opacity"
        >
          {status === "sending" ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          Enviar
        </button>
        <button
          onClick={() => setOpen(false)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

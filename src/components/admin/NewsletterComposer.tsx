"use client";

import { useState } from "react";
import { Send, Loader2, CheckCheck, Mail } from "lucide-react";

type SendStatus = "idle" | "confirming" | "sending" | "sent" | "error";

export function NewsletterComposer({ recipientCount }: { recipientCount: number }) {
  const [subject, setSubject] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [testStatus, setTestStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [testError, setTestError] = useState("");
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle");
  const [sendError, setSendError] = useState("");
  const [sentCount, setSentCount] = useState(0);

  const canSend = !!subject.trim() && !!bodyText.trim();

  function resetSendState() {
    setTestStatus("idle");
    setSendStatus("idle");
  }

  async function handleTest() {
    setTestStatus("sending");
    setTestError("");
    try {
      const res = await fetch("/api/admin/newsletter/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, bodyText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al enviar la prueba");
      setTestStatus("sent");
    } catch (err) {
      setTestError(err instanceof Error ? err.message : "Error al enviar la prueba");
      setTestStatus("error");
    }
  }

  async function handleConfirmSend() {
    setSendStatus("sending");
    setSendError("");
    try {
      const res = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, bodyText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al enviar la campaña");
      setSentCount(data.sentCount ?? recipientCount);
      setSendStatus("sent");
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Error al enviar la campaña");
      setSendStatus("error");
    }
  }

  if (sendStatus === "sent") {
    return (
      <div className="rounded-xl border border-border p-4 flex items-center gap-2 text-sm text-teal">
        <CheckCheck className="w-4 h-4" />
        Campaña enviada a {sentCount} suscriptores.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border p-4 space-y-3">
      <h3 className="text-sm font-medium flex items-center gap-2">
        <Mail className="w-4 h-4 text-muted-foreground" />
        Nueva campaña
      </h3>

      <input
        value={subject}
        onChange={(e) => {
          setSubject(e.target.value);
          resetSendState();
        }}
        placeholder="Asunto"
        className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background"
      />
      <textarea
        value={bodyText}
        onChange={(e) => {
          setBodyText(e.target.value);
          resetSendState();
        }}
        placeholder="Cuerpo del newsletter (separá párrafos con una línea en blanco)..."
        rows={8}
        className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background resize-y"
      />

      {testError && <p className="text-xs text-destructive">{testError}</p>}
      {sendError && <p className="text-xs text-destructive">{sendError}</p>}

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleTest}
          disabled={!canSend || testStatus === "sending"}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-border hover:bg-muted/40 disabled:opacity-50 transition-colors"
        >
          {testStatus === "sending" ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          Mandarme prueba
        </button>

        {testStatus === "sent" && (
          <span className="text-xs text-teal inline-flex items-center gap-1">
            <CheckCheck className="w-3.5 h-3.5" /> Prueba enviada, revisá tu correo
          </span>
        )}

        {testStatus === "sent" && sendStatus === "idle" && (
          <button
            onClick={() => setSendStatus("confirming")}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-teal text-white transition-opacity hover:opacity-90"
          >
            Enviar a los {recipientCount} suscriptores
          </button>
        )}
      </div>

      {(sendStatus === "confirming" || sendStatus === "sending" || sendStatus === "error") && (
        <div className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2.5">
          <p className="text-xs text-muted-foreground flex-1">
            ¿Confirmás el envío a {recipientCount} suscriptores? No se puede deshacer.
          </p>
          <button
            onClick={handleConfirmSend}
            disabled={sendStatus === "sending"}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[var(--color-terracotta)] text-white disabled:opacity-50"
          >
            {sendStatus === "sending" && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            Confirmar envío
          </button>
          <button
            onClick={() => setSendStatus("idle")}
            disabled={sendStatus === "sending"}
            className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

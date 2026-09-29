"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleCheck, CircleX, Loader2 } from "lucide-react";

export function AgentPrActions({ number }: { number: number }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "publish" | "discard" | "confirm-discard">("idle");
  const [error, setError] = useState("");

  async function run(action: "publish" | "discard") {
    setStatus(action);
    setError("");
    try {
      const res = await fetch("/api/admin/agentes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, number }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
      setStatus("idle");
    }
  }

  const busy = status === "publish" || status === "discard";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => run("publish")}
        disabled={busy}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-teal)] text-[var(--color-cream)] text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === "publish" ? <Loader2 className="w-4 h-4 animate-spin" /> : <CircleCheck className="w-4 h-4" />}
        Publicar
      </button>

      {status === "confirm-discard" ? (
        <span className="inline-flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">¿Descartar?</span>
          <button type="button" onClick={() => run("discard")} className="font-medium text-destructive hover:underline">
            Sí
          </button>
          <button type="button" onClick={() => setStatus("idle")} className="text-muted-foreground hover:underline">
            No
          </button>
        </span>
      ) : (
        <button
          type="button"
          onClick={() => setStatus("confirm-discard")}
          disabled={busy}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          {status === "discard" ? <Loader2 className="w-4 h-4 animate-spin" /> : <CircleX className="w-4 h-4" />}
          Descartar
        </button>
      )}

      {error && <p className="w-full text-xs text-destructive">{error}</p>}
    </div>
  );
}

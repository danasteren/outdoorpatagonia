"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

export function DeleteButton({
  source,
  id,
}: {
  source: "contact" | "operator";
  id: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [status, setStatus] = useState<"idle" | "deleting" | "error">("idle");
  const [error, setError] = useState("");

  async function handleDelete() {
    setStatus("deleting");
    setError("");
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al borrar");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al borrar");
      setStatus("error");
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2 text-xs">
        <span className="text-muted-foreground">¿Borrar?</span>
        <button
          onClick={handleDelete}
          disabled={status === "deleting"}
          className="font-medium text-destructive hover:underline disabled:opacity-50"
        >
          {status === "deleting" ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            "Sí"
          )}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          No
        </button>
      </span>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={() => setConfirming(true)}
        className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" />
        Borrar
      </button>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

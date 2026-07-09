"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Camera, Loader2, CheckCheck, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const MAX_SIZE_BYTES = 40 * 1024 * 1024;
const REJECTED_TYPES = new Set(["image/heic", "image/heif", "video/quicktime"]);

type Status = "idle" | "uploading" | "publishing" | "done" | "error";

export function AhoraComposer() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [publishedId, setPublishedId] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Elegí una foto o un video primero.");
      setStatus("error");
      return;
    }
    if (REJECTED_TYPES.has(file.type)) {
      setError(
        "Ese formato (HEIC/MOV) no se ve bien en todos los navegadores. En el iPhone: Ajustes → Cámara → Formatos → Más compatible, y volvé a intentar."
      );
      setStatus("error");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("El archivo pesa más de 40MB. Grabá algo más corto o en menor calidad.");
      setStatus("error");
      return;
    }

    setError("");
    setStatus("uploading");
    try {
      const urlRes = await fetch("/api/admin/ahora/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: file.type }),
      });
      const urlData = await urlRes.json();
      if (!urlRes.ok) throw new Error(urlData.error || "No pudimos preparar la subida");

      const supabase = createClient();
      const { error: uploadError } = await supabase.storage
        .from("ahora")
        .uploadToSignedUrl(urlData.path, urlData.token, file);
      if (uploadError) throw new Error(uploadError.message);

      setStatus("publishing");
      const publishRes = await fetch("/api/admin/ahora/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publicUrl: urlData.publicUrl,
          media_type: file.type.startsWith("video/") ? "video" : "photo",
          caption,
          location_text: location,
        }),
      });
      const publishData = await publishRes.json();
      if (!publishRes.ok) throw new Error(publishData.error || "No pudimos publicar");

      setPublishedId(publishData.id);
      setStatus("done");
      setCaption("");
      setLocation("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo salió mal");
      setStatus("error");
    }
  }

  const busy = status === "uploading" || status === "publishing";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5"
    >
      <div>
        <label className="block text-sm font-medium mb-1.5">Foto o video</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,video/mp4"
          className="w-full text-sm file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-muted file:text-sm file:font-medium"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Máx. 40MB. Si tu iPhone graba en HEIC/MOV, cambialo a &quot;Más compatible&quot; en Ajustes → Cámara → Formatos.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Caption (opcional)</label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={2}
          className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background resize-none"
          placeholder="¿Qué estás viendo?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Ubicación (opcional)</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background"
          placeholder="Ej: El Chaltén, Cerro Torre"
        />
      </div>

      {status === "error" && <p className="text-sm text-[var(--color-terracotta)]">{error}</p>}
      {status === "done" && publishedId && (
        <p className="text-sm text-teal flex items-center gap-1.5">
          <CheckCheck className="w-4 h-4" />
          Publicado.{" "}
          <Link href={`/ahora/${publishedId}`} className="underline">
            Ver momento
          </Link>
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--color-teal)] text-[var(--color-cream)] text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {busy ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : status === "done" ? (
          <Camera className="w-4 h-4" />
        ) : (
          <Upload className="w-4 h-4" />
        )}
        {status === "uploading"
          ? "Subiendo…"
          : status === "publishing"
            ? "Publicando…"
            : "Publicar momento"}
      </button>
    </form>
  );
}

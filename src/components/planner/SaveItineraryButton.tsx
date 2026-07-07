"use client"

import { useState } from "react"
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react"
import { Button } from "@/components/primitives"
import { saveItinerary } from "@/lib/actions/user-data"
import type { TripFormData, ItineraryResult } from "@/lib/planner/types"

export function SaveItineraryButton({
  form,
  result,
  floating = false,
}: {
  form: TripFormData
  result: ItineraryResult
  floating?: boolean
}) {
  const [state, setState] = useState<"idle" | "saving" | "saved" | "no_auth">("idle")

  async function handleSave() {
    setState("saving")
    const res = await saveItinerary(form, result)
    if ("error" in res) {
      setState(res.error === "no_auth" ? "no_auth" : "idle")
    } else {
      setState("saved")
    }
  }

  if (state === "saved") {
    return (
      <div
        className={
          floating
            ? "flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--color-teal)] text-white text-sm font-medium shadow-lg"
            : "flex items-center gap-1.5 text-sm text-[var(--color-teal)]"
        }
      >
        <BookmarkCheck size={16} />
        Guardado en tu perfil
      </div>
    )
  }

  if (state === "no_auth") {
    return (
      <div
        className={
          floating
            ? "px-5 py-3 rounded-full bg-white/90 backdrop-blur text-sm text-muted-foreground shadow-lg border border-border"
            : "text-sm text-muted-foreground"
        }
      >
        Iniciá sesión para guardar tu viaje
      </div>
    )
  }

  if (floating) {
    return (
      <button
        onClick={handleSave}
        disabled={state === "saving"}
        className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-teal)] text-white text-sm font-semibold shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-70 cursor-pointer"
      >
        {state === "saving" ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Bookmark size={16} />
        )}
        Guardar viaje
      </button>
    )
  }

  return (
    <Button
      variant="brand-secondary"
      onClick={handleSave}
      disabled={state === "saving"}
      className="min-w-[140px]"
    >
      {state === "saving" ? <Loader2 size={16} className="animate-spin" /> : <Bookmark size={16} />}
      Guardar viaje
    </Button>
  )
}

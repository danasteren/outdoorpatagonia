"use client"

import { useState } from "react"
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react"
import { Button } from "@/components/primitives"
import { saveItinerary } from "@/lib/actions/user-data"
import type { TripFormData, ItineraryResult } from "@/lib/planner/types"

export function SaveItineraryButton({ form, result }: { form: TripFormData; result: ItineraryResult }) {
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
      <div className="flex items-center gap-1.5 text-sm text-[var(--color-teal)]">
        <BookmarkCheck size={16} />
        Guardado en tu perfil
      </div>
    )
  }

  if (state === "no_auth") {
    return (
      <p className="text-sm text-muted-foreground">
        Iniciá sesión desde el menú para guardar tu viaje
      </p>
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

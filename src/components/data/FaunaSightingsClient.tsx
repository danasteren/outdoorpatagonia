"use client"

import { useState } from "react"
import { ExternalLink, X, MapPin, Calendar, User } from "lucide-react"
import type { SightingWithCoords } from "@/lib/apis/inaturalist"

type Props = {
  sightings: SightingWithCoords[]
  taxonId?: number
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—"
  return new Date(dateStr).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function largeImageUrl(url: string): string {
  return url.replace("/square.", "/large.").replace("/medium.", "/large.")
}

function SightingModal({
  sighting,
  onClose,
}: {
  sighting: SightingWithCoords
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full bg-card rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {sighting.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={largeImageUrl(sighting.imageUrl)}
            alt={sighting.commonName ?? sighting.speciesName}
            className="w-full max-h-80 object-cover"
          />
        )}

        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-4 space-y-2">
          <p className="font-semibold italic text-sm">{sighting.speciesName}</p>

          {sighting.placeGuess && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[var(--color-terracotta)]" />
              {sighting.placeGuess}
            </div>
          )}

          {sighting.observedOn && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              {formatDate(sighting.observedOn)}
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-3.5 h-3.5 shrink-0" />
            @{sighting.observerLogin}
          </div>

          <a
            href={sighting.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-teal)] hover:underline pt-1"
          >
            Ver en iNaturalist
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}

export function FaunaSightingsClient({ sightings, taxonId }: Props) {
  const [selected, setSelected] = useState<SightingWithCoords | null>(null)

  if (sightings.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground text-sm">
        <p>No hay avistamientos recientes registrados en la Patagonia.</p>
        {taxonId && (
          <a
            href={`https://www.inaturalist.org/taxa/${taxonId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-teal)] hover:underline mt-2 inline-block"
          >
            Ver en iNaturalist
          </a>
        )}
      </div>
    )
  }

  return (
    <>
      {selected && (
        <SightingModal sighting={selected} onClose={() => setSelected(null)} />
      )}

      <section>
        <h2 className="text-xl font-bold mb-3">Últimas observaciones</h2>
        <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
          {sightings.slice(0, 8).map((s) => (
            <div
              key={s.id}
              className="relative group rounded-xl border border-border bg-card hover:border-[var(--color-teal)] hover:shadow-sm transition-all"
            >
              <button
                onClick={() => setSelected(s)}
                className="w-full text-left p-3 flex gap-3 items-start cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)] rounded-xl"
                aria-label={`Ver foto: ${s.placeGuess ?? s.speciesName}`}
              >
                {s.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={s.imageUrl}
                    alt={s.commonName ?? s.speciesName}
                    className="w-14 h-14 object-cover rounded-lg shrink-0 group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-muted shrink-0" />
                )}

                <div className="flex-1 min-w-0">
                  {s.placeGuess && (
                    <p className="text-sm font-medium leading-snug">{s.placeGuess}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatDate(s.observedOn)} · @{s.observerLogin}
                  </p>
                </div>
              </button>

              <a
                href={s.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                aria-label="Ver en iNaturalist"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>

        {taxonId && (
          <a
            href={`https://www.inaturalist.org/observations?taxon_id=${taxonId}&place_id=7161`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-sm text-[var(--color-teal)] hover:underline"
          >
            Ver todas las observaciones en Patagonia
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </section>
    </>
  )
}

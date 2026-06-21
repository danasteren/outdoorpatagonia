"use client"

import { useState } from "react"
import { ExternalLink, Camera } from "lucide-react"
import { Modal, ModalContent } from "@/components/primitives"
import type { PhotoSighting } from "@/lib/apis/inaturalist"

function largeUrl(smallUrl: string): string {
  return smallUrl.replace(/\/small\b/, "/medium")
}

interface Props {
  photos: PhotoSighting[]
}

export function PhotoGrid({ photos }: Props) {
  const [selected, setSelected] = useState<PhotoSighting | null>(null)

  if (photos.length === 0) return null

  const displayName = (p: PhotoSighting) =>
    p.commonName
      ? p.commonName.charAt(0).toUpperCase() + p.commonName.slice(1)
      : p.speciesName

  return (
    <>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
          Fotografía — registros recientes en Patagonia
        </p>
        <div className="grid grid-cols-3 gap-2">
          {photos.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className="relative aspect-square overflow-hidden rounded-lg group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.photoUrl}
                alt={displayName(p)}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-2">
                <p className="text-white text-[10px] font-medium leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2 text-left">
                  {displayName(p)}
                </p>
              </div>
            </button>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 text-right">
          Fuente:{" "}
          <a
            href="https://www.inaturalist.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            iNaturalist
          </a>
        </p>
      </div>

      <Modal open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <ModalContent className="max-w-sm p-0 overflow-hidden">
          {selected && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={largeUrl(selected.photoUrl)}
                alt={displayName(selected)}
                className="w-full h-64 object-cover"
              />
              <div className="p-5">
                <p className="font-semibold text-foreground mb-0.5">{displayName(selected)}</p>
                {selected.commonName && (
                  <p className="text-xs italic text-muted-foreground mb-3">
                    {selected.speciesName}
                  </p>
                )}
                {selected.placeGuess && (
                  <p className="text-xs text-muted-foreground mb-4">{selected.placeGuess}</p>
                )}
                <a
                  href={selected.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  <Camera size={13} strokeWidth={1.5} />
                  Ver en iNaturalist
                  <ExternalLink size={13} strokeWidth={1.5} />
                </a>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

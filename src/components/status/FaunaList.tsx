"use client"

import { useState } from "react"
import { MapPin, Eye, ExternalLink, Calendar, User } from "lucide-react"
import { Card, CardBody, Button } from "@/components/primitives"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from "@/components/primitives"
import type { Sighting } from "@/lib/apis/inaturalist"

function mediumUrl(squareUrl: string): string {
  return squareUrl.replace("/square", "/medium").replace("square.", "medium.")
}

function FaunaRow({
  sighting,
  onClick,
}: {
  sighting: Sighting
  onClick: () => void
}) {
  const displayName = sighting.commonName
    ? sighting.commonName.charAt(0).toUpperCase() + sighting.commonName.slice(1)
    : sighting.speciesName
  const italicName = sighting.commonName ? sighting.speciesName : null

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 py-2.5 border-b border-border last:border-0 hover:text-primary transition-colors group text-left"
    >
      {sighting.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sighting.imageUrl}
          alt={displayName}
          className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
          <Eye size={14} strokeWidth={1.5} className="text-muted-foreground" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-tight truncate group-hover:text-primary transition-colors">
          {displayName}
        </p>
        {italicName && (
          <p className="text-xs italic text-muted-foreground truncate">{italicName}</p>
        )}
        {sighting.placeGuess && (
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin size={10} strokeWidth={1.5} className="text-muted-foreground flex-shrink-0" />
            <p className="text-xs text-muted-foreground truncate">{sighting.placeGuess}</p>
          </div>
        )}
      </div>
      {sighting.observedOn && (
        <span className="text-[10px] text-muted-foreground flex-shrink-0 self-start pt-0.5">
          {sighting.observedOn}
        </span>
      )}
    </button>
  )
}

export function FaunaList({ sightings }: { sightings: Sighting[] }) {
  const [selected, setSelected] = useState<Sighting | null>(null)

  const displayName = selected
    ? selected.commonName
      ? selected.commonName.charAt(0).toUpperCase() + selected.commonName.slice(1)
      : selected.speciesName
    : ""

  return (
    <>
      <Card variant="default">
        <CardBody className="py-1 px-4">
          {sightings.map((s) => (
            <FaunaRow key={s.id} sighting={s} onClick={() => setSelected(s)} />
          ))}
        </CardBody>
      </Card>

      <Modal open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <ModalContent className="max-w-sm p-0 overflow-hidden">
          {selected && (
            <>
              {selected.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mediumUrl(selected.imageUrl)}
                  alt={displayName}
                  className="w-full h-56 object-cover"
                />
              ) : (
                <div className="w-full h-56 bg-muted flex items-center justify-center">
                  <Eye size={32} strokeWidth={1} className="text-muted-foreground" />
                </div>
              )}

              <div className="p-5">
                <ModalHeader className="mb-3">
                  <ModalTitle>{displayName}</ModalTitle>
                  {selected.commonName && (
                    <ModalDescription className="italic">{selected.speciesName}</ModalDescription>
                  )}
                </ModalHeader>

                <div className="flex flex-col gap-1.5 text-sm text-muted-foreground mb-4">
                  {selected.placeGuess && (
                    <div className="flex items-center gap-2">
                      <MapPin size={13} strokeWidth={1.5} className="flex-shrink-0" />
                      <span>{selected.placeGuess}</span>
                    </div>
                  )}
                  {selected.observedOn && (
                    <div className="flex items-center gap-2">
                      <Calendar size={13} strokeWidth={1.5} className="flex-shrink-0" />
                      <span>{selected.observedOn}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <User size={13} strokeWidth={1.5} className="flex-shrink-0" />
                    <span>@{selected.observerLogin}</span>
                  </div>
                </div>

                <a
                  href={selected.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
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

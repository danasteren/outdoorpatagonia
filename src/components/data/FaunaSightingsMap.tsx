"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { SightingWithCoords } from "@/lib/apis/inaturalist"

type Props = {
  sightings: SightingWithCoords[]
  center?: [number, number]
}

const PATAGONIA_CENTER: [number, number] = [-47, -70]

export function FaunaSightingsMap({ sightings, center }: Props) {
  const positioned = sightings.filter(
    (s) => s.latitude !== null && s.longitude !== null
  )

  const mapCenter: [number, number] =
    center ??
    (positioned.length > 0
      ? [positioned[0].latitude!, positioned[0].longitude!]
      : PATAGONIA_CENTER)

  // Leaflet needs to recalculate size after mount inside a constrained container
  useEffect(() => {
    window.dispatchEvent(new Event("resize"))
  }, [])

  return (
    <MapContainer
      center={mapCenter}
      zoom={5}
      minZoom={3}
      maxZoom={13}
      style={{ height: "100%", width: "100%" }}
      zoomControl={true}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        maxZoom={19}
      />
      {positioned.map((s) => (
        <CircleMarker
          key={s.id}
          center={[s.latitude!, s.longitude!]}
          radius={7}
          pathOptions={{
            color: "var(--color-terracotta, #c0503a)",
            fillColor: "var(--color-terracotta, #c0503a)",
            fillOpacity: 0.7,
            weight: 1.5,
          }}
        >
          <Popup>
            <div className="text-sm space-y-0.5">
              {s.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.imageUrl}
                  alt={s.commonName ?? s.speciesName}
                  className="w-full h-20 object-cover rounded mb-1"
                />
              )}
              <p className="font-semibold">{s.commonName ?? s.speciesName}</p>
              {s.placeGuess && (
                <p className="text-muted-foreground">{s.placeGuess}</p>
              )}
              {s.observedOn && (
                <p className="text-muted-foreground">
                  {new Date(s.observedOn).toLocaleDateString("es-AR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}
              <a
                href={s.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--color-teal)] hover:underline block mt-1"
              >
                Ver en iNaturalist →
              </a>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}

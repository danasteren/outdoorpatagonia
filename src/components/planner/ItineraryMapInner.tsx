"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect } from "react"
import type { ItineraryDay } from "@/lib/planner/types"

function BoundsFitter({ positions }: { positions: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    if (positions.length > 1) {
      map.fitBounds(positions, { padding: [40, 40], maxZoom: 9 })
    }
  }, [map, positions])
  return null
}

interface ItineraryMapInnerProps {
  days: ItineraryDay[]
  center: [number, number] // [lng, lat]
  zoom: number
}

export function ItineraryMapInner({ days, center, zoom }: ItineraryMapInnerProps) {
  const seen = new Set<string>()
  const unique = days.filter((d) => {
    if (seen.has(d.location)) return false
    seen.add(d.location)
    return true
  })

  // data is [lng, lat] — leaflet expects [lat, lng]
  const positions = unique.map((d) => [d.coordinates[1], d.coordinates[0]] as [number, number])

  return (
    <MapContainer
      center={[center[1], center[0]]}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {positions.length > 1 && <BoundsFitter positions={positions} />}
      {unique.map((day, i) => {
        const icon = L.divIcon({
          html: `<div style="width:28px;height:28px;border-radius:50%;background:#4b9492;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:700;">${i + 1}</div>`,
          className: "",
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          popupAnchor: [0, -16],
        })
        return (
          <Marker
            key={day.location}
            position={[day.coordinates[1], day.coordinates[0]]}
            icon={icon}
          >
            <Popup closeButton={false}>
              <strong style={{ fontSize: 13 }}>{day.location}</strong>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

"use client"

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { FireHotspot } from "@/lib/apis/nasa-firms"

function frpColor(frp: number): string {
  if (frp >= 50) return "#ef4444"
  if (frp >= 10) return "#f97316"
  return "#f59e0b"
}

export function FireMap({ hotspots }: { hotspots: FireHotspot[] }) {
  return (
    <MapContainer
      center={[-45.5, -68]}
      zoom={5}
      minZoom={3}
      maxZoom={14}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        maxZoom={19}
      />
      {hotspots.map((h, i) => {
        const color = frpColor(h.frp)
        return (
          <CircleMarker
            key={i}
            center={[h.latitude, h.longitude]}
            radius={6}
            pathOptions={{ color, weight: 1.5, fillColor: color, fillOpacity: 0.8 }}
          >
            <Tooltip direction="top" offset={[0, -6]} opacity={0.95}>
              <span style={{ fontSize: 12 }}>
                {h.acqDate} · {h.frp.toFixed(1)} MW · {h.confidence === "h" ? "Alta confianza" : "Nominal"}
              </span>
            </Tooltip>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}

"use client"

import { MapContainer, TileLayer, Circle, CircleMarker, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"

const CITIES = [
  { name: "Ushuaia", lat: -54.8, lng: -68.3, note: "Dentro del área típica del agujero" },
  { name: "Punta Arenas", lat: -53.16, lng: -70.91, note: "Dentro del área típica del agujero" },
  { name: "Río Gallegos", lat: -51.62, lng: -69.22, note: "Dentro del área típica del agujero" },
  { name: "El Calafate", lat: -50.34, lng: -72.27, note: "Dentro del área típica del agujero" },
  { name: "Comodoro Rivadavia", lat: -45.86, lng: -67.48, note: "Solo alcanzada en eventos extremos" },
]

export function OzoneMap() {
  return (
    <MapContainer
      center={[-50.5, -69]}
      zoom={4}
      minZoom={3}
      maxZoom={7}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        maxZoom={19}
      />

      {/* Alcance en eventos extremos */}
      <Circle
        center={[-49, -68.5]}
        radius={850000}
        pathOptions={{ color: "#f59e0b", fillColor: "#f59e0b", fillOpacity: 0.08, weight: 1.5, dashArray: "6 5" }}
      />

      {/* Alcance típico */}
      <Circle
        center={[-51.5, -70]}
        radius={500000}
        pathOptions={{ color: "#ef4444", fillColor: "#ef4444", fillOpacity: 0.15, weight: 1.5 }}
      />

      {CITIES.map((c) => (
        <CircleMarker
          key={c.name}
          center={[c.lat, c.lng]}
          radius={5}
          pathOptions={{ color: "#0f172a", weight: 1.5, fillColor: "#fff", fillOpacity: 1 }}
        >
          <Tooltip direction="top" offset={[0, -6]} opacity={0.95}>
            <span style={{ fontSize: 12 }}>
              <strong>{c.name}</strong>
              <br />
              {c.note}
            </span>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}

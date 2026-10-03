"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix default marker icons broken by webpack
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export type MapPunto = { lat: number; lon: number; nombre: string }

export function SectorMapInner({
  lat,
  lon,
  nombre,
  puntos,
}: {
  lat: number
  lon: number
  nombre: string
  puntos?: MapPunto[]
}) {
  // Con varias zonas el mapa encuadra todas; con un solo punto, vista regional
  const markers = puntos && puntos.length > 0 ? puntos : [{ lat, lon, nombre }]
  const view =
    markers.length > 1
      ? { bounds: L.latLngBounds(markers.map((p) => [p.lat, p.lon])).pad(0.25) }
      : { center: [lat, lon] as [number, number], zoom: 11 }

  return (
    <MapContainer
      {...view}
      style={{ height: "280px", width: "100%" }}
      className="rounded-xl overflow-hidden"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((p) => (
        <Marker key={p.nombre} position={[p.lat, p.lon]} icon={icon}>
          <Popup>{p.nombre}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

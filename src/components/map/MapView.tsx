"use client";

import { useState, useCallback } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, Polygon, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LayerControls } from "./LayerControls";
import { MapInfoPanel } from "./MapInfoPanel";
import type { ActiveLayers, LayerId, MapFeature } from "./types";
import { PARQUES, SENDEROS, FAUNA, CLIMA, PATAGONIA_POLYGON, MALVINAS_POLYGON } from "./map-data";

const CENTER: [number, number] = [-45.5, -70.2];
const ZOOM = 6;

const LAYER_COLORS: Record<LayerId, string> = {
  parques: "#2E6B4E",
  senderos: "#C2762A",
  fauna: "#6B3FA0",
  clima: "#2A7EC2",
};

const LAYER_DATA: Record<LayerId, MapFeature[]> = {
  parques: PARQUES,
  senderos: SENDEROS,
  fauna: FAUNA,
  clima: CLIMA,
};

function ResizeHandler() {
  const map = useMap();
  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => map.invalidateSize(), { once: false });
  }
  return null;
}

export function MapView() {
  const [activeLayers, setActiveLayers] = useState<ActiveLayers>({
    parques: true,
    senderos: false,
    fauna: false,
    clima: false,
  });
  const [selectedFeature, setSelectedFeature] = useState<MapFeature | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const toggleLayer = useCallback((id: LayerId) => {
    setActiveLayers((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const openFeature = useCallback((feature: MapFeature) => {
    setSelectedFeature(feature);
    setPanelOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setPanelOpen(false);
    setSelectedFeature(null);
  }, []);

  const activeLayerIds = Object.entries(activeLayers)
    .filter(([, v]) => v)
    .map(([k]) => k as LayerId);

  return (
    <div
      className="fixed left-0 right-0 bottom-0 z-40 overflow-hidden"
      style={{ top: "4rem" }}
    >
      <MapContainer
        center={CENTER}
        zoom={ZOOM}
        minZoom={3}
        maxZoom={18}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          maxZoom={19}
        />

        {/* Patagonia + Malvinas region boundary */}
        {[PATAGONIA_POLYGON, MALVINAS_POLYGON].map((polygon, i) => (
          <Polygon
            key={i}
            positions={polygon}
            pathOptions={{
              color: "#2E6B4E",
              weight: 2,
              opacity: 0.5,
              fillColor: "#2E6B4E",
              fillOpacity: 0.06,
              dashArray: "6 4",
            }}
          >
            {i === 1 && (
              <Tooltip permanent direction="center" opacity={1}>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#2E6B4E" }}>
                  Islas Malvinas<br />(Argentina)
                </span>
              </Tooltip>
            )}
          </Polygon>
        ))}

        {/* Active layer markers */}
        {activeLayerIds.map((layerId) =>
          LAYER_DATA[layerId].map((feature) => {
            const [lng, lat] = feature.coordinates;
            const color = LAYER_COLORS[layerId];
            return (
              <CircleMarker
                key={`${layerId}-${feature.title}`}
                center={[lat, lng]}
                radius={7}
                pathOptions={{
                  color,
                  weight: 2,
                  fillColor: color,
                  fillOpacity: 0.85,
                }}
                eventHandlers={{
                  click: () => openFeature(feature),
                }}
              >
                <Tooltip direction="top" offset={[0, -8]} opacity={0.95}>
                  <span className="text-xs font-medium">{feature.title}</span>
                </Tooltip>
              </CircleMarker>
            );
          })
        )}

        <ResizeHandler />
      </MapContainer>

      <div className="absolute top-4 left-4 z-[1000]">
        <LayerControls activeLayers={activeLayers} onToggle={toggleLayer} />
      </div>

      <MapInfoPanel
        feature={selectedFeature}
        open={panelOpen}
        onClose={closePanel}
      />
    </div>
  );
}

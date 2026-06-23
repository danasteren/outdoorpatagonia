"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, Polygon, useMap } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Plus, Minus } from "lucide-react";
import { LayerControls } from "./LayerControls";
import { MapInfoPanel } from "./MapInfoPanel";
import type { ActiveLayers, BasemapId, FireHotspot, LayerId, MapFeature } from "./types";
import { PARQUES, SENDEROS, FAUNA, ESCALADA, GLACIARES, CLIMA, PATAGONIA_POLYGON, MALVINAS_POLYGON } from "./map-data";

const CENTER: [number, number] = [-45.5, -70.2];
const ZOOM = 6;

const LAYER_COLORS: Record<LayerId, string> = {
  parques:   "#2E6B4E",
  senderos:  "#C2762A",
  fauna:     "#6B3FA0",
  escalada:  "#9B2C2C",
  glaciares: "#2563EB",
  incendios: "#DC2626",
  clima:     "#2A7EC2",
};

const STATIC_LAYER_DATA: Record<Exclude<LayerId, "incendios">, MapFeature[]> = {
  parques:   PARQUES,
  senderos:  SENDEROS,
  fauna:     FAUNA,
  escalada:  ESCALADA,
  glaciares: GLACIARES,
  clima:     CLIMA,
};

const BASEMAP_TILES: Record<BasemapId, { url: string; attribution: string }> = {
  street: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP",
  },
};

function ResizeHandler() {
  const map = useMap();
  useEffect(() => {
    const handler = () => map.invalidateSize();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [map]);
  return null;
}

function MapController({ mapRef }: { mapRef: React.MutableRefObject<LeafletMap | null> }) {
  const map = useMap();
  useEffect(() => { mapRef.current = map; }, [map, mapRef]);
  return null;
}

export function MapView() {
  const mapRef = useRef<LeafletMap | null>(null);

  const [activeLayers, setActiveLayers] = useState<ActiveLayers>({
    parques:   true,
    senderos:  false,
    fauna:     false,
    escalada:  false,
    glaciares: false,
    incendios: false,
    clima:     false,
  });
  const [selectedFeature, setSelectedFeature] = useState<MapFeature | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [basemap, setBasemap] = useState<BasemapId>("street");
  const [fires, setFires] = useState<FireHotspot[]>([]);
  const [firesLoaded, setFiresLoaded] = useState(false);

  // Fetch fire data when layer is activated for the first time
  useEffect(() => {
    if (!activeLayers.incendios || firesLoaded) return;
    fetch("/api/fires")
      .then((r) => r.json())
      .then((data) => {
        setFires(data.hotspots ?? []);
        setFiresLoaded(true);
      })
      .catch(() => setFiresLoaded(true));
  }, [activeLayers.incendios, firesLoaded]);

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

  const matchesSearch = useCallback(
    (title: string) =>
      searchQuery.trim() === "" ||
      title.toLowerCase().includes(searchQuery.toLowerCase()),
    [searchQuery]
  );

  const staticLayerIds = (
    Object.entries(activeLayers) as [LayerId, boolean][]
  )
    .filter(([id, v]) => v && id !== "incendios")
    .map(([id]) => id as Exclude<LayerId, "incendios">);

  const { url: tileUrl, attribution } = BASEMAP_TILES[basemap];

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
        <TileLayer url={tileUrl} attribution={attribution} maxZoom={19} />

        {/* Patagonia + Malvinas region boundary */}
        {[PATAGONIA_POLYGON, MALVINAS_POLYGON].map((polygon, i) => (
          <Polygon
            key={i}
            positions={polygon}
            pathOptions={{
              color: "#2E6B4E",
              weight: 2,
              opacity: 0.4,
              fillColor: "#2E6B4E",
              fillOpacity: 0.04,
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

        {/* Static layer markers */}
        {staticLayerIds.map((layerId) =>
          STATIC_LAYER_DATA[layerId]
            .filter((f) => matchesSearch(f.title))
            .map((feature) => {
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
                  eventHandlers={{ click: () => openFeature(feature) }}
                >
                  <Tooltip direction="top" offset={[0, -8]} opacity={0.95}>
                    <span className="text-xs font-medium">{feature.title}</span>
                  </Tooltip>
                </CircleMarker>
              );
            })
        )}

        {/* Live fire markers */}
        {activeLayers.incendios &&
          fires
            .filter((f) => matchesSearch(`Foco — ${f.acqDate}`))
            .map((fire, i) => {
              const radius = Math.min(4 + fire.frp / 10, 14);
              const fillColor = fire.confidence === "h" ? "#DC2626" : "#F97316";
              return (
                <CircleMarker
                  key={`fire-${i}`}
                  center={[fire.latitude, fire.longitude]}
                  radius={radius}
                  pathOptions={{
                    color: "#7F1D1D",
                    weight: 1,
                    fillColor,
                    fillOpacity: 0.82,
                  }}
                  eventHandlers={{
                    click: () =>
                      openFeature({
                        type: "incendios",
                        title: `Foco activo — ${fire.acqDate}`,
                        coordinates: [fire.longitude, fire.latitude],
                        description: `Foco de calor detectado por satélite VIIRS-SNPP. Potencia radiativa: ${fire.frp.toFixed(1)} MW.`,
                        properties: {
                          Fecha: fire.acqDate,
                          Confianza: fire.confidence === "h" ? "Alta" : "Normal",
                          "FRP (MW)": fire.frp.toFixed(1),
                          Brillo: `${fire.brightness.toFixed(0)} K`,
                          Fuente: "NASA FIRMS · VIIRS-SNPP",
                        },
                      }),
                  }}
                >
                  <Tooltip direction="top" offset={[0, -6]} opacity={0.95}>
                    <span className="text-xs font-medium text-red-600">
                      Foco · {fire.acqDate}
                    </span>
                  </Tooltip>
                </CircleMarker>
              );
            })}

        <ResizeHandler />
        <MapController mapRef={mapRef} />
      </MapContainer>

      {/* Layer controls — top left */}
      <div className="absolute top-4 left-4 z-[1000]">
        <LayerControls
          activeLayers={activeLayers}
          onToggle={toggleLayer}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          basemap={basemap}
          onBasemapChange={setBasemap}
          fireCount={firesLoaded ? fires.length : undefined}
        />
      </div>

      {/* Zoom controls — bottom right */}
      <div className="absolute bottom-8 right-4 z-[1000] flex flex-col gap-1">
        <button
          onClick={() => mapRef.current?.zoomIn()}
          className="w-9 h-9 flex items-center justify-center bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-card text-foreground hover:bg-muted transition-colors"
          aria-label="Acercar"
        >
          <Plus size={16} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => mapRef.current?.zoomOut()}
          className="w-9 h-9 flex items-center justify-center bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-card text-foreground hover:bg-muted transition-colors"
          aria-label="Alejar"
        >
          <Minus size={16} strokeWidth={1.5} />
        </button>
      </div>

      <MapInfoPanel
        feature={selectedFeature}
        open={panelOpen}
        onClose={closePanel}
      />
    </div>
  );
}

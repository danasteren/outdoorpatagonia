"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { LayerControls } from "./LayerControls";
import { MapInfoPanel } from "./MapInfoPanel";
import type { ActiveLayers, LayerId, MapFeature } from "./types";

const CENTER: [number, number] = [-70.2, -45.5];
const ZOOM = 5.5;
const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

export function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const [activeLayers, setActiveLayers] = useState<ActiveLayers>({
    parques: true,
    senderos: false,
    fauna: false,
    clima: false,
  });
  const [selectedFeature, setSelectedFeature] = useState<MapFeature | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  void mapLoaded;

  useEffect(() => {
    const onResize = () => mapRef.current?.resize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center: CENTER,
      zoom: ZOOM,
      minZoom: 3,
      maxZoom: 16,
      attributionControl: false,
    });

    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right"
    );
    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }),
      "top-right"
    );
    map.addControl(
      new maplibregl.ScaleControl({ maxWidth: 100, unit: "metric" }),
      "bottom-left"
    );

    map.on("load", () => setMapLoaded(true));

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const toggleLayer = useCallback((id: LayerId) => {
    setActiveLayers((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const openFeature = useCallback((feature: MapFeature) => {
    setSelectedFeature(feature);
    setPanelOpen(true);
  }, []);
  void openFeature;

  const closePanel = useCallback(() => {
    setPanelOpen(false);
    setSelectedFeature(null);
  }, []);

  return (
    // fixed below the sticky header (h-16 = 64px); z-40 keeps it under header's z-50
    <div className="fixed inset-0 top-16 z-40 overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />

      <div className="absolute top-4 left-4 z-10">
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

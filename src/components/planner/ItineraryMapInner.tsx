"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { ItineraryDay } from "@/lib/planner/types";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

interface ItineraryMapInnerProps {
  days: ItineraryDay[];
  center: [number, number];
  zoom: number;
}

export function ItineraryMapInner({
  days,
  center,
  zoom,
}: ItineraryMapInnerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center,
      zoom,
      attributionControl: false,
    });

    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right"
    );
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", () => {
      // Deduplicate locations — only one marker per unique location
      const seen = new Set<string>();
      const unique = days.filter((d) => {
        const key = d.location;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      unique.forEach((day, i) => {
        const el = document.createElement("div");
        el.className = "itinerary-marker";
        el.style.cssText = `
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--color-teal, #4b9492);
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 11px;
          font-weight: 700;
          cursor: default;
        `;
        el.textContent = String(i + 1);

        new maplibregl.Marker({ element: el })
          .setLngLat(day.coordinates)
          .setPopup(
            new maplibregl.Popup({ offset: 16, closeButton: false }).setHTML(
              `<strong style="font-size:13px">${day.location}</strong>`
            )
          )
          .addTo(map);
      });

      // Fit map to markers if multiple locations
      if (unique.length > 1) {
        const bounds = unique.reduce(
          (b, d) => b.extend(d.coordinates as [number, number]),
          new maplibregl.LngLatBounds(
            unique[0].coordinates,
            unique[0].coordinates
          )
        );
        map.fitBounds(bounds, { padding: 60, maxZoom: 9 });
      }
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className="absolute inset-0" />;
}

"use client";

import { Mountain, RouteOff, Bird, Cloud } from "lucide-react";
import type { ActiveLayers, LayerId } from "./types";

const LAYERS: {
  id: LayerId;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}[] = [
  { id: "parques", label: "Parques", icon: Mountain },
  { id: "senderos", label: "Senderos", icon: RouteOff },
  { id: "fauna", label: "Fauna", icon: Bird },
  { id: "clima", label: "Clima", icon: Cloud },
];

interface LayerControlsProps {
  activeLayers: ActiveLayers;
  onToggle: (id: LayerId) => void;
}

export function LayerControls({ activeLayers, onToggle }: LayerControlsProps) {
  return (
    <div className="flex flex-col gap-1 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-1.5 shadow-card">
      {LAYERS.map(({ id, label, icon: Icon }) => {
        const active = activeLayers[id];
        return (
          <button
            key={id}
            onClick={() => onToggle(id)}
            title={label}
            className={[
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            ].join(" ")}
          >
            <Icon size={15} strokeWidth={active ? 2 : 1.5} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

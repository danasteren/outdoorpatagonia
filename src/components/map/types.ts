export type LayerId =
  | "parques"
  | "senderos"
  | "fauna"
  | "escalada"
  | "glaciares"
  | "incendios"
  | "clima";

export type ActiveLayers = Record<LayerId, boolean>;

export type BasemapId = "street" | "satellite";

export interface MapFeature {
  type: LayerId | "punto";
  title: string;
  description?: string;
  coordinates: [number, number]; // [lng, lat]
  properties?: Record<string, unknown>;
  pageUrl?: string;
  affiliateLink?: {
    label: string;
    url: string;
    type: "booking" | "getyourguide" | "amazon";
  };
}

export interface FireHotspot {
  latitude: number;
  longitude: number;
  brightness: number;
  acqDate: string;
  confidence: string;
  frp: number;
}

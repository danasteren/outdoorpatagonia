export type LayerId = "parques" | "senderos" | "fauna" | "clima";

export type ActiveLayers = Record<LayerId, boolean>;

export interface MapFeature {
  type: LayerId | "punto";
  title: string;
  description?: string;
  coordinates: [number, number];
  properties?: Record<string, unknown>;
  pageUrl?: string;
  affiliateLink?: {
    label: string;
    url: string;
    type: "booking" | "getyourguide" | "amazon";
  };
}

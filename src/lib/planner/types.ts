export type Origin = "chile" | "argentina" | "internacional";
export type Interest =
  | "naturaleza"
  | "trekking"
  | "fotografia"
  | "gastronomia"
  | "fauna";
export type Budget = "economico" | "moderado" | "premium";
export type Season = "verano" | "otono" | "invierno" | "primavera";

export interface TripFormData {
  month: number; // 1–12
  year: number;
  days: number;
  origin: Origin;
  interests: Interest[];
  budget: Budget;
}

export interface ItineraryDay {
  day: number;
  location: string;
  coordinates: [number, number]; // [lng, lat]
  title: string;
  description: string;
  activities: string[];
}

export interface Accommodation {
  name: string;
  location: string;
  type: string;
  priceRange: string;
  description: string;
  bookingUrl: string;
  budget: Budget;
}

export interface Tour {
  name: string;
  location: string;
  duration: string;
  description: string;
  url: string;
  interests: Interest[];
}

export interface GearItem {
  name: string;
  description: string;
  url: string;
  interests: Interest[];
  seasons: Season[];
}

export interface ItineraryResult {
  title: string;
  subtitle: string;
  season: Season;
  days: ItineraryDay[];
  accommodations: Accommodation[];
  tours: Tour[];
  gear: GearItem[];
  mapCenter: [number, number];
  mapZoom: number;
  tips: string[];
}

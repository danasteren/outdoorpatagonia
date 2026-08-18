export type Operator = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  location: string | null;
  region: string | null;
  categories: string[];
  website: string | null;
  phone: string | null;
  email: string | null;
  logo_url: string | null;
  is_featured: boolean;
  created_at: string;
};

// Solo para el panel admin: incluye datos de facturación que nunca se
// exponen en las queries públicas (ver src/lib/operators/queries.ts).
export type OperatorAdmin = Operator & {
  price_monthly: number | null;
  featured_until: string | null;
  notes: string | null;
};

export const REGIONS = [
  "Santa Cruz",
  "Tierra del Fuego",
  "Río Negro",
  "Neuquén",
  "Chubut",
  "Chile",
] as const;

export const CATEGORIES: Record<string, string> = {
  trekking: "Trekking",
  montanismo: "Montañismo",
  glaciares: "Glaciares",
  kayak: "Kayak",
  navegacion: "Navegación",
  cabalgatas: "Cabalgatas",
  "torres-del-paine": "Torres del Paine",
  aventura: "Aventura",
  pesca: "Pesca",
  esqui: "Esquí",
  estancias: "Estancias",
  estepa: "Estepa",
  fotografia: "Fotografía",
  birdwatching: "Birdwatching",
};

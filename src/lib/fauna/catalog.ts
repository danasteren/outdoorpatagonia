export type FaunaCategory = "mamifero" | "ave" | "reptil" | "anfibio" | "pez"

export type FaunaEntry = {
  slug: string
  taxonId: number
  gbifKey?: number
  scientificName: string
  commonNameEs: string
  commonNameEn: string
  category: FaunaCategory
  parquesRelacionados: Array<{ nombre: string; slug: string }>
}

export const FAUNA_CATALOG: FaunaEntry[] = [
  {
    slug: "guanaco",
    taxonId: 42459,
    gbifKey: 2441886,
    scientificName: "Lama guanicoe",
    commonNameEs: "Guanaco",
    commonNameEn: "Guanaco",
    category: "mamifero",
    parquesRelacionados: [
      { nombre: "Torres del Paine", slug: "torres-del-paine" },
      { nombre: "Los Glaciares", slug: "los-glaciares" },
      { nombre: "Tierra del Fuego", slug: "tierra-del-fuego" },
      { nombre: "Monte León", slug: "monte-leon" },
    ],
  },
  {
    slug: "puma",
    taxonId: 42538,
    gbifKey: 2435099,
    scientificName: "Puma concolor",
    commonNameEs: "Puma",
    commonNameEn: "Mountain Lion",
    category: "mamifero",
    parquesRelacionados: [
      { nombre: "Torres del Paine", slug: "torres-del-paine" },
      { nombre: "Los Glaciares", slug: "los-glaciares" },
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
    ],
  },
  {
    slug: "condor-andino",
    taxonId: 4786,
    gbifKey: 2481584,
    scientificName: "Vultur gryphus",
    commonNameEs: "Cóndor andino",
    commonNameEn: "Andean Condor",
    category: "ave",
    parquesRelacionados: [
      { nombre: "Los Glaciares", slug: "los-glaciares" },
      { nombre: "Torres del Paine", slug: "torres-del-paine" },
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
      { nombre: "Lanín", slug: "lanin" },
    ],
  },
  {
    slug: "huemul",
    taxonId: 42489,
    gbifKey: 2441925,
    scientificName: "Hippocamelus bisulcus",
    commonNameEs: "Huemul",
    commonNameEn: "South Andean Deer",
    category: "mamifero",
    parquesRelacionados: [
      { nombre: "Los Glaciares", slug: "los-glaciares" },
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
      { nombre: "Perito Moreno", slug: "perito-moreno" },
    ],
  },
  {
    slug: "pinguino-de-magallanes",
    taxonId: 4862,
    gbifKey: 2481908,
    scientificName: "Spheniscus magellanicus",
    commonNameEs: "Pingüino de Magallanes",
    commonNameEn: "Magellanic Penguin",
    category: "ave",
    parquesRelacionados: [
      { nombre: "Monte León", slug: "monte-leon" },
      { nombre: "Tierra del Fuego", slug: "tierra-del-fuego" },
      { nombre: "Punta Tombo", slug: "punta-tombo" },
    ],
  },
  {
    slug: "choique",
    taxonId: 5121,
    gbifKey: 2474637,
    scientificName: "Rhea pennata",
    commonNameEs: "Choique",
    commonNameEn: "Lesser Rhea",
    category: "ave",
    parquesRelacionados: [
      { nombre: "Torres del Paine", slug: "torres-del-paine" },
      { nombre: "Los Glaciares", slug: "los-glaciares" },
      { nombre: "Monte León", slug: "monte-leon" },
    ],
  },
  {
    slug: "flamenco-austral",
    taxonId: 4822,
    gbifKey: 2481841,
    scientificName: "Phoenicopterus chilensis",
    commonNameEs: "Flamenco austral",
    commonNameEn: "Chilean Flamingo",
    category: "ave",
    parquesRelacionados: [
      { nombre: "Los Flamencos", slug: "los-flamencos" },
      { nombre: "Torres del Paine", slug: "torres-del-paine" },
    ],
  },
  {
    slug: "zorro-gris",
    taxonId: 42408,
    gbifKey: 2435047,
    scientificName: "Lycalopex griseus",
    commonNameEs: "Zorro gris patagónico",
    commonNameEn: "South American Gray Fox",
    category: "mamifero",
    parquesRelacionados: [
      { nombre: "Torres del Paine", slug: "torres-del-paine" },
      { nombre: "Tierra del Fuego", slug: "tierra-del-fuego" },
      { nombre: "Los Glaciares", slug: "los-glaciares" },
    ],
  },
  {
    slug: "coipo",
    taxonId: 43706,
    scientificName: "Myocastor coypus",
    commonNameEs: "Coipo",
    commonNameEn: "Coypu",
    category: "mamifero",
    parquesRelacionados: [
      { nombre: "Los Glaciares", slug: "los-glaciares" },
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
    ],
  },
  {
    slug: "cauquen-comun",
    taxonId: 4813,
    scientificName: "Chloephaga picta",
    commonNameEs: "Cauquén común",
    commonNameEn: "Upland Goose",
    category: "ave",
    parquesRelacionados: [
      { nombre: "Torres del Paine", slug: "torres-del-paine" },
      { nombre: "Tierra del Fuego", slug: "tierra-del-fuego" },
    ],
  },
  {
    slug: "lobo-marino-del-sur",
    taxonId: 41668,
    gbifKey: 2433392,
    scientificName: "Otaria flavescens",
    commonNameEs: "Lobo marino del sur",
    commonNameEn: "South American Sea Lion",
    category: "mamifero",
    parquesRelacionados: [
      { nombre: "Monte León", slug: "monte-leon" },
      { nombre: "Tierra del Fuego", slug: "tierra-del-fuego" },
    ],
  },
  {
    slug: "elefante-marino-del-sur",
    taxonId: 41712,
    gbifKey: 2433404,
    scientificName: "Mirounga leonina",
    commonNameEs: "Elefante marino del sur",
    commonNameEn: "Southern Elephant Seal",
    category: "mamifero",
    parquesRelacionados: [
      { nombre: "Monte León", slug: "monte-leon" },
      { nombre: "Valdés", slug: "valdes" },
    ],
  },
]

export function getFaunaEntry(slug: string): FaunaEntry | null {
  return FAUNA_CATALOG.find((e) => e.slug === slug) ?? null
}

export const CATEGORY_LABELS: Record<FaunaCategory, string> = {
  mamifero: "Mamífero",
  ave: "Ave",
  reptil: "Reptil",
  anfibio: "Anfibio",
  pez: "Pez",
}

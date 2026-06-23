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
    taxonId: 42240,
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
    taxonId: 42007,
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
    taxonId: 4747,
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
    taxonId: 42180,
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
    taxonId: 3812,
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
    taxonId: 73338,
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
    taxonId: 4258,
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
    taxonId: 332338,
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
    taxonId: 43997,
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
    taxonId: 7117,
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
    taxonId: 41761,
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
    slug: "ballena-franca-austral",
    taxonId: 41571,
    gbifKey: 2440489,
    scientificName: "Eubalaena australis",
    commonNameEs: "Ballena franca austral",
    commonNameEn: "Southern Right Whale",
    category: "mamifero",
    parquesRelacionados: [
      { nombre: "Península Valdés", slug: "peninsula-valdes" },
      { nombre: "Monte León", slug: "monte-leon" },
    ],
  },
  {
    slug: "orca",
    taxonId: 41521,
    gbifKey: 2440010,
    scientificName: "Orcinus orca",
    commonNameEs: "Orca",
    commonNameEn: "Orca",
    category: "mamifero",
    parquesRelacionados: [
      { nombre: "Península Valdés", slug: "peninsula-valdes" },
    ],
  },
  {
    slug: "delfin-austral",
    taxonId: 1672273,
    gbifKey: 2440718,
    scientificName: "Cephalorhynchus australis",
    commonNameEs: "Delfín austral",
    commonNameEn: "Peale's Dolphin",
    category: "mamifero",
    parquesRelacionados: [
      { nombre: "Torres del Paine", slug: "torres-del-paine" },
      { nombre: "Tierra del Fuego", slug: "tierra-del-fuego" },
    ],
  },
  {
    slug: "tonina-overa",
    taxonId: 41514,
    gbifKey: 2440705,
    scientificName: "Cephalorhynchus commersonii",
    commonNameEs: "Tonina overa",
    commonNameEn: "Commerson's Dolphin",
    category: "mamifero",
    parquesRelacionados: [
      { nombre: "Tierra del Fuego", slug: "tierra-del-fuego" },
      { nombre: "Monte León", slug: "monte-leon" },
    ],
  },
  {
    slug: "ballena-jorobada",
    taxonId: 41566,
    gbifKey: 2440508,
    scientificName: "Megaptera novaeangliae",
    commonNameEs: "Ballena jorobada",
    commonNameEn: "Humpback Whale",
    category: "mamifero",
    parquesRelacionados: [
      { nombre: "Tierra del Fuego", slug: "tierra-del-fuego" },
    ],
  },
  {
    slug: "elefante-marino-del-sur",
    taxonId: 41729,
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

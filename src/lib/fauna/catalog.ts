export type FaunaCategory = "mamifero" | "ave" | "reptil" | "anfibio" | "pez"

export type FaunaEntry = {
  slug: string
  taxonId: number
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

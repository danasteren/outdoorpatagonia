export type FloraCategory = "arbol" | "arbusto" | "herbácea" | "enredadera"

export type FloraEntry = {
  slug: string
  scientificName: string
  commonNameEs: string
  commonNameEn: string
  category: FloraCategory
  genero: "m" | "f"
  taxonId?: number
  parquesRelacionados: Array<{ nombre: string; slug: string }>
  productosRecomendados?: Array<{ nombre: string; query: string }>
  /** Overrides opcionales de SEO title/description. Si no están, se generan desde commonNameEs/scientificName. */
  metaTitle?: string
  metaDescription?: string
}

export const CATEGORY_LABELS: Record<FloraCategory, string> = {
  arbol: "Árbol",
  arbusto: "Arbusto",
  "herbácea": "Herbácea",
  enredadera: "Enredadera",
}

export const CATEGORY_LABELS_PLURAL: Record<FloraCategory, string> = {
  arbol: "Árboles",
  arbusto: "Arbustos",
  "herbácea": "Herbáceas",
  enredadera: "Enredaderas",
}

export const FLORA_CATALOG: FloraEntry[] = [
  {
    slug: "lenga",
    scientificName: "Nothofagus pumilio",
    commonNameEs: "Lenga",
    commonNameEn: "Lenga beech",
    category: "arbol",
    genero: "f",
    parquesRelacionados: [
      { nombre: "Los Glaciares", slug: "los-glaciares" },
      { nombre: "Torres del Paine", slug: "torres-del-paine" },
      { nombre: "Tierra del Fuego", slug: "tierra-del-fuego" },
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
    ],
  },
  {
    slug: "nire",
    scientificName: "Nothofagus antarctica",
    commonNameEs: "Ñire",
    commonNameEn: "Antarctic beech",
    category: "arbol",
    genero: "m",
    parquesRelacionados: [
      { nombre: "Los Glaciares", slug: "los-glaciares" },
      { nombre: "Torres del Paine", slug: "torres-del-paine" },
      { nombre: "Tierra del Fuego", slug: "tierra-del-fuego" },
    ],
  },
  {
    slug: "coihue",
    scientificName: "Nothofagus dombeyi",
    commonNameEs: "Coihue",
    commonNameEn: "Coigue",
    category: "arbol",
    genero: "m",
    parquesRelacionados: [
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
      { nombre: "Los Alerces", slug: "los-alerces" },
      { nombre: "Lanín", slug: "lanin" },
    ],
  },
  {
    slug: "alerce",
    scientificName: "Fitzroya cupressoides",
    commonNameEs: "Alerce",
    commonNameEn: "Patagonian cypress",
    category: "arbol",
    genero: "m",
    parquesRelacionados: [
      { nombre: "Los Alerces", slug: "los-alerces" },
    ],
  },
  {
    slug: "araucaria",
    scientificName: "Araucaria araucana",
    commonNameEs: "Araucaria / Pehuén",
    commonNameEn: "Monkey puzzle tree",
    category: "arbol",
    genero: "f",
    parquesRelacionados: [
      { nombre: "Lanín", slug: "lanin" },
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
    ],
  },
  {
    slug: "maiten",
    taxonId: 77969,
    scientificName: "Maytenus boaria",
    commonNameEs: "Maitén",
    commonNameEn: "Maiten tree",
    category: "arbol",
    genero: "m",
    parquesRelacionados: [
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
      { nombre: "Los Alerces", slug: "los-alerces" },
      { nombre: "Lanín", slug: "lanin" },
    ],
  },
  {
    slug: "arrayan",
    taxonId: 77844,
    scientificName: "Luma apiculata",
    commonNameEs: "Arrayán / Quetri",
    commonNameEn: "Chilean myrtle",
    category: "arbol",
    genero: "m",
    parquesRelacionados: [
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
      { nombre: "Los Alerces", slug: "los-alerces" },
    ],
  },
  {
    slug: "pitra",
    taxonId: 527543,
    scientificName: "Myrceugenia exsucca",
    commonNameEs: "Pitra / Patagua",
    commonNameEn: "Pitra",
    category: "arbol",
    genero: "f",
    parquesRelacionados: [
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
      { nombre: "Los Alerces", slug: "los-alerces" },
      { nombre: "Tierra del Fuego", slug: "tierra-del-fuego" },
    ],
  },
  {
    slug: "cipres-de-la-cordillera",
    taxonId: 136243,
    scientificName: "Austrocedrus chilensis",
    commonNameEs: "Ciprés de la cordillera",
    commonNameEn: "Cordilleran cypress",
    category: "arbol",
    genero: "m",
    parquesRelacionados: [
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
      { nombre: "Los Alerces", slug: "los-alerces" },
      { nombre: "Lanín", slug: "lanin" },
      { nombre: "Perito Moreno", slug: "perito-moreno" },
    ],
  },
  {
    slug: "notro",
    taxonId: 319327,
    scientificName: "Embothrium coccineum",
    commonNameEs: "Notro / Ciruelillo",
    commonNameEn: "Chilean firetree",
    category: "arbol",
    genero: "m",
    parquesRelacionados: [
      { nombre: "Torres del Paine", slug: "torres-del-paine" },
      { nombre: "Los Glaciares", slug: "los-glaciares" },
      { nombre: "Tierra del Fuego", slug: "tierra-del-fuego" },
    ],
  },
  {
    slug: "chacay-hembra",
    taxonId: 965424,
    scientificName: "Ochetophila trinervis",
    commonNameEs: "Chacay hembra",
    commonNameEn: "Chacay hembra",
    category: "arbol",
    genero: "m",
    parquesRelacionados: [
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
      { nombre: "Lanín", slug: "lanin" },
    ],
  },
  {
    slug: "trevo",
    taxonId: 1241356,
    scientificName: "Archidasyphyllum diacanthoides",
    commonNameEs: "Trevo / Palo santo",
    commonNameEn: "Trevoa",
    category: "arbol",
    genero: "m",
    parquesRelacionados: [
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
      { nombre: "Los Alerces", slug: "los-alerces" },
      { nombre: "Lanín", slug: "lanin" },
      { nombre: "Tierra del Fuego", slug: "tierra-del-fuego" },
    ],
  },
  {
    slug: "avellano",
    taxonId: 490916,
    scientificName: "Gevuina avellana",
    commonNameEs: "Avellano nativo / Guevín",
    commonNameEn: "Chilean hazel",
    category: "arbol",
    genero: "m",
    parquesRelacionados: [
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
      { nombre: "Lanín", slug: "lanin" },
      { nombre: "Los Alerces", slug: "los-alerces" },
    ],
  },
  {
    slug: "calafate",
    scientificName: "Berberis microphylla",
    commonNameEs: "Calafate",
    commonNameEn: "Calafate barberry",
    category: "arbusto",
    genero: "m",
    metaTitle: "Calafate, la Planta: Dónde y Cuándo Verla en Patagonia",
    metaDescription:
      "Calafate (Berberis microphylla): dónde crece en la Patagonia -Los Glaciares, Torres del Paine, Tierra del Fuego- y cuándo es su temporada de floración.",
    parquesRelacionados: [
      { nombre: "Los Glaciares", slug: "los-glaciares" },
      { nombre: "Torres del Paine", slug: "torres-del-paine" },
      { nombre: "Tierra del Fuego", slug: "tierra-del-fuego" },
    ],
    productosRecomendados: [
      { nombre: "Guía de flora patagónica", query: "field guide patagonia plants flora book" },
      { nombre: "Canasto de recolección plegable", query: "foldable foraging berry picking basket" },
      { nombre: "Frascos de vidrio para mermelada", query: "glass mason jars for jam making" },
      { nombre: "Libro de mermeladas y conservas caseras", query: "homemade jam preserving recipes book" },
    ],
  },
  {
    slug: "michay",
    scientificName: "Berberis darwinii",
    commonNameEs: "Michay",
    commonNameEn: "Darwin's barberry",
    category: "arbusto",
    genero: "m",
    parquesRelacionados: [
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
      { nombre: "Lanín", slug: "lanin" },
    ],
  },
  {
    slug: "chilco",
    scientificName: "Fuchsia magellanica",
    commonNameEs: "Chilco",
    commonNameEn: "Hummingbird fuchsia",
    category: "arbusto",
    genero: "m",
    parquesRelacionados: [
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
      { nombre: "Los Glaciares", slug: "los-glaciares" },
      { nombre: "Tierra del Fuego", slug: "tierra-del-fuego" },
    ],
  },
  {
    slug: "amancay",
    scientificName: "Alstroemeria aurea",
    commonNameEs: "Amancay",
    commonNameEn: "Golden lily",
    category: "herbácea",
    genero: "m",
    metaTitle: "Amancay, la Flor: Dónde y Cuándo Verla en Patagonia",
    metaDescription:
      "Amancay (Alstroemeria aurea): dónde florece en la Patagonia -Nahuel Huapi, Los Glaciares, Lanín-, su temporada y observaciones recientes registradas.",
    parquesRelacionados: [
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
      { nombre: "Los Glaciares", slug: "los-glaciares" },
      { nombre: "Lanín", slug: "lanin" },
    ],
    productosRecomendados: [
      { nombre: "Guía de flora patagónica", query: "field guide patagonia plants flora book" },
      { nombre: "Binoculares compactos", query: "compact binoculars hiking nature watching" },
      { nombre: "Lente macro para celular", query: "clip on macro lens for smartphone photography" },
      { nombre: "Libro de fotografía de flores silvestres", query: "wildflower photography book field guide" },
    ],
  },
  {
    slug: "colihue",
    scientificName: "Chusquea culeou",
    commonNameEs: "Colihue",
    commonNameEn: "Colihue bamboo",
    category: "arbusto",
    genero: "m",
    parquesRelacionados: [
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
      { nombre: "Los Alerces", slug: "los-alerces" },
      { nombre: "Lanín", slug: "lanin" },
    ],
  },
  {
    slug: "mutisia",
    scientificName: "Mutisia decurrens",
    commonNameEs: "Mutisia",
    commonNameEn: "Climbing mutisia",
    category: "enredadera",
    genero: "f",
    parquesRelacionados: [
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
      { nombre: "Lanín", slug: "lanin" },
    ],
  },
]

export function getFloraEntry(slug: string): FloraEntry | undefined {
  return FLORA_CATALOG.find((e) => e.slug === slug)
}

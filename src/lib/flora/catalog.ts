export type FloraCategory = "arbol" | "arbusto" | "herbácea" | "enredadera"

export type FloraEntry = {
  slug: string
  scientificName: string
  commonNameEs: string
  commonNameEn: string
  category: FloraCategory
  taxonId?: number
  parquesRelacionados: Array<{ nombre: string; slug: string }>
}

export const CATEGORY_LABELS: Record<FloraCategory, string> = {
  arbol: "Árbol",
  arbusto: "Arbusto",
  "herbácea": "Herbácea",
  enredadera: "Enredadera",
}

export const FLORA_CATALOG: FloraEntry[] = [
  {
    slug: "lenga",
    scientificName: "Nothofagus pumilio",
    commonNameEs: "Lenga",
    commonNameEn: "Lenga beech",
    category: "arbol",
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
    parquesRelacionados: [
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
      { nombre: "Los Alerces", slug: "los-alerces" },
      { nombre: "Lanín", slug: "lanin" },
      { nombre: "Perito Moreno", slug: "perito-moreno" },
    ],
  },
  {
    slug: "notro",
    scientificName: "Embothrium coccineum",
    commonNameEs: "Notro / Ciruelillo",
    commonNameEn: "Chilean firetree",
    category: "arbusto",
    parquesRelacionados: [
      { nombre: "Torres del Paine", slug: "torres-del-paine" },
      { nombre: "Los Glaciares", slug: "los-glaciares" },
      { nombre: "Tierra del Fuego", slug: "tierra-del-fuego" },
    ],
  },
  {
    slug: "calafate",
    scientificName: "Berberis microphylla",
    commonNameEs: "Calafate",
    commonNameEn: "Calafate barberry",
    category: "arbusto",
    parquesRelacionados: [
      { nombre: "Los Glaciares", slug: "los-glaciares" },
      { nombre: "Torres del Paine", slug: "torres-del-paine" },
      { nombre: "Tierra del Fuego", slug: "tierra-del-fuego" },
    ],
  },
  {
    slug: "michay",
    scientificName: "Berberis darwinii",
    commonNameEs: "Michay",
    commonNameEn: "Darwin's barberry",
    category: "arbusto",
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
    parquesRelacionados: [
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
      { nombre: "Los Glaciares", slug: "los-glaciares" },
      { nombre: "Lanín", slug: "lanin" },
    ],
  },
  {
    slug: "colihue",
    scientificName: "Chusquea culeou",
    commonNameEs: "Colihue",
    commonNameEn: "Colihue bamboo",
    category: "herbácea",
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
    parquesRelacionados: [
      { nombre: "Nahuel Huapi", slug: "nahuel-huapi" },
      { nombre: "Lanín", slug: "lanin" },
    ],
  },
]

export function getFloraEntry(slug: string): FloraEntry | undefined {
  return FLORA_CATALOG.find((e) => e.slug === slug)
}

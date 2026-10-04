// Portadas de reemplazo para los artículos cuya foto original se perdió con el
// hosting viejo (ver src/lib/legacy-images.ts). Son fotos de Wikimedia Commons
// con licencia libre, copiadas a 1280 px al bucket "wp-uploads" (carpeta
// wikimedia/). La licencia exige atribución: ArticleLayout muestra el crédito.
// Clave: slug del artículo (español e inglés comparten foto).

export type CoverFallback = {
  /** Ruta dentro del bucket wp-uploads. */
  path: string;
  author: string;
  /** Nombre corto de la licencia, o null si es dominio público. */
  license: string | null;
  /** Página del archivo en Wikimedia Commons. */
  sourceUrl: string;
};

const BALLENA: CoverFallback = {
  path: "wikimedia/ballena-franca-austral.jpg",
  author: "Fernanda Cabral Jeronimo",
  license: "CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Southern_Right_Whale_-_Pen%C3%ADnsula_Vald%C3%A9s.jpg",
};

const COIPO: CoverFallback = {
  path: "wikimedia/coipo.jpg",
  author: "Charles J. Sharp",
  license: "CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Coypu_(Myocastor_coypus_coypus)_feeding_Tricao.jpg",
};

const ECLIPSE: CoverFallback = {
  path: "wikimedia/eclipse-anular.jpg",
  author: "Kevin Baird",
  license: "CC BY-SA 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Annular_eclipse_%22ring_of_fire%22.jpg",
};

const LOBOS: CoverFallback = {
  path: "wikimedia/lobos-marinos-punta-loma.jpg",
  author: "MikZapata",
  license: "CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Punta_Loma_Reserva_de_Lobos_Marinos.jpg",
};

const FLAMENCOS: CoverFallback = {
  path: "wikimedia/flamenco-austral.jpg",
  author: "Toradji",
  license: "CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Phoenicopterus_chilensis_(foto_toradji_uraoka).jpg",
};

const INCENDIOS: CoverFallback = {
  path: "wikimedia/incendio-forestal-patagonia.jpg",
  author: "NicolásPalacios.ph",
  license: "CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Incendio_forestal_Patagonia_Argentina_cambio_clim%C3%A1tico-_sequias_extremas.jpg",
};

const GLACIARES: CoverFallback = {
  path: "wikimedia/glaciar-perito-moreno.jpg",
  author: "Fernando",
  license: "CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Perito_Moreno_Glacier_2023.jpg",
};

const LLAOLLAO: CoverFallback = {
  path: "wikimedia/llao-llao.jpg",
  author: "Dangelin5",
  license: null,
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Llao_llao_100_0139.jpg",
};

const PAXILLUS: CoverFallback = {
  path: "wikimedia/paxillus-involutus.jpg",
  author: "Karelj",
  license: null,
  sourceUrl: "https://commons.wikimedia.org/wiki/File:%C4%8Cechratka_podvinut%C3%A1_1.jpg",
};

const HUEMUL: CoverFallback = {
  path: "wikimedia/huemul.jpg",
  author: "Diego Delso",
  license: "CC BY-SA 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Hippocamelus_bisulcus,_Parque_Nacional_Torres_del_Paine,_Chile.jpg",
};

const MORILLAS: CoverFallback = {
  path: "wikimedia/morilla.jpg",
  author: "Holger Krisp",
  license: "CC BY 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Speise_Morchel_Morchella_esculenta.jpg",
};

const RETAMA: CoverFallback = {
  path: "wikimedia/retama.jpg",
  author: "Fernando Losada Rodríguez",
  license: "CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Retama_sphaerocarpa.011_-_Monfrague.JPG",
};

const ROSANEGRA: CoverFallback = {
  path: "wikimedia/rosa-negra.jpg",
  author: "Pablo Silva",
  license: "CC BY 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Ameghiniella_australis_340230192.jpg",
};

const VISON: CoverFallback = {
  path: "wikimedia/vison-americano.jpg",
  author: "Christian Fischer",
  license: "CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:NeovisonVison.jpg",
};

export const COVER_FALLBACKS: Record<string, CoverFallback> = {
  "ballena-franca-austral": BALLENA,
  "southern-right-whale": BALLENA,
  "coipo": COIPO,
  "nutria": COIPO,
  "eclipse-solar-anular-esquel-2027": ECLIPSE,
  "annular-solar-eclipse-2027": ECLIPSE,
  "excursion-crias-lobos-marinos-puerto-madryn": LOBOS,
  "sea-lion-pups-excursion-puerto-madryn": LOBOS,
  "flamencos-en-la-patagonia": FLAMENCOS,
  "flamingos-in-patagonia": FLAMENCOS,
  "incendios-en-la-patagonia": INCENDIOS,
  "patagonia-wildfires-causes-impacts-solutions": INCENDIOS,
  "ley-glaciares": GLACIARES,
  "glaciares-patagonia-guia-completa": GLACIARES,
  "llao-llao-patagonia": LLAOLLAO,
  "paxillus-involutus": PAXILLUS,
  "peligro-extincion-huemul": HUEMUL,
  "3-main-causes-of-the-endangerment-of-the-huemul": HUEMUL,
  "recoleccion-morillas-patagonia-consejos": MORILLAS,
  "morel-mushrooms-patagonia": MORILLAS,
  "retama": RETAMA,
  "broom": RETAMA,
  "rosa-negra-ameghiniella-australis": ROSANEGRA,
  "black-rose": ROSANEGRA,
  "vison-americano": VISON,
  "american-mink": VISON,
};

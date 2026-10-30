import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import { toCategorySlug } from "@/lib/category";
import { articleRedirect } from "@/lib/article-redirects";

// Pares ES ↔ EN de la tabla `articles` cuyo slug cambia según el idioma. Los
// que comparten slug se emparejan solos (altArticlePath busca el mismo slug en
// el otro idioma); estos necesitan el par explícito para el hreflang y el link
// de cambio de idioma.
// Los de WordPress se recuperaron por portada + categoría + fecha (revisados
// a mano: seo/hreflang-pares.md).
const PAIRS: { es: string; en: string }[] = [
  { es: "aberturas-domos-geodesicos", en: "geodesic-dome-openings" },
  { es: "adaptaciones-nandues-patagonia", en: "survival-adaptations-rheas-patagonia" },
  { es: "amancay", en: "amancay-patagonia" },
  { es: "armado-triangulos-domo-geodesico", en: "assembly-triangles-geodesic-dome" },
  { es: "ballena-franca-austral", en: "southern-right-whale" },
  { es: "beneficios-arandano-salud-sabor-fin-del-mundo", en: "blueberries-patagonia-health-benefits" },
  { es: "buho-tucuquere", en: "tucuquere-owl" },
  { es: "calafate-patagonia", en: "calafate-in-patagonia" },
  { es: "campings-en-el-chalten", en: "camping-in-el-chalten-authentic-experiences" },
  { es: "centros-esqui-patagonia", en: "ski-resorts-in-patagonia" },
  { es: "chucao-patagonia-emblema-fauna-autoctona", en: "chucao-patagonia-symbol-native-wildlife" },
  { es: "ciervo-colorado", en: "red-deer" },
  { es: "cipres-de-la-cordillera-patagonia", en: "cordilleran-cypress-patagonia" },
  { es: "coipo", en: "nutria" },
  { es: "colocacion-proteccion-paneles-osb-domo-geodesico", en: "osb-panel-installation-geodesic-dome" },
  { es: "como-calcular-un-domo-geodesico-de-madera-de-6m", en: "6m-geodesic-dome-calculation-cutting-guide" },
  { es: "comprar-merken-en-la-patagonia", en: "buy-merken-in-patagonia" },
  { es: "condor-andino", en: "andean-condor" },
  { es: "construir-tarima-madera-solida-guia-paso-a-paso", en: "build-deck-wooden-posts" },
  { es: "cordero-patagonico", en: "patagonian-lamb" },
  { es: "cueva-de-las-manos-arte-rupestre", en: "cave-of-hands-patagonia-unesco-rock-art" },
  { es: "descubri-el-mate-la-bebida-tradicional-de-sudamerica", en: "discover-mate-the-traditional-south-american-drink" },
  { es: "diferencias-senderismo-trekking-patagonia", en: "hiking-vs-trekking-patagonia" },
  { es: "dinosaurios-patagonia", en: "dinosaurs-of-patagonia" },
  { es: "eclipse-solar-anular-esquel-2027", en: "annular-solar-eclipse-2027" },
  { es: "equipamiento-de-escalada", en: "climbing-equipment" },
  { es: "escarcha-patagonica-invierno-patagonia", en: "patagonian-frost-winter-patagonia" },
  { es: "estrecho-de-magallanes-historia-y-relevancia", en: "strait-of-magellan-history-significance" },
  { es: "excursion-crias-lobos-marinos-puerto-madryn", en: "sea-lion-pups-excursion-puerto-madryn" },
  { es: "flamencos-en-la-patagonia", en: "flamingos-in-patagonia" },
  { es: "frutilla-patagonia", en: "strawberry-patagonia" },
  { es: "galeses-patagonia-historia-turismo-chubut", en: "welsh-patagonia" },
  { es: "gauchito-gil-patagonia-santuarios-historia-cultura", en: "gauchito-gil-patagonia-history-miracles-sanctuaries" },
  { es: "guia-ropa-outdoor-patagonia", en: "choosing-clothing-for-patagonia" },
  { es: "hongo-de-pino-recoleccion-secado-usos", en: "pine-mushroom-collection-drying-uses" },
  { es: "hongos-de-pino-en-escabeche", en: "pickled-pine-mushrooms" },
  { es: "incendios-en-la-patagonia", en: "patagonia-wildfires-causes-impacts-solutions" },
  { es: "instalar-postes-de-madera", en: "install-wooden-posts" },
  { es: "invierno-ruta-40-patagonia", en: "ruta-40-patagonia-argentina-winter" },
  { es: "jabali-europeo", en: "wild-boar" },
  { es: "kuchen-chileno-historia-tradicion", en: "chilean-kuchen-history-tradition" },
  { es: "lago-rivadavia-parque-nacional-los-alerces", en: "lake-rivadavia-los-alerces-national-park" },
  { es: "liebre-europea-historia-impacto-y-curiosidades", en: "european-hare-history-impact-and-facts" },
  { es: "loica-en-la-patagonia-habitat-caracteristicas-conservacion", en: "loica-in-patagonia-habitat-behavior-conservation" },
  { es: "lupinos", en: "lupins-in-patagonia" },
  { es: "mapas-historicos-patagonia", en: "historical-maps-patagonia" },
  { es: "mapuche-patagonia-historia-cultura-actualidad", en: "mapuche-patagonia-history-culture-present" },
  { es: "martin-pescador", en: "ringed-kingfisher" },
  { es: "mermelada-rosa-mosqueta-patagonica", en: "patagonian-rosehip-jam" },
  { es: "monito-del-monte", en: "monito-del-monte-marsupial" },
  { es: "montaje-semiesfera-domo-geodesico", en: "geodesic-dome-hemisphere-assembly" },
  { es: "mutisia-decurrens-flor-patagonica", en: "mutisia-decurrens-patagonian-flower" },
  { es: "nalgene-botella-outdoor", en: "nalgene-water-bottle-review" },
  { es: "orca-patagonia-depredador-fascinante", en: "killer-whale-patagonia-fascinating-predator" },
  { es: "ortiguilla-insecticida-natural", en: "patagonian-fiddleneck-natural-insecticide" },
  { es: "patagonia-ubicacion-consejos-viaje", en: "patagonia-where-is-it-located" },
  { es: "pedulas-escalada", en: "climbing-shoes-guide" },
  { es: "peligro-extincion-huemul", en: "3-main-causes-of-the-endangerment-of-the-huemul" },
  { es: "piche-patagonico", en: "patagonian-piche" },
  { es: "piedra-parada-patagonia", en: "piedra-parada" },
  { es: "pinguino-penacho-amarillo-patagonia", en: "yellow-crested-penguin-patagonia" },
  { es: "pinguinos-punta-tombo-patagonia", en: "visit-punta-tombo-magellanic-penguins" },
  { es: "pino-introducido-patagonia-uso-impacto", en: "introduced-pine-patagonia-use-impact-management" },
  { es: "plantas-medicinales-patagonia", en: "medicinal-plants-patagonia" },
  { es: "preguntas-region-patagonia", en: "questions-region-patagonia" },
  { es: "prendas-mas-vendidas-patagonia", en: "patagonia-best-sellers" },
  { es: "preparacion-terreno-domo", en: "ground-preparation-dome" },
  { es: "puma-concolor-patagonia", en: "patagonian-puma-conservation" },
  { es: "recoleccion-morillas-patagonia-consejos", en: "morel-mushrooms-patagonia" },
  { es: "retama", en: "broom" },
  { es: "rosa-mosqueta-patagonia", en: "rosehip-patagonia" },
  { es: "rosa-negra-ameghiniella-australis", en: "black-rose" },
  { es: "tero", en: "southern-lapwing" },
  { es: "todo-sobre-el-guanaco", en: "guanaco-habitat-diet-more" },
  { es: "tragedia-selknam-julius-popper", en: "selknam-tragedy-julius-popper" },
  { es: "tulipanes-trevelin", en: "trevelin-tulip-fields" },
  { es: "vison-americano", en: "american-mink" },
  { es: "zorro-gris", en: "patagonian-gray-fox" },
];

/** Slug del mismo artículo en el otro idioma (el mismo slug si no hay par cargado). */
export function altLangSlug(slug: string, to: "es" | "en"): string {
  const pair = PAIRS.find((p) => (to === "en" ? p.es : p.en) === slug);
  return pair ? pair[to] : slug;
}

/**
 * Ruta del mismo artículo en el otro idioma, o null si no hay par publicado o
 * si el par redirige (absorbido por una guía o una ficha). Si en español la
 * ruta muestra una ficha del catálogo (mismo slug), devuelve la de la ficha.
 * Cliente sin cookies: lo usan también páginas estáticas.
 */
export const altArticlePath = cache(
  async (slug: string, to: "es" | "en"): Promise<string | null> => {
    const { data } = await createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
      .from("articles")
      .select("slug, category")
      .eq("slug", altLangSlug(slug, to))
      .eq("language", to)
      .eq("status", "published")
      .maybeSingle();
    if (!data) return null;
    const cat = toCategorySlug(data.category ?? "");
    if (cat === "recursos-descargables") return null; // redirige a la home
    const path = to === "en" ? `/en/${cat}/${data.slug}` : `/${cat}/${data.slug}`;
    return articleRedirect(path) ? null : path;
  }
);

/**
 * Ruta EN de una página en español de fauna, flora o gastronomía (artículo o
 * ficha del catálogo con el mismo slug que un artículo). Solo si el artículo
 * EN apunta de vuelta a esta misma ruta: una ficha sin artículo ES detrás no
 * tiene par.
 */
export async function esSectionAltPath(path: string): Promise<string | null> {
  const en = await altArticlePath(path.split("/").pop()!, "en");
  if (!en) return null;
  return (await altArticlePath(en.split("/").pop()!, "es")) === path ? en : null;
}

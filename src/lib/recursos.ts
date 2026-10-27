// Links de /recursos-viaje-patagonia y /en/resources-traveling-patagonia.
// Solo organismos oficiales o el sitio propio de cada herramienta (ver DECISIONS 2026-10-27).

type Lang = "es" | "en";

export type Recurso = {
  label: Record<Lang, string>;
  href: string;
  desc: Record<Lang, string>;
};

export type RecursosSection = {
  title: Record<Lang, string>;
  links: Recurso[];
};

export const RECURSOS_PATH: Record<Lang, string> = {
  es: "/recursos-viaje-patagonia",
  en: "/en/resources-traveling-patagonia",
};

export const RECURSOS_SECTIONS: RecursosSection[] = [
  {
    title: { es: "Argentina", en: "Argentina" },
    links: [
      {
        label: { es: "Administración de Parques Nacionales", en: "National Parks Administration" },
        href: "https://www.argentina.gob.ar/parquesnacionales",
        desc: {
          es: "Información oficial sobre los parques nacionales argentinos.",
          en: "Official information on Argentine national parks.",
        },
      },
      {
        label: { es: "SMN — Servicio Meteorológico Nacional", en: "SMN — National Meteorological Service" },
        href: "https://www.smn.gob.ar/",
        desc: {
          es: "Pronóstico del tiempo para toda la Argentina.",
          en: "Weather forecast for all of Argentina.",
        },
      },
      {
        label: { es: "La Guía Esqala", en: "La Guía Esqala" },
        href: "https://esqala.com.ar/",
        desc: {
          es: "Guía de escalada de Esquel y La Comarca.",
          en: "Climbing guide for Esquel and La Comarca.",
        },
      },
      {
        label: { es: "Ruta 0", en: "Ruta 0" },
        href: "https://www.ruta0.com",
        desc: {
          es: "Distancias, costos de combustible y mapas de rutas de la Argentina.",
          en: "Distances, fuel costs and road maps of Argentina.",
        },
      },
    ],
  },
  {
    title: { es: "Chile", en: "Chile" },
    links: [
      {
        label: { es: "CONAF — Corporación Nacional Forestal", en: "CONAF — National Forestry Corporation" },
        href: "https://www.conaf.cl/",
        desc: {
          es: "Parques nacionales y senderos de Chile.",
          en: "National parks and trails in Chile.",
        },
      },
      {
        label: { es: "Sernatur", en: "Sernatur" },
        href: "https://www.sernatur.cl/",
        desc: {
          es: "Servicio Nacional de Turismo de Chile.",
          en: "Chile's National Tourism Service.",
        },
      },
      {
        label: { es: "Patagonia Chile", en: "Patagonia Chile" },
        href: "https://patagonia-chile.com/",
        desc: {
          es: "Sitio de Sernatur sobre turismo en la Patagonia chilena.",
          en: "Sernatur's site on tourism in Chilean Patagonia.",
        },
      },
      {
        label: { es: "Chile Travel", en: "Chile Travel" },
        href: "https://chile.travel/",
        desc: {
          es: "Sitio oficial de promoción turística de Chile.",
          en: "Chile's official tourism promotion site.",
        },
      },
    ],
  },
  {
    title: { es: "Recursos generales", en: "General resources" },
    links: [
      {
        label: { es: "Waze", en: "Waze" },
        href: "https://www.waze.com/",
        desc: {
          es: "Navegación en tiempo real para rutas de Argentina y Chile.",
          en: "Real-time navigation for roads in Argentina and Chile.",
        },
      },
      {
        label: { es: "Maps.me", en: "Maps.me" },
        href: "https://maps.me/",
        desc: {
          es: "Mapas offline, ideales para zonas sin señal.",
          en: "Offline maps, ideal for areas without signal.",
        },
      },
      {
        label: { es: "iNaturalist", en: "iNaturalist" },
        href: "https://www.inaturalist.org/",
        desc: {
          es: "Identificá fauna y flora en el campo con ayuda de la comunidad.",
          en: "Identify wildlife and plants in the field with community help.",
        },
      },
      {
        label: { es: "Wikiloc", en: "Wikiloc" },
        href: "https://www.wikiloc.com/",
        desc: {
          es: "Senderos y rutas registrados por viajeros en toda la Patagonia.",
          en: "Trails and routes logged by travelers across Patagonia.",
        },
      },
    ],
  },
  {
    title: { es: "Emergencias y seguridad", en: "Emergency & safety" },
    links: [
      {
        label: { es: "Gendarmería Nacional Argentina", en: "Argentine National Gendarmerie" },
        href: "https://www.argentina.gob.ar/gendarmeria",
        desc: {
          es: "Control fronterizo y asistencia en zona de frontera.",
          en: "Border control and assistance in frontier areas.",
        },
      },
      {
        label: { es: "Carabineros de Chile", en: "Carabineros de Chile" },
        href: "https://www.carabineros.cl/",
        desc: {
          es: "Policía y emergencias en territorio chileno.",
          en: "Police and emergency services in Chile.",
        },
      },
      {
        label: { es: "Cruz Roja Argentina", en: "Argentine Red Cross" },
        href: "https://www.cruzroja.org.ar/",
        desc: {
          es: "Asistencia humanitaria y emergencias.",
          en: "Humanitarian assistance and emergency response.",
        },
      },
    ],
  },
];

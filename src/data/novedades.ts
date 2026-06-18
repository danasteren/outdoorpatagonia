export type TipoCambio = "nuevo" | "mejora" | "correccion";

export interface Cambio {
  tipo: TipoCambio;
  texto: string;
}

export interface VersionNovedades {
  numero: string;
  fecha: string;
  titulo: string;
  esUltima?: boolean;
  cambios: Cambio[];
}

export const novedades: VersionNovedades[] = [
  {
    numero: "1.2",
    fecha: "Junio 2026",
    titulo: "Fauna, parques nacionales y senderos",
    esUltima: true,
    cambios: [
      {
        tipo: "nuevo",
        texto: "Sección Fauna — 48 especies patagónicas con avistamientos recientes en mapa interactivo, histograma mensual para saber cuándo verlas y datos en tiempo real de iNaturalist",
      },
      {
        tipo: "nuevo",
        texto: "Sección Parques Nacionales — 16 parques con descripción, highlights, fauna que habita cada uno, senderos y cómo llegar",
      },
      {
        tipo: "nuevo",
        texto: "Sección Senderos — 10 rutas con distancia, duración, dificultad, fauna para ver en el camino y equipo recomendado",
      },
    ],
  },
  {
    numero: "1.1",
    fecha: "Junio 2026",
    titulo: "Mapa interactivo, clima en tiempo real y página Planear",
    cambios: [
      {
        tipo: "nuevo",
        texto: "Mapa interactivo — explorá los destinos de Patagonia en un mapa navegable con zoom y puntos de interés",
      },
      {
        tipo: "nuevo",
        texto: "Status board en la homepage — clima actual e iNaturalist en tiempo real para saber qué está pasando en la Patagonia",
      },
      {
        tipo: "nuevo",
        texto: "Página Planear — los primeros pasos para armar tu viaje a la Patagonia, en un solo lugar",
      },
      {
        tipo: "nuevo",
        texto: "Página de novedades — changelog público con todo lo que vamos sumando y mejorando, versión a versión",
      },
      {
        tipo: "mejora",
        texto: "Header rediseñado con mejor navegación y acceso directo a la sección Planear",
      },
      {
        tipo: "mejora",
        texto: "Footer renovado con secciones organizadas y links rápidos a las principales áreas del sitio",
      },
    ],
  },
  {
    numero: "1.0",
    fecha: "Junio 2026",
    titulo: "Lanzamiento del nuevo outdoorpatagonia.com",
    cambios: [
      {
        tipo: "nuevo",
        texto: "Nuevo sitio rediseñado desde cero — más rápido, mobile-first y sin WordPress",
      },
      {
        tipo: "nuevo",
        texto: "186 artículos disponibles en español e inglés, con URLs limpias y mejor SEO",
      },
      {
        tipo: "nuevo",
        texto: "Categorías navegables desde el header y desde cada artículo",
      },
      {
        tipo: "nuevo",
        texto: "Selector de idioma — aparece solo cuando el artículo tiene traducción disponible",
      },
      {
        tipo: "nuevo",
        texto: "Modo oscuro — se activa automáticamente según la preferencia del sistema",
      },
    ],
  },
];

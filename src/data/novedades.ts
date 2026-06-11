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
    numero: "1.0",
    fecha: "Junio 2026",
    titulo: "Lanzamiento del nuevo outdoorpatagonia.com",
    esUltima: true,
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

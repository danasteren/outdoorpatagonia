// Unidades manuales de AdSense (DECISIONS 2026-10-29). El script se carga una sola vez
// en src/app/layout.tsx; Auto ads queda solo para anchor y vignette (se configura en el panel).

export const ADSENSE_CLIENT = "ca-pub-3634364666141836";

export type AdUnit = "articuloContenido" | "final" | "lateral" | "fichaContenido";

interface AdUnitConfig {
  /** Bloque de anuncios del panel, uno por idioma */
  slot: { es: string; en: string };
  /** Atributos data-* del formato */
  attrs: Record<string, string>;
  /** Alto reservado (CSS) para que el anuncio no empuje el contenido (CLS) */
  minHeight: string;
  /** Solo en pantallas lg (≥1024 px): en el celular no se pide */
  desktopOnly?: boolean;
}

const IN_ARTICLE = { "data-ad-layout": "in-article", "data-ad-format": "fluid" };

export const AD_UNITS: Record<AdUnit, AdUnitConfig> = {
  articuloContenido: {
    slot: { es: "6577594595", en: "6216526157" },
    attrs: IN_ARTICLE,
    minHeight: "280px",
  },
  final: {
    slot: { es: "7039740978", en: "3864635493" },
    attrs: { "data-ad-format": "autorelaxed" },
    minHeight: "400px",
  },
  lateral: {
    slot: { es: "5752432233", en: "1215299732" },
    attrs: { "data-ad-format": "auto", "data-full-width-responsive": "true" },
    minHeight: "600px",
    desktopOnly: true,
  },
  fichaContenido: {
    slot: { es: "8388906694", en: "4569915335" },
    attrs: IN_ARTICLE,
    minHeight: "280px",
  },
};

const VOID_TAGS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr",
]);

/**
 * Corta el HTML del artículo después del párrafo `<p>` número `n` del primer nivel
 * (fuera de listas, figuras, citas o bloques), para insertar un anuncio sin romper etiquetas.
 * Devuelve null si no hay suficientes párrafos o si después del corte no queda contenido.
 */
export function splitAfterParagraph(html: string, n: number): [string, string] | null {
  const tagRe = /<!--[\s\S]*?-->|<\/?([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*?(\/?)>/g;
  let depth = 0;
  let count = 0;
  let match: RegExpExecArray | null;
  while ((match = tagRe.exec(html))) {
    const [token, rawName, selfClosing] = match;
    if (!rawName) continue; // comentario
    const name = rawName.toLowerCase();
    const closing = token[1] === "/";
    if (VOID_TAGS.has(name) || selfClosing) continue;
    if (!closing && (name === "script" || name === "style")) {
      // Saltear el contenido hasta el cierre
      const end = html.toLowerCase().indexOf(`</${name}`, tagRe.lastIndex);
      if (end === -1) return null;
      tagRe.lastIndex = end;
      continue;
    }
    if (closing) {
      depth = Math.max(0, depth - 1);
      if (depth === 0 && name === "p" && ++count === n) {
        const cut = tagRe.lastIndex;
        const after = html.slice(cut);
        return after.replace(/<[^>]*>|&nbsp;|\s/g, "").length > 0 ? [html.slice(0, cut), after] : null;
      }
    } else {
      depth++;
    }
  }
  return null;
}

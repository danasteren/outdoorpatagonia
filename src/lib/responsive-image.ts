// srcset para las fotos de portada (heroes), según el host. Cada host tiene su
// forma de pedir una versión más chica: así el celular no baja el original
// (las portadas de Wikimedia pesan hasta 1,7 MB). Un host que no se conoce
// queda con la URL original y sin srcset.

export type ResponsiveImage = { src: string; srcSet?: string }

type Options = {
  /** Ancho del original, si se conoce (Wikipedia lo informa). */
  originalWidth?: number
  /** Ancho de `src`, para los navegadores que no usan srcset. */
  fallbackWidth?: number
}

// Supabase Storage: transformaciones de imagen (devuelve WebP si el navegador lo acepta).
const SUPABASE_OBJECT = /^(https:\/\/[^/]+\.supabase\.co\/storage\/v1)\/object\/public\/([^?]+)/
const SUPABASE_WIDTHS = [640, 960, 1280, 1920]

// Wikimedia Commons: solo sirve miniaturas de anchos estándar (640, por ejemplo, da 400).
// SVG, TIFF y PDF no entran: sus miniaturas llevan otra extensión.
const WIKIMEDIA = /^https:\/\/(?:upload|thumb)\.wikimedia\.org\/wikipedia\/commons\/(?:thumb\/)?([0-9a-f]\/[0-9a-f]{2})\/([^/?]+\.(?:jpe?g|png|webp))/i
const WIKIMEDIA_WIDTHS = [500, 960, 1280, 1920]

// iNaturalist: medium (500 px) y large (1024 px).
const INATURALIST = /^(https:\/\/(?:static\.inaturalist\.org|inaturalist-open-data\.s3\.amazonaws\.com)\/photos\/\d+\/)(?:small|medium|large|original)(\.\w+)/

// Pexels: el ancho va en el parámetro `w`.
const PEXELS = /^https:\/\/images\.pexels\.com\/photos\//
const PEXELS_WIDTHS = [640, 960, 1280, 1920]

function build(widths: number[], at: (w: number) => string, fallbackWidth: number): ResponsiveImage {
  const fallback = [...widths].reverse().find((w) => w <= fallbackWidth) ?? widths[0]
  return { src: at(fallback), srcSet: widths.map((w) => `${at(w)} ${w}w`).join(", ") }
}

export function responsiveImage(rawUrl: string, { originalWidth, fallbackWidth = 1280 }: Options = {}): ResponsiveImage {
  // Como el navegador, se ignoran tabs y saltos de línea dentro de la URL.
  const url = rawUrl.replace(/[\t\n\r]/g, "").trim()
  const supabase = url.match(SUPABASE_OBJECT)
  if (supabase) {
    const [, base, path] = supabase
    return build(SUPABASE_WIDTHS, (w) => `${base}/render/image/public/${path}?width=${w}&quality=70`, fallbackWidth)
  }

  const wikimedia = url.match(WIKIMEDIA)
  if (wikimedia) {
    const [, dir, file] = wikimedia
    const widths = originalWidth ? WIKIMEDIA_WIDTHS.filter((w) => w < originalWidth) : WIKIMEDIA_WIDTHS
    if (widths.length === 0) return { src: url }
    return build(widths, (w) => `https://upload.wikimedia.org/wikipedia/commons/thumb/${dir}/${file}/${w}px-${file}`, fallbackWidth)
  }

  const inat = url.match(INATURALIST)
  if (inat) {
    const [, base, ext] = inat
    return { src: `${base}large${ext}`, srcSet: `${base}medium${ext} 500w, ${base}large${ext} 1024w` }
  }

  if (PEXELS.test(url)) {
    const at = (w: number) => {
      const u = new URL(url)
      u.searchParams.delete("h")
      u.searchParams.delete("dpr")
      u.searchParams.set("auto", "compress")
      u.searchParams.set("cs", "tinysrgb")
      u.searchParams.set("w", String(w))
      return u.toString()
    }
    return build(PEXELS_WIDTHS, at, fallbackWidth)
  }

  return { src: url }
}

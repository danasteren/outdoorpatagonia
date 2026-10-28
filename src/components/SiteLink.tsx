import Link from "next/link"

type Lang = "es" | "en"

/**
 * Link interno que sabe en qué idioma está la página. Si el destino es del otro
 * idioma (por ejemplo, una sección que solo existe en español desde /en), va con
 * `<a>` y carga completa: el layout toma el idioma de la ruta en el servidor y una
 * navegación del cliente dejaría header y footer en el idioma anterior.
 */
export function SiteLink({
  href,
  lang,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; lang: Lang }) {
  const target: Lang = href === "/en" || href.startsWith("/en/") ? "en" : "es"
  if (target !== lang) return <a href={href} {...props} />
  return <Link href={href} {...props} />
}

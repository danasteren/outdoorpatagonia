"use client";

import { useEffect } from "react";

// Mide los clics a GetYourGuide (único afiliado activo) con el evento
// `affiliate_click` de GA4. Un solo listener delegado en el documento: cubre
// guías, fichas, planificador y links dentro de artículos sin tocar cada uno.
// Solo cuenta <a> cuyo host es getyourguide.com. No agrega ni cambia enlaces.

const SECTION_TYPES: Record<string, string> = {
  destinos: "guia",
  guides: "guia",
  parques: "parque",
  senderos: "sendero",
  escalada: "escalada",
  planear: "planificador",
  mapa: "mapa",
};

function isGyg(a: HTMLAnchorElement): boolean {
  return a.hostname === "getyourguide.com" || a.hostname.endsWith(".getyourguide.com");
}

function pageContext(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const lang = parts[0] === "en" ? "en" : "es";
  const rest = lang === "en" ? parts.slice(1) : parts;
  const slug = rest[rest.length - 1] ?? "home";
  let placement = SECTION_TYPES[rest[0] ?? ""];
  // /[categoria]/[slug]: artículo
  if (!placement) placement = rest.length === 2 ? "articulo" : "otro";
  return { slug, lang, placement };
}

type Gtag = (...args: unknown[]) => void;

export function AffiliateClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.type === "auxclick" && e.button !== 1) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !isGyg(a as HTMLAnchorElement)) return;
      const { slug, lang, placement } = pageContext(window.location.pathname);
      const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[] };
      const params = {
        page_slug: slug,
        language: lang,
        placement_type: placement,
        affiliate: "getyourguide",
        transport_type: "beacon", // sobrevive a la navegación si el link abre en la misma pestaña
      };
      if (typeof w.gtag === "function") {
        w.gtag("event", "affiliate_click", params);
      } else {
        // gtag aún no existe: gtag.js procesa los Arguments de dataLayer al cargar
        w.dataLayer = w.dataLayer || [];
        (function (..._args: unknown[]) {
          // eslint-disable-next-line prefer-rest-params
          w.dataLayer!.push(arguments);
        })("event", "affiliate_click", params);
      }
    }
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  return null;
}

"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { ADSENSE_CLIENT, AD_UNITS, type AdUnit } from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeDesktop(onChange: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Unidad manual de AdSense con alto reservado (sin CLS). El idioma del bloque sale de la ruta.
 * `key={pathname}` hace que cada navegación con <Link> monte un <ins> nuevo y pida un anuncio
 * nuevo: Auto ads no lo hace (ver docs/audits/2026-10-crecimiento.md, punto 2).
 */
export function AdSlot({ unit, className = "" }: { unit: AdUnit; className?: string }) {
  const pathname = usePathname();
  const lang = pathname.startsWith("/en") ? "en" : "es";
  const config = AD_UNITS[unit];
  // En el servidor no se sabe el ancho: la unidad solo-desktop se monta en el cliente,
  // dentro de un contenedor que ya reserva el alto con CSS (hidden lg:block)
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
  const show = !config.desktopOnly || isDesktop;

  return (
    <aside
      aria-label={lang === "en" ? "Advertisement" : "Publicidad"}
      className={`ad-slot ${config.desktopOnly ? "hidden lg:block" : ""} ${className}`}
      style={{ minHeight: `calc(${config.minHeight} + 1.25rem)` }}
    >
      {/* span y no p: dentro de .article-body los p llevan margen y cambiaría el alto reservado */}
      <span className="mb-1 block text-center text-[10px] leading-4 uppercase tracking-widest text-muted-foreground/60">
        {lang === "en" ? "Advertisement" : "Publicidad"}
      </span>
      {show && <AdIns key={pathname} slot={config.slot[lang]} attrs={config.attrs} />}
    </aside>
  );
}

function AdIns({ slot, attrs }: { slot: string; attrs: Record<string, string> }) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    const el = ref.current;
    // Una sola vez por elemento (Strict Mode monta dos veces en dev)
    if (!el || el.dataset.opPushed) return;
    el.dataset.opPushed = "1";
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      el.setAttribute("data-adtest", "on");
    }
    try {
      // Si el script todavía no cargó, queda en la cola; si lo bloquea un adblocker, no pasa nada
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // "All ins elements … already have ads": no hay nada que hacer
    }
  }, []);

  return (
    <ins
      ref={ref}
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center" }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      {...attrs}
    />
  );
}

"use client";

import { useEffect } from "react";

// Cambia la fachada de un video de YouTube (`a.yt-facade`, la arma
// `fixWpLazyLoad` en el HTML de los artículos) por el reproductor, recién
// cuando el lector hace clic. Con Ctrl/Cmd o clic del medio se abre YouTube.
export function YouTubeFacades() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const facade = (event.target as Element | null)?.closest<HTMLAnchorElement>("a.yt-facade");
      if (!facade?.dataset.ytId) return;
      event.preventDefault();

      const { ytId, ytStart, ytTitle } = facade.dataset;
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1${ytStart ? `&start=${ytStart}` : ""}`;
      iframe.title = ytTitle ?? "YouTube";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0";

      const player = document.createElement("div");
      player.style.cssText = facade.style.cssText;
      player.appendChild(iframe);
      facade.replaceWith(player);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

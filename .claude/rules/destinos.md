---
paths:
  - "src/lib/destinos/**"
  - "src/app/destinos/**"
  - "src/app/en/guides/**"
  - "src/components/destinos/**"
  - "seo/destinos-prioridad.md"
---
# Guías de viaje por destino (`/destinos`)

Hay guías en español (`/destinos/[slug]`) y en inglés (`/en/guides/[slug]`). El orden de producción y las búsquedas a cubrir están en `seo/destinos-prioridad.md`. Qué guías están hechas y cuál sigue: `docs/STATUS.md`. Por qué son la prioridad: `docs/DECISIONS.md`.

- **Una entrada es un objeto en `src/lib/destinos/catalog.ts`**, con el contenido `es` y `en` completos y la misma estructura que Ushuaia. La página, el clima, el JSON-LD, el sitemap y el buscador salen solos del catálogo.
- **Datos solo de fuentes oficiales** (turismo municipal o provincial, APN/CONAF, sitio del atractivo, censo), listadas en `fuentes`. Si no hay fuente, el dato no va.
- **Títulos: nunca en formato pregunta.** `metaTitle` arranca con el nombre del destino y sigue con lo que se busca ("Ushuaia: Qué Hacer, Clima, Cuándo Ir y Cómo Llegar"). Máximo unos 50 caracteres, porque el layout suma "| Outdoor Patagonia".
- **`queHacer` lleva `gygQuery`** cuando hay excursiones en GetYourGuide.
- **Clima mensual** (`src/lib/apis/climate.ts`, ERA5): publicar solo temperatura y horas de luz. La precipitación de ERA5 sale unas 2 veces la real en la Patagonia andina: no se publica.
- En inglés la ruta es `/en/guides/`, no `/en/destinations/`, porque esa categoría ya existe en los artículos viejos.
- **Relacionados simétricos** con los parques, senderos, fauna y gastronomía del destino (tipos `destino` y `sendero` en `src/lib/relacionados.ts`).
- Si ya hay artículos viejos de ese destino (por ejemplo `/lugares/bariloche-argentina`), sumarlos a `LEGACY_TO_GUIDE` en `src/lib/destinos/redirects.ts`. Así `proxy.ts` responde 301, el sitemap los excluye y el sitio no compite consigo mismo.
- **Cuando se suma la 6ª guía al catálogo, en ese mismo cambio se agrega "Destinos" (`/destinos`) al nav** de `src/components/HeaderShell.tsx` (desktop y mobile, sincronizados) y un bloque en la home. Con menos de 6 guías, se llega a ellas por el buscador, los relacionados y Google.
- Las guías nuevas las produce la rutina semanal "OP - Guía de destino semanal" (`trig_01Gqz7Knx4E6Az4cLeQAhewY`, lunes 08:30 ART). Abre un PR en una rama `seo/content-<fecha>-<slug>` y se revisa en `/admin/agentes`.

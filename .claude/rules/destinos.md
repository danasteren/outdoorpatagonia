---
paths:
  - "src/lib/destinos/**"
  - "src/app/destinos/**"
  - "src/app/en/guides/**"
  - "src/components/destinos/**"
  - "seo/destinos-prioridad.md"
---
# Guías de viaje por destino (`/destinos`)

Hay guías en español (`/destinos/[slug]`) y en inglés (`/en/guides/[slug]`). El orden de producción y las búsquedas a cubrir están en `seo/destinos-prioridad.md`. Qué guías están hechas: los archivos de `src/lib/destinos/guias/`; la que sigue es la primera de `seo/destinos-prioridad.md` sin archivo. Por qué son la prioridad: `docs/DECISIONS.md`.

- **Una guía = un archivo: `src/lib/destinos/guias/<slug>.ts`**, con el contenido `es` y `en` completos y la misma estructura que `ushuaia.ts` (tipos en `src/lib/destinos/types.ts`). `prioridad` es su número en `seo/destinos-prioridad.md`. No hay lista que editar: `scripts/gen-destinos.mjs` arma el índice antes de `dev` y `build`, y de ahí salen solos la página, el clima, el JSON-LD, el sitemap, el buscador, la home y el destino del día. Si el dev server ya estaba corriendo, reiniciarlo para que vea la guía nueva.
- **Datos solo de fuentes oficiales** (turismo municipal o provincial, APN/CONAF, sitio del atractivo, censo), listadas en `fuentes`. Si no hay fuente, el dato no va.
- **Títulos** (reglas generales en `.claude/rules/seo-geo.md`): `metaTitle` de ~55 caracteres como máximo, con el destino y la keyword al principio ("Ushuaia: Qué Hacer, Clima, Cuándo Ir y Cómo Llegar").
- **`queHacer` lleva `gygQuery`** cuando hay excursiones en GetYourGuide.
- **Clima mensual** (`src/lib/apis/climate.ts`, ERA5): publicar solo temperatura y horas de luz. La precipitación de ERA5 sale unas 2 veces la real en la Patagonia andina: no se publica.
- En inglés la ruta es `/en/guides/`, no `/en/destinations/`, porque esa categoría ya existe en los artículos viejos.
- **Relacionados**: la guía lista sus parques, senderos, fauna, gastronomía y destinos cercanos. La vuelta (que el parque, la terma, el volcán, el plato o la otra guía muestren la guía) se calcula sola (`conGuiasQueLaListan` en `src/lib/relacionados.ts`): **una guía nueva no edita otros catálogos ni otras guías**.
- Si ya hay artículos viejos de ese destino (por ejemplo `/lugares/bariloche-argentina`), crear `src/lib/destinos/legacy/<slug>.ts` con el mapa ruta vieja → guía (como `bariloche.ts`). Entra solo en `LEGACY_TO_GUIDE`: `proxy.ts` responde 301, el sitemap los excluye y el sitio no compite consigo mismo.
- Las guías nuevas las produce la rutina `guia-destino-diaria` (ver "Rutinas" en `docs/STATUS.md`). Abre un PR en una rama `seo/content-<fecha>-<slug>` y se revisa en `/admin/agentes`.
- **Un PR de guía solo agrega archivos**: `guias/<slug>.ts` y, si corresponde, `legacy/<slug>.ts`. No toca `docs/STATUS.md`, `docs/DECISIONS.md`, `src/data/novedades.ts`, otros catálogos ni otras guías. Las decisiones propias de la guía, los datos que no se pudieron confirmar y las fichas que no coinciden con la fuente van en la descripción del PR. Así varios PR pendientes nunca chocan (ver DECISIONS 2026-10-28).

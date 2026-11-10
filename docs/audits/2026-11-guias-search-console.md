# Guías de destino en Search Console (2026-11-06, fechas corregidas el 2026-11-10)

Solo lectura. Propiedad `sc-domain:outdoorpatagonia.com`, cuenta de servicio de `~/.config/outdoorpatagonia/gsc.json`. Periodo por URL: desde la **fecha real de alta de la guía** hasta 2026-11-06 (fin de la medición original).

**Corrección del 2026-11-10.** La primera versión de este reporte tomó la fecha de alta de `git log --diff-filter=A` sobre cada archivo `src/lib/destinos/guias/<slug>.ts`. Pero el 2026-10-28 (commit `728ce1c`, "una guía = un archivo") cada guía pasó a ser un archivo propio, y ese commit figura como alta de 10 de las 14: el reporte decía que las guías tenían "entre 3 y 9 días" y no es cierto. Con las fechas reales tienen **entre 3 y 36 días** al 2026-11-06. Search Console tarda unos días en consolidar (los últimos 2-3 días vienen incompletos o vacíos).

## Fecha real de alta de cada guía

La fecha es la del commit que agregó la guía (ES + EN juntas, en el mismo commit). Para las 10 guías anteriores al split se buscó en el historial de `src/lib/destinos/catalog.ts` (el archivo único que existía antes) el primer commit que contiene la guía (`git log -S`); las otras 4 nacieron ya como archivo propio (`--diff-filter=A`).

| Guía | Alta | Commit | Fuente |
|---|---|---|---|
| Ushuaia | 2026-10-01 | `557ddd9` | historial de `catalog.ts`; DECISIONS 2026-10-01: "la primera guía fue Ushuaia (2026-10-01)" |
| El Calafate | 2026-10-03 | `1c64bff` | historial de `catalog.ts`; DECISIONS: "la segunda El Calafate (2026-10-03)" |
| Bariloche | 2026-10-05 | `2a9a56e` | historial de `catalog.ts` (#7) |
| Puerto Natales | 2026-10-20 | `69a765c` | historial de `catalog.ts` (#8); DECISIONS 2026-10-19 |
| El Chaltén | 2026-10-20 | `428e18e` | historial de `catalog.ts` (#9) |
| Puerto Madryn | 2026-10-21 | `6e7ce15` | historial de `catalog.ts` (#10); DECISIONS 2026-10-21 |
| Puerto Varas | 2026-10-23 | `6bdf1a4` | historial de `catalog.ts` (#12) |
| Punta Arenas | 2026-10-23 | `db16114` | historial de `catalog.ts` (#11); DECISIONS 2026-10-22 |
| Pucón | 2026-10-26 | `5c5bd7d` | historial de `catalog.ts` (#13) |
| Chiloé | 2026-10-27 | `017105f` | historial de `catalog.ts` (#14) |
| Coyhaique | 2026-10-29 | `588fd8d` | alta del archivo propio (#15) |
| San Martín de los Andes | 2026-10-30 | `22a6169` | alta del archivo propio (#16) |
| Esquel | 2026-11-02 | `12eb3c8` | alta del archivo propio (#18) |
| Puerto Williams | 2026-11-03 | `33eaaf7` | alta del archivo propio (#19) |

Límite: es la fecha del commit en `main`, no la del primer deploy ni la del primer rastreo de Google. Un dato que lo respalda: Punta Arenas ES figuraba rastreada el 2026-10-23, igual que su alta real (con la fecha anterior parecía rastreada antes de existir; era un error de la fecha, no de Google).

## Lo medido

**Resumen (al 2026-11-06):** 13 de 14 guías tienen impresiones en al menos un idioma; solo Bariloche (32 días de vida) no tiene en ninguno. Por URL: ES 12 de 14 (sin impresiones: Bariloche y Esquel), EN 7 de 14. Impresiones totales ES 216 (2 clics), EN 119 (1 clic). Indexación (inspección de URL del 2026-11-06, sin repetir): 21 de 28 URLs "Submitted and indexed" y 7 "URL is unknown to Google".

| URL | Alta | Días al 6/11 | Impr. | Clics | CTR | Pos. media | Indexación | Top 5 queries (impr.) |
|---|---|---|---|---|---|---|---|---|
| `/destinos/ushuaia` | 2026-10-01 | 36 | 10 | 0 | 0.0% | 46.5 | Indexada (rastreo 2026-11-01) | ushuaia (2) |
| `/en/guides/ushuaia` | 2026-10-01 | 36 | 0 | 0 | — | — | Desconocida para Google | — |
| `/destinos/el-calafate` | 2026-10-03 | 34 | 23 | 0 | 0.0% | 51.8 | Indexada (rastreo 2026-11-06) | "el calafate" -"accidente" -"choque" -"c… (2); aeropuerto glaciar perito moreno (1); calafante (1); calafate (3); calafate provincia de santa cruz argenti… (1) |
| `/en/guides/el-calafate` | 2026-10-03 | 34 | 50 | 1 | 2.0% | 31.8 | Indexada (rastreo 2026-11-03) | calafate argentina (1); calafate travel (1); el calafate argentina glacier (1); el calafate glacier tour (1); el calafate perito moreno (1) |
| `/destinos/bariloche` | 2026-10-05 | 32 | 0 | 0 | — | — | Desconocida para Google | — |
| `/en/guides/bariloche` | 2026-10-05 | 32 | 0 | 0 | — | — | Indexada (rastreo 2026-11-05) | — |
| `/destinos/puerto-natales` | 2026-10-20 | 17 | 4 | 0 | 0.0% | 8 | Indexada (rastreo 2026-11-06) | puerto natales (4) |
| `/en/guides/puerto-natales` | 2026-10-20 | 17 | 30 | 0 | 0.0% | 54.0 | Indexada (rastreo 2026-11-01) | cerro dorotea (10); puerto natales (2); puerto natales a torres del paine (8) |
| `/destinos/el-chalten` | 2026-10-20 | 17 | 2 | 0 | 0.0% | 7.5 | Indexada (rastreo 2026-11-05) | el chalten (1) |
| `/en/guides/el-chalten` | 2026-10-20 | 17 | 29 | 0 | 0.0% | 44.3 | Indexada (rastreo 2026-10-29) | chalten (1); el chalten argentina (4); el chalten hiking (1); el chalten patagonia chile (1); el chalten trekking (1) |
| `/destinos/puerto-madryn` | 2026-10-21 | 16 | 2 | 0 | 0.0% | 8.5 | Indexada (rastreo 2026-11-05) | "punta tombo" (1); "punta tombo" -"accidente" -"choque" -"e… (1) |
| `/en/guides/puerto-madryn` | 2026-10-21 | 16 | 3 | 0 | 0.0% | 30.7 | Indexada (rastreo 2026-11-05) | — |
| `/destinos/puerto-varas` | 2026-10-23 | 14 | 55 | 0 | 0.0% | 8.7 | Indexada (rastreo 2026-11-01) | donde queda puerto varas (1); dónde queda puerto varas (2); muéstrame fotos de cada lugar (1); puerto montt y puerto varas (2); puerto varas (2) |
| `/en/guides/puerto-varas` | 2026-10-23 | 14 | 0 | 0 | — | — | Indexada (rastreo 2026-11-05) | — |
| `/destinos/punta-arenas` | 2026-10-23 | 14 | 31 | 1 | 3.2% | 18 | Indexada (rastreo 2026-10-23) | donde queda punta arenas (1); punta arenas (6); punta arenas chile (2); punta arenas en chile (1); que hacer en punta arenas (2) |
| `/en/guides/punta-arenas` | 2026-10-23 | 14 | 0 | 0 | — | — | Desconocida para Google | — |
| `/destinos/pucon` | 2026-10-26 | 11 | 19 | 0 | 0.0% | 11.7 | Indexada (rastreo 2026-11-01) | donde queda pucon (1); donde queda pucon? (1); ir a pucon (1); pucón chile (1) |
| `/en/guides/pucon` | 2026-10-26 | 11 | 2 | 0 | 0.0% | 62.5 | Indexada (rastreo 2026-11-06) | things to do in pucon (2) |
| `/destinos/chiloe` | 2026-10-27 | 10 | 14 | 1 | 7.1% | 18.4 | Indexada (rastreo 2026-11-01) | "chiloe que visitar" (1); chiloe (1); chiloé (1); isla chiloe (1) |
| `/en/guides/chiloe` | 2026-10-27 | 10 | 2 | 0 | 0.0% | 8 | Indexada (rastreo 2026-11-05) | — |
| `/destinos/coyhaique` | 2026-10-29 | 8 | 24 | 0 | 0.0% | 15 | Indexada (rastreo 2026-11-01) | cerro galera coyhaique (1); cuántos grados hay en coyhaique (1); lago caro coyhaique (1); lugares para visitar en coyhaique (1); que hacer en coyhaique (1) |
| `/en/guides/coyhaique` | 2026-10-29 | 8 | 0 | 0 | — | — | Desconocida para Google | — |
| `/destinos/san-martin-de-los-andes` | 2026-10-30 | 7 | 21 | 0 | 0.0% | 10.1 | Indexada (rastreo 2026-11-01) | altura de san martin de los andes (1); altura san martin de los andes (5); san martín de los andes como llegar (1) |
| `/en/guides/san-martin-de-los-andes` | 2026-10-30 | 7 | 0 | 0 | — | — | Desconocida para Google | — |
| `/destinos/esquel` | 2026-11-02 | 4 | 0 | 0 | — | — | Desconocida para Google | — |
| `/en/guides/esquel` | 2026-11-02 | 4 | 3 | 0 | 0.0% | 23.7 | Indexada (rastreo 2026-11-03) | — |
| `/destinos/puerto-williams` | 2026-11-03 | 3 | 11 | 0 | 0.0% | 15.3 | Indexada (rastreo 2026-11-04) | como llegar a puerto williams desde punt… (1); puerto williams (3); trekking puerto williams (1) |
| `/en/guides/puerto-williams` | 2026-11-03 | 3 | 0 | 0 | — | — | Desconocida para Google | — |

Notas de la medición:
- Search Console anonimiza las queries raras, así que las 5 queries pueden sumar menos que las impresiones de la URL. Casi todas tienen 1-3 impresiones: es ruido, no tendencia.
- Los totales son por filtro exacto de URL (sin variantes con parámetros).
- La columna Indexación es la de la inspección original (2026-11-06); no se volvió a inspeccionar.
- Con el periodo corregido las cifras cambian mucho respecto de la versión anterior (ES 92 → 216 impresiones, EN 60 → 119): antes se cortaba el periodo de 10 guías el 28/10 y se perdían sus primeros días.

## Queries ajenas al destino
Casi todas las queries con impresiones nombran el destino o una atracción suya. Excepciones (medido):
- `/destinos/el-calafate`: una query con 20 operadores de exclusión (`-"accidente" -"choque"…`), típica de monitoreo automatizado, no de lector. `/destinos/puerto-madryn` recibe otra del mismo estilo (`"punta tombo" -"accidente" …`).
- `/en/guides/el-chalten`: "el chalten argentina" (4) es del destino; en la medición anterior apareció además "el chalten patagonia chile" (país equivocado).
- `/en/guides/puerto-natales`: "cerro dorotea" suma 10 de sus 30 impresiones (atracción cercana, no el destino en sí).

## Hipótesis (no medidas)
- **Bariloche** es la más llamativa: 32 días de vida, sin impresiones en ningún idioma y con el ES "desconocido para Google" (su par EN figura indexado, rastreo 2026-11-05). Puede ser cola de rastreo o la redirección 301 de los artículos viejos a la guía; sin evidencia de cuál.
- Las 7 URLs "desconocidas" no tienen todas la misma edad: Bariloche ES (32 días), Ushuaia EN (36) y Punta Arenas EN (14) son las viejas, y de esas tres sí cabe sospechar algo más que falta de tiempo. Coyhaique EN (8), San Martín EN (7), Esquel ES (4) y Puerto Williams EN (3) son recientes y es esperable que aún no se rastreen.
- Las posiciones de 30-55 (El Calafate, Puerto Natales EN, Ushuaia ES) son lejos de la primera página; con tan pocas impresiones el promedio no es confiable.
- Las posiciones buenas (Puerto Varas 8,7; Puerto Natales ES 8; El Chaltén ES 7,5; Pucón 11,7) vienen de queries de intención "dónde queda" o del nombre del destino, con poco volumen.

## Siguiente medición sugerida
Repetir en ~3 semanas y recién ahí comparar contra los términos de `seo/destinos-prioridad.md`. Las guías de octubre ya tendrán más de 28 días; las de noviembre (Esquel, Puerto Williams) todavía no. Para las 3 URLs viejas desconocidas (Bariloche ES, Ushuaia EN, Punta Arenas EN) ver la decisión 2026-11-10.

## Método
Script descartable en el scratchpad (no versionado): `searchAnalytics/query` filtrado por `page equals` (dimensiones page y query, top 5), con `startDate` = alta real de cada guía y `endDate` = 2026-11-06; `urlInspection/index:inspect` solo en la medición original. Fecha de alta: ver la sección de fechas. No se modificó código, contenido ni configuración.

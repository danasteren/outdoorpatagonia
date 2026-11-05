# Auditoría de contenido de artículos (2026-11)

> Solo lectura. Generado por `scripts/audit_articles.py` (reescribe todo lo que está arriba de la línea `HIPOTESIS`). Los números son **medidos** sobre la columna `content` de `articles`; las hipótesis sobre la causa están aparte, al final.

## Qué se midió y cómo

- **Palabras**: texto visible del HTML (sin etiquetas, `script` ni `style`, entidades decodificadas).
- **Sección vacía**: H2 con menos de 40 palabras hasta el próximo H2 (los H3 cuentan para su H2).
- **Corto**: menos de 300 palabras.
- **reading_time**: guardado vs. `ceil(palabras/200)` del contenido actual (misma fórmula que `migrate_wp_articles.py`). Se marca cuando el guardado es al menos 2 min y el doble del calculado: el contenido de hoy es mucho más corto que el original.
- **Par**: ES↔EN por `PAIRS` de `article-translations.ts` o mismo slug. Se marca si el artículo tiene menos de 50% de las palabras de su par.
- **Fotos**: `<img>` del contenido original vs. las que quedan tras un port de `fixLegacyImages` (`src/lib/legacy-images.ts` con `LEGACY_IMAGES`). Un bloque `<figure>` o de galería sin ninguna foto recuperable se quita entero.
- **Portada**: `propia` (existe o se recupera), `fallback` (cae a Wikimedia por `COVER_FALLBACKS`), `perdida, sin fallback` o `sin portada`.
- **Gravedad** (solo para ordenar): secciones vacías + 5 si es corto + hasta 10 por par más largo + 5 por tiempo guardado >> calculado + 0,5 por foto perdida.

## Totales (solo `published`)

| | ES | EN | Total |
|---|---:|---:|---:|
| Artículos | 96 | 93 | 189 |
| Con al menos 1 sección H2 vacía (<40 palabras) | 24 | 28 | 52 |
| Cortos (<300 palabras) | 9 | 0 | 9 |
| Par con menos de 50% de las palabras del otro idioma | 6 | 0 | 6 |
| Tiempo guardado ≥ 2× el calculado | 0 | 0 | 0 |
| Índice con 3 o más anclas `#…` sin destino en el cuerpo | 10 | 0 | 10 |
| Con fotos perdidas | 50 | 51 | 101 |
| Portada que no es la propia | 16 | 13 | 29 |

Fotos en el HTML: 1317 originales, 609 sobreviven, 708 perdidas (54%). Artículos con par ES↔EN publicado: 85 pares.

## Peores casos (por gravedad)

| # | Idioma | Slug | Palabras | Par (palabras) | Ratio | H2/H3 | H2 vacíos | Min guardado/calc. | Fotos ok/orig. | Portada | Anclas rotas | `updated_at` | Marcas |
|--:|---|---|--:|--:|--:|---|--:|---|---|---|--:|---|---|
| 1 | es | `amanita-muscaria` | 31 | 895 | 0.03 | 1/0 | 0 | 1/1 | 0/0 | propia | 10 | 2026-10-01 | corto, par más largo, índice con anclas sin destino |
| 2 | es | `jabali-europeo` | 176 | 1830 | 0.10 | 1/0 | 0 | 2/2 | 0/0 | propia | 6 | 2026-10-01 | corto, par más largo, índice con anclas sin destino |
| 3 | es | `mermelada-rosa-mosqueta-patagonica` | 128 | 1053 | 0.12 | 1/0 | 0 | 2/2 | 0/0 | propia | 10 | 2026-06-11 | corto, par más largo, índice con anclas sin destino |
| 4 | es | `hongos-de-pino-en-escabeche` | 104 | 826 | 0.13 | 1/0 | 0 | 2/2 | 0/0 | propia | 8 | 2026-06-11 | corto, par más largo, índice con anclas sin destino |
| 5 | es | `pino-introducido-patagonia-uso-impacto` | 121 | 895 | 0.14 | 1/0 | 0 | 2/2 | 0/0 | propia | 9 | 2026-06-11 | corto, par más largo, índice con anclas sin destino |
| 6 | es | `kuchen-chileno-historia-tradicion` | 154 | 1066 | 0.14 | 1/0 | 0 | 2/2 | 0/0 | propia | 6 | 2026-06-11 | corto, par más largo, índice con anclas sin destino |
| 7 | en | `geodesic-dome-hemisphere-assembly` | 466 | 460 | 0.99 | 8/3 | 3 | 3/3 | 0/20 | propia | 0 | 2026-10-01 | secciones vacías, fotos perdidas |
| 8 | en | `build-deck-wooden-posts` | 1760 | 1975 | 0.89 | 10/10 | 1 | 11/11 | 1/23 | propia | 0 | 2026-10-01 | secciones vacías, fotos perdidas |
| 9 | es | `construir-tarima-madera-solida-guia-paso-a-paso` | 1975 | 1760 | 0.89 | 8/10 | 1 | 12/12 | 1/23 | propia | 0 | 2026-10-01 | secciones vacías, fotos perdidas |
| 10 | es | `montaje-semiesfera-domo-geodesico` | 460 | 466 | 0.99 | 6/0 | 1 | 3/3 | 0/20 | propia | 1 | 2026-10-01 | secciones vacías, fotos perdidas |
| 11 | en | `questions-region-patagonia` | 2645 | 2979 | 0.89 | 8/15 | 0 | 15/15 | 1/22 | propia | 0 | 2026-10-01 | fotos perdidas |
| 12 | es | `preguntas-region-patagonia` | 2979 | 2645 | 0.89 | 8/15 | 0 | 17/17 | 1/22 | propia | 0 | 2026-10-01 | fotos perdidas |
| 13 | en | `install-wooden-posts` | 1674 | 1911 | 0.88 | 7/7 | 1 | 9/9 | 0/19 | propia | 0 | 2026-10-01 | secciones vacías, fotos perdidas |
| 14 | es | `cipres-de-la-cordillera-patagonia` | 2143 | 1914 | 0.89 | 10/12 | 1 | 13/13 | 1/18 | propia | 0 | 2026-06-11 | secciones vacías, fotos perdidas |
| 15 | es | `instalar-postes-de-madera` | 1911 | 1674 | 0.88 | 6/7 | 0 | 12/12 | 0/19 | propia | 0 | 2026-10-01 | fotos perdidas |
| 16 | es | `descubri-el-mate-la-bebida-tradicional-de-sudamerica` | 1917 | 1539 | 0.80 | 8/7 | 0 | 12/12 | 6/23 | propia | 0 | 2026-06-11 | fotos perdidas |
| 17 | en | `cordilleran-cypress-patagonia` | 1914 | 2143 | 0.89 | 10/12 | 0 | 12/12 | 1/18 | propia | 0 | 2026-10-01 | fotos perdidas |
| 18 | en | `patagonia-best-sellers` | 1181 | 1397 | 0.85 | 12/12 | 3 | 6/6 | 1/12 | propia | 0 | 2026-10-01 | secciones vacías, fotos perdidas |
| 19 | es | `prendas-mas-vendidas-patagonia` | 1397 | 1181 | 0.85 | 12/12 | 2 | 7/7 | 1/12 | propia | 0 | 2026-10-01 | secciones vacías, fotos perdidas |
| 20 | es | `liebre-europea-historia-impacto-y-curiosidades` | 1440 | 1331 | 0.92 | 13/10 | 1 | 10/10 | 0/12 | propia | 0 | 2026-10-01 | secciones vacías, fotos perdidas |
| 21 | en | `pine-mushroom-collection-drying-uses` | 1128 | 1290 | 0.87 | 7/7 | 0 | 7/7 | 1/14 | propia | 0 | 2026-10-01 | fotos perdidas |
| 22 | en | `discover-mate-the-traditional-south-american-drink` | 1539 | 1917 | 0.80 | 10/8 | 0 | 10/10 | 6/19 | propia | 0 | 2026-10-01 | fotos perdidas |
| 23 | es | `hongo-de-pino-recoleccion-secado-usos` | 1290 | 1128 | 0.87 | 7/7 | 0 | 10/10 | 1/14 | propia | 0 | 2026-06-11 | fotos perdidas |
| 24 | es | `preparacion-terreno-domo` | 1821 | 1600 | 0.88 | 8/13 | 0 | 12/12 | 1/13 | propia | 0 | 2026-10-01 | fotos perdidas |
| 25 | en | `ringed-kingfisher` | 724 | 832 | 0.87 | 10/5 | 4 | 5/5 | 0/4 | propia | 0 | 2026-10-01 | secciones vacías, fotos perdidas |
| 26 | en | `ground-preparation-dome` | 1600 | 1821 | 0.88 | 8/13 | 0 | 10/10 | 1/13 | propia | 0 | 2026-10-01 | fotos perdidas |
| 27 | en | `european-hare-history-impact-and-facts` | 1331 | 1440 | 0.92 | 13/10 | 0 | 9/9 | 0/12 | propia | 0 | 2026-10-01 | fotos perdidas |
| 28 | es | `escarcha-patagonica-invierno-patagonia` | 1726 | 1440 | 0.83 | 8/18 | 0 | 11/11 | 0/11 | propia | 0 | 2026-10-01 | fotos perdidas |
| 29 | en | `choosing-clothing-for-patagonia` | 688 | 645 | 0.94 | 4/8 | 1 | 6/6 | 0/9 | propia | 0 | 2026-10-01 | secciones vacías, fotos perdidas |
| 30 | es | `guia-ropa-outdoor-patagonia` | 645 | 688 | 0.94 | 4/8 | 1 | 6/6 | 0/9 | propia | 0 | 2026-10-01 | secciones vacías, fotos perdidas |
| 31 | en | `patagonian-frost-winter-patagonia` | 1440 | 1726 | 0.83 | 8/18 | 0 | 10/10 | 0/11 | propia | 0 | 2026-10-01 | fotos perdidas |
| 32 | en | `ruta-40-patagonia-argentina-winter` | 1659 | 1821 | 0.91 | 11/6 | 0 | 11/11 | 2/12 | propia | 0 | 2026-10-01 | fotos perdidas |
| 33 | es | `chalten-patagonia-argentina` | 127 | — | — | 1/0 | 0 | 2/2 | 0/0 | propia | 6 | 2026-10-01 | corto, índice con anclas sin destino |
| 34 | es | `martin-pescador` | 832 | 724 | 0.87 | 10/5 | 3 | 5/5 | 0/4 | propia | 0 | 2026-10-01 | secciones vacías, fotos perdidas |
| 35 | es | `paxillus-involutus` | 104 | — | — | 1/0 | 0 | 3/3 | 0/0 | fallback | 6 | 2026-10-01 | corto, índice con anclas sin destino, portada fallback |
| 36 | en | `patagonian-fiddleneck-natural-insecticide` | 1100 | 1098 | 1.00 | 10/8 | 2 | 8/8 | 0/6 | propia | 0 | 2026-10-01 | secciones vacías, fotos perdidas |
| 37 | en | `dinosaurs-of-patagonia` | 1193 | 1245 | 0.96 | 8/0 | 0 | 6/6 | 0/10 | propia | 0 | 2026-10-01 | fotos perdidas |
| 38 | es | `viajar-patagonia-guia-consejos` | 241 | — | — | 1/0 | 0 | 3/3 | 0/0 | propia | 11 | 2026-10-01 | corto, índice con anclas sin destino |
| 39 | es | `invierno-ruta-40-patagonia` | 1821 | 1659 | 0.91 | 10/6 | 0 | 12/12 | 2/12 | propia | 0 | 2026-10-01 | fotos perdidas |
| 40 | es | `dinosaurios-patagonia` | 1245 | 1193 | 0.96 | 7/0 | 0 | 9/9 | 0/9 | propia | 0 | 2026-10-01 | fotos perdidas |

## Los incompletos (cortos o con par mucho más largo), por `updated_at`

Medido: fecha de última modificación de cada uno. 2026-06-11: 4, 2026-10-01: 5.
Con índice de anclas sin destino: 9 de 9.

## Caso testigo: jabalí

- `jabali-europeo` (es, published): 176 palabras, 1 H2 / 0 H3, 0 H2 con <40 palabras, reading_time guardado 2 vs. calculado 2, fotos 0/0, portada propia, 6 anclas del índice sin destino, `updated_at` 2026-10-01, puesto 2 de 189 por gravedad. Marcas: corto, par más largo, índice con anclas sin destino.
- `wild-boar` (en, published): 1830 palabras, 8 H2 / 14 H3, 0 H2 con <40 palabras, reading_time guardado 11 vs. calculado 11, fotos 6/6, portada propia, 1 anclas del índice sin destino, `updated_at` 2026-10-01, puesto 158 de 189 por gravedad. Marcas: ninguna.

## Tabla completa

Ordenada por idioma y gravedad. `—` = sin par.

| Idioma | Slug | Estado | Palabras | Par | Ratio | H2/H3 | H2 vacíos | Min g/c | Fotos ok/orig. | Portada | Anclas rotas | `updated_at` |
|---|---|---|--:|--:|--:|---|--:|---|---|---|--:|---|
| en | `geodesic-dome-hemisphere-assembly` | published | 466 | 460 | 0.99 | 8/3 | 3 | 3/3 | 0/20 | propia | 0 | 2026-10-01 |
| en | `build-deck-wooden-posts` | published | 1760 | 1975 | 0.89 | 10/10 | 1 | 11/11 | 1/23 | propia | 0 | 2026-10-01 |
| en | `install-wooden-posts` | published | 1674 | 1911 | 0.88 | 7/7 | 1 | 9/9 | 0/19 | propia | 0 | 2026-10-01 |
| en | `questions-region-patagonia` | published | 2645 | 2979 | 0.89 | 8/15 | 0 | 15/15 | 1/22 | propia | 0 | 2026-10-01 |
| en | `cordilleran-cypress-patagonia` | published | 1914 | 2143 | 0.89 | 10/12 | 0 | 12/12 | 1/18 | propia | 0 | 2026-10-01 |
| en | `patagonia-best-sellers` | published | 1181 | 1397 | 0.85 | 12/12 | 3 | 6/6 | 1/12 | propia | 0 | 2026-10-01 |
| en | `discover-mate-the-traditional-south-american-drink` | published | 1539 | 1917 | 0.80 | 10/8 | 0 | 10/10 | 6/19 | propia | 0 | 2026-10-01 |
| en | `pine-mushroom-collection-drying-uses` | published | 1128 | 1290 | 0.87 | 7/7 | 0 | 7/7 | 1/14 | propia | 0 | 2026-10-01 |
| en | `european-hare-history-impact-and-facts` | published | 1331 | 1440 | 0.92 | 13/10 | 0 | 9/9 | 0/12 | propia | 0 | 2026-10-01 |
| en | `ground-preparation-dome` | published | 1600 | 1821 | 0.88 | 8/13 | 0 | 10/10 | 1/13 | propia | 0 | 2026-10-01 |
| en | `ringed-kingfisher` | published | 724 | 832 | 0.87 | 10/5 | 4 | 5/5 | 0/4 | propia | 0 | 2026-10-01 |
| en | `choosing-clothing-for-patagonia` | published | 688 | 645 | 0.94 | 4/8 | 1 | 6/6 | 0/9 | propia | 0 | 2026-10-01 |
| en | `patagonian-frost-winter-patagonia` | published | 1440 | 1726 | 0.83 | 8/18 | 0 | 10/10 | 0/11 | propia | 0 | 2026-10-01 |
| en | `dinosaurs-of-patagonia` | published | 1193 | 1245 | 0.96 | 8/0 | 0 | 6/6 | 0/10 | propia | 0 | 2026-10-01 |
| en | `patagonian-fiddleneck-natural-insecticide` | published | 1100 | 1098 | 1.00 | 10/8 | 2 | 8/8 | 0/6 | propia | 0 | 2026-10-01 |
| en | `ruta-40-patagonia-argentina-winter` | published | 1659 | 1821 | 0.91 | 11/6 | 0 | 11/11 | 2/12 | propia | 0 | 2026-10-01 |
| en | `climbing-equipment` | published | 929 | 1037 | 0.90 | 4/7 | 0 | 7/7 | 0/8 | propia | 0 | 2026-10-01 |
| en | `amanita-muscaria` | published | 895 | 31 | 0.03 | 11/9 | 1 | 5/5 | 0/5 | propia | 0 | 2026-10-01 |
| en | `andean-condor` | published | 1010 | 1821 | 0.55 | 9/1 | 1 | 6/6 | 0/5 | propia | 0 | 2026-10-01 |
| en | `blueberries-patagonia-health-benefits` | published | 788 | 898 | 0.88 | 6/0 | 0 | 4/4 | 0/7 | propia | 0 | 2026-10-01 |
| en | `flamingos-in-patagonia` | published | 724 | 738 | 0.98 | 6/8 | 2 | 6/6 | 0/3 | fallback | 0 | 2026-10-01 |
| en | `morel-mushrooms-patagonia` | published | 983 | 1182 | 0.83 | 7/11 | 0 | 7/7 | 0/7 | fallback | 0 | 2026-10-01 |
| en | `assembly-triangles-geodesic-dome` | published | 1168 | 1330 | 0.88 | 5/7 | 0 | 8/8 | 0/6 | propia | 0 | 2026-10-01 |
| en | `buy-merken-in-patagonia` | published | 1434 | 1709 | 0.84 | 6/8 | 0 | 9/9 | 0/6 | propia | 0 | 2026-10-01 |
| en | `chilco` | published | 687 | 727 | 0.94 | 9/5 | 1 | 5/5 | 0/4 | propia | 0 | 2026-10-01 |
| en | `hiking-vs-trekking-patagonia` | published | 1062 | 1226 | 0.87 | 9/11 | 1 | 8/8 | 2/6 | propia | 0 | 2026-10-01 |
| en | `llao-llao-patagonia` | published | 1544 | 1748 | 0.88 | 8/8 | 0 | 10/10 | 0/6 | fallback | 0 | 2026-10-01 |
| en | `patagonia-where-is-it-located` | published | 1496 | 1634 | 0.92 | 12/9 | 3 | 10/10 | 7/7 | propia | 0 | 2026-10-01 |
| en | `ski-resorts-in-patagonia` | published | 738 | 788 | 0.94 | 7/6 | 0 | 6/6 | 0/6 | propia | 0 | 2026-10-01 |
| en | `broom` | published | 1238 | 1319 | 0.94 | 7/6 | 0 | 8/8 | 1/6 | fallback | 0 | 2026-10-01 |
| en | `calafate-in-patagonia` | published | 898 | 968 | 0.93 | 6/0 | 0 | 5/5 | 0/5 | propia | 0 | 2026-10-01 |
| en | `climbing-shoes-guide` | published | 602 | 1085 | 0.55 | 1/11 | 0 | 6/6 | 0/5 | propia | 0 | 2026-10-01 |
| en | `historical-maps-patagonia` | published | 865 | 920 | 0.94 | 6/6 | 0 | 7/7 | 0/5 | propia | 0 | 2026-10-01 |
| en | `lake-rivadavia-los-alerces-national-park` | published | 606 | 670 | 0.90 | 2/9 | 0 | 5/5 | 1/6 | propia | 0 | 2026-10-01 |
| en | `loica-in-patagonia-habitat-behavior-conservation` | published | 1275 | 1350 | 0.94 | 6/10 | 0 | 9/9 | 0/5 | propia | 0 | 2026-10-01 |
| en | `6m-geodesic-dome-calculation-cutting-guide` | published | 1247 | 1368 | 0.91 | 5/16 | 0 | 9/9 | 0/4 | propia | 0 | 2026-10-01 |
| en | `alerce` | published | 1010 | 1094 | 0.92 | 14/5 | 2 | 6/6 | 7/7 | propia | 0 | 2026-10-01 |
| en | `annular-solar-eclipse-2027` | published | 1669 | 1776 | 0.94 | 7/6 | 0 | 11/11 | 1/5 | fallback | 0 | 2026-10-01 |
| en | `guanaco-habitat-diet-more` | published | 1336 | 1084 | 0.81 | 10/8 | 2 | 9/9 | 10/10 | propia | 0 | 2026-10-01 |
| en | `introduced-pine-patagonia-use-impact-management` | published | 895 | 121 | 0.14 | 10/1 | 0 | 6/6 | 0/4 | propia | 0 | 2026-10-01 |
| en | `killer-whale-patagonia-fascinating-predator` | published | 1322 | 1490 | 0.89 | 9/7 | 0 | 9/9 | 0/4 | propia | 0 | 2026-10-01 |
| en | `mutisia-decurrens-patagonian-flower` | published | 810 | 874 | 0.93 | 8/7 | 2 | 7/7 | 3/3 | propia | 0 | 2026-10-01 |
| en | `nutria` | published | 1482 | 1387 | 0.94 | 7/6 | 0 | 10/10 | 1/5 | fallback | 0 | 2026-10-01 |
| en | `patagonia-wildfires-causes-impacts-solutions` | published | 2275 | 2592 | 0.88 | 10/8 | 0 | 14/14 | 0/4 | fallback | 0 | 2026-10-01 |
| en | `trevelin-tulip-fields` | published | 494 | 554 | 0.89 | 7/4 | 2 | 2/4 | 0/0 | fallback | 0 | 2026-10-22 |
| en | `american-mink` | published | 1187 | 1204 | 0.99 | 8/12 | 0 | 8/8 | 0/3 | fallback | 2 | 2026-10-01 |
| en | `medicinal-plants-patagonia` | published | 967 | 978 | 0.99 | 5/7 | 0 | 7/7 | 0/3 | propia | 2 | 2026-10-01 |
| en | `pickled-pine-mushrooms` | published | 826 | 104 | 0.13 | 9/7 | 0 | 5/5 | 0/3 | propia | 0 | 2026-10-01 |
| en | `red-berries-of-patagonia` | published | 963 | — | — | 7/0 | 0 | 5/5 | 1/4 | propia | 0 | 2026-10-01 |
| en | `southern-right-whale` | published | 1791 | 2009 | 0.89 | 11/16 | 0 | 11/11 | 2/5 | fallback | 0 | 2026-10-01 |
| en | `andean-condor-coloring-pages` | published | 715 | — | — | 4/6 | 0 | 4/4 | 0/2 | propia | 0 | 2026-10-01 |
| en | `bariloche-travel-guide` | published | 781 | — | — | 8/9 | 1 | 5/5 | 5/5 | propia | 0 | 2026-10-01 |
| en | `black-rose` | published | 996 | 1033 | 0.96 | 11/7 | 1 | 6/6 | 5/5 | fallback | 0 | 2026-10-01 |
| en | `cave-of-hands-patagonia-unesco-rock-art` | published | 727 | 918 | 0.79 | 8/8 | 1 | 5/5 | 7/7 | propia | 0 | 2026-10-01 |
| en | `maqui` | published | 1362 | 2612 | 0.52 | 10/14 | 1 | 9/9 | 5/5 | propia | 0 | 2026-10-01 |
| en | `nalgene-water-bottle-review` | published | 719 | 971 | 0.74 | 7/10 | 1 | 6/6 | 2/2 | propia | 0 | 2026-10-01 |
| en | `patagonian-gray-fox-habitat-diet-conservation` | published | 1206 | — | — | 11/19 | 1 | 8/8 | 8/8 | propia | 0 | 2026-06-11 |
| en | `patagonian-rosehip-jam` | published | 1053 | 128 | 0.12 | 11/9 | 1 | 7/7 | 3/3 | propia | 0 | 2026-10-01 |
| en | `puerto-montt-travel-guide-chile` | published | 1333 | — | — | 8/13 | 1 | 8/8 | 6/6 | propia | 0 | 2026-10-01 |
| en | `sea-lion-pups-excursion-puerto-madryn` | published | 711 | 752 | 0.95 | 7/6 | 0 | 6/6 | 0/2 | fallback | 0 | 2026-10-01 |
| en | `southern-lapwing` | published | 1099 | 1131 | 0.97 | 9/6 | 1 | 8/8 | 3/3 | propia | 2 | 2026-10-01 |
| en | `survival-adaptations-rheas-patagonia` | published | 722 | 896 | 0.81 | 6/8 | 1 | 6/6 | 3/3 | propia | 0 | 2026-10-01 |
| en | `visit-punta-tombo-magellanic-penguins` | published | 644 | 743 | 0.87 | 3/7 | 1 | 5/5 | 9/9 | propia | 0 | 2026-10-01 |
| en | `3-main-causes-of-the-endangerment-of-the-huemul` | published | 796 | 867 | 0.92 | 5/7 | 0 | 6/6 | 0/1 | fallback | 0 | 2026-10-01 |
| en | `lupins-in-patagonia` | published | 851 | 977 | 0.87 | 1/9 | 0 | 6/6 | 0/1 | propia | 0 | 2026-10-01 |
| en | `mapuche-patagonia-history-culture-present` | published | 1216 | 1348 | 0.90 | 7/11 | 0 | 9/9 | 9/10 | propia | 0 | 2026-10-01 |
| en | `patagonian-gray-fox` | published | 1633 | 1522 | 0.93 | 7/6 | 0 | 11/11 | 4/5 | propia | 0 | 2026-10-01 |
| en | `amancay-patagonia` | published | 1423 | 1121 | 0.79 | 8/8 | 0 | 10/10 | 8/8 | propia | 0 | 2026-10-01 |
| en | `camping-in-el-chalten-authentic-experiences` | published | 922 | 965 | 0.96 | 9/9 | 0 | 6/6 | 5/5 | propia | 0 | 2026-10-01 |
| en | `carretera-austral-chilean-patagonia` | published | 1095 | — | — | 6/7 | 0 | 8/8 | 4/4 | propia | 0 | 2026-10-01 |
| en | `chilean-kuchen-history-tradition` | published | 1066 | 154 | 0.14 | 7/2 | 0 | 7/7 | 3/3 | propia | 0 | 2026-10-01 |
| en | `chucao-patagonia-symbol-native-wildlife` | published | 1626 | 1794 | 0.91 | 10/8 | 0 | 11/11 | 10/10 | propia | 0 | 2026-10-01 |
| en | `el-chalten-patagonia-argentina` | published | 1405 | — | — | 8/11 | 0 | 9/9 | 14/14 | propia | 0 | 2026-10-01 |
| en | `gauchito-gil-patagonia-history-miracles-sanctuaries` | published | 1347 | 1412 | 0.95 | 7/8 | 0 | 9/9 | 5/5 | propia | 0 | 2026-10-01 |
| en | `geodesic-dome-openings` | published | 3170 | 3606 | 0.88 | 9/23 | 0 | 18/18 | 31/31 | propia | 0 | 2026-10-01 |
| en | `monito-del-monte-marsupial` | published | 1041 | 1087 | 0.96 | 9/13 | 0 | 6/6 | 4/4 | propia | 0 | 2026-10-01 |
| en | `osb-panel-installation-geodesic-dome` | published | 1129 | 1195 | 0.94 | 7/6 | 0 | 7/7 | 11/11 | propia | 0 | 2026-10-01 |
| en | `patagonia-rebelde` | published | 1101 | 1015 | 0.92 | 7/6 | 0 | 8/8 | 3/3 | propia | 2 | 2026-10-01 |
| en | `patagonian-lamb` | published | 1972 | 2115 | 0.93 | 11/14 | 0 | 11/11 | 5/5 | propia | 0 | 2026-10-01 |
| en | `patagonian-piche` | published | 903 | 1053 | 0.86 | 5/7 | 0 | 7/7 | 8/8 | propia | 0 | 2026-10-01 |
| en | `patagonian-puma-conservation` | published | 1676 | 1844 | 0.91 | 10/7 | 0 | 11/11 | 6/6 | propia | 0 | 2026-10-01 |
| en | `perito-moreno-glacier` | published | 1040 | — | — | 5/7 | 0 | 8/8 | 13/13 | propia | 0 | 2026-10-01 |
| en | `piedra-parada` | published | 1802 | 1935 | 0.93 | 1/16 | 0 | 11/11 | 18/18 | propia | 0 | 2026-10-01 |
| en | `red-deer` | published | 1289 | 1489 | 0.87 | 8/4 | 0 | 8/8 | 9/9 | propia | 0 | 2026-10-01 |
| en | `rosehip-patagonia` | published | 1157 | 1251 | 0.92 | 8/12 | 0 | 8/8 | 4/4 | propia | 0 | 2026-10-01 |
| en | `selknam-tragedy-julius-popper` | published | 760 | 748 | 0.98 | 1/14 | 0 | 6/6 | 4/4 | propia | 0 | 2026-10-01 |
| en | `strait-of-magellan-history-significance` | published | 858 | 879 | 0.98 | 8/5 | 0 | 6/6 | 3/3 | propia | 0 | 2026-10-01 |
| en | `strawberry-patagonia` | published | 1183 | 1293 | 0.91 | 9/0 | 0 | 6/6 | 8/8 | propia | 0 | 2026-10-01 |
| en | `torres-del-paine-patagonia` | published | 1329 | 1555 | 0.85 | 2/13 | 0 | 9/9 | 7/7 | propia | 0 | 2026-10-01 |
| en | `tucuquere-owl` | published | 1049 | 949 | 0.90 | 13/9 | 0 | 7/7 | 8/8 | propia | 0 | 2026-10-01 |
| en | `welsh-patagonia` | published | 1268 | 1441 | 0.88 | 8/10 | 0 | 9/9 | 4/4 | propia | 0 | 2026-10-22 |
| en | `wild-boar` | published | 1830 | 176 | 0.10 | 8/14 | 0 | 11/11 | 6/6 | propia | 1 | 2026-10-01 |
| en | `yellow-crested-penguin-patagonia` | published | 1018 | 1208 | 0.84 | 7/8 | 0 | 7/7 | 4/4 | propia | 0 | 2026-10-01 |
| es | `amanita-muscaria` | published | 31 | 895 | 0.03 | 1/0 | 0 | 1/1 | 0/0 | propia | 10 | 2026-10-01 |
| es | `jabali-europeo` | published | 176 | 1830 | 0.10 | 1/0 | 0 | 2/2 | 0/0 | propia | 6 | 2026-10-01 |
| es | `mermelada-rosa-mosqueta-patagonica` | published | 128 | 1053 | 0.12 | 1/0 | 0 | 2/2 | 0/0 | propia | 10 | 2026-06-11 |
| es | `hongos-de-pino-en-escabeche` | published | 104 | 826 | 0.13 | 1/0 | 0 | 2/2 | 0/0 | propia | 8 | 2026-06-11 |
| es | `pino-introducido-patagonia-uso-impacto` | published | 121 | 895 | 0.14 | 1/0 | 0 | 2/2 | 0/0 | propia | 9 | 2026-06-11 |
| es | `kuchen-chileno-historia-tradicion` | published | 154 | 1066 | 0.14 | 1/0 | 0 | 2/2 | 0/0 | propia | 6 | 2026-06-11 |
| es | `construir-tarima-madera-solida-guia-paso-a-paso` | published | 1975 | 1760 | 0.89 | 8/10 | 1 | 12/12 | 1/23 | propia | 0 | 2026-10-01 |
| es | `montaje-semiesfera-domo-geodesico` | published | 460 | 466 | 0.99 | 6/0 | 1 | 3/3 | 0/20 | propia | 1 | 2026-10-01 |
| es | `preguntas-region-patagonia` | published | 2979 | 2645 | 0.89 | 8/15 | 0 | 17/17 | 1/22 | propia | 0 | 2026-10-01 |
| es | `cipres-de-la-cordillera-patagonia` | published | 2143 | 1914 | 0.89 | 10/12 | 1 | 13/13 | 1/18 | propia | 0 | 2026-06-11 |
| es | `instalar-postes-de-madera` | published | 1911 | 1674 | 0.88 | 6/7 | 0 | 12/12 | 0/19 | propia | 0 | 2026-10-01 |
| es | `descubri-el-mate-la-bebida-tradicional-de-sudamerica` | published | 1917 | 1539 | 0.80 | 8/7 | 0 | 12/12 | 6/23 | propia | 0 | 2026-06-11 |
| es | `prendas-mas-vendidas-patagonia` | published | 1397 | 1181 | 0.85 | 12/12 | 2 | 7/7 | 1/12 | propia | 0 | 2026-10-01 |
| es | `liebre-europea-historia-impacto-y-curiosidades` | published | 1440 | 1331 | 0.92 | 13/10 | 1 | 10/10 | 0/12 | propia | 0 | 2026-10-01 |
| es | `hongo-de-pino-recoleccion-secado-usos` | published | 1290 | 1128 | 0.87 | 7/7 | 0 | 10/10 | 1/14 | propia | 0 | 2026-06-11 |
| es | `preparacion-terreno-domo` | published | 1821 | 1600 | 0.88 | 8/13 | 0 | 12/12 | 1/13 | propia | 0 | 2026-10-01 |
| es | `escarcha-patagonica-invierno-patagonia` | published | 1726 | 1440 | 0.83 | 8/18 | 0 | 11/11 | 0/11 | propia | 0 | 2026-10-01 |
| es | `guia-ropa-outdoor-patagonia` | published | 645 | 688 | 0.94 | 4/8 | 1 | 6/6 | 0/9 | propia | 0 | 2026-10-01 |
| es | `chalten-patagonia-argentina` | published | 127 | — | — | 1/0 | 0 | 2/2 | 0/0 | propia | 6 | 2026-10-01 |
| es | `invierno-ruta-40-patagonia` | published | 1821 | 1659 | 0.91 | 10/6 | 0 | 12/12 | 2/12 | propia | 0 | 2026-10-01 |
| es | `martin-pescador` | published | 832 | 724 | 0.87 | 10/5 | 3 | 5/5 | 0/4 | propia | 0 | 2026-10-01 |
| es | `paxillus-involutus` | published | 104 | — | — | 1/0 | 0 | 3/3 | 0/0 | fallback | 6 | 2026-10-01 |
| es | `viajar-patagonia-guia-consejos` | published | 241 | — | — | 1/0 | 0 | 3/3 | 0/0 | propia | 11 | 2026-10-01 |
| es | `dinosaurios-patagonia` | published | 1245 | 1193 | 0.96 | 7/0 | 0 | 9/9 | 0/9 | propia | 0 | 2026-10-01 |
| es | `recoleccion-morillas-patagonia-consejos` | published | 1182 | 983 | 0.83 | 7/11 | 0 | 8/8 | 0/9 | fallback | 0 | 2026-06-11 |
| es | `condor-andino` | published | 1821 | 1010 | 0.55 | 10/7 | 1 | 12/12 | 0/6 | propia | 0 | 2026-10-01 |
| es | `equipamiento-de-escalada` | published | 1037 | 929 | 0.90 | 4/7 | 0 | 8/8 | 0/8 | propia | 0 | 2026-10-01 |
| es | `beneficios-arandano-salud-sabor-fin-del-mundo` | published | 898 | 788 | 0.88 | 6/0 | 0 | 7/7 | 0/7 | propia | 0 | 2026-06-11 |
| es | `armado-triangulos-domo-geodesico` | published | 1330 | 1168 | 0.88 | 5/7 | 0 | 9/9 | 0/6 | propia | 0 | 2026-10-01 |
| es | `centros-esqui-patagonia` | published | 788 | 738 | 0.94 | 7/6 | 0 | 6/6 | 0/6 | propia | 0 | 2026-10-01 |
| es | `chilco` | published | 727 | 687 | 0.94 | 9/5 | 1 | 5/5 | 0/4 | propia | 0 | 2026-06-11 |
| es | `comprar-merken-en-la-patagonia` | published | 1709 | 1434 | 0.84 | 6/8 | 0 | 11/11 | 0/6 | propia | 0 | 2026-06-11 |
| es | `diferencias-senderismo-trekking-patagonia` | published | 1226 | 1062 | 0.87 | 9/11 | 1 | 9/9 | 2/6 | propia | 0 | 2026-10-01 |
| es | `eclipse-solar-anular-esquel-2027` | published | 1776 | 1669 | 0.94 | 7/6 | 0 | 12/12 | 1/7 | fallback | 0 | 2026-10-01 |
| es | `llao-llao-patagonia` | published | 1748 | 1544 | 0.88 | 8/8 | 0 | 11/11 | 0/6 | fallback | 0 | 2026-06-11 |
| es | `ortiguilla-insecticida-natural` | published | 1098 | 1100 | 1.00 | 9/8 | 0 | 8/8 | 0/6 | propia | 0 | 2026-06-11 |
| es | `patagonia-ubicacion-consejos-viaje` | published | 1634 | 1496 | 0.92 | 12/9 | 3 | 11/11 | 7/7 | propia | 0 | 2026-10-01 |
| es | `pedulas-escalada` | published | 1085 | 602 | 0.55 | 7/6 | 1 | 8/8 | 0/4 | propia | 0 | 2026-10-01 |
| es | `calafate-patagonia` | published | 968 | 898 | 0.93 | 6/0 | 0 | 8/8 | 0/5 | propia | 0 | 2026-06-11 |
| es | `carretera-austral-patagonia-chilena` | published | 2164 | — | — | 12/8 | 1 | 13/13 | 4/7 | propia | 0 | 2026-10-01 |
| es | `flamencos-en-la-patagonia` | published | 738 | 724 | 0.98 | 6/8 | 1 | 6/6 | 0/3 | fallback | 0 | 2026-06-11 |
| es | `lago-rivadavia-parque-nacional-los-alerces` | published | 670 | 606 | 0.90 | 2/9 | 0 | 6/6 | 1/6 | propia | 0 | 2026-10-01 |
| es | `loica-en-la-patagonia-habitat-caracteristicas-conservacion` | published | 1350 | 1275 | 0.94 | 6/10 | 0 | 9/9 | 0/5 | propia | 0 | 2026-10-01 |
| es | `mapas-historicos-patagonia` | published | 920 | 865 | 0.94 | 6/6 | 0 | 7/7 | 0/5 | propia | 0 | 2026-10-01 |
| es | `retama` | published | 1319 | 1238 | 0.94 | 7/6 | 0 | 9/9 | 1/6 | fallback | 0 | 2026-06-11 |
| es | `coipo` | published | 1387 | 1482 | 0.94 | 7/6 | 0 | 10/10 | 1/5 | fallback | 0 | 2026-10-01 |
| es | `como-calcular-un-domo-geodesico-de-madera-de-6m` | published | 1368 | 1247 | 0.91 | 5/16 | 0 | 9/9 | 0/4 | propia | 0 | 2026-10-01 |
| es | `incendios-en-la-patagonia` | published | 2592 | 2275 | 0.88 | 10/8 | 0 | 15/15 | 0/4 | fallback | 0 | 2026-10-01 |
| es | `mutisia-decurrens-flor-patagonica` | published | 874 | 810 | 0.93 | 8/7 | 2 | 7/7 | 3/3 | propia | 0 | 2026-06-11 |
| es | `orca-patagonia-depredador-fascinante` | published | 1490 | 1322 | 0.89 | 9/7 | 0 | 10/10 | 0/4 | propia | 0 | 2026-10-01 |
| es | `ballena-franca-austral` | published | 2009 | 1791 | 0.89 | 11/16 | 0 | 13/13 | 2/5 | fallback | 0 | 2026-10-01 |
| es | `frutos-rojos-patagonia` | published | 1071 | — | — | 7/0 | 0 | 8/8 | 1/4 | propia | 0 | 2026-06-11 |
| es | `plantas-medicinales-patagonia` | published | 978 | 967 | 0.99 | 6/6 | 0 | 6/6 | 0/3 | propia | 0 | 2026-10-01 |
| es | `vison-americano` | published | 1204 | 1187 | 0.99 | 10/11 | 0 | 8/8 | 0/3 | fallback | 0 | 2026-10-01 |
| es | `adaptaciones-nandues-patagonia` | published | 896 | 722 | 0.81 | 6/8 | 1 | 7/7 | 3/3 | propia | 0 | 2026-10-01 |
| es | `alerce` | published | 1094 | 1010 | 0.92 | 14/5 | 1 | 7/7 | 7/7 | propia | 0 | 2026-06-11 |
| es | `bariloche-argentina` | published | 499 | — | — | 6/3 | 1 | 4/4 | 5/5 | propia | 1 | 2026-10-01 |
| es | `colocacion-proteccion-paneles-osb-domo-geodesico` | published | 1195 | 1129 | 0.94 | 6/6 | 1 | 8/8 | 11/11 | propia | 2 | 2026-10-01 |
| es | `dibujos-para-colorear-condor-andino` | published | 692 | — | — | 4/5 | 0 | 6/6 | 0/2 | propia | 0 | 2026-06-11 |
| es | `excursion-crias-lobos-marinos-puerto-madryn` | published | 752 | 711 | 0.95 | 7/6 | 0 | 6/6 | 0/2 | fallback | 0 | 2026-10-01 |
| es | `puerto-montt-chile` | published | 1555 | — | — | 8/13 | 1 | 9/9 | 6/6 | propia | 0 | 2026-10-01 |
| es | `rosa-mosqueta-patagonia` | published | 1251 | 1157 | 0.92 | 8/12 | 1 | 9/9 | 4/4 | propia | 0 | 2026-06-11 |
| es | `rosa-negra-ameghiniella-australis` | published | 1033 | 996 | 0.96 | 11/7 | 1 | 6/6 | 5/5 | fallback | 0 | 2026-10-01 |
| es | `todo-sobre-el-guanaco` | published | 1084 | 1336 | 0.81 | 9/2 | 1 | 8/8 | 10/10 | propia | 0 | 2026-10-01 |
| es | `tulipanes-trevelin` | published | 554 | 494 | 0.89 | 7/4 | 1 | 3/4 | 0/0 | fallback | 0 | 2026-10-22 |
| es | `zorro-gris` | published | 1522 | 1633 | 0.93 | 7/6 | 0 | 10/10 | 3/5 | propia | 0 | 2026-10-01 |
| es | `ley-glaciares` | published | 922 | — | — | 9/3 | 0 | 6/6 | 0/1 | fallback | 0 | 2026-10-01 |
| es | `lupinos` | published | 977 | 851 | 0.87 | 1/9 | 0 | 7/7 | 1/2 | propia | 0 | 2026-06-11 |
| es | `mapuche-patagonia-historia-cultura-actualidad` | published | 1348 | 1216 | 0.90 | 7/11 | 0 | 9/9 | 9/10 | propia | 0 | 2026-10-01 |
| es | `peligro-extincion-huemul` | published | 867 | 796 | 0.92 | 5/7 | 0 | 7/7 | 0/1 | fallback | 0 | 2026-10-01 |
| es | `aberturas-domos-geodesicos` | published | 3606 | 3170 | 0.88 | 9/23 | 0 | 21/21 | 31/31 | propia | 0 | 2026-10-01 |
| es | `amancay` | published | 1121 | 1423 | 0.79 | 9/8 | 0 | 8/8 | 2/2 | propia | 2 | 2026-06-11 |
| es | `buho-tucuquere` | published | 949 | 1049 | 0.90 | 13/9 | 0 | 6/6 | 8/8 | propia | 0 | 2026-10-01 |
| es | `campings-en-el-chalten` | published | 965 | 922 | 0.96 | 9/9 | 0 | 8/8 | 5/5 | propia | 0 | 2026-10-01 |
| es | `chucao-patagonia-emblema-fauna-autoctona` | published | 1794 | 1626 | 0.91 | 10/8 | 0 | 12/12 | 10/10 | propia | 0 | 2026-10-01 |
| es | `ciervo-colorado` | published | 1489 | 1289 | 0.87 | 8/4 | 0 | 9/9 | 9/9 | propia | 0 | 2026-10-01 |
| es | `cordero-patagonico` | published | 2115 | 1972 | 0.93 | 11/14 | 0 | 12/12 | 5/5 | propia | 0 | 2026-08-20 |
| es | `cueva-de-las-manos-arte-rupestre` | published | 918 | 727 | 0.79 | 8/8 | 0 | 6/6 | 7/7 | propia | 0 | 2026-10-01 |
| es | `estrecho-de-magallanes-historia-y-relevancia` | published | 879 | 858 | 0.98 | 8/5 | 0 | 6/6 | 3/3 | propia | 0 | 2026-10-01 |
| es | `frutilla-patagonia` | published | 1293 | 1183 | 0.91 | 9/0 | 0 | 9/9 | 8/8 | propia | 0 | 2026-06-11 |
| es | `galeses-patagonia-historia-turismo-chubut` | published | 1441 | 1268 | 0.88 | 8/10 | 0 | 10/10 | 4/4 | propia | 0 | 2026-10-22 |
| es | `gauchito-gil-patagonia-santuarios-historia-cultura` | published | 1412 | 1347 | 0.95 | 7/8 | 0 | 10/10 | 5/5 | propia | 0 | 2026-10-01 |
| es | `glaciares-patagonia-guia-completa` | published | 639 | — | — | 6/4 | 0 | 6/5 | 0/0 | fallback | 0 | 2026-10-01 |
| es | `maqui` | published | 2612 | 1362 | 0.52 | 10/14 | 0 | 17/17 | 5/5 | propia | 0 | 2026-06-11 |
| es | `monito-del-monte` | published | 1087 | 1041 | 0.96 | 9/13 | 0 | 7/7 | 4/4 | propia | 0 | 2026-10-01 |
| es | `nalgene-botella-outdoor` | published | 971 | 719 | 0.74 | 7/11 | 0 | 7/7 | 3/3 | propia | 0 | 2026-10-01 |
| es | `patagonia-rebelde` | published | 1015 | 1101 | 0.92 | 7/6 | 0 | 8/8 | 3/3 | propia | 2 | 2026-10-01 |
| es | `piche-patagonico` | published | 1053 | 903 | 0.86 | 5/7 | 0 | 8/8 | 8/8 | propia | 0 | 2026-10-01 |
| es | `piedra-parada-patagonia` | published | 1935 | 1802 | 0.93 | 1/16 | 0 | 12/12 | 18/18 | propia | 0 | 2026-10-01 |
| es | `pinguino-penacho-amarillo-patagonia` | published | 1208 | 1018 | 0.84 | 7/8 | 0 | 9/9 | 4/4 | propia | 0 | 2026-10-01 |
| es | `pinguinos-punta-tombo-patagonia` | published | 743 | 644 | 0.87 | 2/7 | 0 | 6/6 | 9/9 | propia | 0 | 2026-10-01 |
| es | `puma-concolor-patagonia` | published | 1844 | 1676 | 0.91 | 10/7 | 0 | 12/12 | 6/6 | propia | 0 | 2026-10-01 |
| es | `tero` | published | 1131 | 1099 | 0.97 | 8/6 | 0 | 8/8 | 3/3 | propia | 3 | 2026-10-01 |
| es | `torres-del-paine-patagonia` | published | 1555 | 1329 | 0.85 | 2/13 | 0 | 10/10 | 7/7 | propia | 0 | 2026-10-01 |
| es | `tragedia-selknam-julius-popper` | published | 748 | 760 | 0.98 | 1/14 | 0 | 6/6 | 4/4 | propia | 0 | 2026-10-01 |
| es | `visitar-glaciar-perito-moreno-guia` | published | 1300 | — | — | 5/8 | 0 | 9/9 | 13/13 | propia | 0 | 2026-10-01 |

<!-- HIPOTESIS -->

## Lectura de los datos (medido)

- **El patrón del jabalí se repite en 9 artículos ES** (`jabali-europeo`, `amanita-muscaria`, `hongos-de-pino-en-escabeche`, `mermelada-rosa-mosqueta-patagonica`, `pino-introducido-patagonia-uso-impacto`, `kuchen-chileno-historia-tradicion`, `chalten-patagonia-argentina`, `paxillus-involutus`, `viajar-patagonia-guia-consejos`). Todos tienen `wp_id`, un solo H2 (el índice), un `<nav>` con 3 o más links `#ancla` sin destino y un `<script type="application/ld+json">` de FAQ; el cuerpo es intro + índice + JSON-LD, y las secciones que el índice promete no están. Seis tienen par EN (los otros tres, `chalten-patagonia-argentina`, `paxillus-involutus` y `viajar-patagonia-guia-consejos`, no) y el par es entre 7 y 29 veces más largo (`wild-boar` 1.830 palabras vs. 176).
- `tero` es el décimo con índice de anclas sin destino, pero 8 H2 y contenido completo: es un problema de ids de ancla, no de cuerpo faltante.
- **No es un problema del EN**: 0 artículos EN cortos ni con par más largo. La pérdida está solo en ES.
- **`reading_time_min` no sirve de pista**: en los 189 artículos coincide con el calculado del contenido actual. O se calculó con el cuerpo ya corto, o se recalculó después; con estos datos no se distingue.
- **`updated_at` no discrimina**: 68 de los 96 ES y 90 de los 93 EN tienen `updated_at` = 2026-10-01 (una actualización masiva), y 25 ES tienen 2026-06-11. Los incompletos caen en esas dos fechas (4 en 06-11, 5 en 10-01), pero también todos los completos.
- **Fotos**: 708 de 1.317 `<img>` (54%) no sobreviven a `fixLegacyImages`, repartidas parejo entre ES (50 artículos) y EN (51). Es el efecto esperado del hosting viejo (`LEGACY_IMAGES` solo tiene las recuperadas), no está ligado al cuerpo incompleto: los 9 incompletos no tenían fotos en el HTML (0/0).
- 29 artículos (16 ES, 13 EN) no usan portada propia (cae al fallback de Wikimedia o no tiene).
- Secciones H2 con menos de 40 palabras (sin contar el índice): 52 artículos. La mayoría son secciones cortas legítimas (listas, citas): no se las trata como pérdida de contenido sin revisar.

## Hipótesis sobre la causa (no verificadas)

Ninguna está confirmada; cada una dice qué la confirmaría o descartaría.

1. **El cuerpo ES se truncó al generarse o al cargarse el contenido (no es un efecto de `fixLegacyImages`).** El render no recorta texto, y los 9 casos no tenían fotos. Para confirmarlo: comparar `content` con el `content.rendered` de la API de WordPress de cada `wp_id` (si todavía existe) o con los backups.
2. **Una de las dos cargas masivas (2026-06-11 o 2026-10-01) pisó el cuerpo con una versión sin secciones.** Compatible con que los incompletos coincidan con esas fechas, pero esas fechas incluyen a casi todos los artículos, así que no lo prueba. Confirmaría: historial de la tabla o el SQL que se corrió ese día (`seo/updates/`, `scripts/upsert_articles.py`).
3. **El texto ya estaba así en la fuente** (WordPress/WPML guardaba solo intro + índice + FAQ para ES). Se descartaría si la API de WordPress devuelve el cuerpo completo.

## Qué falta para arreglarlo (fuera de alcance de esta auditoría)

Esta auditoría no tocó contenido. Para recuperar los 9 hace falta primero decidir la fuente del texto ES (recuperarlo de WordPress o de backups, o traducir/reescribir desde el EN), y recién ahí un SQL o `upsert_articles.py`. Lo que está debajo de la línea marcadora no lo regenera el script.

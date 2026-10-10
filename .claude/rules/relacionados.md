---
paths:
  - "src/lib/**/catalog.ts"
  - "src/lib/escalada/**"
  - "src/lib/relacionados.ts"
  - "src/components/HeaderShell.tsx"
---
# Ampliar contenido: entradas conectadas ("relacionados")

Los catálogos estáticos (`src/lib/<seccion>/catalog.ts`, `src/lib/escalada/` y las secciones futuras del mismo tipo) pueden sumar entradas nuevas conectadas entre sí. Por ejemplo, "Termas Geométricas" conectada al volcán Villarrica y al Parque Nacional Villarrica.

## Cuándo arranca este flujo
Cuando la usuaria da un tema (lugar, atractivo, dato) y con qué entradas existentes se conecta. Ejemplo: *"en Villarrica hay que agregar las Termas Geométricas"*.

## Proceso
1. **Ver dónde va el contenido:**
   - Si entra en una sección que ya existe, va ahí.
   - Si es un tema que puede crecer a varias entradas parecidas (termas, miradores, refugios), evaluar una sección nueva tipo catálogo. **Preguntarle a la usuaria antes de crearla.**
2. **Investigar con fuentes oficiales**, sin inventar datos (ver Reglas de dominio en `CLAUDE.md`).
3. **Armar la entrada** con la misma estructura del catálogo destino: descripción en párrafos, datos concretos, FAQ y `urlFuente`, cumpliendo `.claude/rules/seo-geo.md`.
4. **Conectar los cross-links**: las entradas con el campo `relacionados: { tipo: string; slug: string }[]` apuntan a entradas de cualquier catálogo (tipos en `RelacionadoTipo`, `src/lib/relacionados.ts`). Hoy lo tienen destinos, parques, volcanes, termas y gastronomía. Fauna, flora, senderos, escalada y arqueología solo reciben links: para que la conexión sea simétrica con ellos, primero hay que sumarles el campo. La conexión es **simétrica**: si A lista a B, B también lista a A.
5. Los relacionados se renderizan en la página de detalle con `src/components/RelacionadosSection.tsx`, que resuelve cada `{ tipo, slug }` contra su catálogo.
6. Si la entrada tiene página propia, sumar la ruta a `src/app/sitemap.ts`.

## Cuándo entra una sección nueva al nav
Una sección nueva (por ejemplo `/termas`) tiene rutas, sitemap y SEO propios desde el primer día, pero **no entra al nav principal hasta tener masa crítica**: unas 6 a 8 entradas, más o menos lo que tenía arqueología cuando arrancó. Hasta entonces se llega por los `relacionados` de otras secciones y por el buscador interno. No ocupa un ícono del nav con 1 o 2 entradas.

El nav vive en `src/components/HeaderShell.tsx`, en dos listas duplicadas (desktop dropdown y mobile) que hay que mantener sincronizadas.

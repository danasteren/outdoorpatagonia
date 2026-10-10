---
paths:
  - "src/lib/escalada/**"
  - "src/app/escalada/**"
---
# Escalada: carga desde guías por zona

Los datos de escalada salen de guías publicadas por zona (PDF o web) que pasa la usuaria. Se cargan vía por vía. Qué zonas están verificadas: `docs/STATUS.md`.

- **Siempre se muestra de dónde salen los datos**: campo `fuente` del sector, renderizado por `FuenteCredito` con links para bajar la guía y para aportar.
- **Crédito y protagonismo a quienes hacen la guía.**
- **Solo datos técnicos**: nombre, grado, metros, chapas, aperturista, orientación, desplome, recomendada y aleje. **No se copian croquis, fotos ni textos** de la guía: las descripciones son propias.
- **Lo que la guía no dice no se carga** (por ejemplo `tipoRoca: []`, `temporada: []`, `altitud: null`). La UI oculta lo vacío.
- **Una guía nueva** crea o reemplaza `src/lib/escalada/sectores/<zona>.ts` con el molde de `esquel.ts` (helper `via()`, `zonas`, `subareas` con `zona`, `fuente`) y pisa lo que hubiera sin fuente en ese sector. La home (`EscaladaSection`) y el histograma solo usan sectores con `fuente`, así que se actualizan solos.
- **Leer los PDF**: en la máquina no hay poppler. Funciona PyMuPDF en un venv del scratchpad: texto por bloques, las tablas renderizadas a PNG y el desplome sacado de la forma de la celda con `get_drawings()`. Las coordenadas salen de los links de Google Maps de la propia guía.

---
paths:
  - "src/app/**"
  - "src/lib/**/catalog.ts"
---
# SEO y GEO: obligatorio en cada página nueva

Ninguna página nueva se da por terminada sin cumplir este checklist.

## 1. `metadata` mínimo

`layout.tsx` ya define `metadataBase`, el template de título (`%s | Outdoor Patagonia`) y openGraph/twitter globales como fallback. Cada `page.tsx` sobreescribe solo lo que cambia:

```typescript
export const metadata: Metadata = {
  title: "Keyword principal + Patagonia (50-60 chars)",
  description: "Responde qué, dónde y por qué en 150-160 chars. Los AI overviews citan estas descripciones literalmente.",
  openGraph: {
    title: "...",
    description: "...",
    url: "https://outdoorpatagonia.com/ruta",
    images: [{ url: "<foto destacada de la entrada>", width: 1200, height: 630, alt: "descripción de la imagen" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://outdoorpatagonia.com/ruta" },
}
```

Reglas que no se rompen:
- `title`: distinto en cada página, con "Patagonia" y la keyword principal al principio. **Nunca en formato pregunta** (los títulos-pregunta del WordPress tenían un CTR del 0,23 %). **Nunca con la marca**: el template del layout ya suma "| Outdoor Patagonia".
- `description`: una frase directa que responda qué, dónde y quién. Nunca arrancar con "En este artículo...".
- `canonical`: **obligatorio**, porque evita contenido duplicado por query params. En rutas dinámicas se genera por entrada.
- Si la página tiene imagen destacada, va en `openGraph.images`. Si no tiene, Next.js usa solo `src/app/opengraph-image.tsx` como fallback (el logo de la marca sobre fondo teal).

## 2. Estructura HTML

- **Un solo `<h1>` por página**, con la keyword principal y "Patagonia" cuando tenga sentido.
- Jerarquía `h2 → h3` sin saltos. Nunca usar un heading solo por cómo se ve.
- Toda `<Image>` o `<img>` lleva un `alt` descriptivo: nunca vacío y nunca "imagen de X".
- **Sumar la ruta estática nueva a `src/app/sitemap.ts`.** Si no está en el sitemap, Google la indexa más lento.

## 3. Datos estructurados JSON-LD (GEO)

Agregar `<script type="application/ld+json">` en el JSX. El tipo depende de la página:

| Tipo de página | Schema recomendado |
|---|---|
| Artículo / post | `Article` con `author`, `datePublished`, `image`, `publisher` |
| Parque / sendero / lugar | `TouristDestination` con `geo` (lat/lng) |
| Especie de fauna / flora | `Article` con `about: { "@type": "Thing", name: nombre científico }` |
| Página de categoría / índice | `CollectionPage` |
| Preguntas frecuentes | `FAQPage` (el de más impacto en AI overviews) |

Patrón para lugares (parques, senderos):

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "Nombre del lugar",
  description: "...",
  url: "https://outdoorpatagonia.com/parques/...",
  geo: { "@type": "GeoCoordinates", latitude: -50.0, longitude: -73.0 },
  touristType: { "@type": "Audience", audienceType: "outdoor enthusiasts" },
  containedInPlace: { "@type": "Country", name: "Argentina" },
}
// en el JSX:
// <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
```

## 4. GEO: optimizar para AI overviews (Perplexity, Google AI, ChatGPT Search)

Los motores de IA priorizan las páginas que:
- Responden la pregunta en las **primeras 100 palabras** de cada sección
- Usan datos concretos: altitud, distancia, temperatura media, temporada, precio
- Nombran entidades específicas: nombre científico, coordenadas, nombre oficial del parque
- Tienen schema `FAQPage` con preguntas que la gente busca de verdad

Al escribir contenido o descripciones:
- ✅ "El Parque Nacional Los Glaciares tiene 726.927 ha y alberga el Perito Moreno, uno de los pocos glaciares en crecimiento del mundo."
- ❌ "En este artículo vamos a explorar todo lo que necesitás saber sobre los glaciares patagónicos."

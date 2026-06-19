-- Directorio de operadores turísticos de Patagonia
-- Modelo: listing básico gratis, destacado pago ($50-100/mes)

CREATE TABLE operators (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  slug        TEXT        UNIQUE NOT NULL,
  description TEXT,
  location    TEXT,
  region      TEXT,
  categories  TEXT[]      NOT NULL DEFAULT '{}',
  website     TEXT,
  phone       TEXT,
  email       TEXT,
  logo_url    TEXT,
  is_featured BOOLEAN     NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE operators ENABLE ROW LEVEL SECURITY;

-- Lectura pública para todos
CREATE POLICY "operators_public_read" ON operators
  FOR SELECT USING (true);

CREATE INDEX operators_region_idx    ON operators (region);
CREATE INDEX operators_featured_name ON operators (is_featured DESC, name ASC);

-- Datos de ejemplo para desarrollo
INSERT INTO operators (name, slug, description, location, region, categories, website, phone, email, is_featured) VALUES
  (
    'Patagonia Adventure Tours',
    'patagonia-adventure-tours',
    'Especializados en trekking y expediciones de alta montaña en Los Glaciares y Torres del Paine. Guías certificados con más de 15 años de experiencia.',
    'El Chaltén, Santa Cruz',
    'Santa Cruz',
    ARRAY['trekking', 'montanismo', 'glaciares'],
    'https://example.com',
    '+54 2962 000001',
    'info@example.com',
    true
  ),
  (
    'Sur Kayak Patagonia',
    'sur-kayak-patagonia',
    'Excursiones en kayak de mar por los canales patagónicos y la Isla Navarino. Salidas de 1 día y expediciones de múltiples días.',
    'Ushuaia, Tierra del Fuego',
    'Tierra del Fuego',
    ARRAY['kayak', 'navegacion', 'aventura'],
    'https://example.com',
    '+54 2901 000002',
    'kayak@example.com',
    true
  ),
  (
    'Cabalgatas del Sur',
    'cabalgatas-del-sur',
    'Recorridos a caballo por la estepa patagónica y la cordillera. Circuitos cortos y multi-día con alojamiento en estancias.',
    'Bariloche, Río Negro',
    'Río Negro',
    ARRAY['cabalgatas', 'estepa', 'estancias'],
    NULL,
    '+54 294 000003',
    'caballos@example.com',
    false
  ),
  (
    'Viento Sur Expediciones',
    'viento-sur-expediciones',
    'Agencia receptiva con base en Puerto Natales. Organizamos excursiones al Parque Torres del Paine, Grey y Mirador Los Cóndores.',
    'Puerto Natales, Chile',
    'Chile',
    ARRAY['trekking', 'torres-del-paine', 'glaciares'],
    'https://example.com',
    '+56 61 2000004',
    'vientosur@example.com',
    false
  );

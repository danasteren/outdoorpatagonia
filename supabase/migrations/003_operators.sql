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


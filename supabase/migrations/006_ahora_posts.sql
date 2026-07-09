-- "Patagonia Ahora": foto/video del día que sube el admin desde el campo.
-- No se guarda expires_at: no hay cron en el proyecto, así que el TTL de
-- 24hs se filtra en la query (published_at > now() - interval '24 hours')
-- para no tener una columna que se pueda desincronizar.

CREATE TABLE ahora_posts (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  media_type     TEXT        NOT NULL CHECK (media_type IN ('photo', 'video')),
  media_url      TEXT        NOT NULL,
  caption        TEXT,
  location_text  TEXT,
  published_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE ahora_posts ENABLE ROW LEVEL SECURITY;

-- Lectura pública (home + /ahora + archivo); las escrituras solo pasan por
-- el service-role client, así que no hace falta policy de INSERT.
CREATE POLICY "public read" ON ahora_posts
  FOR SELECT USING (true);

INSERT INTO storage.buckets (id, name, public)
  VALUES ('ahora', 'ahora', true)
  ON CONFLICT (id) DO NOTHING;

CREATE POLICY "ahora public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'ahora');

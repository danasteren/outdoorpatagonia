-- Suscriptores al newsletter propio (reemplaza MailerLite)

CREATE TABLE subscribers (
  id                 UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email              TEXT        NOT NULL UNIQUE,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  source             TEXT        NOT NULL DEFAULT 'site',
  unsubscribed_at    TIMESTAMPTZ,
  unsubscribe_token  UUID        NOT NULL DEFAULT gen_random_uuid() UNIQUE
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon insert" ON subscribers
  FOR INSERT WITH CHECK (true);

-- Permite alta y re-alta (si se había dado de baja) sin exponer una policy
-- de UPDATE genérica a anon, que dejaría pisar cualquier fila por email.
CREATE OR REPLACE FUNCTION subscribe_email(p_email TEXT)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  INSERT INTO subscribers (email, source, unsubscribed_at)
  VALUES (lower(trim(p_email)), 'site', NULL)
  ON CONFLICT (email) DO UPDATE SET unsubscribed_at = NULL;
$$;

GRANT EXECUTE ON FUNCTION subscribe_email(TEXT) TO anon;

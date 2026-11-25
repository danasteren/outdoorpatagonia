-- Registro de los SQL manuales de seo/updates/: cada archivo termina con un
-- insert en esta tabla, así queda anotado cuáles se corrieron y cuándo.
-- Idempotente. RLS activado y sin políticas: solo se lee y escribe desde el
-- SQL Editor (rol postgres) o con la service role.

create table if not exists sql_log (
  file text primary key,
  applied_at timestamptz not null default now(),
  note text
);

alter table sql_log enable row level security;

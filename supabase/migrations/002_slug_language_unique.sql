-- Replace unique(slug) with unique(slug, language)
-- Articles in ES and EN can share the same slug

alter table public.articles drop constraint articles_slug_key;
alter table public.articles add constraint articles_slug_language_key unique (slug, language);

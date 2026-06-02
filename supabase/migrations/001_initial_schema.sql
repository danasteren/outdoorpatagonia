-- ============================================================
-- outdoorpatagonia.com — initial schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- Profiles (extends auth.users, created automatically on signup)
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  display_name text,
  avatar_url  text,
  role        text not null default 'reader' check (role in ('reader', 'admin')),
  created_at  timestamptz not null default now()
);

-- Auto-create profile on new user signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Articles
create table public.articles (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique,
  title               text not null,
  excerpt             text,
  content             text,
  language            text not null default 'es' check (language in ('es', 'en')),
  category            text,
  tags                text[] default '{}',
  cover_image_url     text,
  status              text not null default 'draft' check (status in ('draft', 'published')),
  author_id           uuid references public.profiles(id) on delete set null,
  wp_id               integer,             -- WordPress post ID (for migration)
  seo_title           text,
  seo_description     text,
  reading_time_min    integer,
  views               bigint not null default 0,
  published_at        timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger articles_updated_at
  before update on public.articles
  for each row execute procedure public.set_updated_at();

-- Indexes
create index articles_slug_idx       on public.articles(slug);
create index articles_language_idx   on public.articles(language);
create index articles_category_idx   on public.articles(category);
create index articles_status_idx     on public.articles(status);
create index articles_published_idx  on public.articles(published_at desc) where status = 'published';
create index articles_wp_id_idx      on public.articles(wp_id) where wp_id is not null;

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.profiles enable row level security;
alter table public.articles enable row level security;

-- Profiles: users see only their own profile; admins see all
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Articles: published articles are public; drafts only for admins
create policy "Published articles are public"
  on public.articles for select
  using (status = 'published');

create policy "Admins can do everything on articles"
  on public.articles for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

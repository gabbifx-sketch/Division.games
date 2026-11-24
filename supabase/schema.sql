-- DIVISION Supabase database foundation
-- Run this file in Supabase Dashboard -> SQL Editor.
-- Safe to run once on a fresh Supabase project.

create extension if not exists pgcrypto;

-- Keep updated_at current on editable records.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- User profiles are created automatically when Supabase Auth creates a user.
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  avatar_url text,
  bio text not null default '',
  status text not null default 'active' check (status in ('active', 'suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists profiles_username_lower_idx
  on public.profiles (lower(username));

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.games (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  instructions text not null default '',
  controls text not null default '',
  developer text not null default '',
  thumbnail_url text not null default '',
  embed_url text not null,
  gameplay_video_url text,
  category_id uuid references public.categories(id) on delete set null,
  tags text[] not null default '{}',
  is_published boolean not null default false,
  is_featured boolean not null default false,
  is_popular boolean not null default false,
  is_recommended boolean not null default false,
  is_multiplayer boolean not null default false,
  play_count bigint not null default 0 check (play_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists games_category_id_idx on public.games(category_id);
create index if not exists games_published_created_idx
  on public.games(is_published, created_at desc);
create index if not exists games_published_popular_idx
  on public.games(is_published, play_count desc);
create index if not exists games_tags_idx on public.games using gin(tags);

create table if not exists public.favorites (
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  game_id uuid not null references public.games(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, game_id)
);

create table if not exists public.likes (
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  game_id uuid not null references public.games(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, game_id)
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  game_id uuid not null references public.games(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists comments_game_created_idx
  on public.comments(game_id, created_at desc);

create table if not exists public.recently_played (
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  game_id uuid not null references public.games(id) on delete cascade,
  last_played_at timestamptz not null default now(),
  primary key (user_id, game_id)
);

create index if not exists recently_played_user_date_idx
  on public.recently_played(user_id, last_played_at desc);

-- Admin membership is managed manually in the Supabase SQL Editor.
-- There is deliberately no client-side INSERT/UPDATE/DELETE policy for this table.
create table if not exists public.admin_roles (
  user_id uuid primary key references public.profiles(user_id) on delete cascade,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

-- Security-definer helpers avoid recursive RLS checks on admin_roles/profiles.
create or replace function public.is_division_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_roles
    where user_id = (select auth.uid())
  );
$$;

create or replace function public.is_active_division_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where user_id = (select auth.uid())
      and status = 'active'
  );
$$;

-- Create a profile when a new Auth user signs up.
create or replace function public.handle_new_division_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_username text;
begin
  requested_username := nullif(trim(new.raw_user_meta_data ->> 'username'), '');

  begin
    insert into public.profiles (user_id, username)
    values (
      new.id,
      coalesce(
        requested_username,
        'player_' || left(replace(new.id::text, '-', ''), 8)
      )
    );
  exception when unique_violation then
    insert into public.profiles (user_id, username)
    values (
      new.id,
      'player_' || left(replace(new.id::text, '-', ''), 12)
    );
  end;

  return new;
end;
$$;

drop trigger if exists on_division_auth_user_created on auth.users;
create trigger on_division_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_division_user();

-- updated_at triggers
drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
  for each row execute procedure public.set_updated_at();

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at before update on public.categories
  for each row execute procedure public.set_updated_at();

drop trigger if exists games_set_updated_at on public.games;
create trigger games_set_updated_at before update on public.games
  for each row execute procedure public.set_updated_at();

drop trigger if exists comments_set_updated_at on public.comments;
create trigger comments_set_updated_at before update on public.comments
  for each row execute procedure public.set_updated_at();

-- Enable Row Level Security on every application table.
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.games enable row level security;
alter table public.favorites enable row level security;
alter table public.likes enable row level security;
alter table public.comments enable row level security;
alter table public.recently_played enable row level security;
alter table public.admin_roles enable row level security;

-- Profiles: usernames/avatars are public; users edit only their own profile.
drop policy if exists "Public profiles are readable" on public.profiles;
create policy "Public profiles are readable"
  on public.profiles for select
  using (true);

drop policy if exists "Users update their own active profile" on public.profiles;
create policy "Users update their own active profile"
  on public.profiles for update
  using (user_id = (select auth.uid()) and status = 'active')
  with check (user_id = (select auth.uid()) and status = 'active');

drop policy if exists "Admins manage profiles" on public.profiles;
create policy "Admins manage profiles"
  on public.profiles for all
  using (public.is_division_admin())
  with check (public.is_division_admin());

-- Categories: public read; admins manage.
drop policy if exists "Categories are publicly readable" on public.categories;
create policy "Categories are publicly readable"
  on public.categories for select
  using (true);

drop policy if exists "Admins manage categories" on public.categories;
create policy "Admins manage categories"
  on public.categories for all
  using (public.is_division_admin())
  with check (public.is_division_admin());

-- Games: visitors see published games; admins can see/manage all games.
drop policy if exists "Published games are publicly readable" on public.games;
create policy "Published games are publicly readable"
  on public.games for select
  using (is_published = true or public.is_division_admin());

drop policy if exists "Admins manage games" on public.games;
create policy "Admins manage games"
  on public.games for all
  using (public.is_division_admin())
  with check (public.is_division_admin());

-- Favorites: each signed-in user manages only their own rows.
drop policy if exists "Users read their favorites" on public.favorites;
create policy "Users read their favorites"
  on public.favorites for select
  using (user_id = (select auth.uid()));

drop policy if exists "Users add their own favorites" on public.favorites;
create policy "Users add their own favorites"
  on public.favorites for insert
  with check (
    user_id = (select auth.uid())
    and public.is_active_division_user()
    and exists (
      select 1 from public.games
      where games.id = favorites.game_id and games.is_published = true
    )
  );

drop policy if exists "Users remove their own favorites" on public.favorites;
create policy "Users remove their own favorites"
  on public.favorites for delete
  using (user_id = (select auth.uid()));

-- Likes: one like per user/game, enforced by the composite primary key.
drop policy if exists "Likes are publicly readable" on public.likes;
create policy "Likes are publicly readable"
  on public.likes for select
  using (true);

drop policy if exists "Active users like published games" on public.likes;
create policy "Active users like published games"
  on public.likes for insert
  with check (
    user_id = (select auth.uid())
    and public.is_active_division_user()
    and exists (
      select 1 from public.games
      where games.id = likes.game_id and games.is_published = true
    )
  );

drop policy if exists "Users remove their own likes" on public.likes;
create policy "Users remove their own likes"
  on public.likes for delete
  using (user_id = (select auth.uid()));

-- Comments: public read on published games; authors delete their own; admins moderate.
drop policy if exists "Comments on published games are readable" on public.comments;
create policy "Comments on published games are readable"
  on public.comments for select
  using (
    public.is_division_admin()
    or exists (
      select 1 from public.games
      where games.id = comments.game_id and games.is_published = true
    )
  );

drop policy if exists "Active users comment on published games" on public.comments;
create policy "Active users comment on published games"
  on public.comments for insert
  with check (
    user_id = (select auth.uid())
    and public.is_active_division_user()
    and exists (
      select 1 from public.games
      where games.id = comments.game_id and games.is_published = true
    )
  );

drop policy if exists "Authors and admins delete comments" on public.comments;
create policy "Authors and admins delete comments"
  on public.comments for delete
  using (user_id = (select auth.uid()) or public.is_division_admin());

drop policy if exists "Authors update their own comments" on public.comments;
create policy "Authors update their own comments"
  on public.comments for update
  using (user_id = (select auth.uid()) and public.is_active_division_user())
  with check (user_id = (select auth.uid()) and public.is_active_division_user());

-- Recently played: users can only read/write their own history.
drop policy if exists "Users read their own play history" on public.recently_played;
create policy "Users read their own play history"
  on public.recently_played for select
  using (user_id = (select auth.uid()));

drop policy if exists "Users record their own plays" on public.recently_played;
create policy "Users record their own plays"
  on public.recently_played for insert
  with check (
    user_id = (select auth.uid())
    and public.is_active_division_user()
    and exists (
      select 1 from public.games
      where games.id = recently_played.game_id and games.is_published = true
    )
  );

drop policy if exists "Users update their own play history" on public.recently_played;
create policy "Users update their own play history"
  on public.recently_played for update
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

drop policy if exists "Users clear their own play history" on public.recently_played;
create policy "Users clear their own play history"
  on public.recently_played for delete
  using (user_id = (select auth.uid()));

-- Admin role records can be read by their owner; only SQL/service-side setup grants roles.
drop policy if exists "Users can read their own admin role" on public.admin_roles;
create policy "Users can read their own admin role"
  on public.admin_roles for select
  using (user_id = (select auth.uid()) or public.is_division_admin());

-- Seed the initial category catalogue. This is category data, not fake game content.
insert into public.categories (name, slug, description) values
  ('Action', 'action', 'Fast-paced action games'),
  ('Adventure', 'adventure', 'Explore worlds and complete quests'),
  ('Racing', 'racing', 'Racing and driving games'),
  ('Sports', 'sports', 'Sports and competition games'),
  ('Puzzle', 'puzzle', 'Logic and problem-solving games'),
  ('Strategy', 'strategy', 'Tactical and strategy games'),
  ('Shooting', 'shooting', 'Shooter games'),
  ('Arcade', 'arcade', 'Quick-play arcade games'),
  ('Multiplayer', 'multiplayer', 'Games to play with others'),
  ('Simulation', 'simulation', 'Simulation games'),
  ('Casual', 'casual', 'Easy-to-pick-up games'),
  ('Horror', 'horror', 'Horror and suspense games')
on conflict (slug) do nothing;

-- After a user signs up, grant the first administrator manually in the SQL Editor:
-- insert into public.admin_roles (user_id)
-- select user_id from public.profiles where username = 'YOUR_USERNAME';
--
-- Never put a Supabase service_role key in browser JavaScript or Vite environment variables.

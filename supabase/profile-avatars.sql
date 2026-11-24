-- DIVISION profile names and avatar storage
-- Run once in Supabase Dashboard -> SQL Editor.

alter table public.profiles
  add column if not exists first_name text not null default '',
  add column if not exists last_name text not null default '';

-- New accounts save their first and last names from signup metadata.
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
    insert into public.profiles (user_id, username, first_name, last_name)
    values (
      new.id,
      coalesce(requested_username, 'player_' || left(replace(new.id::text, '-', ''), 8)),
      coalesce(nullif(trim(new.raw_user_meta_data ->> 'first_name'), ''), ''),
      coalesce(nullif(trim(new.raw_user_meta_data ->> 'last_name'), ''), '')
    );
  exception when unique_violation then
    insert into public.profiles (user_id, username, first_name, last_name)
    values (
      new.id,
      'player_' || left(replace(new.id::text, '-', ''), 12),
      coalesce(nullif(trim(new.raw_user_meta_data ->> 'first_name'), ''), ''),
      coalesce(nullif(trim(new.raw_user_meta_data ->> 'last_name'), ''), '')
    );
  end;

  return new;
end;
$$;

-- Public bucket: avatars can be displayed without exposing private account data.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('division-avatars', 'division-avatars', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update
set public = true, file_size_limit = 5242880,
    allowed_mime_types = array['image/jpeg','image/png','image/webp'];

drop policy if exists "Avatar images are publicly readable" on storage.objects;
create policy "Avatar images are publicly readable"
on storage.objects for select
using (bucket_id = 'division-avatars');

drop policy if exists "Users upload their own avatar" on storage.objects;
create policy "Users upload their own avatar"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'division-avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Users update their own avatar" on storage.objects;
create policy "Users update their own avatar"
on storage.objects for update to authenticated
using (
  bucket_id = 'division-avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
)
with check (
  bucket_id = 'division-avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Users delete their own avatar" on storage.objects;
create policy "Users delete their own avatar"
on storage.objects for delete to authenticated
using (
  bucket_id = 'division-avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

-- DIVISION: likes and game play-count migration
-- Run in Supabase Dashboard -> SQL Editor.
-- Existing RLS policies in schema.sql remain responsible for row-level security.

-- Let visitors read aggregate like rows; only signed-in users may create/remove their own likes.
grant select on public.likes to anon, authenticated;
grant insert, delete on public.likes to authenticated;

-- Increment a published game's play count without exposing direct UPDATE access.
create or replace function public.increment_game_play_count(p_game_id uuid)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_count bigint;
begin
  update public.games
  set play_count = play_count + 1
  where id = p_game_id
    and is_published = true
  returning play_count into updated_count;

  if updated_count is null then
    raise exception 'Published game not found';
  end if;

  return updated_count;
end;
$$;

revoke all on function public.increment_game_play_count(uuid) from public;
grant execute on function public.increment_game_play_count(uuid) to anon, authenticated;

-- Do not grant direct UPDATE on games to browser roles.

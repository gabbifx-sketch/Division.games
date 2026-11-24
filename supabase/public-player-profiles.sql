-- Allow public player pages to show a player's favourite games.
-- This does not expose recently played history.
grant select on public.favorites to anon, authenticated;
drop policy if exists "Public player favorites are readable" on public.favorites;
create policy "Public player favorites are readable"
on public.favorites for select
using (true);

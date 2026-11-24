-- DIVISION comments permissions
-- Existing comments RLS policies in schema.sql restrict rows to published games
-- and allow active users to insert their own comments only.
grant select on public.comments to anon, authenticated;
grant insert, delete on public.comments to authenticated;
grant select on public.profiles to anon, authenticated;

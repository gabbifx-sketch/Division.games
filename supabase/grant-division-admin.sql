-- Grant the first DIVISION admin role to the account with username division_admin.
-- Run this in Supabase SQL Editor while signed in as the project owner.

do $$
declare
  matched_user_id uuid;
  match_count integer;
begin
  select count(*)
  into match_count
  from public.profiles
  where username = 'division_admin';

  if match_count = 0 then
    raise exception 'No DIVISION profile found for username division_admin. Make sure the new account is registered and verified.';
  elsif match_count > 1 then
    raise exception 'More than one profile matched division_admin. No admin role was changed.';
  end if;

  select user_id
  into matched_user_id
  from public.profiles
  where username = 'division_admin';

  insert into public.admin_roles (user_id, role)
  values (matched_user_id, 'admin')
  on conflict (user_id) do nothing;
end;
$$;

-- Confirm the admin role was assigned.
select p.username, ar.role, ar.created_at
from public.profiles p
join public.admin_roles ar on ar.user_id = p.user_id
where p.username = 'division_admin';

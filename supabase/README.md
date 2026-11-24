# DIVISION backend setup

This folder contains the first backend foundation for the existing DIVISION site.
The current HTML, CSS and JavaScript frontend is intentionally unchanged.

## 1. Create a Supabase project

1. Create a project in the Supabase dashboard.
2. Open **SQL Editor**.
3. Open `schema.sql` from this folder, copy its full contents and run it.
4. Confirm that the eight application tables exist under **Table Editor**:
   `profiles`, `games`, `categories`, `favorites`, `likes`, `comments`,
   `recently_played`, and `admin_roles`.

The schema seeds the category catalogue only. It does not insert pretend games.

## 2. Configure authentication

In **Authentication -> URL Configuration**, set the production Site URL to your deployed DIVISION domain and add your local development URL to the Redirect URLs list when you begin local development.

Enable the sign-in methods you intend to support in **Authentication -> Providers**. Email/password is the simplest first option.

## 3. Create the first administrator

1. Sign up for DIVISION after the authentication frontend has been connected.
2. Find your account's username in **Table Editor -> profiles**.
3. In **SQL Editor**, run the following query after replacing the username:

```sql
insert into public.admin_roles (user_id)
select user_id
from public.profiles
where username = 'YOUR_USERNAME';
```

Do not expose a service-role key in frontend code. Admin membership is granted from the Supabase dashboard, not from a public signup form.

## 4. Storage (next backend stage)

The schema does not create a storage bucket yet. Before enabling thumbnail uploads, create a bucket named `game-thumbnails` in **Storage** and configure upload/update/delete policies for administrators only. The storage policies will be added with the admin upload feature so they can be tested together.

## 5. Environment variables (when the frontend client is added)

The browser client will need only:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` (or the newer publishable key)

For Vite, these will be exposed as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the frontend environment. These are public client values and must be protected by RLS.

**Never use `service_role` or a secret key in browser code.** A service-role key bypasses RLS.

## Current status

This is the database/security foundation only. It does not yet connect the existing game cards, search, login screens, admin dashboard, comments or favourites to Supabase. Those will be added in later stages without redesigning the existing frontend.

-- Fix: "infinite recursion detected in policy for relation 'profiles'"
--
-- Root cause: several RLS policies check admin status with
--   exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
-- When this subquery runs inside a policy ON public.profiles, Postgres has to
-- re-apply RLS to evaluate the subquery, which re-enters the same policy,
-- which re-runs the subquery, forever.
--
-- Fix: a SECURITY DEFINER function bypasses RLS for its own internal query,
-- so it can safely check the caller's role without recursing.

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, anon;

-- profiles
drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (
    id = auth.uid()
    or public.is_admin()
  );

-- therapist_profiles
drop policy if exists "therapist_profiles_select_approved" on public.therapist_profiles;
create policy "therapist_profiles_select_approved"
  on public.therapist_profiles for select
  using (
    (
      status = 'approved'
      and exists (
        select 1 from public.therapist_subscriptions s
        where s.user_id = therapist_profiles.user_id
          and s.status = 'active'
          and s.current_period_end is not null
          and s.current_period_end > now()
      )
    )
    or user_id = auth.uid()
    or public.is_admin()
  );

drop policy if exists "therapist_profiles_update_own_or_admin" on public.therapist_profiles;
create policy "therapist_profiles_update_own_or_admin"
  on public.therapist_profiles for update
  using (
    user_id = auth.uid()
    or public.is_admin()
  )
  with check (
    user_id = auth.uid()
    or public.is_admin()
  );

drop policy if exists "therapist_profiles_delete_own_or_admin" on public.therapist_profiles;
create policy "therapist_profiles_delete_own_or_admin"
  on public.therapist_profiles for delete
  using (
    user_id = auth.uid()
    or public.is_admin()
  );

-- therapist_subscriptions (the policy at line ~231 of schema.sql)
drop policy if exists "therapist_subscriptions_select_own_or_admin" on public.therapist_subscriptions;
create policy "therapist_subscriptions_select_own_or_admin"
  on public.therapist_subscriptions for select
  using (
    user_id = auth.uid()
    or public.is_admin()
  );

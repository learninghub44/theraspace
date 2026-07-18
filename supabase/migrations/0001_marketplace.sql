-- TheraSpace marketplace schema
-- Model: a directory where therapists self-list (bio, qualifications,
-- pricing they set). The platform does NOT handle bookings or payments —
-- it only stores and moderates listings.
--
-- Run this in the Supabase SQL editor (or `supabase db push` if you use
-- the CLI locally). Safe to re-run: every statement is guarded.

-- ============================================================
-- 1. profiles — one row per auth user, holds the platform role
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'client' check (role in ('client', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (
    id = auth.uid()
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid() and role = 'client'); -- clients can't self-promote to admin

-- Auto-create a profile row (role defaults to 'client') whenever someone signs up.
-- Admins are promoted manually: update public.profiles set role = 'admin' where email = '...';
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- 2. therapist_profiles — the self-listing itself
-- ============================================================
create table if not exists public.therapist_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text not null,
  photo_url text,
  specialty text not null,
  bio text,
  qualifications text,
  languages text,
  location text,
  price_from integer,
  session_modes text[] not null default '{}', -- e.g. {video,in_person}
  contact_phone text,
  contact_email text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.therapist_profiles enable row level security;

-- Public directory: anyone (incl. anonymous visitors) can read approved listings.
drop policy if exists "therapist_profiles_select_approved" on public.therapist_profiles;
create policy "therapist_profiles_select_approved"
  on public.therapist_profiles for select
  using (
    status = 'approved'
    or user_id = auth.uid()
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- A user can create only their own listing (one per account).
drop policy if exists "therapist_profiles_insert_own" on public.therapist_profiles;
create policy "therapist_profiles_insert_own"
  on public.therapist_profiles for insert
  with check (user_id = auth.uid());

-- A user can edit their own listing's content, but cannot set status/rejection_reason
-- themselves — the trigger below forces those back to a safe value unless the
-- request is coming from an admin.
drop policy if exists "therapist_profiles_update_own_or_admin" on public.therapist_profiles;
create policy "therapist_profiles_update_own_or_admin"
  on public.therapist_profiles for update
  using (
    user_id = auth.uid()
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  )
  with check (
    user_id = auth.uid()
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

drop policy if exists "therapist_profiles_delete_own_or_admin" on public.therapist_profiles;
create policy "therapist_profiles_delete_own_or_admin"
  on public.therapist_profiles for delete
  using (
    user_id = auth.uid()
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Integrity trigger: only an admin may change `status` or `rejection_reason`.
-- If a non-admin edits their listing (e.g. updates their bio), and the row
-- was previously approved/rejected, it's automatically resent to 'pending'
-- so admins re-review edited content before it goes back on the public site.
create or replace function public.enforce_therapist_status_change()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  is_admin boolean;
begin
  select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin') into is_admin;

  if is_admin then
    new.updated_at = now();
    return new;
  end if;

  -- Non-admins can never directly set status/rejection_reason...
  new.status = old.status;
  new.rejection_reason = old.rejection_reason;

  -- ...but editing any other field on a previously-reviewed listing
  -- resubmits it for review.
  if old.status in ('approved', 'rejected') and (
       new.full_name is distinct from old.full_name or
       new.photo_url is distinct from old.photo_url or
       new.specialty is distinct from old.specialty or
       new.bio is distinct from old.bio or
       new.qualifications is distinct from old.qualifications or
       new.languages is distinct from old.languages or
       new.location is distinct from old.location or
       new.price_from is distinct from old.price_from or
       new.session_modes is distinct from old.session_modes or
       new.contact_phone is distinct from old.contact_phone or
       new.contact_email is distinct from old.contact_email
     ) then
    new.status = 'pending';
    new.rejection_reason = null;
  end if;

  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_therapist_profile_update on public.therapist_profiles;
create trigger on_therapist_profile_update
  before update on public.therapist_profiles
  for each row execute function public.enforce_therapist_status_change();

create index if not exists therapist_profiles_status_idx on public.therapist_profiles (status);

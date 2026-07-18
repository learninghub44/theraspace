-- ============================================================================
-- TheraSpace — combined database schema
-- ============================================================================
-- Generated from supabase/migrations/0001_marketplace.sql and
-- 0002_therapist_subscriptions.sql, concatenated in their original order.
-- This file is the SOURCE OF TRUTH for what a fresh database should look
-- like; the numbered migration files remain the source of truth for HOW it
-- got there and stay in supabase/migrations/ for history.
--
-- Model: a directory where therapists self-list (bio, qualifications,
-- pricing they set). The platform does NOT handle bookings — clients
-- contact therapists directly. Two independent gates control public
-- visibility of a listing:
--   1. status = 'approved'          (admin moderation, see section 2)
--   2. an active, unexpired subscription (KES 950/mo, see section 4)
--
-- Safe to run on a fresh Supabase project. Every statement is guarded
-- (create if not exists / drop policy if exists / create or replace), so
-- it is also safe to re-run on a database that already has some or all of
-- this applied — running it twice will not duplicate or corrupt anything.
--
-- Run in the Supabase SQL editor, or `supabase db push` if using the CLI.
-- ============================================================================


-- ============================================================================
-- 1. profiles — one row per auth user, holds the platform role
-- ============================================================================
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


-- ============================================================================
-- 2. therapist_profiles — the self-listing itself
-- ============================================================================
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

-- NOTE: this select policy is intentionally overwritten in section 4 below,
-- once therapist_subscriptions exists, to also require an active
-- subscription for public visibility. It's created here first so the table
-- is never left without a select policy at any point while this script runs.
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


-- ============================================================================
-- 3. therapist_subscriptions — billing status (KES 950/mo)
-- ============================================================================
-- Paystack in Kenya doesn't support recurring debits on M-Pesa (only cards
-- can auto-renew via Paystack subscriptions), so this tracks a rolling
-- "paid-through" date (current_period_end) that gets pushed forward by 30
-- days on every successful charge, regardless of whether it came in via
-- card or M-Pesa. If a therapist doesn't pay again before
-- current_period_end, the policy in section 4 simply stops returning their
-- row to the public — no cron job needed to "expire" anything.
create table if not exists public.therapist_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  status text not null default 'inactive' check (status in ('inactive', 'active', 'past_due', 'cancelled')),
  paystack_customer_code text,
  last_reference text,
  amount integer not null default 95000, -- KES 950 in the lowest currency subunit
  currency text not null default 'KES',
  current_period_end timestamptz,
  last_payment_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.therapist_subscriptions enable row level security;

-- Therapists can see their own billing row; admins can see all. There is
-- deliberately NO insert/update/delete policy for regular users — only the
-- edge functions (using the service role key, which bypasses RLS) may
-- write to this table. This means payment status can't be forged from
-- the browser.
drop policy if exists "therapist_subscriptions_select_own_or_admin" on public.therapist_subscriptions;
create policy "therapist_subscriptions_select_own_or_admin"
  on public.therapist_subscriptions for select
  using (
    user_id = auth.uid()
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create index if not exists therapist_subscriptions_status_idx on public.therapist_subscriptions (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_therapist_subscriptions_update on public.therapist_subscriptions;
create trigger on_therapist_subscriptions_update
  before update on public.therapist_subscriptions
  for each row execute function public.set_updated_at();


-- ============================================================================
-- 4. therapist_subscription_payments — one row per Paystack charge attempt
-- ============================================================================
-- Used for the therapist's own billing history and the admin view.
create table if not exists public.therapist_subscription_payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reference text not null unique,
  amount integer not null,
  currency text not null default 'KES',
  status text not null check (status in ('success', 'failed')),
  channel text,
  paid_at timestamptz,
  raw_event jsonb,
  created_at timestamptz not null default now()
);

alter table public.therapist_subscription_payments enable row level security;

drop policy if exists "therapist_subscription_payments_select_own_or_admin" on public.therapist_subscription_payments;
create policy "therapist_subscription_payments_select_own_or_admin"
  on public.therapist_subscription_payments for select
  using (
    user_id = auth.uid()
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create index if not exists therapist_subscription_payments_user_id_idx on public.therapist_subscription_payments (user_id);


-- ============================================================================
-- 5. Gate public visibility of therapist_profiles on an active subscription
-- ============================================================================
-- Overwrites the select policy created in section 2. Final state: a listing
-- is publicly visible only when BOTH status = 'approved' AND the therapist
-- has an active, unexpired subscription. Owners and admins can always see
-- their own / any listing regardless of subscription state.
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
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );


-- ============================================================================
-- Post-setup: promote your own account to admin
-- ============================================================================
-- Run this manually, once, after signing up through the app:
--
--   update public.profiles set role = 'admin' where email = 'your-email@example.com';
--
-- There is no UI path to self-promote — this is by design (see the
-- profiles_update_own policy above, which blocks a client from setting
-- their own role to 'admin').

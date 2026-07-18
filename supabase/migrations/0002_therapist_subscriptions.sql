-- TheraSpace subscriptions
-- Therapists pay KES 950/month to appear in the public marketplace.
-- Approval (admin moderation) and payment (this table) are independent
-- gates: a listing only shows up publicly when BOTH status = 'approved'
-- AND the therapist has an active, unexpired subscription.
--
-- Payment model: Paystack in Kenya doesn't support recurring debits on
-- M-Pesa (only cards can auto-renew via Paystack subscriptions), so this
-- tracks a rolling "paid-through" date (current_period_end) that gets
-- pushed forward by 30 days on every successful charge, regardless of
-- whether it came in via card or M-Pesa. If a therapist doesn't pay again
-- before current_period_end, RLS below simply stops returning their row
-- to the public — no cron job needed to "expire" anything.
--
-- Safe to re-run: every statement is guarded.

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

-- ============================================================
-- Payment history — one row per Paystack charge attempt.
-- Used for the therapist's own billing history and the admin view.
-- ============================================================
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

-- ============================================================
-- Gate public visibility of therapist_profiles on an active subscription.
-- Replaces the policy from 0001_marketplace.sql.
-- ============================================================
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

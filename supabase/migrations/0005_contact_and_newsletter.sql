-- Contact form submissions and newsletter signups.
-- Both are written by the Cloudflare Worker (worker/index.ts) using the
-- service role key, not by the browser directly — so RLS here exists as a
-- defense-in-depth backstop, not the primary access control.

-- ============================================================
-- 1. contact_messages
-- ============================================================
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- No public select/insert policy: the browser never talks to this table
-- directly, only the Worker via the service role key (which bypasses RLS).
drop policy if exists "contact_messages_admin_select" on public.contact_messages;
create policy "contact_messages_admin_select"
  on public.contact_messages for select
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

drop policy if exists "contact_messages_admin_update" on public.contact_messages;
create policy "contact_messages_admin_update"
  on public.contact_messages for update
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create index if not exists contact_messages_status_created_idx
  on public.contact_messages (status, created_at desc);

-- ============================================================
-- 2. newsletter_subscribers
-- ============================================================
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now(),
  unsubscribed_at timestamptz
);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "newsletter_subscribers_admin_select" on public.newsletter_subscribers;
create policy "newsletter_subscribers_admin_select"
  on public.newsletter_subscribers for select
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create index if not exists newsletter_subscribers_email_idx
  on public.newsletter_subscribers (email);

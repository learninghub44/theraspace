-- Indexes for the query patterns actually hit in the app:
--   - homepage + /therapists: status = 'approved' order by created_at desc
--   - /therapists search: ilike '%term%' across full_name, specialty, bio,
--     languages, qualifications (via .or(...))
--   - /therapists category filter: ilike '%category%' on specialty
--
-- therapist_profiles.status already has a plain btree index (0001). That
-- lets Postgres find approved rows but still has to sort them separately;
-- a composite (status, created_at desc) index lets the common "approved,
-- newest first" query be satisfied directly from the index, no sort step.
create index if not exists therapist_profiles_status_created_idx
  on public.therapist_profiles (status, created_at desc);

-- Plain btree indexes can't accelerate `ilike '%term%'` (leading wildcard).
-- pg_trgm + GIN lets Postgres use a trigram index for those instead of a
-- full table scan on every keystroke search.
create extension if not exists pg_trgm;

create index if not exists therapist_profiles_full_name_trgm_idx
  on public.therapist_profiles using gin (full_name gin_trgm_ops);
create index if not exists therapist_profiles_specialty_trgm_idx
  on public.therapist_profiles using gin (specialty gin_trgm_ops);
create index if not exists therapist_profiles_bio_trgm_idx
  on public.therapist_profiles using gin (bio gin_trgm_ops);
create index if not exists therapist_profiles_languages_trgm_idx
  on public.therapist_profiles using gin (languages gin_trgm_ops);
create index if not exists therapist_profiles_qualifications_trgm_idx
  on public.therapist_profiles using gin (qualifications gin_trgm_ops);
create index if not exists therapist_profiles_location_trgm_idx
  on public.therapist_profiles using gin (location gin_trgm_ops);

-- therapist_subscriptions is joined by user_id in the public visibility
-- policy (0003) on every listing query — it's unique already (one sub per
-- therapist) but there was no index backing lookups by (user_id, status,
-- current_period_end) together, which is exactly what that policy checks.
create index if not exists therapist_subscriptions_user_status_idx
  on public.therapist_subscriptions (user_id, status, current_period_end);

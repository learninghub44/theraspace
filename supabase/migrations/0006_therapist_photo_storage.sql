-- ============================================================================
-- Storage bucket for therapist listing photos (drag-and-drop upload)
-- ============================================================================
-- Files are stored as {user_id}/{filename}, so ownership can be checked by
-- matching the first path segment against auth.uid() — the same pattern
-- Supabase's own docs use for per-user storage folders.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'therapist-photos',
  'therapist-photos',
  true,
  5242880, -- 5MB
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Anyone can view photos (the bucket is public and photos back public
-- listings), but only the owning therapist (or an admin) can write/replace
-- or delete their own folder.

drop policy if exists "therapist_photos_public_read" on storage.objects;
create policy "therapist_photos_public_read"
  on storage.objects for select
  using (bucket_id = 'therapist-photos');

drop policy if exists "therapist_photos_owner_insert" on storage.objects;
create policy "therapist_photos_owner_insert"
  on storage.objects for insert
  with check (
    bucket_id = 'therapist-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "therapist_photos_owner_update" on storage.objects;
create policy "therapist_photos_owner_update"
  on storage.objects for update
  using (
    bucket_id = 'therapist-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "therapist_photos_owner_delete" on storage.objects;
create policy "therapist_photos_owner_delete"
  on storage.objects for delete
  using (
    bucket_id = 'therapist-photos'
    and (
      (storage.foldername(name))[1] = auth.uid()::text
      or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
    )
  );

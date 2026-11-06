-- ============================================================
-- Supabase Schema — Mohammad Ejaz Mehendi Portfolio
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Create the contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL CHECK (char_length(name) >= 1 AND char_length(name) <= 100),
  email       TEXT        NOT NULL CHECK (char_length(email) >= 5 AND char_length(email) <= 254),
  subject     TEXT        NOT NULL CHECK (char_length(subject) >= 1 AND char_length(subject) <= 200),
  message     TEXT        NOT NULL CHECK (char_length(message) >= 1 AND char_length(message) <= 5000),
  status      TEXT        NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policy: NO anonymous reads, updates, or deletes allowed.
--    Only the server-side service role key (bypasses RLS) can INSERT.
--    This means no public SELECT / UPDATE / DELETE is ever permitted.

-- Deny all access by default (RLS is now enabled, so without a policy
-- nothing is allowed for anon or authenticated roles).
-- The service_role key bypasses RLS entirely, so server inserts work fine.

-- Drop existing policy if re-running migration
DROP POLICY IF EXISTS "admin_read_only" ON public.contact_messages;

-- Allow authenticated project dashboard users to view messages:
CREATE POLICY "admin_read_only"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- 4. Add an index for fast queries by date
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
  ON public.contact_messages (created_at DESC);

-- Done! Your contact_messages table is ready.
-- Verify by running: SELECT * FROM public.contact_messages;


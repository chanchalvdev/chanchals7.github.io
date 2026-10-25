-- Answer cache for the ask-me Edge Function.
-- Run once in Supabase → SQL Editor (or `supabase db push`).
--
-- Holds replies to opening questions so repeats (the suggested questions
-- especially) come back instantly. Keys hash the full prompt plus the
-- normalised question, so a profile change never serves a stale answer.
-- Only the Edge Function (service role) touches this table: RLS is on with
-- no policies.

create table if not exists public.ask_me_answers (
  key text primary key,
  answer text not null,
  created_at timestamptz not null default now()
);

alter table public.ask_me_answers enable row level security;

revoke all on table public.ask_me_answers from anon, authenticated;

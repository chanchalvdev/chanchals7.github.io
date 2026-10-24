-- Durable rate limit for the ask-me Edge Function.
-- Run once in Supabase → SQL Editor (or `supabase db push`).
--
-- Only the Edge Function (service role) touches this table: RLS is on with
-- no policies, and the check function is not callable by anon/authenticated.

create table if not exists public.ask_me_requests (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists ask_me_requests_ip_time on public.ask_me_requests (ip_hash, created_at desc);
create index if not exists ask_me_requests_time on public.ask_me_requests (created_at desc);

alter table public.ask_me_requests enable row level security;

-- Records the request and returns null when allowed, or the name of the limit
-- that was hit. Counting and inserting happen in one call so concurrent
-- requests can't both slip under a limit.
create or replace function public.ask_me_check_rate(
  p_ip_hash text,
  p_burst_max int,
  p_burst_window interval,
  p_daily_max int,
  p_global_daily_max int
) returns text
language plpgsql
as $$
declare
  burst int;
  daily int;
  global_daily int;
begin
  perform pg_advisory_xact_lock(hashtext('ask_me_check_rate'));

  select count(*) into global_daily from public.ask_me_requests
    where created_at > now() - interval '1 day';
  if global_daily >= p_global_daily_max then
    return 'global';
  end if;

  select
    count(*) filter (where created_at > now() - p_burst_window),
    count(*)
  into burst, daily
  from public.ask_me_requests
  where ip_hash = p_ip_hash and created_at > now() - interval '1 day';

  if burst >= p_burst_max then
    return 'burst';
  end if;
  if daily >= p_daily_max then
    return 'daily';
  end if;

  insert into public.ask_me_requests (ip_hash) values (p_ip_hash);

  -- Keep the table small: drop rows older than two days now and then.
  if random() < 0.02 then
    delete from public.ask_me_requests where created_at < now() - interval '2 days';
  end if;

  return null;
end;
$$;

revoke all on function public.ask_me_check_rate(text, int, interval, int, int) from public, anon, authenticated;
revoke all on table public.ask_me_requests from anon, authenticated;

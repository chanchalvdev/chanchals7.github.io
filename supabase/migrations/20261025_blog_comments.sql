-- Reader comments on blog posts, held for approval.
-- Run once in Supabase → SQL Editor (or `supabase db push`).
--
-- Who can do what:
--   anon          — read approved comments (public columns only)
--   authenticated — the admin: read, approve/reject, delete everything
--   blog-comments Edge Function (service role) — the only way to insert,
--                   through blog_comment_submit(), which rate-limits per IP.

create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null references public.blogs (slug) on update cascade on delete cascade,
  author_name text not null check (char_length(author_name) between 1 and 60),
  body text not null check (char_length(body) between 2 and 2000),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  ip_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists blog_comments_post on public.blog_comments (post_slug, status, created_at);
create index if not exists blog_comments_ip_time on public.blog_comments (ip_hash, created_at desc);
create index if not exists blog_comments_status on public.blog_comments (status, created_at desc);

alter table public.blog_comments enable row level security;

drop policy if exists "public read approved comments" on public.blog_comments;
drop policy if exists "admin manages comments" on public.blog_comments;

create policy "public read approved comments"
  on public.blog_comments for select
  to anon
  using (status = 'approved');

create policy "admin manages comments"
  on public.blog_comments for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- Visitors never see the IP hash, and can't write directly.
revoke all on table public.blog_comments from anon;
grant select (id, post_slug, author_name, body, status, created_at) on public.blog_comments to anon;
grant select, update, delete on public.blog_comments to authenticated;

-- Validates, rate-limits and stores one comment as 'pending'. Returns null on
-- success or the reason it was refused. One call so concurrent submissions
-- can't both slip under a limit.
create or replace function public.blog_comment_submit(
  p_ip_hash text,
  p_post_slug text,
  p_author_name text,
  p_body text,
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
  perform pg_advisory_xact_lock(hashtext('blog_comment_submit'));

  if not exists (select 1 from public.blogs where slug = p_post_slug and status = 'published') then
    return 'post';
  end if;

  select count(*) into global_daily from public.blog_comments
    where created_at > now() - interval '1 day';
  if global_daily >= p_global_daily_max then
    return 'global';
  end if;

  select
    count(*) filter (where created_at > now() - p_burst_window),
    count(*)
  into burst, daily
  from public.blog_comments
  where ip_hash = p_ip_hash and created_at > now() - interval '1 day';

  if burst >= p_burst_max then
    return 'burst';
  end if;
  if daily >= p_daily_max then
    return 'daily';
  end if;

  insert into public.blog_comments (post_slug, author_name, body, ip_hash)
    values (p_post_slug, p_author_name, p_body, p_ip_hash);

  return null;
end;
$$;

revoke all on function public.blog_comment_submit(text, text, text, text, int, interval, int, int)
  from public, anon, authenticated;

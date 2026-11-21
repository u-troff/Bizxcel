-- BizXcel /sars funnel: one row per visitor, written a step at a time.
-- Run once in the SQL Editor of the Expert Partner (CRM) Supabase project.
-- Safe to run again.
--
-- status: partial (still answering) | submitted (finished the contact screen)
--
-- The website never gets the service role key. It calls the two functions
-- below with the project's anon key, from the server only. RLS is on with no
-- policies and table rights are revoked, so the anon key can't read or change
-- this table (or any CRM table) directly. It can only run these two functions.

create table if not exists public.sars_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  session_id text not null unique,
  event_id text,
  status text not null default 'partial' check (status in ('partial', 'submitted')),
  last_step int not null default 0,
  situation text,
  need text,
  timing text,
  area text,
  first_name text,
  whatsapp text,
  email text,
  whatsapp_consent boolean,
  qualified boolean,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  fbclid text,
  user_agent text,
  submitted_at timestamptz,
  -- Set once the CRM's /api/leads/intake answered with a 2xx.
  crm_synced boolean not null default false,
  crm_client_id text
);

alter table public.sars_leads enable row level security;
revoke all on table public.sars_leads from anon, authenticated;

create index if not exists idx_sars_leads_created_at on public.sars_leads (created_at desc);
create index if not exists idx_sars_leads_status on public.sars_leads (status);

-- Save one step. Upserts on session_id. The first touch's ad tags win; later
-- answers fill in; a submitted row never goes back to partial.
-- Returns { id, newly_submitted } so the website only notifies once.
create or replace function public.sars_lead_save(p jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_session text := left(nullif(trim(p->>'session_id'), ''), 64);
  v_prev text;
  v_row public.sars_leads%rowtype;
begin
  if v_session is null then
    raise exception 'session_id is required';
  end if;

  select status into v_prev from public.sars_leads where session_id = v_session;

  insert into public.sars_leads as s (
    session_id, event_id, status, last_step,
    situation, need, timing, area,
    first_name, whatsapp, email, whatsapp_consent, qualified,
    utm_source, utm_medium, utm_campaign, utm_content, fbclid, user_agent,
    submitted_at
  ) values (
    v_session,
    left(p->>'event_id', 128),
    case when p->>'status' = 'submitted' then 'submitted' else 'partial' end,
    least(greatest(coalesce((p->>'last_step')::int, 0), 0), 20),
    left(p->>'situation', 100),
    left(p->>'need', 100),
    left(p->>'timing', 100),
    left(p->>'area', 100),
    left(p->>'first_name', 60),
    left(p->>'whatsapp', 20),
    left(p->>'email', 200),
    (p->>'whatsapp_consent')::boolean,
    (p->>'qualified')::boolean,
    left(p->>'utm_source', 200),
    left(p->>'utm_medium', 200),
    left(p->>'utm_campaign', 200),
    left(p->>'utm_content', 200),
    left(p->>'fbclid', 500),
    left(p->>'user_agent', 400),
    case when p->>'status' = 'submitted' then now() end
  )
  on conflict (session_id) do update set
    updated_at = now(),
    event_id = coalesce(s.event_id, excluded.event_id),
    status = case
      when s.status = 'submitted' or excluded.status = 'submitted' then 'submitted'
      else 'partial'
    end,
    last_step = greatest(s.last_step, excluded.last_step),
    situation = coalesce(excluded.situation, s.situation),
    need = coalesce(excluded.need, s.need),
    timing = coalesce(excluded.timing, s.timing),
    area = coalesce(excluded.area, s.area),
    first_name = coalesce(excluded.first_name, s.first_name),
    whatsapp = coalesce(excluded.whatsapp, s.whatsapp),
    email = coalesce(excluded.email, s.email),
    whatsapp_consent = coalesce(excluded.whatsapp_consent, s.whatsapp_consent),
    qualified = coalesce(excluded.qualified, s.qualified),
    utm_source = coalesce(s.utm_source, excluded.utm_source),
    utm_medium = coalesce(s.utm_medium, excluded.utm_medium),
    utm_campaign = coalesce(s.utm_campaign, excluded.utm_campaign),
    utm_content = coalesce(s.utm_content, excluded.utm_content),
    fbclid = coalesce(s.fbclid, excluded.fbclid),
    user_agent = coalesce(s.user_agent, excluded.user_agent),
    submitted_at = coalesce(s.submitted_at, excluded.submitted_at)
  returning * into v_row;

  return jsonb_build_object(
    'id', v_row.id,
    'newly_submitted', v_row.status = 'submitted' and coalesce(v_prev, '') <> 'submitted'
  );
end;
$$;

-- Marks a row as pushed into the CRM.
create or replace function public.sars_lead_mark_synced(p_session_id text, p_client_id text)
returns void
language sql
security definer
set search_path = public
as $$
  update public.sars_leads
     set crm_synced = true,
         crm_client_id = left(p_client_id, 64),
         updated_at = now()
   where session_id = left(p_session_id, 64);
$$;

revoke all on function public.sars_lead_save(jsonb) from public;
revoke all on function public.sars_lead_mark_synced(text, text) from public;
grant execute on function public.sars_lead_save(jsonb) to anon, service_role;
grant execute on function public.sars_lead_mark_synced(text, text) to anon, service_role;

-- Drop-off per question:
--   select last_step, count(*) from sars_leads group by 1 order by 1;
-- Leads by ad:
--   select utm_content, count(*) filter (where status = 'submitted') as submitted,
--          count(*) filter (where qualified) as qualified,
--          count(*) filter (where crm_synced) as in_crm
--   from sars_leads group by 1 order by 2 desc;

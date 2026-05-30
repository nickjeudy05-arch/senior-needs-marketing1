alter table public.leads
  add column if not exists consent_accepted boolean not null default false,
  add column if not exists consent_language text,
  add column if not exists consent_timestamp timestamptz,
  add column if not exists source_url text;

create index if not exists leads_consent_timestamp_idx on public.leads (consent_timestamp desc);

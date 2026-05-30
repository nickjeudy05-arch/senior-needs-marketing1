create table if not exists public.leads (
  id uuid primary key,
  name text not null,
  email text not null,
  phone text not null,
  state text not null,
  date_of_birth text not null,
  beneficiary text not null,
  hobbies text,
  coverage text not null,
  contact_preference text not null,
  raw_payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.meetings (
  id uuid primary key,
  lead_id uuid references public.leads(id) on delete set null,
  name text,
  email text,
  phone text,
  coverage text,
  state text,
  appointment_date date not null,
  appointment_time text not null,
  appointment_label text not null,
  meeting_type text not null,
  duration text not null,
  timezone text not null,
  status text not null default 'requested',
  raw_payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_phone_idx on public.leads (phone);
create index if not exists meetings_lead_id_idx on public.meetings (lead_id);
create index if not exists meetings_created_at_idx on public.meetings (created_at desc);

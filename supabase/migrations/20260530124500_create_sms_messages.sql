create table if not exists public.sms_messages (
  id uuid primary key,
  lead_id uuid references public.leads(id) on delete set null,
  meeting_id uuid references public.meetings(id) on delete set null,
  direction text not null,
  from_phone text not null,
  to_phone text not null,
  body text not null,
  provider text not null default 'twilio',
  provider_message_id text,
  raw_payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists sms_messages_lead_id_idx on public.sms_messages (lead_id);
create index if not exists sms_messages_phone_idx on public.sms_messages (from_phone, to_phone);
create index if not exists sms_messages_created_at_idx on public.sms_messages (created_at desc);

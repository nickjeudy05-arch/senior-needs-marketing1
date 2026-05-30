alter table public.leads enable row level security;
alter table public.meetings enable row level security;
alter table public.sms_messages enable row level security;

revoke all on table public.leads from anon, authenticated;
revoke all on table public.meetings from anon, authenticated;
revoke all on table public.sms_messages from anon, authenticated;

grant select, insert, update, delete on table public.leads to service_role;
grant select, insert, update, delete on table public.meetings to service_role;
grant select, insert, update, delete on table public.sms_messages to service_role;

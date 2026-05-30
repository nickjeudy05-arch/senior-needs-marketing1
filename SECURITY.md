# Senior Needs Marketing Security Checklist

This project collects insurance lead and appointment information. Treat all form submissions as private customer data.

## Secrets

- Do not commit real `.env` files.
- Store frontend server variables in Vercel project environment variables.
- Store backend secrets only in the deployed FastAPI host environment.
- Rotate any secret that was pasted into chat, screenshots, support tickets, or public tools.
- Use the Supabase service role key only on the FastAPI backend. Never expose it through `NEXT_PUBLIC_` variables.

## Required Production Environment Variables

### Vercel / Next.js

```env
FASTAPI_BACKEND_URL=https://your-deployed-fastapi-backend.com
```

### FastAPI Backend

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-rotated-service-role-key
OPENROUTER_API_KEY=your-rotated-openrouter-key
OPENROUTER_MODEL=google/gemma-4-26b-a4b-it
OPENROUTER_SITE_URL=https://your-public-website-domain.com
OPENROUTER_APP_NAME=Senior Needs Marketing
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-rotated-twilio-auth-token
TWILIO_FROM_PHONE=+18446280764
TWILIO_VALIDATE_WEBHOOKS=true
PUBLIC_BACKEND_URL=https://your-deployed-fastapi-backend.com
HIGHLEVEL_LEAD_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/...
HIGHLEVEL_MEETING_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/...
ALLOWED_ORIGINS=https://your-public-website-domain.com
```

## Twilio Webhook

After the backend is hosted, set the Twilio inbound SMS webhook to:

```text
https://your-deployed-fastapi-backend.com/twilio/inbound-sms
```

Use `HTTP POST`.

## GoHighLevel Webhooks

Create an Inbound Webhook workflow in GoHighLevel for new website leads and paste its URL into `HIGHLEVEL_LEAD_WEBHOOK_URL`.

Create a second Inbound Webhook workflow for appointment requests and paste its URL into `HIGHLEVEL_MEETING_WEBHOOK_URL`.

If you only want one HighLevel workflow, set only `HIGHLEVEL_LEAD_WEBHOOK_URL`; appointment requests will use that same webhook.

Appointment webhook payloads include `appointment_start_iso`, `appointment_title`, and `appointment_notes` for HighLevel calendar mapping.

## Data Handling

- The site should not ask for Social Security numbers, bank account numbers, Medicare ID numbers, or full medical records.
- Lead records store consent proof: accepted status, consent language, timestamp, and source URL.
- Supabase Row Level Security is enabled for leads, meetings, and SMS messages.
- Public browser code should never read Supabase tables directly.

## Legal Review

The Privacy Policy, Terms, and SMS Terms are drafted for a typical insurance lead and appointment site, but they are not a substitute for legal advice. Have a licensed attorney or insurance compliance professional review them before paid ads, public launch, or large-scale SMS messaging.

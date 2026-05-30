# Senior Needs Marketing FastAPI Backend

This backend stores website leads and meeting requests in Supabase.

## 1. Create Supabase Tables

Open Supabase, go to the SQL Editor, and run `backend/schema.sql`.

## 2. Add Environment Secrets

Copy the example environment file:

```bash
copy backend\.env.example backend\.env
```

Then fill in:

```bash
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
OPENROUTER_API_KEY=...
OPENROUTER_MODEL=openai/gpt-4o-mini
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_FROM_PHONE=+15551234567
TWILIO_VALIDATE_WEBHOOKS=true
PUBLIC_BACKEND_URL=https://your-public-backend-domain.com
```

Use the Supabase service role key only on the backend. Do not expose it in frontend code.

The database migrations enable Row Level Security and revoke public table access from `anon` and `authenticated`.
The backend writes with the Supabase service role key, which must remain server-only.

## 3. Install Python Packages

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

## 4. Run the Backend

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The Next.js website proxies form submissions to:

```bash
FASTAPI_BACKEND_URL=http://127.0.0.1:8000
```

## API Endpoints

- `GET /health`
- `POST /leads`
- `POST /meetings`
- `POST /assistant`
- `POST /twilio/inbound-sms`

The assistant endpoint uses OpenRouter's OpenAI-compatible chat completions API. Keep the OpenRouter API key in `backend/.env` only.

## Twilio SMS Automation

When a meeting is saved, the backend sends a confirmation text if Twilio is configured.

In Twilio, set your phone number's incoming message webhook to:

```bash
https://your-public-backend-domain.com/twilio/inbound-sms
```

For local testing, expose FastAPI with a tunnel such as ngrok:

```bash
ngrok http 8000
```

Then use the ngrok HTTPS URL plus `/twilio/inbound-sms` in Twilio's **A message comes in** webhook field.

For production, set `TWILIO_VALIDATE_WEBHOOKS=true` and `PUBLIC_BACKEND_URL` to the exact public backend origin. This
validates Twilio's `X-Twilio-Signature` header so random internet traffic cannot impersonate Twilio.

## Launch Security Checklist

- Rotate any secrets that were pasted into chat before public launch.
- Keep `.env`, `.env.local`, and `backend/.env` out of Git.
- Store `SUPABASE_SERVICE_ROLE_KEY`, `TWILIO_AUTH_TOKEN`, and `OPENROUTER_API_KEY` only in backend/server environment variables.
- Use HTTPS for the public website and public backend.
- Keep Privacy Policy, Terms, and SMS Terms visible in the website footer.
- Do not collect Social Security numbers, bank account details, Medicare ID numbers, or full medical records in forms, chat, or SMS.
- Keep Twilio opt-out language active: STOP, HELP, and START.

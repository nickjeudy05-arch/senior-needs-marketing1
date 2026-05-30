import os
from datetime import datetime, timezone
from typing import Any
from uuid import uuid4

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from supabase import Client, create_client
from twilio.rest import Client as TwilioClient
from twilio.request_validator import RequestValidator
from twilio.twiml.messaging_response import MessagingResponse

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "openai/gpt-4o-mini")
OPENROUTER_SITE_URL = os.getenv("OPENROUTER_SITE_URL", "http://127.0.0.1:3000")
OPENROUTER_APP_NAME = os.getenv("OPENROUTER_APP_NAME", "Senior Needs Marketing")
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_FROM_PHONE = os.getenv("TWILIO_FROM_PHONE")
TWILIO_VALIDATE_WEBHOOKS = os.getenv("TWILIO_VALIDATE_WEBHOOKS", "false").lower() == "true"
PUBLIC_BACKEND_URL = os.getenv("PUBLIC_BACKEND_URL", "")
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")
    if origin.strip()
]

app = FastAPI(title="Senior Needs Marketing API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Twilio-Signature"],
)


def get_supabase() -> Client:
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(
            status_code=500,
            detail="Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env.",
        )
    return create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)


def get_twilio() -> TwilioClient | None:
    if not TWILIO_ACCOUNT_SID or not TWILIO_AUTH_TOKEN or not TWILIO_FROM_PHONE:
        return None
    return TwilioClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)


def validate_twilio_request(request: Request, form_data: dict[str, Any]) -> None:
    if not TWILIO_VALIDATE_WEBHOOKS:
        return
    if not TWILIO_AUTH_TOKEN:
        raise HTTPException(status_code=500, detail="Twilio validation is enabled but TWILIO_AUTH_TOKEN is missing.")

    signature = request.headers.get("x-twilio-signature", "")
    webhook_url = f"{PUBLIC_BACKEND_URL.rstrip()}{request.url.path}" if PUBLIC_BACKEND_URL else str(request.url)
    validator = RequestValidator(TWILIO_AUTH_TOKEN)

    if not validator.validate(webhook_url, form_data, signature):
        raise HTTPException(status_code=403, detail="Invalid Twilio webhook signature.")


def normalize_phone(phone: str | None) -> str:
    return "".join(ch for ch in (phone or "") if ch.isdigit())


def log_sms_message(
    *,
    direction: str,
    from_phone: str,
    to_phone: str,
    body: str,
    lead_id: str | None = None,
    meeting_id: str | None = None,
    provider_message_id: str | None = None,
    raw_payload: dict[str, Any] | None = None,
) -> None:
    row = {
        "id": str(uuid4()),
        "lead_id": lead_id,
        "meeting_id": meeting_id,
        "direction": direction,
        "from_phone": from_phone,
        "to_phone": to_phone,
        "body": body,
        "provider": "twilio",
        "provider_message_id": provider_message_id,
        "raw_payload": raw_payload or {},
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    try:
        get_supabase().table("sms_messages").insert(row).execute()
    except Exception as exc:
        print(f"Could not log SMS message: {exc}")


def find_latest_lead_by_phone(phone: str) -> dict[str, Any] | None:
    normalized = normalize_phone(phone)
    if not normalized:
        return None

    try:
        response = (
            get_supabase()
            .table("leads")
            .select("*")
            .order("created_at", desc=True)
            .limit(100)
            .execute()
        )
    except Exception as exc:
        print(f"Could not search leads by phone: {exc}")
        return None

    for row in response.data or []:
        if normalize_phone(row.get("phone")) == normalized:
            return row
    return None


async def ask_openrouter(message: str, context: dict[str, Any] | None = None, max_tokens: int = 100) -> str:
    if not OPENROUTER_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="OpenRouter is not configured. Set OPENROUTER_API_KEY in backend/.env.",
        )

    system_prompt = build_assistant_prompt(context or {})
    payload = {
        "model": OPENROUTER_MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": message},
        ],
        "temperature": 0.45,
        "max_tokens": max_tokens,
    }

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": OPENROUTER_SITE_URL,
                    "X-Title": OPENROUTER_APP_NAME,
                },
                json=payload,
            )
    except httpx.RequestError as exc:
        raise HTTPException(status_code=503, detail=f"Could not reach OpenRouter: {exc}") from exc

    if response.status_code >= 400:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    data = response.json()
    reply = data.get("choices", [{}])[0].get("message", {}).get("content", "").strip()
    if not reply:
        raise HTTPException(status_code=502, detail="OpenRouter returned an empty assistant response.")
    return reply


def build_assistant_prompt(context: dict[str, Any]) -> str:
    return (
        "You are the Senior Needs Marketing Insurance Needs Assistant for a national insurance brokerage website. "
        "Your job is to help visitors understand which insurance topics to review with a licensed agent, especially life insurance, "
        "mortgage protection, final expense, Medicare Advantage, Medicare Supplement, and Part D prescription coverage. "
        "\n\nAnswer style:\n"
        "- Answer the exact question first. Be clear, direct, and brief.\n"
        "- Keep answers under 65 words unless the user explicitly asks for detail.\n"
        "- Prefer 2-4 short sentences. If using bullets, use no more than 2.\n"
        "- For SMS replies, avoid markdown and keep the text natural.\n"
        "- If the visitor gives a personal situation, name the top 1-2 coverage paths to review and why.\n"
        "- Ask only one targeted follow-up question when more information is needed.\n"
        "\n\nGuardrails:\n"
        "- Do not claim to be a licensed agent, bind coverage, quote exact prices, guarantee eligibility, or say a plan is definitely best.\n"
        "- Do not provide legal, tax, medical, or financial advice. Encourage review with a licensed agent for final decisions.\n"
        "- Never request Social Security numbers, bank account numbers, Medicare ID numbers, or full medical records in chat.\n"
        "- If asked for price, explain the main factors briefly and suggest what information an agent needs.\n"
        "- If asked about claims, explain the general process and refer to the carrier/agent for policy-specific help.\n"
        "\n\nKnown visitor context: "
        f"{context}"
    )


class LeadCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=30)
    state: str = Field(min_length=2, max_length=80)
    dob: str = Field(min_length=1, max_length=30)
    beneficiary: str = Field(min_length=1, max_length=120)
    hobbies: str | None = Field(default="", max_length=500)
    coverage: str = Field(min_length=1, max_length=80)
    contactPreference: str = Field(default="Text me", max_length=40)
    consentAccepted: bool = False
    consentLanguage: str = Field(default="", max_length=1000)
    consentTimestamp: str | None = Field(default=None, max_length=80)
    sourceUrl: str | None = Field(default=None, max_length=500)


class MeetingCreate(BaseModel):
    lead_id: str | None = None
    name: str | None = Field(default="", max_length=120)
    email: EmailStr | None = None
    phone: str | None = Field(default="", max_length=30)
    coverage: str | None = Field(default="", max_length=80)
    state: str | None = Field(default="", max_length=80)
    appointment_date: str = Field(min_length=1, max_length=20)
    appointment_time: str = Field(min_length=1, max_length=20)
    appointment_label: str = Field(min_length=1, max_length=160)
    meeting_type: str = Field(default="Phone review", max_length=80)
    duration: str = Field(default="30 minutes", max_length=40)
    timezone: str = Field(default="Local time", max_length=80)


class ChatMessage(BaseModel):
    from_: str = Field(alias="from")
    text: str


class AssistantRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    messages: list[ChatMessage] = Field(default_factory=list)
    lead: dict[str, Any] | None = None
    bookedTime: str | None = ""


@app.get("/health")
def health() -> dict[str, str]:
    return {"ok": "true", "service": "senior-needs-marketing-api"}


@app.post("/leads")
def create_lead(lead: LeadCreate) -> dict[str, Any]:
    if not lead.consentAccepted:
        raise HTTPException(status_code=400, detail="Consent is required before submitting this form.")

    lead_id = str(uuid4())
    now = datetime.now(timezone.utc).isoformat()

    row = {
        "id": lead_id,
        "name": lead.name,
        "email": lead.email,
        "phone": lead.phone,
        "state": lead.state,
        "date_of_birth": lead.dob,
        "beneficiary": lead.beneficiary,
        "hobbies": lead.hobbies or "",
        "coverage": lead.coverage,
        "contact_preference": lead.contactPreference,
        "consent_accepted": lead.consentAccepted,
        "consent_language": lead.consentLanguage,
        "consent_timestamp": lead.consentTimestamp or now,
        "source_url": lead.sourceUrl or "",
        "raw_payload": {
            "source": "website_lead_form",
            "contact_preference": lead.contactPreference,
            "consent_timestamp": lead.consentTimestamp or now,
            "source_url": lead.sourceUrl or "",
        },
        "created_at": now,
    }

    try:
        get_supabase().table("leads").insert(row).execute()
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Could not save lead to Supabase: {exc}") from exc

    return {
        "ok": True,
        "lead_id": lead_id,
        "outreachStatus": "queued",
        "message": "Lead received. A licensed agent can follow up by the preferred contact method.",
    }


@app.post("/meetings")
def create_meeting(meeting: MeetingCreate) -> dict[str, Any]:
    meeting_id = str(uuid4())
    now = datetime.now(timezone.utc).isoformat()

    row = {
        "id": meeting_id,
        "lead_id": meeting.lead_id,
        "name": meeting.name or "",
        "email": str(meeting.email) if meeting.email else "",
        "phone": meeting.phone or "",
        "coverage": meeting.coverage or "",
        "state": meeting.state or "",
        "appointment_date": meeting.appointment_date,
        "appointment_time": meeting.appointment_time,
        "appointment_label": meeting.appointment_label,
        "meeting_type": meeting.meeting_type,
        "duration": meeting.duration,
        "timezone": meeting.timezone,
        "status": "requested",
        "raw_payload": {
            "source": "website_scheduler",
            "meeting_type": meeting.meeting_type,
            "duration": meeting.duration,
            "timezone": meeting.timezone,
        },
        "created_at": now,
    }

    try:
        get_supabase().table("meetings").insert(row).execute()
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Could not save meeting to Supabase: {exc}") from exc

    sms_status = "not_configured"
    if meeting.phone and meeting.appointment_label:
        twilio = get_twilio()
        if twilio:
            text = (
                f"Hi {meeting.name or 'there'}, this is Senior Needs Marketing. "
                f"Your appointment request is confirmed for {meeting.appointment_label}. "
                f"A licensed agent will review your {meeting.coverage or 'insurance'} options. Reply with any questions. Reply STOP to opt out."
            )
            try:
                sms = twilio.messages.create(
                    body=text,
                    from_=TWILIO_FROM_PHONE,
                    to=meeting.phone,
                )
                sms_status = "sent"
                log_sms_message(
                    direction="outbound",
                    from_phone=TWILIO_FROM_PHONE or "",
                    to_phone=meeting.phone,
                    body=text,
                    lead_id=meeting.lead_id,
                    meeting_id=meeting_id,
                    provider_message_id=sms.sid,
                    raw_payload={"source": "appointment_confirmation"},
                )
            except Exception as exc:
                sms_status = f"failed: {exc}"

    return {
        "ok": True,
        "meeting_id": meeting_id,
        "status": "requested",
        "sms_status": sms_status,
        "message": "Meeting request saved.",
    }


@app.post("/assistant")
async def chat_with_assistant(request: AssistantRequest) -> dict[str, Any]:
    lead = request.lead or {}
    context = {
        "lead_name": lead.get("name"),
        "state": lead.get("state"),
        "coverage_interest": lead.get("coverage"),
        "contact_preference": lead.get("contactPreference"),
        "appointment": request.bookedTime,
    }

    conversation = []
    for message in request.messages[-10:]:
        role = "assistant" if message.from_ == "bot" else "user"
        conversation.append({"role": role, "content": message.text})
    conversation.append({"role": "user", "content": request.message})

    prompt = "\n".join([item["content"] for item in conversation if item["role"] == "user"])
    reply = await ask_openrouter(prompt, context=context, max_tokens=100)

    return {"ok": True, "reply": reply, "model": OPENROUTER_MODEL}


@app.post("/twilio/inbound-sms")
async def twilio_inbound_sms(request: Request) -> Response:
    form = await request.form()
    form_data = {key: str(value) for key, value in form.items()}
    validate_twilio_request(request, form_data)

    From = form_data.get("From", "")
    To = form_data.get("To", "")
    Body = form_data.get("Body", "")
    MessageSid = form_data.get("MessageSid", "")
    incoming_text = (Body or "").strip()
    lead = find_latest_lead_by_phone(From)
    lead_id = lead.get("id") if lead else None

    log_sms_message(
        direction="inbound",
        from_phone=From,
        to_phone=To,
        body=incoming_text,
        lead_id=lead_id,
        provider_message_id=MessageSid,
        raw_payload={"from": From, "to": To, "body": incoming_text},
    )

    response = MessagingResponse()
    if incoming_text.lower() in {"stop", "stopall", "unsubscribe", "cancel", "end", "quit"}:
        reply = "You are opted out and will not receive automated texts from Senior Needs Marketing. Reply START to opt back in."
    elif incoming_text.lower() == "start":
        reply = "You are opted back in to Senior Needs Marketing texts. How can we help with your insurance questions?"
    else:
        context = {
            "lead_name": lead.get("name") if lead else None,
            "state": lead.get("state") if lead else None,
            "coverage_interest": lead.get("coverage") if lead else None,
            "channel": "sms",
        }
        try:
            reply = await ask_openrouter(incoming_text, context=context, max_tokens=90)
        except Exception:
            reply = "Thanks for your message. A licensed agent can help review that with you. What state are you in?"

    response.message(reply)
    log_sms_message(
        direction="outbound",
        from_phone=To,
        to_phone=From,
        body=reply,
        lead_id=lead_id,
        raw_payload={"source": "ai_sms_reply"},
    )
    return Response(content=str(response), media_type="application/xml")

import { cleanEnv, normalizePhoneNumber } from "../serverHelpers";

function allowlisted(phoneNumber) {
  const allowlist = cleanEnv(process.env.VAPI_TEST_PHONE_ALLOWLIST);
  if (!allowlist) return true;

  const allowedNumbers = allowlist
    .split(",")
    .map((value) => normalizePhoneNumber(value))
    .filter(Boolean);

  return allowedNumbers.includes(phoneNumber);
}

export async function POST(request) {
  const payload = await request.json();
  const apiKey = cleanEnv(process.env.VAPI_API_KEY);
  const assistantId = cleanEnv(process.env.VAPI_ASSISTANT_ID);
  const phoneNumberId = cleanEnv(process.env.VAPI_PHONE_NUMBER_ID);
  const customerNumber = normalizePhoneNumber(payload.phone);

  if (!apiKey || !assistantId || !phoneNumberId) {
    return Response.json(
      {
        ok: false,
        status: "not_configured",
        message: "Vapi is not configured yet.",
      },
      { status: 503 },
    );
  }

  if (!customerNumber) {
    return Response.json(
      {
        ok: false,
        status: "invalid_phone",
        message: "A valid phone number is required for the voice call.",
      },
      { status: 400 },
    );
  }

  if (!allowlisted(customerNumber)) {
    return Response.json(
      {
        ok: false,
        status: "test_number_not_allowed",
        message: "This number is not in the Vapi test allowlist.",
      },
      { status: 403 },
    );
  }

  const response = await fetch("https://api.vapi.ai/call", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assistantId,
      phoneNumberId,
      customer: {
        number: customerNumber,
        name: payload.name || "Website Lead",
      },
      assistantOverrides: {
        variableValues: {
          name: payload.name || "Website Lead",
          first_name: payload.name?.trim().split(/\s+/)[0] || "there",
          coverage: payload.coverage || "insurance",
          state: payload.state || "your state",
          appointment_time: payload.appointment_label || "your selected appointment time",
          contact_preference: payload.contactPreference || "Call me",
        },
      },
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return Response.json(
      {
        ok: false,
        status: "vapi_failed",
        message: "Vapi could not start the call.",
        vapi_status: response.status,
        vapi_error: data,
      },
      { status: 502 },
    );
  }

  return Response.json({
    ok: true,
    status: "call_started",
    call_id: data.id || null,
    customer_number: customerNumber,
  });
}

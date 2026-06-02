export function getBackendUrl() {
  const backendUrl = cleanEnv(process.env.FASTAPI_BACKEND_URL);
  if (!backendUrl || backendUrl.includes("127.0.0.1") || backendUrl.includes("localhost")) {
    return "";
  }
  return backendUrl.replace(/\/$/, "");
}

export function cleanEnv(value) {
  return (value || "").replace(/^\uFEFF/, "").trim();
}

export async function forwardToBackend(path, payload) {
  const backendUrl = getBackendUrl();
  if (!backendUrl) return null;

  const response = await fetch(`${backendUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return { data, status: response.status, ok: response.ok };
}

export async function insertSupabase(table, row) {
  const supabaseUrl = cleanEnv(process.env.SUPABASE_URL);
  const serviceKey = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (!supabaseUrl || !serviceKey) return "not_configured";

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Supabase ${table} insert failed: ${error}`);
  }

  return "saved";
}

export async function sendHighLevel(webhookUrl, payload) {
  webhookUrl = cleanEnv(webhookUrl);
  if (!webhookUrl) return "not_configured";

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) return `failed: ${response.status}`;
  return "sent";
}

export function appointmentStartIso(appointmentDate, appointmentTime, timezone) {
  const timeZones = {
    Eastern: "America/New_York",
    Central: "America/Chicago",
    Mountain: "America/Denver",
    Pacific: "America/Los_Angeles",
    "Local time": "America/New_York",
  };
  const timeZone = timeZones[timezone] || timeZones["Local time"];
  const utcGuess = new Date(`${appointmentDate}T${appointmentTime}:00Z`);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(utcGuess);
  const offset = parts.find((part) => part.type === "timeZoneName")?.value.replace("GMT", "") || "-05:00";
  return `${appointmentDate}T${appointmentTime}:00${offset}`;
}

export function normalizePhoneNumber(phone) {
  const digits = `${phone || ""}`.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (`${phone || ""}`.trim().startsWith("+")) return `${phone}`.trim();
  return "";
}

function phoneAllowlisted(phoneNumber) {
  const allowlist = cleanEnv(process.env.VAPI_TEST_PHONE_ALLOWLIST);
  if (!allowlist) return true;

  const allowedNumbers = allowlist
    .split(",")
    .map((value) => normalizePhoneNumber(value))
    .filter(Boolean);

  return allowedNumbers.includes(phoneNumber);
}

export async function startVapiCall(payload) {
  const apiKey = cleanEnv(process.env.VAPI_API_KEY);
  const assistantId = cleanEnv(process.env.VAPI_ASSISTANT_ID);
  const phoneNumberId = cleanEnv(process.env.VAPI_PHONE_NUMBER_ID);
  const customerNumber = normalizePhoneNumber(payload.phone);

  if (!apiKey || !assistantId || !phoneNumberId) {
    return {
      ok: false,
      status: "not_configured",
      message: "Vapi is not configured yet.",
    };
  }

  if (!customerNumber) {
    return {
      ok: false,
      status: "invalid_phone",
      message: "A valid phone number is required for the voice call.",
    };
  }

  if (!phoneAllowlisted(customerNumber)) {
    return {
      ok: false,
      status: "test_number_not_allowed",
      message:
        "This number is not in the Vapi test allowlist. For local testing, use 610-585-9162 or add the number to VAPI_TEST_PHONE_ALLOWLIST.",
    };
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
          appointment_time: payload.appointment_label || "not selected yet",
          contact_preference: payload.contactPreference || "Call me",
        },
      },
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return {
      ok: false,
      status: "vapi_failed",
      message: "Vapi could not start the call.",
      vapi_status: response.status,
      vapi_error: data,
    };
  }

  return {
    ok: true,
    status: "call_started",
    call_id: data.id || null,
    customer_number: customerNumber,
  };
}

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

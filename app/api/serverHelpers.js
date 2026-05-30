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
  const offsets = {
    Eastern: "-05:00",
    Central: "-06:00",
    Mountain: "-07:00",
    Pacific: "-08:00",
    "Local time": "-05:00",
  };
  const offset = offsets[timezone] || offsets["Local time"];
  return `${appointmentDate}T${appointmentTime}:00${offset}`;
}

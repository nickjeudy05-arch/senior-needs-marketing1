import { forwardToBackend, insertSupabase, sendHighLevel, startVapiCall } from "../serverHelpers";

export async function POST(request) {
  const lead = await request.json();
  const backendResult = await forwardToBackend("/leads", lead);

  if (backendResult) {
    return Response.json(backendResult.data, { status: backendResult.status });
  }

  if (!lead.consentAccepted) {
    return Response.json({ ok: false, message: "Consent is required before submitting this form." }, { status: 400 });
  }

  const leadId = crypto.randomUUID();
  const now = new Date().toISOString();
  const row = {
    id: leadId,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    state: lead.state,
    date_of_birth: lead.dob,
    beneficiary: lead.beneficiary,
    hobbies: lead.hobbies || "",
    coverage: lead.coverage,
    contact_preference: lead.contactPreference || "Text me",
    consent_accepted: Boolean(lead.consentAccepted),
    consent_language: lead.consentLanguage || "",
    consent_timestamp: lead.consentTimestamp || now,
    source_url: lead.sourceUrl || "",
    raw_payload: {
      source: "website_lead_form",
      contact_preference: lead.contactPreference || "Text me",
      consent_timestamp: lead.consentTimestamp || now,
      source_url: lead.sourceUrl || "",
    },
    created_at: now,
  };

  const highLevelPayload = {
    event: "lead_submitted",
    lead_id: leadId,
    name: lead.name,
    first_name: lead.firstName || lead.name?.trim().split(/\s+/)[0] || "",
    last_name: lead.lastName || "",
    email: lead.email,
    phone: lead.phone,
    state: lead.state,
    date_of_birth: lead.dob,
    beneficiary: lead.beneficiary,
    hobbies: lead.hobbies || "",
    coverage: lead.coverage,
    contact_preference: lead.contactPreference || "Text me",
    consent_accepted: Boolean(lead.consentAccepted),
    consent_language: lead.consentLanguage || "",
    consent_timestamp: lead.consentTimestamp || now,
    source_url: lead.sourceUrl || "",
    source: "senior_needs_marketing_website",
  };

  try {
    const supabaseStatus = await insertSupabase("leads", row);
    const highlevel_status = await sendHighLevel(process.env.HIGHLEVEL_LEAD_WEBHOOK_URL, highLevelPayload);
    const voice_call_status =
      lead.contactPreference === "Call me"
        ? await startVapiCall({
            name: lead.name,
            phone: lead.phone,
            coverage: lead.coverage,
            state: lead.state,
            beneficiary: lead.beneficiary,
            hobbies: lead.hobbies || "",
            contactPreference: lead.contactPreference,
            appointment_label: "not selected yet",
          })
        : { ok: false, status: "not_requested" };

    if (supabaseStatus === "not_configured" && highlevel_status === "not_configured" && !voice_call_status.ok) {
      return Response.json(
        { ok: false, message: "Lead storage is not configured for this deployment." },
        { status: 503 },
      );
    }

    return Response.json({
      ok: true,
      lead_id: leadId,
      outreachStatus: "queued",
      highlevel_status,
      voice_call_status,
      message: "Lead received. A licensed agent can follow up by the preferred contact method.",
    });
  } catch (error) {
    console.error("Could not save lead", error);
    return Response.json(
      {
        ok: false,
        message: "Lead could not be saved right now.",
      },
      { status: 503 },
    );
  }
}

import { appointmentStartIso, forwardToBackend, insertSupabase, sendHighLevel } from "../serverHelpers";

export async function POST(request) {
  const meeting = await request.json();
  const backendResult = await forwardToBackend("/meetings", meeting);

  if (backendResult) {
    return Response.json(backendResult.data, { status: backendResult.status });
  }

  const meetingId = crypto.randomUUID();
  const now = new Date().toISOString();
  const startIso = appointmentStartIso(meeting.appointment_date, meeting.appointment_time, meeting.timezone);
  const appointmentTitle = `${meeting.name || "Website Lead"} - ${meeting.coverage || "Insurance Review"}`;
  const appointmentNotes = [
    `Coverage: ${meeting.coverage || "Not provided"}`,
    `State: ${meeting.state || "Not provided"}`,
    `Phone: ${meeting.phone || "Not provided"}`,
    `Email: ${meeting.email || "Not provided"}`,
    `Requested time: ${meeting.appointment_label}`,
  ].join("\n");

  const row = {
    id: meetingId,
    lead_id: meeting.lead_id || null,
    name: meeting.name || "",
    email: meeting.email || "",
    phone: meeting.phone || "",
    coverage: meeting.coverage || "",
    state: meeting.state || "",
    appointment_date: meeting.appointment_date,
    appointment_time: meeting.appointment_time,
    appointment_label: meeting.appointment_label,
    meeting_type: meeting.meeting_type || "Phone review",
    duration: meeting.duration || "30 minutes",
    timezone: meeting.timezone || "Local time",
    status: "requested",
    raw_payload: {
      source: "website_scheduler",
      appointment_start_iso: startIso,
      appointment_title: appointmentTitle,
      appointment_notes: appointmentNotes,
    },
    created_at: now,
  };

  const highLevelPayload = {
    event: "appointment_requested",
    meeting_id: meetingId,
    lead_id: meeting.lead_id || null,
    name: meeting.name || "",
    first_name: meeting.name?.trim().split(/\s+/)[0] || "",
    last_name: meeting.name?.trim().split(/\s+/).slice(1).join(" ") || "",
    email: meeting.email || "",
    phone: meeting.phone || "",
    coverage: meeting.coverage || "",
    state: meeting.state || "",
    appointment_date: meeting.appointment_date,
    appointment_time: meeting.appointment_time,
    appointment_start_iso: startIso,
    appointment_label: meeting.appointment_label,
    appointment_title: appointmentTitle,
    appointment_notes: appointmentNotes,
    meeting_type: meeting.meeting_type || "Phone review",
    duration: meeting.duration || "30 minutes",
    timezone: meeting.timezone || "Local time",
    source: "senior_needs_marketing_website",
  };

  try {
    const supabaseStatus = await insertSupabase("meetings", row);
    const highlevel_status = await sendHighLevel(
      process.env.HIGHLEVEL_MEETING_WEBHOOK_URL || process.env.HIGHLEVEL_LEAD_WEBHOOK_URL,
      highLevelPayload,
    );

    if (supabaseStatus === "not_configured" && highlevel_status === "not_configured") {
      return Response.json(
        { ok: false, message: "Meeting storage is not configured for this deployment." },
        { status: 503 },
      );
    }

    return Response.json({
      ok: true,
      meeting_id: meetingId,
      status: "requested",
      sms_status: "handled_by_highlevel",
      highlevel_status,
      message: "Meeting request saved.",
    });
  } catch (error) {
    console.error("Could not save meeting", error);
    return Response.json(
      {
        ok: false,
        message: "Meeting could not be saved right now.",
      },
      { status: 503 },
    );
  }
}

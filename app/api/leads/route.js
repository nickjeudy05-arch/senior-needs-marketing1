export async function POST(request) {
  const lead = await request.json();

  console.info("New Senior Needs Marketing lead", {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    coverage: lead.coverage,
    contactPreference: lead.contactPreference,
    receivedAt: new Date().toISOString(),
  });

  return Response.json({
    ok: true,
    outreachStatus: "queued",
    message:
      "Lead received. A licensed agent follow-up can be handled by the configured brokerage workflow.",
  });
}

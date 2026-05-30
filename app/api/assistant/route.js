export async function POST(request) {
  const body = await request.json();
  const backendUrl = process.env.FASTAPI_BACKEND_URL || "http://127.0.0.1:8000";

  try {
    const response = await fetch(`${backendUrl}/assistant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error("Could not reach FastAPI assistant backend", error);
    return Response.json(
      {
        ok: false,
        reply: "I could not reach the assistant service right now. Please try again in a moment.",
      },
      { status: 503 },
    );
  }
}

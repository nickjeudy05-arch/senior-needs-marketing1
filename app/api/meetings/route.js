export async function POST(request) {
  const meeting = await request.json();
  const backendUrl = process.env.FASTAPI_BACKEND_URL || "http://127.0.0.1:8000";

  try {
    const response = await fetch(`${backendUrl}/meetings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meeting),
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error("Could not reach FastAPI meeting backend", error);
    return Response.json(
      {
        ok: false,
        message: "Meeting could not be saved because the backend is unavailable.",
      },
      { status: 503 },
    );
  }
}

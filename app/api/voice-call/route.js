import { startVapiCall } from "../serverHelpers";

export async function POST(request) {
  const payload = await request.json();
  const result = await startVapiCall(payload);

  const status =
    result.status === "not_configured"
      ? 503
      : result.status === "invalid_phone"
        ? 400
        : result.status === "test_number_not_allowed"
          ? 403
          : result.status === "vapi_failed"
            ? 502
            : 200;

  return Response.json(result, { status });
}

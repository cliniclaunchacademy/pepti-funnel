import { cookies, headers } from "next/headers";

const DATASET_ID = process.env.META_CAPI_DATASET_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const API_VERSION = "v21.0";

const ALLOWED_EVENTS = new Set(["Lead", "Schedule"]);

export async function POST(request: Request) {
  if (!DATASET_ID || !ACCESS_TOKEN) {
    return Response.json(
      { error: "Meta CAPI not configured" },
      { status: 500 },
    );
  }

  let body: { event?: string; eventId?: string; eventSourceUrl?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { event, eventId, eventSourceUrl } = body;

  if (!event || !ALLOWED_EVENTS.has(event) || !eventId) {
    return Response.json({ error: "Invalid event" }, { status: 400 });
  }

  const h = await headers();
  const c = await cookies();

  const forwardedFor = h.get("x-forwarded-for");
  const clientIp =
    forwardedFor?.split(",")[0].trim() || h.get("x-real-ip") || undefined;
  const userAgent = h.get("user-agent") || undefined;

  const fbp = c.get("_fbp")?.value;
  const fbc = c.get("_fbc")?.value;

  const payload = {
    data: [
      {
        event_name: event,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: eventSourceUrl,
        action_source: "website",
        user_data: {
          client_ip_address: clientIp,
          client_user_agent: userAgent,
          fbp,
          fbc,
        },
      },
    ],
  };

  const endpoint = `https://graph.facebook.com/${API_VERSION}/${DATASET_ID}/events?access_token=${encodeURIComponent(
    ACCESS_TOKEN,
  )}`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const detail = await res.text();
      return Response.json(
        { error: "Meta CAPI error", detail },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { error: "Network error", detail: String(err) },
      { status: 502 },
    );
  }
}

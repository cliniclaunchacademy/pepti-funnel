"use client";

import { useEffect, useRef } from "react";

type MetaStandardEvent = "Lead" | "Schedule";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function TrackEvent({ event }: { event: MetaStandardEvent }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const eventId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    if (typeof window.fbq === "function") {
      window.fbq("track", event, {}, { eventID: eventId });
    }

    fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        eventId,
        eventSourceUrl: window.location.href,
      }),
      keepalive: true,
    }).catch(() => {});
  }, [event]);

  return null;
}

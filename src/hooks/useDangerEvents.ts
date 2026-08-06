import { useEffect, useRef } from "react";
import useDangerEventStore from "../store/useDangerEventStore";
import { DangerSeverity } from "../store/state/danger-event-state";

type RawDangerPayload = {
  type: string;
  materialName: string;
  severity: DangerSeverity;
  message: string;
};

const VALID_SEVERITIES: DangerSeverity[] = ["critical", "warning", "info"];

function isValidPayload(data: unknown): data is RawDangerPayload {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.type === "string" &&
    typeof d.materialName === "string" &&
    typeof d.message === "string" &&
    typeof d.severity === "string" &&
    VALID_SEVERITIES.includes(d.severity as DangerSeverity)
  );
}

export function useDangerEvents(url: string, enabled = true) {
  const addEvent = useDangerEventStore((s) => s.addEvent);
  const retryDelayRef = useRef(1000); // backoff, resets to 1s on a successful message

  useEffect(() => {
    if (!enabled) return;

    let source: EventSource | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const connect = () => {
      if (cancelled) return;
      source = new EventSource(url);

      source.onmessage = (e) => {
        retryDelayRef.current = 1000; // reset backoff on any successful message
        let parsed: unknown;
        try {
          parsed = JSON.parse(e.data);
        } catch {
          console.error("Danger event: failed to parse SSE payload", e.data);
          return;
        }

        if (!isValidPayload(parsed)) {
          console.error(
            "Danger event: payload missing required fields",
            parsed,
          );
          return;
        }

        addEvent(parsed);
      };

      source.onerror = () => {
        // EventSource auto-reconnects on transient errors, but if the
        // connection is fully closed we take over with backoff so we don't
        // hammer the server if it's down for a while.
        if (source?.readyState === EventSource.CLOSED) {
          source.close();
          reconnectTimer = setTimeout(() => {
            retryDelayRef.current = Math.min(retryDelayRef.current * 2, 30000);
            connect();
          }, retryDelayRef.current);
        }
      };
    };

    connect();

    return () => {
      cancelled = true;
      source?.close();
      if (reconnectTimer) clearTimeout(reconnectTimer);
    };
  }, [url, enabled, addEvent]);
}

import { useEffect, useRef } from "react";
import usePersonStore from "../store/usePersonStore";
import { Person } from "../model/person.model";

type RawPersonPayload = {
  id: string;
  type: string;
  gateType: string;
  personIdentificationId: string;
};

function isValidPayload(data: unknown): data is RawPersonPayload {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.personIdentificationId === "string" &&
    typeof d.id === "string" &&
    typeof d.type === "string" &&
    typeof d.gateType === "string"
  );
}

export function usePersonEvents(url: string, enabled = true) {
  const personInToCampus = usePersonStore((s) => s.personInToCampus);
  const personOutFromCampus = usePersonStore((s) => s.personOutFromCampus);
  const retryDelayRef = useRef(1000);

  useEffect(() => {
    if (!enabled) return;

    let source: EventSource | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const connect = () => {
      if (cancelled) return;
      source = new EventSource(url);

      source.onmessage = (e) => {
        retryDelayRef.current = 1000;
        let parsed: unknown;
        try {
          parsed = JSON.parse(e.data);
          console.log(parsed, "parsed");
        } catch {
          console.error("Person event: failed to parse SSE payload", e.data);
          return;
        }

        if (!isValidPayload(parsed)) {
          console.error(
            "Person event: payload missing required fields",
            parsed,
          );
          return;
        }

        const person: Person = {
          id: parsed.personIdentificationId,
          type: parsed.type,
          gateType: parsed.gateType,
          personIdentificationId: parsed.personIdentificationId,
        };

        if (parsed.gateType === "in") {
          personInToCampus(person);
        } else {
          personOutFromCampus(person);
        }
      };

      source.onerror = () => {
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
  }, [url, enabled, personInToCampus, personOutFromCampus]);
}

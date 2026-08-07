import { useEffect } from "react";
import usePersonStore from "../store/usePersonStore";
import { Person } from "../model/person.model";

export function usePersonEvents(url: string, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const eventSource = new EventSource(url);

    eventSource.onmessage = (msg) => {
      try {
        const person: Person = JSON.parse(msg.data);

        if (person.type === "in") {
          usePersonStore.getState().personInToCampus(person);
        } else {
          usePersonStore.getState().personOutFromCampus(person);
        }
      } catch (err) {
        console.error("Failed to parse person event", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("Person event stream error", err);
    };

    return () => eventSource.close();
  }, [url, enabled]);
}

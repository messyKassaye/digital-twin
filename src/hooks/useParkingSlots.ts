import { useEffect } from "react";
import useParkingStore from "../store/useParkingStore";
import { ParkingSlotEvent } from "../model/parking.model";
import { API_URL } from "../config/dot-env-config";

export function useInitialParkingSlots() {
  useEffect(() => {
    fetch(`${API_URL}/parking/slots`)
      .then((res) => res.json())
      .then((slots) => useParkingStore.getState().setInitialSlots(slots))
      .catch((err) =>
        console.error("Failed to load initial parking slots", err),
      );
  }, []);
}

export function useParkingEvents(url: string, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const eventSource = new EventSource(url);

    eventSource.onmessage = (msg) => {
      try {
        const event: ParkingSlotEvent = JSON.parse(msg.data);
        console.log(
          event,
          useParkingStore.getState().slots.filter((s) => s.taken).length,
          "event",
        );
        useParkingStore.getState().applySlotEvent(event);
      } catch (err) {
        console.error("Failed to parse parking event", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("Parking event stream error", err);
    };

    return () => eventSource.close();
  }, [url, enabled]);
}

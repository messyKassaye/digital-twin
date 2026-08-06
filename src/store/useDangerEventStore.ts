import { create } from "zustand";
import { DangerEventState } from "./state/danger-event-state";

const useDangerEventStore = create<DangerEventState>((set) => ({
  events: [],
  addEvent: (raw) =>
    set((state) => ({
      events: [
        ...state.events,
        {
          ...raw,
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          receivedAt: Date.now(),
        },
      ],
    })),
  dismissEvent: (id) =>
    set((state) => ({ events: state.events.filter((e) => e.id !== id) })),
  clearAll: () => set({ events: [] }),
}));

export default useDangerEventStore;

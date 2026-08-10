import { create } from "zustand";
import { ParkingSlot, ParkingSlotEvent } from "../model/parking.model";

interface ParkingState {
  slots: ParkingSlot[];
  isLoaded: boolean;
  vehiclesOnCampus: number;
  totalCapacity: number;

  setInitialSlots: (slots: ParkingSlot[]) => void;
  applySlotEvent: (event: ParkingSlotEvent) => void;
}

const useParkingStore = create<ParkingState>((set) => ({
  slots: [],
  isLoaded: false,
  vehiclesOnCampus: 0,
  totalCapacity: 0,

  setInitialSlots: (slots) =>
    set({
      slots,
      isLoaded: true,
      vehiclesOnCampus: slots.filter((s) => s.taken).length,
      totalCapacity: slots.length,
    }),

  applySlotEvent: (event) =>
    set((state) => {
      const slots = state.slots.map((s) =>
        s.slotId === event.slotId
          ? {
              ...s,
              taken: event.taken,
              vehicleIdentificationId: event.taken
                ? event.vehicleIdentificationId
                : undefined,
            }
          : s,
      );
      return {
        slots,
        vehiclesOnCampus: slots.filter((s) => s.taken).length,
      };
    }),
}));

export default useParkingStore;

export interface ParkingSlot {
  slotId: string;
  taken: boolean;
  vehicleIdentificationId?: string;
}

export interface ParkingSlotEvent {
  id: string;
  slotId: string;
  taken: boolean;
  vehicleIdentificationId?: string;
}

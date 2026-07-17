import type { DonutDatum, SeriesPoint } from "../hud";

export const CYAN = "#22d3ee";
export const BLUE = "#3b82f6";
export const AMBER = "#f6b53f";
export const GREEN = "#34d399";

export interface WorkOrderPoint {
  t: string;
  closed: number;
  handle: number;
  pending: number;
}

export interface RadarPoint {
  axis: string;
  v: number;
}

export const waterData: SeriesPoint[] = [
  { t: "10:00", v: 12 },
  { t: "11:00", v: 22 },
  { t: "12:00", v: 34 },
  { t: "13:00", v: 41 },
  { t: "14:00", v: 34.5 },
  { t: "15:00", v: 46 },
  { t: "16:00", v: 52 },
  { t: "17:00", v: 55.5 },
  { t: "18:00", v: 55.5 },
];

export const elecData: SeriesPoint[] = [
  { t: "10:00", v: 0.6 },
  { t: "12:00", v: 1.1 },
  { t: "14:00", v: 1.8 },
  { t: "16:00", v: 2.3 },
  { t: "18:00", v: 2.5 },
  { t: "20:00", v: 2.5 },
];

export const workOrderData: WorkOrderPoint[] = [
  { t: "1", closed: 8, handle: 4, pending: 2 },
  { t: "2", closed: 12, handle: 6, pending: 3 },
  { t: "3", closed: 9, handle: 10, pending: 5 },
  { t: "4", closed: 16, handle: 7, pending: 4 },
  { t: "5", closed: 20, handle: 9, pending: 6 },
  { t: "6", closed: 18, handle: 12, pending: 8 },
  { t: "7", closed: 24, handle: 8, pending: 5 },
];

export const assetRadar: RadarPoint[] = [
  { axis: "Display devices", v: 72 },
  { axis: "Buildings", v: 90 },
  { axis: "Office assets", v: 65 },
  { axis: "Lab equipments", v: 48 },
  { axis: "Electronic devices", v: 80 },
];

export const usageDonut: DonutDatum[] = [{ value: 91 }, { value: 9 }];
export const alarmDonut: DonutDatum[] = [{ value: 60 }, { value: 40 }];

export const topStats: [string, string][] = [
  ["Personnel Number", "20,060"],
  ["Vehicles on campus", "12,236"],
  ["Available Parking", "64 / 12300"],
];

export const tabs = ["OverView", "AI Security", "AI Energy Mgmt", "Conference Room"] as const;
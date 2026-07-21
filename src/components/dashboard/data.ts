import { COLORS } from "../../lib/theme";
import type { DonutDatum, SeriesPoint } from "../hud";
<<<<<<< HEAD
import { MaterialInfo } from "../model/material-info.model";
=======
>>>>>>> 8d5beecc8f4fd7a6cb3219486180d55eafe69e33
import { Tab } from "../model/tab.model";

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

export const tabs: Tab[] = [
  {
    id: 1,
    name: "OverView",
  },
  {
    id: 2,
    name: "AI Security",
  },
<<<<<<< HEAD
  // {
  //   id: 3,
  //   name: "AI Energy Mgmt",
  // },
  // {
  //   id: 4,
  //   name: "Conference Room",
  // },
=======
  {
    id: 3,
    name: "AI Energy Mgmt",
  },
  {
    id: 4,
    name: "Conference Room",
  },
>>>>>>> 8d5beecc8f4fd7a6cb3219486180d55eafe69e33
] as const;

import type {
  PeoplePoint,
  TrendPoint,
  DeviceType,
  WorkOrder,
  Guard,
} from "./types/dashboard";

export const peopleData: PeoplePoint[] = [
  { time: "05:00", in: 5200, out: 1600 },
  { time: "07:00", in: 18400, out: 3200 },
  { time: "09:00", in: 21000, out: 6400 },
  { time: "14:00", in: 9800, out: 8600 },
  { time: "18:00", in: 5400, out: 15200 },
  { time: "22:00", in: 2600, out: 6200 },
];

export const trendsData: TrendPoint[] = [
  { time: "00:00", handle: 2, pending: 1 },
  { time: "04:00", handle: 1, pending: 0 },
  { time: "08:00", handle: 12, pending: 6 },
  { time: "12:00", handle: 28, pending: 9 },
  { time: "16:00", handle: 18, pending: 7 },
  { time: "20:00", handle: 9, pending: 4 },
  { time: "24:00", handle: 3, pending: 1 },
];

export const deviceTypes: DeviceType[] = [
  { name: "Box Camera", pct: 4, count: 567, color: COLORS.cyan },
  { name: "PTZ Camera", pct: 1, count: 108, color: COLORS.blue },
  { name: "Semidome Camera", pct: 4, count: 540, color: COLORS.indigo },
  { name: "Acess", pct: 89, count: 12015, color: COLORS.green },
  { name: "Gate", pct: 2, count: 270, color: COLORS.yellow },
];

export const workOrders: WorkOrder[] = [
  { name: "Closed", pct: 95, count: 341, color: COLORS.cyan },
  { name: "Processing", pct: 2, count: 8, color: COLORS.yellow },
  { name: "Pending", pct: 3, count: 10, color: COLORS.red },
];

export const guards: Guard[] = [
  {
    name: "Abebe Kebede",
    contact: "09****8256",
    dept: "Comprehensive",
    leader: "Teshome alemu",
  },
  {
    name: "Feven Tesema",
    contact: "09****4895",
    dept: "Comprehensive",
    leader: "Hewan Gebru",
  },
];

export const radarAxes: string[] = [
  "Important",
  "Secondary",
  "Prompt",
  "Indistinctio...",
  "Clean-up",
  "Eve...",
];

export const radarValues: number[] = [0.9, 0.55, 0.7, 0.35, 0.6, 0.8];
<<<<<<< HEAD

export const MATERIALS: MaterialInfo[] = [
  {
    index: 1,
    label: "All",
    name: "all",
    color: "#c0392b",
    category: "all",
  },
  {
    index: 7,
    label: "Car",
    name: "CarTex_1",
    color: "#8c1a0d",
    category: "vehicle",
  },
  {
    index: 12,
    label: "Light",
    name: "Street_Assets",
    color: "#999999",
    category: "street",
  },
  {
    index: 15,
    label: "Tower A",
    name: "FoliageTrees.001",
    color: "#2d6a2d",
    category: "vegetation",
  },
  {
    index: 17,
    label: "Tower B",
    name: "FoliageTrees.004",
    color: "#3a7a3a",
    category: "vegetation",
  },
  {
    index: 20,
    label: "Tower C",
    name: "FoliageTrees.002",
    color: "#256025",
    category: "vegetation",
  },
  {
    index: 21,
    label: "Tower D",
    name: "FoliageTrees.003",
    color: "#256025",
    category: "vegetation",
  },
  {
    index: 24,
    label: "Building",
    name: "CityGenroof.003",
    color: "#c0392b",
    category: "building",
  },
  {
    index: 26,
    label: "Building 1",
    name: "US_Doors_1",
    color: "#256025",
    category: "building",
  },
  {
    index: 27,
    label: "Building 2",
    name: "Us_Builds_facadesWalls.001",
    color: "#256025",
    category: "building",
  },
];
=======
>>>>>>> 8d5beecc8f4fd7a6cb3219486180d55eafe69e33

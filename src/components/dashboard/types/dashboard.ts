export interface PeoplePoint {
  time: string;
  in: number;
  out: number;
}

export interface TrendPoint {
  time: string;
  handle: number;
  pending: number;
}

export interface DeviceType {
  name: string;
  pct: number;
  count: number;
  color: string;
}

export interface WorkOrder {
  name: string;
  pct: number;
  count: number;
  color: string;
}

export interface Guard {
  name: string;
  contact: string;
  dept: string;
  leader: string;
}

export type DangerSeverity = "critical" | "warning" | "info";

export type DangerEvent = {
  id: string; // generated client-side, used as React key + dismiss target
  type: string; // e.g. "leak_detected", "pressure_spike"
  materialName: string;
  severity: DangerSeverity;
  message: string;
  receivedAt: number;
};

export type DangerEventState = {
  events: DangerEvent[];
  addEvent: (raw: {
    type: string;
    materialName: string;
    severity: DangerSeverity;
    message: string;
  }) => void;
  dismissEvent: (id: string) => void;
  clearAll: () => void;
};

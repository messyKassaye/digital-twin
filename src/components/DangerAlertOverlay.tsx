import { AlertTriangle, AlertOctagon, Info, X } from "lucide-react";
import useDangerEventStore from "../store/danger-event-store";
import useMaterialStore from "../store/useMaterialStore";
import { DangerSeverity } from "../store/state/danger-event-state";

const SEVERITY_STYLES: Record<
  DangerSeverity,
  { border: string; bg: string; text: string; icon: typeof AlertOctagon }
> = {
  critical: {
    border: "border-red-500/50",
    bg: "bg-red-950/90",
    text: "text-red-200",
    icon: AlertOctagon,
  },
  warning: {
    border: "border-amber-500/50",
    bg: "bg-amber-950/90",
    text: "text-amber-200",
    icon: AlertTriangle,
  },
  info: {
    border: "border-cyan-500/50",
    bg: "bg-cyan-950/90",
    text: "text-cyan-200",
    icon: Info,
  },
};

type Props = {
  onNavigate: (matName: string, color?: string) => void;
};

export function DangerAlertOverlay({ onNavigate }: Props) {
  const events = useDangerEventStore((s) => s.events);
  const dismissEvent = useDangerEventStore((s) => s.dismissEvent);
  const materials = useMaterialStore((s) => s.materials);

  if (events.length === 0) return null;

  const handleAlertClick = () => {
    if (materials.length === 0) return; // nothing loaded yet, nothing to navigate to
    const random = materials[Math.floor(Math.random() * materials.length)];
    onNavigate(random.name, random.color);
  };

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 w-80 pointer-events-none">
      {events.map((event) => {
        const style = SEVERITY_STYLES[event.severity];
        const Icon = style.icon;
        return (
          <div
            key={event.id}
            onClick={handleAlertClick}
            className={`pointer-events-auto flex items-start gap-2 rounded-lg border ${style.border} ${style.bg} ${style.text}
              px-3 py-2.5 text-[12px] shadow-lg backdrop-blur-sm cursor-pointer
              hover:brightness-110 transition-[filter] animate-in fade-in slide-in-from-right-4`}
          >
            <Icon className="h-4 w-4 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold uppercase tracking-wide text-[10px] opacity-80">
                {event.severity} · {event.materialName}
              </p>
              <p className="mt-0.5 break-words">{event.message}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // don't trigger navigation when dismissing
                dismissEvent(event.id);
              }}
              className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

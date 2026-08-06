import { ParkingSquare } from "lucide-react";
import { topStats } from "./data";
import usePersonStore from "../../store/usePersonStore";

export function CenterOverlay({ date }: { date: string }) {
  const totalPersons = usePersonStore((s) => s.totalPersons);

  return (
    <div className="col-span-6 relative [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]">
      <div className="flex justify-center gap-2 pt-1">
        <div className="bg-transparent border border-cyan-400/20 px-3 py-1.5 rounded-sm min-w-[130px]">
          <div className="text-[11px] text-slate-100 flex items-center gap-1">
            <ParkingSquare size={10} className="text-cyan-200" />
            Personnel number:
          </div>
          <div className="text-base font-mono text-cyan-100">
            {totalPersons.toLocaleString()}
          </div>
        </div>

        {topStats.map(([l, v]) => (
          <div
            key={l}
            className="bg-transparent border border-cyan-400/20 px-3 py-1.5 rounded-sm min-w-[130px]"
          >
            <div className="text-[11px] text-slate-100 flex items-center gap-1">
              <ParkingSquare size={10} className="text-cyan-200" />
              {l}
            </div>
            <div className="text-base font-mono text-cyan-100">{v}</div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 right-3 text-[9px] text-slate-400 font-mono">
        {date}
      </div>
    </div>
  );
}

import Persons from "../Persons/Persons";
import Parking from "../Parking/Parking";

export function CenterOverlay({ date }: { date: string }) {
  return (
    <div className="col-span-6 relative [text-shadow:0_1px_4px_rgba(0,0,0,0.9)] z-10">
      <div className="flex justify-center gap-2 pt-1">
        <Persons />
        <Parking />
      </div>
      <div className="absolute bottom-2 right-3 text-[9px] text-slate-400 font-mono">
        {date}
      </div>
    </div>
  );
}

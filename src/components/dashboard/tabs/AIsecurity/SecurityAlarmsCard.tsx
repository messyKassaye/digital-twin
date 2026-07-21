import { Bell } from "lucide-react";
import { DonutRing } from "./shared/DonutRing";
import { HexRadar } from "./shared/HexRadar";
import { Panel } from "../../../hud";
import { COLORS } from "../../../../lib/theme";

export function SecurityAlarmsCard() {
  return (
    <Panel title="Security Alarms" icon={<Bell size={14} />}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between gap-2">
          <HexRadar />
          <div className="flex flex-col gap-3 items-end shrink-0 pr-1">
            <div className="text-right">
              <div className="text-[9px] text-slate-500">
                Urgent alarms/Tot...
              </div>
              <div className="text-lg font-bold tabular-nums">
                <span className="text-[#F87171]">37</span>
                <span className="text-slate-500">/260</span>
              </div>
            </div>
            <DonutRing
              size={60}
              stroke={6}
              percent={97.9}
              color={COLORS.blue}
              center={
                <div className="flex flex-col items-center leading-none">
                  <span className="text-[11px] font-bold text-white">
                    97.9%
                  </span>
                </div>
              }
            />
            <span className="text-[9px] text-slate-500 -mt-2">Eve...</span>
          </div>
        </div>
      </div>
    </Panel>
  );
}

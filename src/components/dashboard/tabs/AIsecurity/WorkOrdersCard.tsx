import { ClipboardList } from "lucide-react";
import { DonutRing } from "./shared/DonutRing";
import { Panel } from "../../../hud";
import { COLORS } from "../../../../lib/theme";
import { workOrders } from "../../data";

const closureRateBars = [40, 65, 50, 80, 55, 70, 60];

export function WorkOrdersCard() {
  return (
    <Panel title="Security Work Orders" icon={<ClipboardList size={14} />}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between rounded-sm bg-white/[0.03] px-3 py-2">
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <ClipboardList size={14} className="text-cyan-400" />
            Total work orders
          </div>
          <span className="text-lg font-semibold text-[#34D399] tabular-nums">
            359
          </span>
        </div>

        <div className="flex-1">
          <div className="text-[10px] text-slate-500 mb-2">
            | Work Order Analysis
          </div>
          <div className="flex items-center gap-4">
            <DonutRing
              percent={95}
              color={COLORS.cyan}
              center={
                <div className="flex flex-col items-center">
                  <ClipboardList size={14} className="text-cyan-300 mb-0.5" />
                </div>
              }
            />
            <div className="flex flex-col gap-2 text-[11px]">
              {workOrders.map((w) => (
                <div key={w.name} className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: w.color }}
                  />
                  <span className="text-slate-400 w-16">{w.name}</span>
                  <span className="text-slate-500 w-8">{w.pct}%</span>
                  <span className="text-white font-medium">{w.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="text-[10px] text-slate-500 mb-1.5">
            | APP closure rate in the past 7 days
          </div>
          <div className="flex items-end gap-1 h-8">
            {closureRateBars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-cyan-500/20 to-cyan-400"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

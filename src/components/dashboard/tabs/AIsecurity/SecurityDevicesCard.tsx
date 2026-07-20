import { ShieldCheck, Camera } from "lucide-react";
import { DonutRing } from "./shared/DonutRing";
import { Panel } from "../../../hud";
import { deviceTypes } from "../../data";
import { COLORS } from "../../../../lib/theme";

export function SecurityDevicesCard() {
  return (
    <Panel
      title="Security Devices"
      icon={<ShieldCheck size={14} />}
      className="h-full"
    >
      <div className="flex flex-col h-full gap-3">
        <div className="flex items-center justify-between rounded-sm bg-white/[0.03] px-3 py-2">
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <ShieldCheck size={14} className="text-cyan-400" />
            Total security devices
          </div>
          <span className="text-lg font-semibold text-[#34D399] tabular-nums">
            13500
          </span>
        </div>

        <div>
          <div className="text-[10px] text-slate-500 mb-2">| Device Status</div>
          <div className="flex items-center gap-4">
            <DonutRing
              percent={99.8}
              color={COLORS.green}
              center={
                <div className="flex flex-col items-center">
                  <span className="text-[9px] text-slate-500">在线</span>
                  <span className="text-[13px] font-bold text-white">
                    99.8%
                  </span>
                </div>
              }
            />
            <div className="flex flex-col gap-2 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                <span className="text-slate-400">Online devices</span>
                <span className="text-white font-medium ml-1">13473</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                <span className="text-slate-400">Offline devices</span>
                <span className="text-white font-medium ml-1">27</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="text-[10px] text-slate-500 mb-2">| Device Types</div>
          <div className="flex items-center gap-4">
            <DonutRing
              size={72}
              percent={100}
              color={COLORS.cyan}
              center={<Camera size={18} className="text-cyan-300" />}
            />
            <div className="flex-1 flex flex-col gap-1.5">
              {deviceTypes.map((d) => (
                <div
                  key={d.name}
                  className="grid grid-cols-[1fr_auto_auto] items-center gap-2 text-[10.5px]"
                >
                  <span className="flex items-center gap-1.5 text-slate-400 truncate">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: d.color }}
                    />
                    {d.name}
                  </span>
                  <span className="text-slate-400 w-8 text-right">
                    {d.pct}%
                  </span>
                  <span className="text-white font-medium w-14 text-right tabular-nums">
                    {d.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

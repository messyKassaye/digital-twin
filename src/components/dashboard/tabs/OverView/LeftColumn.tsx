import { Droplets, Thermometer, Users, Waves, Wind } from "lucide-react";
import { DonutStat, MiniLine, Panel, StatRow } from "../../../hud";
import {
  AMBER,
  BLUE,
  CYAN,
  GREEN,
  elecData,
  usageDonut,
  waterData,
} from "../../data";

export function LeftColumn() {
  return (
    <div className="ic-bg ic-gradient-left col-span-3 flex flex-col gap-3 overflow-hidden">
      <Panel
        title="Campus Environment"
        icon={<Thermometer size={12} className="text-cyan-300" />}
      >
        <div className="grid grid-cols-2 gap-y-3">
          <StatRow
            icon={<Thermometer size={16} />}
            label="Temperature"
            value="25"
            unit="°C"
          />
          <div>
            <div className="text-[10px] text-slate-200">
              PM2.5 <span className="text-slate-300">Unit:ug/m3</span>
            </div>
            <div className="text-lg font-mono text-slate-100">15</div>
          </div>
          <StatRow
            icon={<Droplets size={16} />}
            label="Humidity"
            value="30"
            unit="%"
          />
          <div>
            <div className="text-[10px] text-slate-200">
              Noise <span className="text-slate-300">Unit:dp</span>
            </div>
            <div className="text-lg font-mono text-slate-100">30</div>
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <Wind size={16} className="text-cyan-200" />
            <span className="text-[10px] text-slate-300">Wind speed</span>
            <span className="text-lg font-mono text-slate-100">3</span>
            <span className="text-[9px] text-slate-300">Force</span>
          </div>
        </div>
      </Panel>

      <Panel
        title="Office and Conference"
        icon={<Users size={12} className="text-cyan-300" />}
      >
        <div className="flex items-center gap-4">
          <DonutStat
            data={usageDonut}
            colors={[CYAN, "#123049"]}
            centerLabel="Usage rate"
            centerValue="91%"
            size={78}
          />
          <div className="flex flex-col gap-2 text-[11px]">
            <div>
              <span className="text-slate-200">In use</span>{" "}
              <span className="font-mono text-cyan-200 ml-2">521</span>
            </div>
            <div>
              <span className="text-slate-200">Idle</span>{" "}
              <span className="font-mono text-slate-200 ml-2">52</span>
            </div>
          </div>
        </div>
      </Panel>

      <Panel
        title="Conference Analysis"
        icon={<Waves size={12} className="text-cyan-300" />}
      >
        <div className="flex items-center gap-4">
          <DonutStat
            data={[{ value: 1 }]}
            colors={[BLUE]}
            centerLabel=""
            centerValue=""
            size={72}
          />
          <div className="flex flex-col gap-1.5 text-[11px] flex-1">
            {(
              [
                ["< 1 hour", "91%", "120", GREEN],
                ["1–3 hour", "27%", "375", AMBER],
                ["> 3 hour", "64%", "876", BLUE],
              ] as [string, string, string, string][]
            ).map(([l, p, n, c]) => (
              <div key={l} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-200">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: c }}
                  />
                  {l}
                </span>
                <span className="font-mono text-slate-200">{p}</span>
                <span className="font-mono text-slate-100">{n}</span>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <Panel
        title="Energy Consumption"
        icon={<Waves size={12} className="text-cyan-300" />}
        className="flex-1 min-h-0 overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-slate-200">
            Water <span className="text-slate-300">Unit: km3</span>
          </span>
          <span className="text-[10px] font-mono text-cyan-200">
            Consumption 155.5
          </span>
        </div>
        <MiniLine data={waterData} color={CYAN} />
        <div className="flex items-center justify-between mb-1 mt-2">
          <span className="text-[10px] text-slate-200">
            Electricity <span className="text-slate-300">Unit: wKwh</span>
          </span>
          <span className="text-[10px] font-mono text-amber-200">
            Consumption 5.0
          </span>
        </div>
        <MiniLine data={elecData} color={AMBER} />
      </Panel>
    </div>
  );
}

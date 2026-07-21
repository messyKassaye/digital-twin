import {
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  RadarChart,
} from "recharts";
import { Radar as RadarIcon, ShieldAlert, Waves } from "lucide-react";
import { DonutStat, GRID, Panel } from "../../../hud";
import {
  AMBER,
  BLUE,
  CYAN,
  GREEN,
  alarmDonut,
  assetRadar,
  workOrderData,
} from "../../data";

export function RightColumn() {
  return (
    <div className="ic-bg ic-gradient-right col-span-3  flex flex-col gap-3 overflow-hidden">
      <Panel
        title="Campus Assets"
        icon={<RadarIcon size={12} className="text-cyan-300" />}
      >
        <div className="h-32 -mt-1 -mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={assetRadar} outerRadius="72%">
              <PolarGrid stroke="#16324f" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fill: "#7d92ad", fontSize: 8.5 }}
              />
              <Radar dataKey="v" stroke={CYAN} fill={CYAN} fillOpacity={0.28} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel
        title="Campus Security"
        icon={<ShieldAlert size={12} className="text-cyan-300" />}
      >
        <div className="flex items-center justify-between mb-3">
<<<<<<< HEAD
          <span className="text-[10px] text-slate-200">
=======
          <span className="text-[10px] text-slate-400">
>>>>>>> 8d5beecc8f4fd7a6cb3219486180d55eafe69e33
            Total alarms today{" "}
            <span className="text-slate-600">Unit: pieces</span>
          </span>
          <span className="text-lg font-mono text-rose-300">100</span>
        </div>
<<<<<<< HEAD
        <div className="text-[10px] text-slate-100 mb-1">
=======
        <div className="text-[10px] text-slate-400 mb-1">
>>>>>>> 8d5beecc8f4fd7a6cb3219486180d55eafe69e33
          Alarm Handling Rate
        </div>
        <div className="flex items-center gap-4">
          <DonutStat
            data={alarmDonut}
            colors={[CYAN, "#12233d"]}
            centerLabel="Pending"
            centerValue="40%"
            size={78}
          />
          <div className="flex flex-col gap-2 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
<<<<<<< HEAD
              <span className="text-slate-200">Handled</span>
              <span className="font-mono text-cyan-200 ml-1">60</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span className="text-slate-200">Pending</span>
              <span className="font-mono text-slate-200 ml-1">40</span>
=======
              <span className="text-slate-400">Handled</span>
              <span className="font-mono text-cyan-200 ml-1">60</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
              <span className="text-slate-400">Pending</span>
              <span className="font-mono text-slate-300 ml-1">40</span>
>>>>>>> 8d5beecc8f4fd7a6cb3219486180d55eafe69e33
            </div>
          </div>
        </div>
      </Panel>

      <Panel
        title="Security Alarm Statistics"
        icon={<ShieldAlert size={12} className="text-cyan-300" />}
      >
        <div className="space-y-2 text-[10px]">
          <div>
            <div className="flex justify-between text-slate-400 mb-0.5">
              <span>Urgent</span>
              <span className="font-mono text-slate-300">
                Handled 7 · Pending 4
              </span>
            </div>
            <div className="h-2 w-full bg-[#0d1e35] rounded-sm overflow-hidden flex">
              <div className="h-full bg-amber-400" style={{ width: "64%" }} />
              <div className="h-full bg-[#1c3050]" style={{ width: "36%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-slate-400 mb-0.5">
              <span>Normal</span>
              <span className="font-mono text-slate-300">
                Handled 60 · Pending 33
              </span>
            </div>
            <div className="h-2 w-full bg-[#0d1e35] rounded-sm overflow-hidden flex">
              <div className="h-full bg-cyan-400" style={{ width: "65%" }} />
              <div className="h-full bg-[#1c3050]" style={{ width: "35%" }} />
            </div>
          </div>
        </div>
      </Panel>

      <Panel
        title="Work Order Statistics"
        icon={<Waves size={12} className="text-cyan-300" />}
        className="flex-1 min-h-0"
      >
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={workOrderData}
              margin={{ top: 4, right: 6, left: -22, bottom: 0 }}
            >
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis
                dataKey="t"
                tick={{ fill: "#5b6b85", fontSize: 9 }}
                axisLine={{ stroke: GRID }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#5b6b85", fontSize: 9 }}
                axisLine={false}
                tickLine={false}
                width={22}
              />
              <Tooltip
                contentStyle={{
                  background: "#081428",
                  border: "1px solid #14304f",
                  fontSize: 11,
                }}
              />
              <Line
                type="monotone"
                dataKey="closed"
                stroke={GREEN}
                strokeWidth={1.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="handle"
                stroke={AMBER}
                strokeWidth={1.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="pending"
                stroke={BLUE}
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-3 text-[9px] text-slate-400 justify-end mt-1">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Closed
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Handle
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            Pending
          </span>
        </div>
      </Panel>
    </div>
  );
}

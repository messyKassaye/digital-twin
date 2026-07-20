import { Users } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { COLORS } from "../../../../lib/theme";
import { peopleData } from "../../data";
import { Panel } from "../../../hud";

export function PeopleInCampusCard() {
  return (
    <Panel
      title="People in Campus"
      icon={<Users size={14} />}
      className="h-full"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-1 text-[10px] text-slate-400">
          <span className="text-slate-500">Unit:people</span>
          <span className="ml-auto flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]" /> In
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#34D399]" /> Out
          </span>
        </div>
        <div className="flex-1 min-h-[110px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={peopleData}
              barGap={2}
              margin={{ top: 6, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="time"
                tick={{ fill: "#64748b", fontSize: 9 }}
                axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                tickLine={false}
              />
              <Bar
                dataKey="in"
                radius={[1, 1, 0, 0]}
                fill={COLORS.blue}
                maxBarSize={10}
              />
              <Bar
                dataKey="out"
                radius={[1, 1, 0, 0]}
                fill={COLORS.green}
                maxBarSize={10}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Panel>
  );
}

import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const GRID = "#12233d";

export interface PanelProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Panel({ title, icon, children, className = "" }: PanelProps) {
  return (
    <div
      className={`relative bg-transparent border border-cyan-400/20 rounded-sm [text-shadow:0_1px_4px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="absolute -top-px left-0 h-px w-10 bg-cyan-300/70" />
      <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1.5 border-b border-cyan-400/20 bg-transparent">
        {icon}
<<<<<<< HEAD
        <span className="text-[11px] tracking-[0.12em] text-cyan-100/90 font-medium uppercase">
          {title}
        </span>
=======
        <span className="text-[11px] tracking-[0.12em] text-cyan-100/90 font-medium uppercase">{title}</span>
>>>>>>> 8d5beecc8f4fd7a6cb3219486180d55eafe69e33
      </div>
      <div className="px-3 py-2.5">{children}</div>
    </div>
  );
}

export interface StatRowProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  sub?: string;
}

export function StatRow({ icon, label, value, unit, sub }: StatRowProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-9 w-9 rounded-full border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0">
        {icon}
      </div>
      <div>
<<<<<<< HEAD
        <div className="text-[10px] text-slate-200 leading-none mb-1">
          {label}
        </div>
        <div className="text-lg font-mono text-slate-200 leading-none">
          {value}{" "}
          {unit && (
            <span className="text-[10px] text-slate-200 font-sans">{unit}</span>
          )}
        </div>
        {sub && <div className="text-[9px] text-slate-200 mt-0.5">{sub}</div>}
=======
        <div className="text-[10px] text-slate-400 leading-none mb-1">{label}</div>
        <div className="text-lg font-mono text-slate-100 leading-none">
          {value} {unit && <span className="text-[10px] text-slate-500 font-sans">{unit}</span>}
        </div>
        {sub && <div className="text-[9px] text-slate-500 mt-0.5">{sub}</div>}
>>>>>>> 8d5beecc8f4fd7a6cb3219486180d55eafe69e33
      </div>
    </div>
  );
}

export interface DonutDatum {
  value: number;
}

export interface DonutStatProps {
  data: DonutDatum[];
  colors: string[];
  centerLabel: string;
  centerValue: string;
  size?: number;
}

<<<<<<< HEAD
export function DonutStat({
  data,
  colors,
  centerLabel,
  centerValue,
  size = 96,
}: DonutStatProps) {
=======
export function DonutStat({ data, colors, centerLabel, centerValue, size = 96 }: DonutStatProps) {
>>>>>>> 8d5beecc8f4fd7a6cb3219486180d55eafe69e33
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={size * 0.34}
            outerRadius={size * 0.46}
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
<<<<<<< HEAD
        <span className="text-[9px] text-slate-200">{centerLabel}</span>
        <span className="text-sm font-mono text-cyan-200">{centerValue}</span>
=======
        <span className="text-[9px] text-slate-400">{centerLabel}</span>
        <span className="text-sm font-mono text-cyan-100">{centerValue}</span>
>>>>>>> 8d5beecc8f4fd7a6cb3219486180d55eafe69e33
      </div>
    </div>
  );
}

export interface SeriesPoint {
  t: string;
  v: number;
}

export interface MiniLineProps {
  data: SeriesPoint[];
  color: string;
}

export function MiniLine({ data, color }: MiniLineProps) {
  const gradId = `grad-${color.replace("#", "")}`;
  return (
    <div className="h-24 w-full">
      <ResponsiveContainer width="100%" height="100%">
<<<<<<< HEAD
        <AreaChart
          data={data}
          margin={{ top: 6, right: 6, left: -22, bottom: 0 }}
        >
=======
        <AreaChart data={data} margin={{ top: 6, right: 6, left: -22, bottom: 0 }}>
>>>>>>> 8d5beecc8f4fd7a6cb3219486180d55eafe69e33
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={GRID} vertical={false} />
<<<<<<< HEAD
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
            labelStyle={{ color: "#9fb3cc" }}
          />
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.75}
            fill={`url(#${gradId})`}
            dot={false}
          />
=======
          <XAxis dataKey="t" tick={{ fill: "#5b6b85", fontSize: 9 }} axisLine={{ stroke: GRID }} tickLine={false} />
          <YAxis tick={{ fill: "#5b6b85", fontSize: 9 }} axisLine={false} tickLine={false} width={22} />
          <Tooltip contentStyle={{ background: "#081428", border: "1px solid #14304f", fontSize: 11 }} labelStyle={{ color: "#9fb3cc" }} />
          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.75} fill={`url(#${gradId})`} dot={false} />
>>>>>>> 8d5beecc8f4fd7a6cb3219486180d55eafe69e33
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

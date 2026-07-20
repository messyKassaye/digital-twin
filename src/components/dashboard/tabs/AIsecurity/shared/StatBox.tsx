import type { ReactNode } from "react";

interface StatBoxProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  unit?: string;
  unitColor?: string;
}

export function StatBox({
  icon,
  label,
  value,
  unit,
  unitColor = "text-cyan-400",
}: StatBoxProps) {
  return (
    <div className="flex flex-col gap-1 py-2.5 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
        <span className="text-slate-500">{icon}</span>
        <span className="truncate">{label}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-semibold tabular-nums text-white tracking-tight">
          {value}
        </span>
        {unit && (
          <span className={`text-[10px] font-medium ${unitColor}`}>{unit}</span>
        )}
      </div>
    </div>
  );
}

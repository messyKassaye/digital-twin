import type { ReactNode } from "react";
import { COLORS } from "../../../../../lib/theme";

interface DonutRingProps {
  percent: number;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  label?: ReactNode;
  sub?: ReactNode;
  center?: ReactNode;
}

export function DonutRing({
  percent,
  size = 84,
  stroke = 7,
  color = COLORS.cyan,
  track = "rgba(255,255,255,0.07)",
  label,
  sub,
  center,
}: DonutRingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={track}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ filter: `drop-shadow(0 0 4px ${color}80)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {center ? (
          center
        ) : (
          <>
            <span className="text-[15px] font-bold text-white leading-none">
              {label}
            </span>
            {sub && (
              <span className="text-[9px] text-slate-500 mt-1">{sub}</span>
            )}
          </>
        )}
      </div>
    </div>
  );
}

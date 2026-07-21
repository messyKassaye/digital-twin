import { COLORS } from "../../../../../lib/theme";
import { radarAxes, radarValues } from "../../../data";

interface HexRadarProps {
  size?: number;
}

export function HexRadar({ size = 130 }: HexRadarProps) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 18;
  const n = radarAxes.length;

  const pt = (i: number, v: number): [number, number] => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + R * v * Math.cos(angle), cy + R * v * Math.sin(angle)];
  };

  const ringPoints = (v: number): string =>
    Array.from({ length: n }, (_, i) => pt(i, v).join(",")).join(" ");

  const dataPoints = Array.from({ length: n }, (_, i) =>
    pt(i, radarValues[i]).join(",")
  ).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {[0.33, 0.66, 1].map((v) => (
        <polygon
          key={v}
          points={ringPoints(v)}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      ))}
      {radarAxes.map((_, i) => {
        const [x, y] = pt(i, 1);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        );
      })}
      <polygon
        points={dataPoints}
        fill="rgba(56,189,248,0.25)"
        stroke={COLORS.cyan}
        strokeWidth="1.5"
      />
      {radarAxes.map((label, i) => {
        const [x, y] = pt(i, 1.28);
        return (
          <text
            key={label}
            x={x}
            y={y}
            fontSize="7"
            fill="#64748b"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}

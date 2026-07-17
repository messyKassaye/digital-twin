import { Cloud } from "lucide-react";
import { tabs } from "./data";

export function Header({ time }: { time: string }) {
  return (
    <>
      <div className="relative ic-bg flex items-center justify-between px-5 py-2.5 bg-transparent border-b border-cyan-400/20 [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-2 text-[13px] font-semibold tracking-wide text-slate-100">
          <span className="text-rose-400">◆</span> DIGITAL HAIL
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="text-cyan-300 text-sm">▦</span>
          <h1 className="text-[19px] font-bold tracking-[0.15em] text-slate-50">INTELLIGENT CAMPUS</h1>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <span className="hidden sm:inline">Intelligent Office Experience</span>
          <span className="hidden sm:inline text-cyan-300">Solution</span>
          <Cloud size={14} className="text-cyan-300" />
          <span className="font-mono text-cyan-100">{time}</span>
        </div>
      </div>

      <div className="flex ic-bg items-center justify-center gap-1 bg-transparent border-b border-cyan-400/20 text-[11px] [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]">
        {tabs.map((tab, i) => (
          <div
            key={tab}
            className={`px-5 py-1.5 tracking-wide cursor-pointer border-b-2 -mb-px ${
              i === 0 ? "border-cyan-400 text-cyan-200" : "border-transparent text-slate-300 hover:text-cyan-200"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>
    </>
  );
}
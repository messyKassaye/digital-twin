import { Users } from "lucide-react";
import { Panel } from "../../../hud";
import { guards } from "../../data";

export function GuardSchedulingCard() {
  return (
    <Panel title="Security Guard Scheduling" icon={<Users size={14} />}>
      <div className="text-[10.5px]">
        <div className="grid grid-cols-4 gap-2 text-slate-500 pb-2 border-b border-white/5">
          <span>Name</span>
          <span>Contact</span>
          <span>Department</span>
          <span>Leader on Duty</span>
        </div>
        {guards.map((g) => (
          <div
            key={g.name}
            className="grid grid-cols-4 gap-2 py-2 border-b border-white/5 last:border-0 text-slate-300"
          >
            <span className="text-white">{g.name}</span>
            <span className="tabular-nums">{g.contact}</span>
            <span>{g.dept}</span>
            <span>{g.leader}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

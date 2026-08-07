import { useEffect, useRef, useState } from "react";
import usePersonStore from "../../store/usePersonStore";
import { PersonStanding, X } from "lucide-react";

const Persons = () => {
  const totalPersons = usePersonStore((s) => s.totalPersons);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showTooltip) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setShowTooltip(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setShowTooltip(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showTooltip]);

  return (
    <div className="flex justify-center gap-2 pt-1">
      <div
        ref={tooltipRef}
        className="relative pointer-events-auto bg-transparent border border-cyan-400/20 px-3 py-1.5 rounded-sm min-w-[130px]"
      >
        <div
          onClick={() => setShowTooltip((v) => !v)}
          className="cursor-pointer text-[11px] text-slate-100 flex items-center gap-1"
        >
          <PersonStanding size={10} className="text-cyan-200" />
          Personnel number:
        </div>
        <div
          onClick={() => setShowTooltip((v) => !v)}
          className="cursor-pointer text-base font-mono text-cyan-100"
        >
          {totalPersons.toLocaleString()}
        </div>

        {showTooltip && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-slate-950/95 border border-cyan-400/30 rounded-sm px-3 py-2 shadow-[0_0_12px_rgba(34,211,238,0.15)] z-20">
            {/* little arrow pointing up */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-slate-950/95 border-l border-t border-cyan-400/30 rotate-45" />

            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-1 right-1 text-slate-400 hover:text-cyan-200 transition-colors"
              aria-label="Close"
            >
              <X size={12} />
            </button>

            <div className="text-[10px] text-cyan-200 font-mono uppercase tracking-wide mb-1 pr-4">
              Personnel Breakdown
            </div>
            <div className="flex justify-between text-[11px] text-slate-200 font-mono">
              <span>Total</span>
              <span className="text-cyan-100">
                {totalPersons.toLocaleString()}
              </span>
            </div>
            {/* Add more breakdown rows here as data becomes available,
                  e.g. staff / patients / visitors */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Persons;

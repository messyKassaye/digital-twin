import { useState } from "react";
import { ParkingSquare, X } from "lucide-react";
import { useInitialParkingSlots } from "../../hooks/useParkingSlots";
import useParkingStore from "../../store/useParkingStore";

const PAGE_SIZE = 200;

const Parking = () => {
  useInitialParkingSlots();
  // must match backend exactly: Controller('parking') + Sse('stream/parking')

  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);

  const slots = useParkingStore((s) => s.slots);
  const vehiclesOnCampus = useParkingStore((s) => s.vehiclesOnCampus);
  const totalCapacity = useParkingStore((s) => s.totalCapacity);
  const isLoaded = useParkingStore((s) => s.isLoaded);

  const availableSpots = Math.max(0, totalCapacity - vehiclesOnCampus);
  const totalPages = Math.ceil(slots.length / PAGE_SIZE);
  const visibleSlots = slots.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );

  const parkingStats: [string, string, boolean][] = [
    [
      "Vehicles on campus",
      isLoaded ? vehiclesOnCampus.toLocaleString() : "—",
      false,
    ],
    [
      "Available Parking",
      isLoaded ? `${availableSpots} / ${totalCapacity.toLocaleString()}` : "—",
      true,
    ],
  ];

  return (
    <>
      <div className="flex justify-center gap-2 pt-1 pointer-events-auto">
        {parkingStats.map(([l, v, clickable]) => (
          <div
            key={l}
            onClick={clickable ? () => setIsOpen(true) : undefined}
            className={`bg-transparent border border-cyan-400/20 px-3 py-1.5 rounded-sm min-w-[130px] ${
              clickable
                ? "cursor-pointer hover:border-cyan-400/50 transition-colors"
                : ""
            }`}
          >
            <div className="text-[11px] text-slate-100 flex items-center gap-1">
              <ParkingSquare size={10} className="text-cyan-200" />
              {l}
            </div>
            <div className="text-base font-mono text-cyan-100">{v}</div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 pointer-events-auto"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-slate-900 no-scrollbar border border-cyan-400/20 rounded-sm p-4 max-w-2xl w-full max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-slate-100 flex items-center gap-2">
                <ParkingSquare size={14} className="text-cyan-200" />
                Slot map — page {page + 1} of {totalPages}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex gap-4 mb-3 text-[11px] text-slate-300">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-cyan-500/70 border border-cyan-400/40 inline-block rounded-[2px]" />
                Taken
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-transparent border border-slate-500/40 inline-block rounded-[2px]" />
                Free
              </span>
            </div>

            <div className="grid grid-cols-10 sm:grid-cols-16 gap-1">
              {visibleSlots.map((slot) => (
                <div
                  key={slot.slotId}
                  title={`${slot.slotId} — ${slot.taken ? "taken" : "free"}`}
                  className={`w-5 h-5 rounded-[2px] border ${
                    slot.taken
                      ? "bg-cyan-500/70 border-cyan-400/40"
                      : "bg-transparent border-slate-500/40"
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-between mt-3 text-[11px] text-slate-300">
              <button
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className="disabled:opacity-30 hover:text-cyan-200"
              >
                ← Prev
              </button>
              <button
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                className="disabled:opacity-30 hover:text-cyan-200"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Parking;

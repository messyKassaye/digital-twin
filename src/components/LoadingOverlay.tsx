export function LoadingOverlay({ visible }: { visible: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-[#050b16] transition-opacity duration-700 ${
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <div className="h-10 w-10 rounded-full border-2 border-cyan-400/30 border-t-cyan-300 animate-spin" />
      <div className="text-[11px] tracking-[0.2em] text-cyan-200 font-mono">LOADING CAMPUS MODEL…</div>
    </div>
  );
}
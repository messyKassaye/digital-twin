export function SidebarHeader({
  count,
  search,
  onSearchChange,
}: {
  count: number;
  search: string;
  onSearchChange: (val: string) => void;
}) {
  return (
    <div className="ic-header-title-row ic-bg w-full">
      <div className="ic-module-badge">
        <svg viewBox="0 0 24 24">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L20 8.5v7L12 19.82 4 15.5v-7L12 4.18z" />
        </svg>
      </div>
      <div className="ic-title-text">
        <div className="ic-title-main">Campus 3D visualizer</div>
        <div className="ic-title-sub">TOWER / LIGHT / COMMUNICATIONS</div>
      </div>
      <div className="ic-count-badge">{count}</div>

      <div className="ic-search-wrap">
        <div className="ic-search-icon-wrap">
          <span className="ic-search-icon">⌕</span>
          <input
            className="ic-search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search assets..."
          />
        </div>
      </div>
    </div>
  );
}

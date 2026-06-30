import { CATEGORIES, CATEGORY_COLORS } from "../data";

export function CategoryFilters({
  filter,
  onFilterChange,
  hasOverrides,
  overrideCount,
  onResetAll,
}: {
  filter: string;
  onFilterChange: (cat: string) => void;
  hasOverrides: boolean;
  overrideCount: number;
  onResetAll: () => void;
}) {
  return (
    <div className="ic-categories-row">
      <div className="ic-categories">
        {CATEGORIES.map((cat) => {
          const active = filter === cat;
          const col = CATEGORY_COLORS[cat];
          return (
            <button
              key={cat}
              className="ic-cat-btn"
              onClick={() => onFilterChange(cat)}
              style={{
                background: active ? col : "transparent",
                color: active ? "#000" : col,
                borderColor: col,
                boxShadow: active ? `0 0 8px ${col}55` : "none",
                fontWeight: active ? 700 : 400,
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {hasOverrides && (
        <button className="ic-reset-btn" onClick={onResetAll}>
          ↺ RESET ALL ({overrideCount})
        </button>
      )}
    </div>
  );
}

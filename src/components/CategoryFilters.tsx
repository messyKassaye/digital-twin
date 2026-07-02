import type { CSSProperties } from "react";
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
      <span className="ic-filter-corner ic-filter-corner-tl" />
      <span className="ic-filter-corner ic-filter-corner-br" />

      <div className="ic-categories">
        {CATEGORIES.map((cat) => {
          const active = filter === cat.value;
          const col = CATEGORY_COLORS[cat.value];

          return (
            <button
              key={cat.value}
              className={`ic-cat-btn${active ? " active" : ""}`}
              aria-pressed={active}
              onClick={() => onFilterChange(cat.value)}
              style={{ "--cat-color": col } as CSSProperties}
            >
              <span className="ic-cat-scan" />
              <span className="ic-cat-label">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {hasOverrides && (
        <button className="ic-reset-btn" onClick={onResetAll}>
          <span>RESET</span>
          <span className="ic-reset-count">{overrideCount}</span>
        </button>
      )}
    </div>
  );
}

import { MaterialInfo, StreetMeshEntry } from "../types";
import { SidebarHeader } from "./SidebarHeader";
import { CategoryFilters } from "./CategoryFilters";
import { MaterialList } from "./MaterialList";
import { SelectedMaterialFooter } from "./SelectedMaterialFooter";

export function MaterialSidebar({
  open,
  totalCount,
  search,
  onSearchChange,
  filter,
  onFilterChange,
  filtered,
  selectedMaterial,
  colorOverrides,
  onSelect,
  onColorChange,
  onColorReset,
  onResetAll,
  streetMeshEntries,
  selectedMeshUUID,
  onMeshSelect,
  selectedInfo,
  onClearSelection,
}: {
  open: boolean;
  totalCount: number;
  search: string;
  onSearchChange: (val: string) => void;
  filter: string;
  onFilterChange: (cat: string) => void;
  filtered: MaterialInfo[];
  selectedMaterial: string | null;
  colorOverrides: Record<string, string>;
  onSelect: (matName: string) => void;
  onColorChange: (matName: string, hex: string) => void;
  onColorReset: (matName: string) => void;
  onResetAll: () => void;
  streetMeshEntries: Map<string, StreetMeshEntry>;
  selectedMeshUUID: string | null;
  onMeshSelect: (uuid: string) => void;
  selectedInfo: MaterialInfo | undefined;
  onClearSelection: () => void;
}) {
  const hasOverrides = Object.keys(colorOverrides).length > 0;

  return (
    <div
      className="ic-sidebar"
      style={{ transform: open ? "translateY(0)" : "translateY(-100%)" }}
    >
      {/* ── Left pane: asset browser ── */}
      <div className="ic-pane ic-pane-left">
        <SidebarHeader
          count={totalCount}
          search={search}
          onSearchChange={onSearchChange}
        />

        <CategoryFilters
          filter={filter}
          onFilterChange={onFilterChange}
          hasOverrides={hasOverrides}
          overrideCount={Object.keys(colorOverrides).length}
          onResetAll={onResetAll}
        />

        <MaterialList
          materials={filtered}
          selectedMaterial={selectedMaterial}
          colorOverrides={colorOverrides}
          onSelect={onSelect}
          onColorChange={onColorChange}
          onColorReset={onColorReset}
        />
      </div>

      {/* ── Right pane: properties ── */}
      <div className="ic-pane ic-pane-right">
        <div className="ic-pane-label-row">
          <span className="ic-pane-label">Properties</span>
        </div>
        <div className="ic-props-body">
          {selectedInfo ? (
            <SelectedMaterialFooter
              selectedInfo={selectedInfo}
              colorOverrides={colorOverrides}
              onColorChange={onColorChange}
              onColorReset={onColorReset}
              onClear={onClearSelection}
              streetMeshEntries={streetMeshEntries}
              selectedMeshUUID={selectedMeshUUID}
              onMeshSelect={onMeshSelect}
            />
          ) : (
            <div className="ic-props-empty">
              <div className="ic-props-empty-icon">◇</div>
              <div className="ic-props-empty-text">
                Select an asset to view properties
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

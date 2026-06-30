import { MaterialInfo, StreetMeshEntry } from "../types";
import { CategoryFilters } from "./CategoryFilters";
import { MaterialList } from "./MaterialList";
import { SelectedMaterialFooter } from "./SelectedMaterialFooter";
import { SidebarHeader } from "./SidebarHeader";

const MenuSelector = ({
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
}) => {
  const hasOverrides = Object.keys(colorOverrides).length > 0;

  if (!open) return null;

  return (
    <div className="w-full h-full flex flex-col absolute top-0 left-0 z-50 pointer-events-none">
      <div className="w-full pointer-events-auto">
        <SidebarHeader
          count={totalCount}
          search={search}
          onSearchChange={onSearchChange}
        />
      </div>

      <div className="w-full h-full flex items-start justify-between">
        <div className="pointer-events-auto">
          <CategoryFilters
            filter={filter}
            onFilterChange={onFilterChange}
            hasOverrides={hasOverrides}
            overrideCount={Object.keys(colorOverrides).length}
            onResetAll={onResetAll}
          />
        </div>

        <div className="pointer-events-auto">
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
            <MaterialList
              materials={filtered}
              selectedMaterial={selectedMaterial}
              colorOverrides={colorOverrides}
              onSelect={onSelect}
              onColorChange={onColorChange}
              onColorReset={onColorReset}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuSelector;

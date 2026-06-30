import { MaterialInfo, StreetMeshEntry } from "../types";
import { cleanName } from "../utils";
import { StreetAssetMeshList } from "./StreetAssetMeshList";

export function SelectedMaterialFooter({
  selectedInfo,
  colorOverrides,
  onColorChange,
  onColorReset,
  onClear,
  streetMeshEntries,
  selectedMeshUUID,
  onMeshSelect,
}: {
  selectedInfo: MaterialInfo;
  colorOverrides: Record<string, string>;
  onColorChange: (matName: string, hex: string) => void;
  onColorReset: (matName: string) => void;
  onClear: () => void;
  streetMeshEntries: Map<string, StreetMeshEntry>;
  selectedMeshUUID: string | null;
  onMeshSelect: (uuid: string) => void;
}) {
  const overrideColor = colorOverrides[selectedInfo.name];

  return (
    <div className="ic-selected-prop p-2">
      <div className="ic-footer-label">Selected Asset</div>
      <div className="ic-footer-name">{cleanName(selectedInfo.name)}</div>
      <div className="ic-footer-raw">{selectedInfo.name}</div>
      <div className="ic-color-row">
        <span className="ic-color-label">COLOR</span>
        <input
          type="color"
          className="ic-color-picker"
          value={overrideColor ?? selectedInfo.color}
          onChange={(e) => onColorChange(selectedInfo.name, e.target.value)}
        />
        <span className="ic-color-hex">
          {overrideColor ?? selectedInfo.color}
        </span>
        {overrideColor && (
          <button
            className="ic-reset-icon"
            onClick={() => onColorReset(selectedInfo.name)}
          >
            ↺
          </button>
        )}
      </div>
      <button className="ic-clear-btn" onClick={onClear}>
        ✕ Clear Selection
      </button>

      {selectedInfo.name === "Street_Assets" && (
        <StreetAssetMeshList
          entries={streetMeshEntries}
          selectedUUID={selectedMeshUUID}
          onSelect={onMeshSelect}
        />
      )}
    </div>
  );
}

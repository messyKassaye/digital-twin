import { MaterialInfo } from "../types";
import { cleanName } from "../utils";

export function MaterialList({
  materials,
  selectedMaterial,
  colorOverrides,
  onSelect,
  onColorChange,
  onColorReset,
}: {
  materials: MaterialInfo[];
  selectedMaterial: string | null;
  colorOverrides: Record<string, string>;
  onSelect: (matName: string) => void;
  onColorChange: (matName: string, hex: string) => void;
  onColorReset: (matName: string) => void;
}) {
  return (
    <div className="ic-mat-list">
      {materials.map((mat) => {
        const isSel = selectedMaterial === mat.name;
        const overrideColor = colorOverrides[mat.name];
        const displayColor = overrideColor ?? mat.color;
        const isOverridden = !!overrideColor;

        return (
          <div
            key={mat.index}
            className={`ic-mat-row${isSel ? " selected" : ""}`}
          >
            <div className="ic-mat-inner" onClick={() => onSelect(mat.name)}>
              <div className="ic-swatch-wrap">
                <div
                  className={`ic-swatch${isOverridden ? " overridden" : ""}`}
                  style={{ background: displayColor }}
                />
                <input
                  type="color"
                  className="ic-swatch-input"
                  value={displayColor}
                  onChange={(e) => onColorChange(mat.name, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  title="Pick color"
                />
              </div>

              <div className="ic-mat-info">
                <div className="ic-mat-name">
                  {cleanName(mat.label ? mat.label : mat.name)}
                  {isOverridden && <span className="ic-override-dot">◉</span>}
                </div>
                <div className="ic-mat-cat">{mat.category}</div>
              </div>

              {isOverridden && (
                <button
                  className="ic-reset-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onColorReset(mat.name);
                  }}
                  title="Reset color"
                >
                  ↺
                </button>
              )}

              <div className="ic-mat-action">{isSel ? "◆" : "◇"}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

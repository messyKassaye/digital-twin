import { StreetMeshEntry } from "../types";

export function StreetAssetMeshList({
  entries,
  selectedUUID,
  onSelect,
}: {
  entries: Map<string, StreetMeshEntry>;
  selectedUUID: string | null;
  onSelect: (uuid: string) => void;
}) {
  if (entries.size === 0) return null;
  return (
    <div style={{ borderTop: "1px solid rgba(0,200,255,0.1)" }}>
      <div className="ic-section-label">
        STREET ASSETS — {entries.size} meshes
      </div>
      <div className="ic-mesh-list">
        {[...entries.entries()].map(([uuid, { mesh }]) => {
          const isSel = selectedUUID === uuid;
          const label = mesh.name || `Mesh_${uuid.slice(0, 6)}`;
          return (
            <div
              key={uuid}
              className={`ic-mesh-row${isSel ? " selected" : ""}`}
              onClick={() => onSelect(uuid)}
            >
              <div className="ic-mesh-dot" />
              <div className="ic-mesh-name">{label}</div>
              <div
                style={{
                  fontSize: 10,
                  color: isSel ? "#ff9999" : "#333",
                  flexShrink: 0,
                }}
              >
                {isSel ? "◆" : "◇"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

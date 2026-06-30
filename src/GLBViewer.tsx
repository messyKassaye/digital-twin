import { Suspense, useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import { GLOBAL_STYLES } from "./styles";
import { MATERIALS } from "./data";
import { cleanName } from "./utils";
import { StreetMeshEntry } from "./types";

import { LoadingOverlay } from "./components/LoadingOverlay";
import { MaterialSidebar } from "./components/MaterialSidebar";
import { Scene } from "./components/Scene";
import MenuSelector from "./components/MenuSelector";

export default function GLBViewer({
  url = "/model/tower_glass_c.glb",
}: {
  url?: string;
}) {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [panTarget, setPanTarget] = useState<THREE.Vector3 | null>(null);
  const [meshMap, setMeshMap] = useState<Map<string, THREE.Vector3>>(new Map());
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [colorOverrides, setColorOverrides] = useState<Record<string, string>>(
    {},
  );
  const [streetMeshEntries, setStreetMeshEntries] = useState<
    Map<string, StreetMeshEntry>
  >(new Map());
  const [selectedMeshUUID, setSelectedMeshUUID] = useState<string | null>(null);

  const handleSelect = useCallback(
    (matName: string) => {
      if (selectedMaterial === matName) {
        setSelectedMaterial(null);
        setPanTarget(null);
        if (matName === "Street_Assets") setSelectedMeshUUID(null);
        return;
      }
      setSelectedMaterial(matName);
      const center = meshMap.get(matName);
      if (center) setPanTarget(center.clone());
      if (matName !== "Street_Assets") setSelectedMeshUUID(null);
    },
    [selectedMaterial, meshMap],
  );

  const handleMeshSelect = useCallback(
    (uuid: string) => {
      if (selectedMeshUUID === uuid) {
        setSelectedMeshUUID(null);
        return;
      }
      setSelectedMeshUUID(uuid);
      const entry = streetMeshEntries.get(uuid);
      if (entry) {
        const box = new THREE.Box3().setFromObject(entry.mesh);
        setPanTarget(box.getCenter(new THREE.Vector3()));
      }
    },
    [selectedMeshUUID, streetMeshEntries],
  );

  const handleColorChange = useCallback((matName: string, hex: string) => {
    setColorOverrides((prev) => ({ ...prev, [matName]: hex }));
  }, []);

  const handleColorReset = useCallback((matName: string) => {
    setColorOverrides((prev) => {
      const next = { ...prev };
      delete next[matName];
      return next;
    });
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedMaterial(null);
    setPanTarget(null);
    setSelectedMeshUUID(null);
  }, []);

  const filtered = MATERIALS.filter((m) => {
    const matchCat = filter === "all" || m.category === filter;
    const matchSearch = cleanName(m.name)
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const selectedInfo = MATERIALS.find((m) => m.name === selectedMaterial);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        fontFamily: "system-ui,sans-serif",
      }}
    >
      <style>{GLOBAL_STYLES}</style>

      {!loaded && <LoadingOverlay />}

      {loaded && (
        <MenuSelector
          open={sidebarOpen}
          totalCount={MATERIALS.length}
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
          filtered={filtered}
          selectedMaterial={selectedMaterial}
          colorOverrides={colorOverrides}
          onSelect={handleSelect}
          onColorChange={handleColorChange}
          onColorReset={handleColorReset}
          onResetAll={() => setColorOverrides({})}
          streetMeshEntries={streetMeshEntries}
          selectedMeshUUID={selectedMeshUUID}
          onMeshSelect={handleMeshSelect}
          selectedInfo={selectedInfo}
          onClearSelection={handleClearSelection}
        />
      )}

      <Canvas
        camera={{ position: [0, 50, 0], fov: 45, near: 0.1, far: 5000 }}
        shadows
      >
        <Suspense fallback={null}>
          <Scene
            url={url}
            selectedMaterial={selectedMaterial}
            colorOverrides={colorOverrides}
            onMeshMap={setMeshMap}
            panTarget={panTarget}
            onLoaded={() => setLoaded(true)}
            onStreetMeshesReady={setStreetMeshEntries}
            selectedMeshUUID={selectedMeshUUID}
          />
        </Suspense>
      </Canvas>

      {loaded && !selectedMaterial && (
        <div className="ic-hint">
          SELECT MATERIAL TO HIGHLIGHT · CLICK SWATCH TO REPAINT
        </div>
      )}
    </div>
  );
}

GLBViewer.preload = (url: string) => useGLTF.preload(url);

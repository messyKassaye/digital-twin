import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { useClock } from "../hooks/useClock";
import { Scene } from "./SceneBackground";
import { Header } from "./dashboard/Header";
import { LoadingOverlay } from "./LoadingOverlay";
import { StreetMeshEntry } from "../types";
import OverView from "./dashboard/tabs/OverView/OverView";
import dashboardState from "../store/useDashboardStore";
import AIsecurityDashboard from "./dashboard/tabs/AIsecurity/AIsecurityDashboard";
import { useDangerEvents } from "../hooks/useDangerEvents";
import { DangerAlertOverlay } from "./DangerAlertOverlay";
import { API_URL } from "../config/dot-env-config";
import { useSirenAlarm } from "../hooks/useSirenAlarm";

export default function IntelligentCampusDashboard() {
  const { selectedTab, glbUrl, setGlbUrl } = dashboardState();
  const { time, date } = useClock();
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [panTarget, setPanTarget] = useState<THREE.Vector3 | null>(null);
  const [meshMap, setMeshMap] = useState<Map<string, THREE.Vector3>>(new Map());
  const [loaded, setLoaded] = useState(false);
  const [colorOverrides, setColorOverrides] = useState<Record<string, string>>(
    {},
  );
  const [streetMeshEntries, setStreetMeshEntries] = useState<
    Map<string, StreetMeshEntry>
  >(new Map());
  const [selectedMeshUUID, setSelectedMeshUUID] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);

  // track the blob URL we created so we can revoke it when it's replaced
  const objectUrlRef = useRef<string | null>(null);
  useDangerEvents(`${API_URL}/events/stream/danger`, loaded);

  const { unlocked, unlockAudio } = useSirenAlarm(muted);

  useEffect(() => {
    console.log(streetMeshEntries, meshMap);
    setSelectedMeshUUID(null);
    setColorOverrides({});
    setPanTarget(null);
    setSelectedMaterial(null);
  }, []);

  // revoke the last blob URL on unmount to avoid leaking memory
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handleUpload = useCallback(
    (file: File) => {
      // free the previous blob URL, if any, before creating a new one
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);

      const newUrl = URL.createObjectURL(file);
      objectUrlRef.current = newUrl;

      setLoaded(false); // show the loading overlay while the new model loads
      setGlbUrl?.(newUrl);
    },
    [setGlbUrl],
  );

  const handleSelect = useCallback(
    (matName: string, hex?: string) => {
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
      if (hex) setColorOverrides((prev) => ({ ...prev, [matName]: hex }));
    },
    [selectedMaterial, meshMap],
  );

  const renderTab = () => {
    switch (selectedTab.id) {
      case 1:
        return <OverView date={date} />;
      case 2:
        return <AIsecurityDashboard date={date} />;
      default:
        return <OverView date={date} />;
    }
  };
  return (
    <div className="relative pointer-events-none w-full min-h-screen bg-[#050b16] text-slate-200 font-sans overflow-hidden">
      {/* 3D scene stays mounted and keeps loading regardless of `loaded` */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Canvas
          camera={{ position: [0, 50, 0], fov: 45, near: 0.1, far: 5000 }}
          shadows
        >
          <Suspense fallback={null}>
            <Scene
              url={glbUrl ?? "/model/tower_glass_c.glb"}
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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(3,6,13,0.55)_100%)]" />
      </div>

      {/* Foreground HUD — only rendered once the model has finished loading */}
      <LoadingOverlay visible={!loaded} />
      {loaded && (
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header time={time} onSelect={handleSelect} onUpload={handleUpload} />
          {renderTab()}
        </div>
      )}
      <DangerAlertOverlay onNavigate={handleSelect} />
      {/* Audio unlock / mute control — browsers block autoplay until a click happens */}
      {!unlocked ? (
        <button
          onClick={unlockAudio}
          className="pointer-events-auto fixed bottom-4 right-4 z-50 bg-slate-900/90 border border-cyan-400/40 text-cyan-100 text-xs px-3 py-2 rounded-lg hover:border-cyan-400/70 transition-colors"
        >
          🔊 Enable alert sounds
        </button>
      ) : (
        <button
          onClick={() => setMuted((m) => !m)}
          className="pointer-events-auto fixed bottom-4 right-4 z-50 bg-slate-900/90 border border-cyan-400/40 text-cyan-100 text-xs px-3 py-2 rounded-lg hover:border-cyan-400/70 transition-colors"
        >
          {muted ? "🔇 Unmute alerts" : "🔊 Mute alerts"}
        </button>
      )}
    </div>
  );
}

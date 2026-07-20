import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import * as THREE from "three";

import { useClock } from "../hooks/useClock";
import { Scene } from "./SceneBackground";
import { Header } from "./dashboard/Header";
import { LoadingOverlay } from "./LoadingOverlay";
import { StreetMeshEntry } from "../types";
import OverView from "./dashboard/tabs/OverView/OverView";
import dashboardState from "../store/dashboard-state";
import AIsecurity from "./dashboard/tabs/AIsecurity/AIsecurityDashboard";

export default function IntelligentCampusDashboard({
  url = "/model/tower_glass_c.glb",
}: {
  url?: string;
}) {
  const { selectedTab } = dashboardState();
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

  const renderTab = () => {
    switch (selectedTab.id) {
      case 1:
        return <OverView date={date} />;
      case 2:
        return <AIsecurity date={date} />;
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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(3,6,13,0.55)_100%)]" />
      </div>

      {/* Foreground HUD — only rendered once the model has finished loading */}
      <LoadingOverlay visible={!loaded} />
      {loaded && (
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header time={time} />
          {renderTab()}
        </div>
      )}
    </div>
  );
}

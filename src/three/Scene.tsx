import { Suspense, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Grid } from "@react-three/drei";
import * as THREE from "three";
import { getTimeConfig } from "./utils";
import { RealSky } from "./RealSky";
import { Model } from "./Model";
import { PanToTarget } from "./PanToTarget";
import { StreetMeshEntry } from "./types";

export function Scene({
  url,
  selectedMaterial,
  colorOverrides,
  onMeshMap,
  panTarget,
  onLoaded,
  onStreetMeshesReady,
  selectedMeshUUID,
}: {
  url: string;
  selectedMaterial: string | null;
  colorOverrides: Record<string, string>;
  onMeshMap: (map: Map<string, THREE.Vector3>) => void;
  panTarget: THREE.Vector3 | null;
  onLoaded: () => void;
  onStreetMeshesReady: (registry: Map<string, StreetMeshEntry>) => void;
  selectedMeshUUID: string | null;
}) {
  const gridRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const config = useMemo(() => getTimeConfig(), []);

  const handleLoad = (box: THREE.Box3) => {
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    camera.position.set(
      center.x,
      center.y + size.y * 0.1,
      center.z + maxDim * 0.8,
    );
    camera.lookAt(center);
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    if (controlsRef.current) {
      controlsRef.current.target.copy(center);
      controlsRef.current.update();
    }
    if (gridRef.current) gridRef.current.position.y = box.min.y - 0.1;
    onLoaded();
  };

  return (
    <>
      <ambientLight intensity={config.ambientIntensity} />
      <directionalLight
        position={config.sunPosition.toArray()}
        intensity={config.sunIntensity}
        castShadow
        color={config.sunColor}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={500}
        shadow-camera-left={-200}
        shadow-camera-right={200}
        shadow-camera-top={200}
        shadow-camera-bottom={-200}
      />
      <directionalLight
        position={[-50, 40, -30]}
        intensity={config.sunIntensity * 0.3}
        color={config.fillColor}
      />
      <hemisphereLight
        args={[config.hemisphereSky, config.hemisphereGround, 1.0]}
      />
      <RealSky hdri={config.hdri} />
      {!config.isDay && (
        <Stars radius={300} depth={60} count={4000} factor={4} fade />
      )}
      <Suspense fallback={null}>
        <Model
          url={url}
          selectedMaterial={selectedMaterial}
          colorOverrides={colorOverrides}
          onLoad={handleLoad}
          onMeshMap={onMeshMap}
          onStreetMeshesReady={onStreetMeshesReady}
          selectedMeshUUID={selectedMeshUUID}
        />
      </Suspense>
      <Grid
        ref={gridRef}
        position={[0, -0.1, 0]}
        args={[500, 500]}
        cellSize={2}
        cellThickness={0.5}
        cellColor={config.gridCell}
        sectionSize={10}
        sectionThickness={1}
        sectionColor={config.gridSection}
        fadeDistance={200}
        fadeStrength={1.5}
        followCamera={false}
        infiniteGrid
      />
      <PanToTarget target={panTarget} controlsRef={controlsRef} />
      <OrbitControls
        ref={controlsRef}
        enablePan
        enableZoom
        enableRotate
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={5}
        maxDistance={500}
      />
    </>
  );
}

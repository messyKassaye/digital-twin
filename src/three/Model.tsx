import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { StreetMeshEntry } from "./types";

/**
 * Placeholder — replace with your project's real `Model.tsx` (material
 * extraction, street-mesh registry, selection highlighting, etc). This
 * version covers the same prop contract so `Scene.tsx` works unmodified:
 * loads the GLB, normalizes its scale/position, reports a mesh map and a
 * street-mesh registry, applies simple color overrides, and highlights the
 * selected material / mesh.
 */
interface ModelProps {
  url: string;
  selectedMaterial: string | null;
  colorOverrides: Record<string, string>;
  onLoad: (box: THREE.Box3) => void;
  onMeshMap: (map: Map<string, THREE.Vector3>) => void;
  onStreetMeshesReady: (registry: Map<string, StreetMeshEntry>) => void;
  selectedMeshUUID: string | null;
}

export function Model({
  url,
  selectedMaterial,
  colorOverrides,
  onLoad,
  onMeshMap,
  onStreetMeshesReady,
  selectedMeshUUID,
}: ModelProps) {
  const { scene } = useGLTF(url);
  const prepared = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    const rawBox = new THREE.Box3().setFromObject(prepared);
    const size = rawBox.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 40 / maxDim; // normalize onto a footprint that reads well against the HUD grid

    prepared.scale.setScalar(scale);
    const center = rawBox.getCenter(new THREE.Vector3()).multiplyScalar(scale);
    prepared.position.sub(center);

    const meshMap = new Map<string, THREE.Vector3>();
    const streetMeshes = new Map<string, StreetMeshEntry>();

    prepared.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;

      mesh.castShadow = true;
      mesh.receiveShadow = true;
      meshMap.set(mesh.uuid, mesh.getWorldPosition(new THREE.Vector3()));
      streetMeshes.set(mesh.uuid, { uuid: mesh.uuid, name: mesh.name, mesh });

      const material = mesh.material as THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[];
      const materials = Array.isArray(material) ? material : [material];
      materials.forEach((mat) => {
        if (!mat) return;
        const override = colorOverrides[mat.name];
        if (override) mat.color = new THREE.Color(override);
        if (selectedMaterial && mat.name === selectedMaterial) {
          mat.emissive = new THREE.Color("#22d3ee");
          mat.emissiveIntensity = 0.4;
        }
      });
    });

    onMeshMap(meshMap);
    onStreetMeshesReady(streetMeshes);
    onLoad(new THREE.Box3().setFromObject(prepared));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prepared, colorOverrides, selectedMaterial]);

  useEffect(() => {
    prepared.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const material = mesh.material as THREE.MeshStandardMaterial;
      if (!material || !("emissive" in material)) return;
      const isSelected = mesh.uuid === selectedMeshUUID;
      material.emissive = new THREE.Color(isSelected ? "#22d3ee" : "#000000");
      material.emissiveIntensity = isSelected ? 0.6 : 0;
    });
  }, [prepared, selectedMeshUUID]);

  return <primitive object={prepared} />;
}

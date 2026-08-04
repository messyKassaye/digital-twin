import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { StreetMeshEntry } from "../types";

export function Model({
  url,
  selectedMaterial,
  colorOverrides,
  onLoad,
  onMeshMap,
  onStreetMeshesReady,
  selectedMeshUUID,
}: {
  url: string;
  selectedMaterial: string | null;
  colorOverrides: Record<string, string>;
  onLoad: (box: THREE.Box3) => void;
  onMeshMap: (map: Map<string, THREE.Vector3>) => void;
  onStreetMeshesReady: (registry: Map<string, StreetMeshEntry>) => void;
  selectedMeshUUID: string | null;
}) {
  const { scene } = useGLTF(url);
  const originalColors = useRef<Map<string, THREE.Color>>(new Map());
  const originalEmissives = useRef<Map<string, THREE.Color>>(new Map());
  const streetMeshRegistry = useRef<Map<string, StreetMeshEntry>>(new Map());
  const [extractedMaterial, setExtractedMaterial] = useState(
    null as Map<
      string,
      { material: THREE.MeshStandardMaterial; meshCount: number }
    > | null,
  );

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    onLoad(box);
    const materialRegistry = new Map<
      string,
      { material: THREE.MeshStandardMaterial; meshCount: number }
    >();
    const matCenterMap = new Map<string, THREE.Box3>();
    const newRegistry = new Map<string, StreetMeshEntry>();
    let fallbackIndex = 0;

    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach((mat: THREE.MeshStandardMaterial) => {
        if (!mat.name) {
          fallbackIndex += 1;
          mat.name = `Material_${fallbackIndex}`;
        }

        if (!originalColors.current.has(mat.name)) {
          originalColors.current.set(mat.name, mat.color.clone());
          originalEmissives.current.set(mat.name, mat.emissive.clone());
        }
        const meshBox = new THREE.Box3().setFromObject(obj);
        if (matCenterMap.has(mat.name))
          matCenterMap.get(mat.name)!.union(meshBox);
        else matCenterMap.set(mat.name, meshBox.clone());

        const existing = materialRegistry.get(mat.name);
        if (existing) existing.meshCount += 1;
        else materialRegistry.set(mat.name, { material: mat, meshCount: 1 });

        if (mat.name === "Street_Assets" && !newRegistry.has(obj.uuid)) {
          const clonedMat = mat.clone() as THREE.MeshStandardMaterial;
          obj.material = Array.isArray(obj.material)
            ? obj.material.map((m) =>
                m.name === "Street_Assets" ? clonedMat : m,
              )
            : clonedMat;
          newRegistry.set(obj.uuid, {
            mesh: obj as THREE.Mesh,
            originalMat: clonedMat.clone(),
          });
        }
      });
    });

    const centerMap = new Map<string, THREE.Vector3>();
    matCenterMap.forEach((b, n) =>
      centerMap.set(n, b.getCenter(new THREE.Vector3())),
    );
    setExtractedMaterial(materialRegistry);
    onMeshMap(centerMap);
    streetMeshRegistry.current = newRegistry;
    onStreetMeshesReady(newRegistry);
  }, [scene]);

  useEffect(() => {
    if (!extractedMaterial) return;
    console.log("Model render", {
      extractedMaterial,
    });
  }, [extractedMaterial]);

  useEffect(() => {
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach((mat: THREE.MeshStandardMaterial) => {
        if (!mat?.isMeshStandardMaterial) return;
        if (colorOverrides[mat.name]) mat.color.set(colorOverrides[mat.name]);
        else {
          const orig = originalColors.current.get(mat.name);
          if (orig) mat.color.copy(orig);
        }
        if (selectedMaterial && mat.name === selectedMaterial) {
          mat.emissive.set("#00c8ff");
          mat.emissiveIntensity = 0.5;
        } else {
          const origE = originalEmissives.current.get(mat.name);
          mat.emissive.copy(origE ?? new THREE.Color(0, 0, 0));
          mat.emissiveIntensity = 0;
        }
        mat.needsUpdate = true;
      });
    });
  }, [scene, selectedMaterial, colorOverrides]);

  useEffect(() => {
    streetMeshRegistry.current.forEach(({ mesh, originalMat }, uuid) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (uuid === selectedMeshUUID) {
        mat.color.set("#ff4444");
        mat.emissive.set("#aa1111");
        mat.emissiveIntensity = 0.5;
      } else {
        mat.color.copy(originalMat.color);
        mat.emissive.copy(originalMat.emissive);
        mat.emissiveIntensity = originalMat.emissiveIntensity;
      }
      mat.needsUpdate = true;
    });
  }, [selectedMeshUUID]);

  return <primitive object={scene} />;
}

Model.preload = (url: string) => useGLTF.preload(url);

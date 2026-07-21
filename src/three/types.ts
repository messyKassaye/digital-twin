import * as THREE from "three";

/**
 * Placeholder — replace with your project's real `types.ts`.
 * Registry entry the Scene reports back for street-level meshes
 * (e.g. for click-to-select / pan-to-target features).
 */
export interface StreetMeshEntry {
  uuid: string;
  name: string;
  mesh: THREE.Mesh;
}

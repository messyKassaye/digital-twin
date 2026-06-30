import * as THREE from "three";

export interface MaterialInfo {
  index: number;
  label?:string
  name: string;
  color: string;
  category: string;
}

export interface StreetMeshEntry {
  mesh: THREE.Mesh;
  originalMat: THREE.MeshStandardMaterial;
}

export interface TimeConfig {
  isDay: boolean;
  hdri: string;
  ambientIntensity: number;
  sunIntensity: number;
  sunPosition: THREE.Vector3;
  sunColor: string;
  fillColor: string;
  hemisphereSky: string;
  hemisphereGround: string;
  gridCell: string;
  gridSection: string;
}

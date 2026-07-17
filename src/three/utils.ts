import * as THREE from "three";

export interface TimeConfig {
  ambientIntensity: number;
  sunPosition: THREE.Vector3;
  sunIntensity: number;
  sunColor: string;
  fillColor: string;
  hemisphereSky: string;
  hemisphereGround: string;
  hdri: string;
  isDay: boolean;
  gridCell: string;
  gridSection: string;
}

/**
 * Placeholder time-of-day lighting config — replace with your project's
 * real `utils.ts` (`getTimeConfig`). This version derives day/night from
 * the local clock so the HUD grid + sky still look reasonable out of the box.
 */
export function getTimeConfig(): TimeConfig {
  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 19;

  if (isDay) {
    return {
      ambientIntensity: 0.6,
      sunPosition: new THREE.Vector3(120, 150, 80),
      sunIntensity: 1.6,
      sunColor: "#fff3d6",
      fillColor: "#bcd6ff",
      hemisphereSky: "#8fd3ff",
      hemisphereGround: "#1a2438",
      hdri: "/hdri/day.hdr",
      isDay: true,
      gridCell: "#1c4a68",
      gridSection: "#22d3ee",
    };
  }

  return {
    ambientIntensity: 0.25,
    sunPosition: new THREE.Vector3(-80, 60, -100),
    sunIntensity: 0.4,
    sunColor: "#9fb3ff",
    fillColor: "#22d3ee",
    hemisphereSky: "#0a1b33",
    hemisphereGround: "#020509",
    hdri: "/hdri/night.hdr",
    isDay: false,
    gridCell: "#0f2438",
    gridSection: "#22d3ee",
  };
}

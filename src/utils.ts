import * as THREE from "three";
import { TimeConfig } from "./types";

export function cleanName(name: string) {
  return name
    .replace(/CityGen/gi, "")
    .replace(/\.00\d$/, "")
    .replace(/_/g, " ")
    .trim();
}

export function getTimeConfig(): TimeConfig {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 7)
    return {
      isDay: true,
      hdri: "dawn",
      ambientIntensity: 0.8,
      sunIntensity: 1.5,
      sunPosition: new THREE.Vector3(100, 2, 100),
      sunColor: "#ff9966",
      fillColor: "#ffccaa",
      hemisphereSky: "#ff8844",
      hemisphereGround: "#b5a67a",
      gridCell: "#cc7744",
      gridSection: "#ff6600",
    };
  if (hour >= 7 && hour < 17)
    return {
      isDay: true,
      hdri: "city",
      ambientIntensity: 2.0,
      sunIntensity: 3.0,
      sunPosition: new THREE.Vector3(100, 80, 100),
      sunColor: "#fff5e0",
      fillColor: "#c8e8ff",
      hemisphereSky: "#87ceeb",
      hemisphereGround: "#b5a67a",
      gridCell: "#aaaaaa",
      gridSection: "#555555",
    };
  if (hour >= 17 && hour < 19)
    return {
      isDay: true,
      hdri: "sunset",
      ambientIntensity: 0.6,
      sunIntensity: 1.2,
      sunPosition: new THREE.Vector3(100, 1, 100),
      sunColor: "#ff6600",
      fillColor: "#ff9944",
      hemisphereSky: "#ff5500",
      hemisphereGround: "#8b4513",
      gridCell: "#cc7744",
      gridSection: "#ff6600",
    };
  return {
    isDay: false,
    hdri: "night",
    ambientIntensity: 0.15,
    sunIntensity: 0.3,
    sunPosition: new THREE.Vector3(0, -10, 0),
    sunColor: "#cce8ff",
    fillColor: "#a8d8ff",
    hemisphereSky: "#0a1628",
    hemisphereGround: "#000510",
    gridCell: "#1a3a5c",
    gridSection: "#00d4ff",
  };
}

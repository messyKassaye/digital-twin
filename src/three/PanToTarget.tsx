import type { MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Placeholder — replace with your project's real `PanToTarget.tsx`.
 * Smoothly eases the OrbitControls target toward `target` whenever it's set.
 */
export function PanToTarget({
  target,
  controlsRef,
}: {
  target: THREE.Vector3 | null;
  controlsRef: MutableRefObject<any>;
}) {
  useFrame(() => {
    const controls = controlsRef.current;
    if (!target || !controls) return;
    controls.target.lerp(target, 0.08);
    controls.update();
  });

  return null;
}

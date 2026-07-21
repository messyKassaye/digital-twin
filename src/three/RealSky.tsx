import { useMemo } from "react";
import * as THREE from "three";

/**
 * Placeholder — replace with your project's real `RealSky.tsx` (the one
 * that loads an actual HDRI for `hdri`). This version draws a simple
 * vertical-gradient sky dome so the scene doesn't depend on an HDR asset
 * that isn't included here.
 */
export function RealSky({ hdri }: { hdri: string }) {
  void hdri; // real implementation would load this HDRI

  const material = useMemo(() => {
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 19;
    const topColor = new THREE.Color(isDay ? "#1c5aa8" : "#020512");
    const bottomColor = new THREE.Color(isDay ? "#bfe3ff" : "#0a1730");

    return new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: topColor },
        bottomColor: { value: bottomColor },
        offset: { value: 8 },
        exponent: { value: 0.6 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide,
    });
  }, []);

  return (
    <mesh>
      <sphereGeometry args={[900, 32, 15]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

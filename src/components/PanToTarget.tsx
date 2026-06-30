import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export function PanToTarget({
  target,
  controlsRef,
}: {
  target: THREE.Vector3 | null;
  controlsRef: React.MutableRefObject<any>;
}) {
  const { camera } = useThree();
  useEffect(() => {
    if (!target || !controlsRef.current) return;
    const startTarget = controlsRef.current.target.clone();
    const endTarget = target.clone();
    const offset = camera.position.clone().sub(startTarget);
    let frame = 0;
    const animate = () => {
      frame++;
      const ease = 1 - Math.pow(1 - Math.min(frame / 50, 1), 3);
      const newTarget = new THREE.Vector3().lerpVectors(
        startTarget,
        endTarget,
        ease,
      );
      controlsRef.current.target.copy(newTarget);
      camera.position.copy(newTarget.clone().add(offset));
      controlsRef.current.update();
      if (frame < 50) requestAnimationFrame(animate);
    };
    animate();
  }, [target]);
  return null;
}

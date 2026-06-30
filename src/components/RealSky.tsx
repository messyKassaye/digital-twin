import { Environment } from "@react-three/drei";
import { HDRI_MAP } from "../data";

export function RealSky({ hdri }: { hdri: string }) {
  return (
    <Environment
      files={HDRI_MAP[hdri]}
      background
      backgroundIntensity={1}
      environmentIntensity={1}
    />
  );
}

import { ExtractedMaterial } from "../../model/extracted-material.model";

export type MaterialState = {
  materials: ExtractedMaterial[];
  setMaterials: (materials: ExtractedMaterial[]) => void;
};

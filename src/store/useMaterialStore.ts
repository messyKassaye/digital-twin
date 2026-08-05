import { create } from "zustand";
import { MaterialState } from "./state/material-state";

const useMaterialStore = create<MaterialState>((set) => ({
  materials: [],
  setMaterials: (materials) => set({ materials }),
}));

export default useMaterialStore;

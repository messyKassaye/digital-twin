import { create } from "zustand";
import { tabs } from "../components/dashboard/data";
import { Tab } from "../model/tab.model";
import { DashboardState } from "./state/dashboard-state";

const useDashboardStore = create<DashboardState>((set) => ({
  selectedTab: tabs[0],
  glbUrl: "/model/tower_glass_c.glb",
  setSelectedTab: (value: Tab) =>
    set((state) => ({
      ...state,
      selectedTab: value,
    })),
  setGlbUrl: (url: string) =>
    set((state) => ({
      ...state,
      glbUrl: url,
    })),
}));

export default useDashboardStore;

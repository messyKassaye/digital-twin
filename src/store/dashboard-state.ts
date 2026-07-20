import { create } from "zustand";
import { TabState } from "./state/tab-state";
import { tabs } from "../components/dashboard/data";
import { Tab } from "../components/model/tab.model";

const dashboardState = create<TabState>((set) => ({
  selectedTab: tabs[0],
  setSelectedTab: (value: Tab) =>
    set((state) => ({
      selectedTab: value,
    })),
}));

export default dashboardState;

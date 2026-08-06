import { Tab } from "../../model/tab.model";

export interface DashboardState {
  selectedTab: Tab;
  glbUrl?: string;
  setSelectedTab: (tab: Tab) => void;
  setGlbUrl?: (url: string) => void;
}

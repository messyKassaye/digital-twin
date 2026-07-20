import { Tab } from "../../components/model/tab.model";

export interface TabState {
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
}

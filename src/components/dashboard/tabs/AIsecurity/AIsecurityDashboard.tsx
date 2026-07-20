import { CenterOverlay } from "../../CenterOverlay";
import { GuardSchedulingCard } from "./GuardSchedulingCard";
import { PeopleInCampusCard } from "./PeopleInCampusCard";
import { SecurityAlarmsCard } from "./SecurityAlarmsCard";
import { SecurityDevicesCard } from "./SecurityDevicesCard";
import { WorkOrdersCard } from "./WorkOrdersCard";

type Props = {
  date: string;
};
const AIsecurityDashboard = ({ date }: Props) => {
  return (
    <div className="grid grid-cols-12 gap-3 flex-1 min-h-0">
      <div className="ic-bg ic-gradient-left col-span-3 flex flex-col gap-3 overflow-hidden">
        <div style={{ gridArea: "people" }} className="min-h-[190px]">
          <PeopleInCampusCard />
        </div>
        <div style={{ gridArea: "Security Device" }} className="min-h-[190px]">
          <SecurityDevicesCard />
        </div>
        <div style={{ gridArea: "guards" }} className="min-h-[190px]">
          <GuardSchedulingCard />
        </div>
      </div>
      <CenterOverlay date={date} />
      <div className="ic-bg ic-gradient-left col-span-3 flex flex-col gap-3 overflow-hidden">
        <div style={{ gridArea: "alarms" }}>
          <SecurityAlarmsCard />
        </div>
        <div style={{ gridArea: "orders" }}>
          <WorkOrdersCard />
        </div>
      </div>
    </div>
  );
};

export default AIsecurityDashboard;

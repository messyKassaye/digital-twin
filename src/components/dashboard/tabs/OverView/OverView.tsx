import { CenterOverlay } from "../../CenterOverlay";
import { LeftColumn } from "./LeftColumn";
import { RightColumn } from "./RightColumn";
type Props = {
  date: string;
};
const OverView = ({ date }: Props) => {
  return (
    <div className="grid grid-cols-12 gap-3 flex-1 min-h-0">
      <LeftColumn />
      <CenterOverlay date={date} />
      <RightColumn />
    </div>
  );
};

export default OverView;

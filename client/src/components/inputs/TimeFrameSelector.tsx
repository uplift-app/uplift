import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeFrameSelectorProps {
  timeFrame: string;
  setTimeFrame: React.Dispatch<React.SetStateAction<string>>;
}
const TimeFrameSelector = ({ setTimeFrame }: TimeFrameSelectorProps) => {
  const times = [
    "Last week",
    "Last month",
    "Last 3 months",
    "Last 6 months",
    "All time",
  ];

  const defaultValue = "Last month";
  return (
    <>
      <Label>Select the time frame</Label>
      <Select defaultValue={defaultValue} onValueChange={setTimeFrame}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Time</SelectLabel>
            {times.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default TimeFrameSelector;

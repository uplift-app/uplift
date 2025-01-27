import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";

const activitiesArray = [
  "Reading",
  "Stretching",
  "Working",
  "Studying",
  "Playing Guitar",
  "Journaling",
  "Bouldering",
  "Cycling",
];
const ActivityInput = () => {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>
          Select the type of activity and its duration
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select an activity" />
          </SelectTrigger>
          <SelectContent>
            {activitiesArray.map((activity) => (
              <SelectItem value={activity}>{activity}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <h1>Add a custom activity</h1>
        <Input
          type="text"
          id="custom-activity"
          placeholder="Bowling with John"
        />
      </CardContent>
    </Card>
  );
};

export default ActivityInput;

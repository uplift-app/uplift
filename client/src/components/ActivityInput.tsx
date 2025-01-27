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
import { Slider } from "./ui/slider";
import { useState } from "react";

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
  const [activityDuration, setActivityDuration] = useState<number>(33)

  function convertToTimeString(activityDuration: number): string {

    if (activityDuration < 60) {
      return activityDuration.toString() + "minutes."
    } else {
      const hours = Math.floor(activityDuration / 60).toString();
      const minutes = (activityDuration % 60).toString();
      return hours + " hours and " + minutes + " minutes." 
    }

  }

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
        <h1>Activity duration</h1>
        <Slider defaultValue={[33]} max={300} step={1} onValueChange={(value) => {setActivityDuration(value[0])}}/>
        <h1>{convertToTimeString(activityDuration)}</h1>
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Slider } from "./ui/slider";
import { useState } from "react";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/datepicker";
//TODO: button functionality
const activitiesArray = [
  "Reading",
  "Stretching",
  "Working",
  "Studying",
  "Playing Guitar",
  "Journaling",
  "Bouldering",
  "Cycling",
  "Add a Custom Activity",
];

const ActivityInput = () => {
  const [activityDuration, setActivityDuration] = useState<number>(33);
  const [activity, setActivity] = useState<string>("");
  const [activityTime, setActivityTime] = useState<string>("");
  const [activityDate, setActivityDate] = useState<Date>(new Date());

  function convertToTimeString(activityDuration: number): string {
    if (activityDuration < 60) {
      return activityDuration.toString() + " minutes.";
    } else {
      const hours = Math.floor(activityDuration / 60).toString();
      const minutes = (activityDuration % 60).toString();
      return hours + " hours and " + minutes + " minutes.";
    }
  }

  function uploadActivity() {}

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>
          Select the type of activity and its duration
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4" onSubmit={uploadActivity}>
        <DatePicker date={activityDate} setDate={setActivityDate} />
        <Select
          onValueChange={(value) => {
            setActivityTime(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="select a time" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="afternoon">Afternoon</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
              <SelectItem value="all-day">All Day</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => {
            setActivity(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an activity" />
          </SelectTrigger>
          <SelectContent>
            {activitiesArray.map((activity) => (
              <SelectItem value={activity} key={activity}>
                {activity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {activity === "Add a Custom Activity" ? (
          <>
            <h1>Add a custom activity</h1>
            <Input
              type="text"
              id="custom-activity"
              placeholder="Bowling with John"
            />
          </>
        ) : null}
        <h1>Activity duration</h1>
        <Slider
          defaultValue={[33]}
          max={240}
          step={1}
          onValueChange={(value) => {
            setActivityDuration(value[0]);
          }}
        />
        <h1>{convertToTimeString(activityDuration)}</h1>
        <Button type="submit">Submit</Button>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
};

export default ActivityInput;

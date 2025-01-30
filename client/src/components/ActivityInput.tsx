import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "./ui/select";
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
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/datepicker";
import { getActivityTypes, postActivity } from "@/lib/ApiService";
import { Time } from "@/lib/interfaces";

const ActivityInput = () => {
  const [activityDuration, setActivityDuration] = useState<number>(33);
  const [activity, setActivity] = useState<string>("");
  const [activityTime, setActivityTime] = useState<Time>("all day");
  const [activityDate, setActivityDate] = useState<Date>(new Date());
  const [activityTypes, setActivityTypes] = useState<string[]>([
    "Add a Custom Activity",
  ]);

  useEffect(() => {
    fetchActivityTypes();
  }, []);

  const fetchActivityTypes = async () => {
    try {
      const data = await getActivityTypes();
      data.push("Add a Custom Activity");
      setActivityTypes(data);
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  function convertToTimeString(activityDuration: number): string {
    if (activityDuration < 60) {
      return activityDuration.toString() + " minutes.";
    } else {
      const hours = Math.floor(activityDuration / 60).toString();
      const minutes = (activityDuration % 60).toString();
      return hours + " hours and " + minutes + " minutes.";
    }
  }

  //TODO: function resets state but doesn't reset slider or select boxes etc
  //TODO: validation for upload function
  async function uploadActivity() {
    const activityForm = {
      activityType: activity,
      duration: activityDuration,
      activityTime: activityTime,
      date: activityDate,
      isHabit: false,
    };
    try {
      await postActivity(activityForm);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Failed to post activity:", errorMessage);
    }
    setActivityDuration(33);
    setActivity("");
    setActivityTime("all day");
    setActivityDate(new Date());
    // try {
    //   const response = await fetch()
    // } catch (error) {

    // }
  }

  return (
    <Card className='w-[300px] m-1'>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>
          Select the type of activity and its duration
        </CardDescription>
      </CardHeader>

      <CardContent className='space-y-4'>
        <DatePicker date={activityDate} setDate={setActivityDate} />
        <Select
          onValueChange={(value: Time) => {
            setActivityTime(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder='select a time' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='morning'>Morning</SelectItem>
              <SelectItem value='afternoon'>Afternoon</SelectItem>
              <SelectItem value='evening'>Evening</SelectItem>
              <SelectItem value='night'>Night</SelectItem>
              <SelectItem value='all day'>All Day</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => {
            setActivity(value);
          }}
        >
          <SelectTrigger data-testId='select-trigger'>
            <SelectValue placeholder='Select an activity' />
          </SelectTrigger>
          <SelectContent>
            {activityTypes.map((activity) => (
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
              type='text'
              id='custom-activity'
              placeholder='Bowling with John'
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
        <Button onClick={uploadActivity}>Submit</Button>
      </CardContent>
      <CardFooter className='flex justify-between'></CardFooter>
    </Card>
  );
};

export default ActivityInput;

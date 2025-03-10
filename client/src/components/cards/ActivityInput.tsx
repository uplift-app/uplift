import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { errorHandler, getActivityTypes, postActivity } from "@/lib/ApiService";
import { Activity, ActivityInputProps, Time } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import { SuccessMessage } from "./SuccessMessage";

const initialFormState: Activity = {
  activityType: "",
  activityTime: "",
  duration: 33,
  date: new Date(),
};

const ActivityInput = ({
  activityProp = initialFormState,
  edit = false,
  clickHandler = () => {},
  onEntryAdded,
}: ActivityInputProps) => {
  const customActivityLabel = "Add a custom activity";
  const [formState, setFormState] = useState<Activity>(activityProp);
  const [activityTypes, setActivityTypes] = useState<string[]>([
    customActivityLabel,
  ]);

  const [activity, setActivity] = useState(activityProp.activityType);
  const [customActivity, setCustomActivity] = useState("");

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchActivityTypes();
  }, []);

  useEffect(() => {
    if (activity === customActivityLabel) {
      setFormState((prevState) => ({
        ...prevState,
        activityType: customActivity,
      }));
    } else {
      setFormState((prevState) => ({ ...prevState, activityType: activity }));
    }
  }, [activity, customActivity]);

  const fetchActivityTypes = async () => {
    try {
      const data = await getActivityTypes();
      data.push(customActivityLabel);
      setActivityTypes(data);
    } catch (error) {
      return errorHandler(error);
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

  async function uploadActivity() {
    try {
      await postActivity(formState);
      setSuccess(true);
      onEntryAdded?.();
    } catch (error) {
      errorHandler(error);
    }
    setFormState(initialFormState);
    setActivity("");
    setCustomActivity("");
  }

  const timeValues = [
    "morning",
    "afternoon",
    "evening",
    "night",
    "all day",
    "",
  ];

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCustomActivity(event.target.value);
    setFormState((prevState) => ({
      ...prevState,
      activityType: event.target.value,
    }));
  }

  function handleChange(newValue: any) {
    if (newValue instanceof Date) {
      setFormState((prevState) => ({ ...prevState, date: newValue }));
    } else if (typeof newValue === "string" && timeValues.includes(newValue)) {
      setFormState((prevState) => ({
        ...prevState,
        activityTime: newValue as Time,
      }));
    } else if (Array.isArray(newValue)) {
      setFormState((prevState) => ({ ...prevState, duration: newValue[0] }));
    } else if (typeof newValue === "string") {
      setActivity(newValue);
    }
  }

  return (
    <Card className="flex-grow m-1 basis-1/2">
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>What did you do?</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {!success ? (
          <>
            <DatePicker date={formState.date} setDate={handleChange} />
            <Select onValueChange={handleChange} value={formState.activityTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="night">Night</SelectItem>
                  <SelectItem value="all day">All Day</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={handleChange} value={activity}>
              <SelectTrigger data-testid="select-trigger">
                <SelectValue placeholder="Select an activity" />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map((activity) => (
                  <SelectItem value={activity} key={activity}>
                    {activity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {activity === customActivityLabel ? (
              <>
                <h3>{customActivityLabel}</h3>
                <Input
                  type="text"
                  id="custom-activity"
                  placeholder="Bowling"
                  value={customActivity}
                  onChange={handleInputChange}
                />
              </>
            ) : null}
            <h3 className="font-semibold pb-0">Duration</h3>
            <Slider
              defaultValue={[33]}
              max={240}
              step={1}
              onValueChange={handleChange}
              value={[formState.duration]}
            />
            <p>{convertToTimeString(formState.duration)}</p>
            <Button
              className="w-full"
              onClick={edit ? () => clickHandler(formState) : uploadActivity}
              disabled={!formState.activityTime || !formState.activityType}
            >
              {edit ? "Edit" : "Submit"}
            </Button>
          </>
        ) : (
          <SuccessMessage edit={edit} setSuccess={setSuccess} />
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityInput;

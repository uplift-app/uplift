import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DatePicker } from "@/components/ui/datepicker";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mood, MoodInputProps, MoodTypes, Time } from "@/lib/interfaces";
import { errorHandler, postMood } from "@/lib/ApiService";
import Smiley0 from "../smileys/Smiley0";
import Smiley1 from "../smileys/Smiley1";
import Smiley2 from "../smileys/Smiley2";
import Smiley3 from "../smileys/Smiley3";
import Smiley4 from "../smileys/Smiley4";

const smileyArray = [
  <Smiley0 />,
  <Smiley1 />,
  <Smiley2 />,
  <Smiley3 />,
  <Smiley4 />,
];

const initialFormState: Mood = {
  moodType: "",
  intensity: 5,
  moodTime: "",
  date: new Date(),
};

const MoodInput = ({
  mood = initialFormState,
  edit = false,
  clickHandler = () => {},
}: MoodInputProps) => {
  const [formState, setFormState] = useState<Mood>(mood);

  async function uploadMood() {
    try {
      await postMood(formState);
    } catch (error) {
      errorHandler(error);
    }
    setFormState(initialFormState);
  }

  const timeValues = ["morning", "afternoon", "evening", "night", "all day"];

  const moodValues = ["", "happiness", "energy", "stress"];

  function handleChange(newValue: any) {
    if (newValue instanceof Date) {
      setFormState((prevState) => ({ ...prevState, date: newValue }));
    } else if (typeof newValue === "string" && timeValues.includes(newValue)) {
      setFormState((prevState) => ({
        ...prevState,
        moodTime: newValue as Time,
      }));
    } else if (Array.isArray(newValue)) {
      setFormState((prevState) => ({ ...prevState, intensity: newValue[0] }));
    } else if (typeof newValue === "string" && moodValues.includes(newValue)) {
      setFormState((prevState) => ({
        ...prevState,
        moodType: newValue as MoodTypes,
      }));
    }
  }
  const moodTypeArray = [
    { value: "happiness", tooltip: "0 = Sad, 10 = Happy" },
    { value: "stress", tooltip: "0 = Stressed, 10 = Relaxed" },
    { value: "energy", tooltip: "0 = Lazy, 10 = Energetic" },
  ];
  return (
    <Card className="flex-grow m-1">
      <CardHeader>
        <CardTitle>Mood</CardTitle>
        <CardDescription>How are you feeling?</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col space-y-4 flex-grow ">
        <DatePicker
          date={formState.date}
          setDate={handleChange}
          data-testid="datepicker"
        />
        <Select onValueChange={handleChange} value={formState.moodTime}>
          <SelectTrigger>
            <SelectValue placeholder="Select a time" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {timeValues.map((timeValue) => (
                <SelectItem value={timeValue}>
                  {timeValue[0].toUpperCase() + timeValue.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={handleChange} value={formState.moodType}>
          <SelectTrigger>
            <SelectValue placeholder="Select a mood" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {moodTypeArray.map((moodType) => (
                <SelectItem value={moodType.value}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {moodType.value[0].toUpperCase() +
                          moodType.value.slice(1)}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{moodType.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <h1 className="font-semibold pb-0">Intensity</h1>
        <Slider
          defaultValue={[5]}
          min={0}
          max={10}
          step={1}
          onValueChange={handleChange}
          value={[formState.intensity]}
        />
        <div className="flex w-full justify-center">
          <div className="w-6 h-6">
            {smileyArray[Math.min(Math.floor(formState.intensity / 2), 4)]}
          </div>
        </div>
        <Button
          className="w-full mt-auto justify-self-end"
          onClick={edit ? () => clickHandler(formState) : uploadMood}
          disabled={!formState.moodTime || !formState.moodType}
        >
          {edit ? "Edit" : "Submit"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MoodInput;

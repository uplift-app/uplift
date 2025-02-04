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
import { Mood, MoodTypes, Time } from "@/lib/interfaces";
import { errorHandler, postMood } from "@/lib/ApiService";

const MoodInput = () => {
  const initialFormState: Mood = {
    moodType: "",
    intensity: 5,
    moodTime: "",
    date: new Date(),
  };
  const [formState, setFormState] = useState<Mood>(initialFormState);

  function moodLevelAsEmoji(moodLevel: number): string {
    if (moodLevel < 2) {
      return String.fromCodePoint(0x1f62d);
    } else if (moodLevel === 2) {
      return String.fromCodePoint(0x1f62b);
    } else if (moodLevel === 3) {
      return String.fromCodePoint(0x1f62a);
    } else if (moodLevel === 4) {
      return String.fromCodePoint(0x1f61f);
    } else if (moodLevel === 5) {
      return String.fromCodePoint(0x1f610);
    } else if (moodLevel === 6) {
      return String.fromCodePoint(0x1f60a);
    } else if (moodLevel === 7) {
      return String.fromCodePoint(0x1f61d);
    } else if (moodLevel === 8) {
      return String.fromCodePoint(0x1f606);
    } else if (moodLevel === 9) {
      return String.fromCodePoint(0x1f600);
    } else {
      return String.fromCodePoint(0x1f601);
    }
  }

  async function uploadMood() {
    try {
      await postMood(formState);
    } catch (error) {
      errorHandler(error);
    }
    setFormState(initialFormState);
  }

  const timeValues = [
    "morning",
    "afternoon",
    "evening",
    "night",
    "all day",
    "",
  ];

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

  return (
    <Card className="flex-grow m-1">
      <CardHeader>
        <CardTitle>Mood</CardTitle>
        <CardDescription>How are you feeling?</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
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
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="afternoon">Afternoon</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
              <SelectItem value="night">Night</SelectItem>
              <SelectItem value="all day">All Day</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={handleChange} value={formState.moodType}>
          <SelectTrigger>
            <SelectValue placeholder="Select a mood" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="happiness">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>Happiness</TooltipTrigger>
                    <TooltipContent>
                      <p>0 = Sad, 10 = happy</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SelectItem>
              <SelectItem value="stress">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>Stress</TooltipTrigger>
                    <TooltipContent>
                      <p>0 = Stressed, 10 = Relaxed</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SelectItem>
              <SelectItem value="energy">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>Energy</TooltipTrigger>
                    <TooltipContent>
                      <p>0 = Lazy, 10 = Energetic</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex">
          <Slider
            defaultValue={[5]}
            max={10}
            step={1}
            onValueChange={handleChange}
            value={[formState.intensity]}
          />
          <h1>{moodLevelAsEmoji(formState.intensity)}</h1>
        </div>
        <Button
          onClick={uploadMood}
          disabled={!formState.moodTime || !formState.moodType}
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};

export default MoodInput;

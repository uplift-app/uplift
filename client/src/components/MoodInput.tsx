import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectGroup,
} from "./ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { useState } from "react";
import { DatePicker } from "./ui/datepicker";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Time } from "@/lib/interfaces";
import { postMood } from "@/lib/ApiService";
import { getMoods } from "@/lib/ApiService";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

//TODO: add tooltip for times

const MoodInput = () => {
  const { getToken } = useAuth();
  const [moodLevel, setMoodLevel] = useState<number>(5);
  const [moodDate, setMoodDate] = useState<Date>(new Date());
  const [mood, setMood] = useState<string>("");
  const [moodTime, setMoodTime] = useState<Time>("all day");

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

  const fetchMoods = async (token: string | undefined) => {
    try {
      const data = await getMoods(token);
      console.log(data);
    } catch (error) {
      error instanceof Error ? error.message : "An error occurred";
    }
  };

  useEffect(() => {
    const fetchMoodsData = async () => {
      try {
        const token = await getToken({ template: "default" });
        if (token) {
          fetchMoods(token);
        }
      } catch (error) {
        error instanceof Error ? error.message : "An error occurred";
      }
    };
    fetchMoodsData();
  }, []);

  async function uploadMood() {
    const moodForm = {
      moodType: mood,
      intensity: moodLevel,
      moodTime: moodTime,
      date: moodDate,
    };
    try {
      const token = await getToken({ template: "default" });
      if (token) await postMood(moodForm, token);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      throw new Error(errorMessage);
    }
    setMood("");
    setMoodDate(new Date());
    setMoodLevel(5);
    setMoodTime("all day");
  }
  return (
    <Card className='w-[300px] m-1'>
      <CardHeader>
        <CardTitle>Mood</CardTitle>
        <CardDescription>How are you feeling?</CardDescription>
      </CardHeader>

      <CardContent className='space-y-4'>
        <DatePicker date={moodDate} setDate={setMoodDate} />
        <Select onValueChange={(value: Time) => setMoodTime(value)}>
          <SelectTrigger>
            <SelectValue placeholder='select a time' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='morning'>Morning</SelectItem>
              <SelectItem value='afternoon'>Afternoon</SelectItem>
              <SelectItem value='evening'>Evening</SelectItem>
              <SelectItem value='all day'>All Day</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setMood(value)}>
          <SelectTrigger>
            <SelectValue placeholder='select a mood' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='happiness'>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>Happiness</TooltipTrigger>
                    <TooltipContent>
                      <p>0 = Sad, 10 = happy</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SelectItem>
              <SelectItem value='stress'>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>Stress</TooltipTrigger>
                    <TooltipContent>
                      <p>0 = Stressed, 10 = Relaxed</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SelectItem>
              <SelectItem value='energy'>
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
        <div className='flex'>
          <Slider
            defaultValue={[5]}
            max={10}
            step={1}
            onValueChange={(value) => {
              setMoodLevel(value[0]);
            }}
          />
          <h1>{moodLevelAsEmoji(moodLevel)}</h1>
        </div>
        <Button onClick={uploadMood}>Submit</Button>
      </CardContent>
    </Card>
  );
};

export default MoodInput;

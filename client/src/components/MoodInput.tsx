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
  CardFooter,
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
} from "@/components/ui/tooltip";

//TODO: add tooltip for times

const MoodInput = () => {
  const [moodLevel, setMoodLevel] = useState<number>(5);
  const [moodDate, setMoodDate] = useState<Date>(new Date());

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

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>Mood</CardTitle>
        <CardDescription>How are you feeling?</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <DatePicker date={moodDate} setDate={setMoodDate} />
        <Select>
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
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="select a mood" />
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
              <SelectItem value="stress"><TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>Stress</TooltipTrigger>
                    <TooltipContent>
                      <p>0 = Stressed, 10 = Relaxed</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider></SelectItem>
              <SelectItem value="energy"><TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>Energy</TooltipTrigger>
                    <TooltipContent>
                      <p>0 = Lazy, 10 = Energetic</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider></SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex ">
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
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
};

export default MoodInput;

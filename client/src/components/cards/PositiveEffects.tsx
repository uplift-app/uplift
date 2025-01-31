import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { useAnalysisDataContext } from "@/contexts/AnalysisDataContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "../ui/select";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { cn } from "@/lib/utils";

interface Ieffect {
  moodType: string;
  moodTime: string;
  avg_intensity: number;
  activities: string[];
}

const PositiveEffects = () => {
  const [mood, setMood] = useState<string>("show all");
  const [time, setTime] = useState<string>("show all");
  const [filteredEffects, setFilteredEffects] = useState<Ieffect[] | []>([]);
  const { analysisData } = useAnalysisDataContext();

  useEffect(() => {
    if (!analysisData || Object.keys(analysisData).length === 0) {
      return;
    }
    setFilteredEffects(filterPositiveEffects(mood, time));
  }, [mood, time, analysisData]);

  const { positiveEffects } = analysisData;

  const filterPositiveEffects = (mood?: string, time?: string): Ieffect[] => {
    if (mood === "show all" && time === "show all") {
      return positiveEffects;
    }
    return positiveEffects.filter(
      (effect) =>
        (mood === "show all" || effect.moodType === mood) &&
        (time === "show all" || effect.moodTime === time)
    );
  };

  const formatFilteredEffects = (filteredEffects: Ieffect[]) => {
    const moodMapping: { [key: string]: string } = {
      energetic: "Energy level",
      happy: "Happiness",
      relaxed: "Relaxation",
    };

    return filteredEffects.map((effect) => {
      const formattedMood = moodMapping[effect.moodType];
      return (
        <CarouselItem className={cn(filteredEffects.length > 1 && "basis-1/2")}>
          <Card>
            <CardHeader>
              <CardTitle>
                {formattedMood}{" "}
                {effect.moodTime === "all day"
                  ? effect.moodTime
                  : "in the " + effect.moodTime}
                .
              </CardTitle>
              <CardDescription>
                The average intensity of your mood during this time is{" "}
                {effect.avg_intensity.toFixed(1)}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {effect.activities.length > 1 ? (
                <>
                  <p>The activites that positively affected this are:</p>
                  <ul>
                    {effect.activities.map((activity) => {
                      return (
                        <li>
                          {activity[0].toUpperCase() + activity.slice(1)}.
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <p>
                  The activity that positively affected this is:{" "}
                  {effect.activities[0]}
                </p>
              )}
            </CardContent>
          </Card>
        </CarouselItem>
      );
    });
  };

  return (
    <Card className='w-[500px]'>
      <CardHeader>
        <CardTitle>Positive Effects</CardTitle>
        <CardDescription>
          Understand the positive effects of your activities and moods.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Select onValueChange={(value) => setMood(value)}>
          <SelectTrigger>
            <SelectValue placeholder='Select a mood' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='energetic'>Energy</SelectItem>
              <SelectItem value='happy'>Happiness</SelectItem>
              <SelectItem value='relaxed'>Relaxation</SelectItem>
              <SelectItem value='show all'>Show All</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setTime(value)}>
          <SelectTrigger>
            <SelectValue placeholder='Select a time' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='morning'>Morning</SelectItem>
              <SelectItem value='afternoon'>Afternoon</SelectItem>
              <SelectItem value='evening'>Evening</SelectItem>
              <SelectItem value='all day'>All Day</SelectItem>
              <SelectItem value='show all'>Show All</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Carousel className='w-full'>
          <CarouselContent>
            {filteredEffects.length > 0 ? (
              formatFilteredEffects(filteredEffects)
            ) : (
              <p>No positive effects found for the selected mood and time.</p>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default PositiveEffects;

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
import LoadingPage from "../pages/LoadingPage";

interface Ieffect {
  moodType: string;
  moodTime: string;
  avgIntensity: number;
  activities: string[];
}

const PositiveEffects = () => {
  const [mood, setMood] = useState<string>("show all");
  const [time, setTime] = useState<string>("show all");
  const [filteredEffects, setFilteredEffects] = useState<Ieffect[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { analysisData } = useAnalysisDataContext();

  useEffect(() => {
    setIsLoading(true);
    if (!analysisData || Object.keys(analysisData).length === 0) {
      return;
    }
    setFilteredEffects(filterPositiveEffects(mood, time));
    setIsLoading(false);
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
      energy: "Energy level",
      happiness: "Happiness",
      stress: "Relaxation",
    };

    return filteredEffects.map((effect, index) => {
      const formattedMood = moodMapping[effect.moodType];
      return (
        <CarouselItem className="basis-full sm:basis-1/2" key={index}>
          <Card className="w-full">
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
                {effect.avgIntensity.toFixed(1)}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {effect.activities.length > 1 ? (
                <>
                  <p>The activites that positively affected this are:</p>
                  <ul>
                    {effect.activities.map((activity, index) => {
                      return (
                        <li key={index}>
                          {activity[0].toUpperCase() + activity.slice(1)}.
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <p>
                  The activity that positively affected this is: <br />
                  {effect.activities[0][0].toUpperCase() +
                    effect.activities[0].slice(1)}
                </p>
              )}
            </CardContent>
          </Card>
        </CarouselItem>
      );
    });
  };

  return (
    <Card className="overflow-hidden component-style !p-0">
      <CardHeader>
        <CardTitle className="heading-style">Positive Effects</CardTitle>
        <CardDescription>
          Understand the positive effects of your activities and moods.
        </CardDescription>
      </CardHeader>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <CardContent className="space-y-4">
          <div className="mx-10">
            <Select onValueChange={(value) => setMood(value)}>
              <SelectTrigger className="mb-4">
                <SelectValue placeholder="Select a mood" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="energy">Energy</SelectItem>
                  <SelectItem value="happiness">Happiness</SelectItem>
                  <SelectItem value="stress">Relaxation</SelectItem>
                  <SelectItem value="show all">Show All</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setTime(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="all day">All Day</SelectItem>
                  <SelectItem value="show all">Show All</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Carousel className="rounded-lg flex gap-2 items-center ">
            <CarouselPrevious />
            <CarouselContent>
              {filteredEffects.length > 0 ? (
                formatFilteredEffects(filteredEffects)
              ) : (
                <p className="pl-4">
                  No positive effects found for the selected mood and time.
                </p>
              )}
            </CarouselContent>
            <CarouselNext />
          </Carousel>
        </CardContent>
      )}
    </Card>
  );
};

export default PositiveEffects;

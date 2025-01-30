import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { useAnalysisDataContext } from "@/contexts/AnalysisDataContext";
import { Select,  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup, } from "./ui/select";
import { useEffect, useState } from "react";

const PositiveEffects = () => {
  const [mood, setMood] = useState<string>(null);
  const [time, setTime] = useState<string>(null);
  const [filteredEffects, setFilteredEffects] = useState<string[]>([]);
  const {analysisData} = useAnalysisDataContext();

  useEffect(() => {
    if (!analysisData || Object.keys(analysisData).length === 0) {
      return;
    }
    setFilteredEffects(filterPositiveEffects(mood, time));
  }, [mood, time]);

  const {positiveEffects} = analysisData;

  const filterPositiveEffects = (mood?: string, time?: string) => {
    return positiveEffects.filter(effect => (!mood || effect.moodType === mood) && (!time || effect.moodTime === time));
  }

  const formatFilteredEffects = (filteredEffects) => {
    const moodMapping: { [key: string]: string } = {
      energetic: "energy level",
      happy: "happiness",
      relaxed: "relaxation",
    };

    return filteredEffects.map((effect) => {
      const formattedMood = moodMapping[effect.moodType];
      return (
      <>
      <p>Your {formattedMood} {effect.moodTime === "All Day" ? effect.moodTime : 'in the '+ effect.moodTime} has an average intensity of {effect.avg_intensity.toFixed(1)}.</p>
      {effect.activities.length > 1 ? (
        <>
        <p>The activites that positively affected this are:</p>
        <ul>
        {effect.activities.map((activity) => {
          return (
            <li>{activity}</li>
          )
        })}
        </ul>
        </>
      ):(<p>The activity that positively affected this is: {effect.activities[0]}</p>)}
      
      </>
    );
    })
  }

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Positive Effects</CardTitle>
        <CardDescription>
          Understand the positive effects of your activities and moods.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select onValueChange={(value) => setMood(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a mood" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="energetic">Energy</SelectItem>
              <SelectItem value="happy">Happiness</SelectItem>
              <SelectItem value="relaxed">Relaxation</SelectItem>
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
            </SelectGroup>
          </SelectContent>
        </Select>
        {filteredEffects.length > 0 ? formatFilteredEffects(filteredEffects) : <p>No positive effects found for the selected mood and time.</p>}
      </CardContent>
    </Card>
  )
}

export default PositiveEffects;
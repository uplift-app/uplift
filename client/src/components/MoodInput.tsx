import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem, SelectGroup } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card"
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { useState } from "react";
import { DatePicker } from "./ui/datepicker";

//TODO: add tooltip for times

const MoodInput = () => {
  const [moodLevel, setMoodLevel] = useState<number>(5)
  const [moodDate, setMoodDate] = useState<Date>(new Date)

  function moodLevelAsEmoji(moodLevel: number): string {
    if (moodLevel < 2 ) {
      return String.fromCodePoint(0x1F62D)
    } else if (moodLevel === 2) {
      return String.fromCodePoint(0x1F62B)
    } else if (moodLevel === 3) {
      return String.fromCodePoint(0x1F62A)
    } else if (moodLevel === 4) {
      return String.fromCodePoint(0x1F61F)
    } else if (moodLevel === 5) {
      return String.fromCodePoint(0x1F610)
    } else if (moodLevel === 6) {
      return String.fromCodePoint(0x1F60A)
    } else if (moodLevel === 7) {
      return String.fromCodePoint(0x1F61D)
    } else if (moodLevel === 8) {
      return String.fromCodePoint(0x1F606)
    } else if (moodLevel === 9) {
      return String.fromCodePoint(0x1F600)
    } else {
      return String.fromCodePoint(0x1F601)
    }
  }

  return (
    <Card className="w-[300px]">
      <CardHeader>
      <CardTitle>Mood</CardTitle>
      <CardDescription>How are you feeling?</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <DatePicker date={moodDate} setDate={setMoodDate}/>
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
            <SelectItem value="happiness">Happiness</SelectItem>
            <SelectItem value="stress">Stress</SelectItem>
            <SelectItem value="energy">Energy</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Slider
          defaultValue={[5]}
          max={10}
          step={1}
          onValueChange={(value) => {setMoodLevel(value[0])}}
        />
        <h1>{moodLevelAsEmoji(moodLevel)}</h1>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  )
}

export default MoodInput
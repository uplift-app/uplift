import { getMoods } from "@/lib/ApiService";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface MoodEntry {
  date: string;
  intensity: number;
}

interface AvgMoodEntry {
  date: string;
  avgIntensity: number | null;
}

const YearOfPixels = () => {
  const [avgMoodPerDate, setAvgMoodPerDate] = useState<AvgMoodEntry[]>([]);
  const [filter, setFilter] = useState<string>("Avg");
  const { getToken } = useAuth();

  const calculateAverageMoodPastYear = (
    moodData: MoodEntry[]
  ): AvgMoodEntry[] => {
    const moodMap: Record<string, { totalIntensity: number; count: number }> = {};


    moodData.forEach(({ date, intensity }) => {
      const formattedDate = date.split("T")[0];
      if (!moodMap[formattedDate]) {
        moodMap[formattedDate] = { totalIntensity: 0, count: 0 };
      }
      moodMap[formattedDate].totalIntensity += intensity;
      moodMap[formattedDate].count += 1;
    });

    const result: AvgMoodEntry[] = [];
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 365);

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];
      if (moodMap[dateStr]) {
        const { totalIntensity, count } = moodMap[dateStr];
        const avgIntensity = totalIntensity / count;
        result.push({
          date: dateStr,
          avgIntensity: parseFloat(avgIntensity.toFixed(2)),
        });
      } else {
        result.push({ date: dateStr, avgIntensity: null });
      }
    }
    return result;
  };

  const fetchMoods = async () => {
    try {
      const token = await getToken();
      if (token) {
        const data = await getMoods(token);
        console.log(data);
        if (filter === "Avg") {
          return calculateAverageMoodPastYear(data);
        } else {
          const filteredData = data.filter((entry) => entry.moodType === filter)
          return calculateAverageMoodPastYear(filteredData);
        }
      }
    } catch (error) {
      console.error(
        error instanceof Error
          ? error.message
          : "An error occurred fetching the moods."
      );
    }
  };

  const getColorForIntensity = (avgIntensity: number | null): string => {
    if (avgIntensity === null) return "#E5E7EB"; 
    return `hsl(${avgIntensity * 10}, 100%, 50%)`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const moods = await fetchMoods();
      console.log(moods);
      if (moods) {
        setAvgMoodPerDate(moods);
      }
    };
    fetchData();
  }, [getToken, filter]);

  const groupedByMonth: Record<string, AvgMoodEntry[]> = {};
  const monthOrder: string[] = [];
  avgMoodPerDate.forEach((entry) => {
    const dateObj = new Date(entry.date);
    const monthLabel = dateObj.toLocaleDateString("default", {
      month: "short",
      year: "numeric",
    });
    if (!groupedByMonth[monthLabel]) {
      groupedByMonth[monthLabel] = [];
      monthOrder.push(monthLabel);
    }
    groupedByMonth[monthLabel].push(entry);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Your year in pixels:
        </CardTitle>
        <CardDescription>
          See your average mood intensity for each day in the last year! 
          Each square is one day and the colour ranges from red, to green. Where red represents 0 and green represents 10.
        </CardDescription>
      </CardHeader>
      <CardContent>
      <Select onValueChange={(value) => setFilter(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select a mood." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='energy'>Energy</SelectItem>
            <SelectItem value='happiness'>Happiness</SelectItem>
            <SelectItem value='stress'>Stress</SelectItem>
            <SelectItem value='Avg'>Show Average</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {monthOrder.map((month) => (
        <div key={month} className="flex items-center">
          <div className="w-20 text-right mr-2 font-bold">{month}</div>
          <div className="flex flex-wrap gap-1">
            {groupedByMonth[month].map((entry) => (
              <div
                key={entry.date}
                className="w-3 h-3 rounded"
                style={{ backgroundColor: getColorForIntensity(entry.avgIntensity) }}
                title={`${entry.date}: ${
                  entry.avgIntensity === null ? "No data" : entry.avgIntensity
                }`}
              ></div>
            ))}
          </div>
        </div>
      ))}
      </CardContent>
    </Card>

  );
};

export default YearOfPixels;


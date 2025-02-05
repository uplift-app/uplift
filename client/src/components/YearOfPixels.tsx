import { getMoods } from "@/lib/ApiService";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import LoadingPage from "./pages/LoadingPage";

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
  const [isLoading, setIsLoading] = useState(true);

  const calculateAverageMoodPastYear = (
    moodData: MoodEntry[]
  ): AvgMoodEntry[] => {
    const moodMap: Record<string, { totalIntensity: number; count: number }> =
      {};

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
      const data = await getMoods();
      if (filter === "Avg") {
        return calculateAverageMoodPastYear(data);
      } else {
        const filteredData = data.filter((entry) => entry.moodType === filter);
        return calculateAverageMoodPastYear(filteredData);
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
    setIsLoading(true);
    const fetchData = async () => {
      const moods = await fetchMoods();
      if (moods) {
        setAvgMoodPerDate(moods);
      }
    };
    fetchData().then(() => setIsLoading(false));
  }, [filter]);

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
    <Card className='component-style !p-0'>
      <CardHeader>
        <CardTitle className='heading-style'>Your year in pixels</CardTitle>
        <CardDescription>
          See your average mood intensity for each day in the last year! Each
          square is one day and the colour ranges from red, to green. Where red
          represents 0 and green represents 10.
        </CardDescription>
      </CardHeader>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <CardContent>
          <Select onValueChange={(value) => setFilter(value)}>
            <SelectTrigger>
              <SelectValue placeholder='Select a mood.' />
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
            <div key={month} className='grid grid-cols-6 mt-3'>
              <div className='w-50 text-right mr-3 font-bold'>{month}</div>
              <div className='flex items-center flex-wrap gap-1 col-span-5'>
                {groupedByMonth[month].map((entry) => (
                  <div
                    key={entry.date}
                    className='w-3 h-3 rounded'
                    style={{
                      backgroundColor: getColorForIntensity(entry.avgIntensity),
                    }}
                    title={`${entry.date}: ${
                      entry.avgIntensity === null
                        ? "No data"
                        : entry.avgIntensity
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
};

export default YearOfPixels;

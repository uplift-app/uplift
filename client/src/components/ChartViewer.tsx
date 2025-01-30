import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import { InteractiveChart } from "./InteractiveChart";
import { ChartConfig } from "./ui/chart";
import AddToChart from "./AddToChart";
import { MoodFromBackend, transformChartData } from "@/lib/chartview-functions";
import TimeFrameSelector from "./TimeFrameSelector";
import { getMoods } from "@/lib/ApiService";
import { PostMoodProps } from "@/lib/interfaces";
const ChartViewer = () => {
  // Fetch this data from the backend
  const [chartData2, setChartData] = useState<PostMoodProps[]>();
  const fetchMoods = async () => {
    try {
      const data = await getMoods();
      setChartData(data);
    } catch (error) {
      console.error(
        error instanceof Error
          ? error.message
          : "An error occurred fetching the moods in the chartViewer."
      );
    }
  };
  useEffect(() => {
    fetchMoods();
  }, []);
  const chartData: MoodFromBackend[] = [
    {
      _id: "67979b8b652a8ac3ae9c2202",
      moodType: "happiness",
      intensity: 3,
      userId: "1",
      moodTime: "all day",
      date: "2024-10-29T00:00:00.000Z",
      __v: 0,
      createdAt: "2025-01-27T14:43:23.652Z",
      updatedAt: "2025-01-27T14:43:23.652Z",
    },
    {
      _id: "67979b8b652a8ac3ae9c2203",
      moodType: "happiness",
      intensity: 2,
      userId: "1",
      moodTime: "morning",
      date: "2024-10-30T00:00:00.000Z",
      __v: 0,
      createdAt: "2025-01-27T14:43:23.652Z",
      updatedAt: "2025-01-27T14:43:23.652Z",
    },
    {
      _id: "67979b8b652a8ac3ae9c2204",
      moodType: "energy",
      intensity: 6,
      userId: "1",
      moodTime: "afternoon",
      date: "2024-10-31T00:00:00.000Z",
      __v: 0,
      createdAt: "2025-01-27T14:43:23.652Z",
      updatedAt: "2025-01-27T14:43:23.652Z",
    },
    {
      _id: "67979b8b652a8ac3ae9c2205",
      moodType: "stress",
      intensity: 2,
      userId: "1",
      moodTime: "afternoon",
      date: "2024-11-01T00:00:00.000Z",
      __v: 0,
      createdAt: "2025-01-27T14:43:23.652Z",
      updatedAt: "2025-01-27T14:43:23.652Z",
    },
    {
      _id: "67979b8b652a8ac3ae9c2206",
      moodType: "happiness",
      intensity: 4,
      userId: "1",
      moodTime: "evening",
      date: "2024-11-02T00:00:00.000Z",
      __v: 0,
      createdAt: "2025-01-27T14:43:23.652Z",
      updatedAt: "2025-01-27T14:43:23.652Z",
    },
    {
      _id: "67979b8b652a8ac3ae9c2207",
      moodType: "energy",
      intensity: 0,
      userId: "1",
      moodTime: "evening",
      date: "2024-11-03T00:00:00.000Z",
      __v: 0,
      createdAt: "2025-01-27T14:43:23.652Z",
      updatedAt: "2025-01-27T14:43:23.652Z",
    },
    {
      _id: "67979b8b652a8ac3ae9c2208",
      moodType: "happiness",
      intensity: 10,
      userId: "1",
      moodTime: "all day",
      date: "2024-11-04T00:00:00.000Z",
      __v: 0,
      createdAt: "2025-01-27T14:43:23.652Z",
      updatedAt: "2025-01-27T14:43:23.652Z",
    },
    {
      _id: "67979b8b652a8ac3ae9c2209",
      moodType: "happiness",
      intensity: 10,
      userId: "1",
      moodTime: "all day",
      date: "2024-11-05T00:00:00.000Z",
      __v: 0,
      createdAt: "2025-01-27T14:43:23.652Z",
      updatedAt: "2025-01-27T14:43:23.652Z",
    },
    {
      _id: "67979b8b652a8ac3ae9c220a",
      moodType: "energy",
      intensity: 8,
      userId: "1",
      moodTime: "afternoon",
      date: "2024-11-06T00:00:00.000Z",
      __v: 0,
      createdAt: "2025-01-27T14:43:23.652Z",
      updatedAt: "2025-01-27T14:43:23.652Z",
    },
    {
      _id: "67979b8b652a8ac3ae9c220b",
      moodType: "stress",
      intensity: 9,
      userId: "1",
      moodTime: "morning",
      date: "2024-11-07T00:00:00.000Z",
      __v: 0,
      createdAt: "2025-01-27T14:43:23.652Z",
      updatedAt: "2025-01-27T14:43:23.652Z",
    },
    {
      _id: "67979b8b652a8ac3ae9c220c",
      moodType: "happiness",
      intensity: 0,
      userId: "1",
      moodTime: "all day",
      date: "2024-11-08T00:00:00.000Z",
      __v: 0,
      createdAt: "2025-01-27T14:43:23.652Z",
      updatedAt: "2025-01-27T14:43:23.652Z",
    },
    {
      _id: "67979b8b652a8ac3ae9c220d",
      moodType: "stress",
      intensity: 3,
      userId: "1",
      moodTime: "all day",
      date: "2024-11-09T00:00:00.000Z",
      __v: 0,
      createdAt: "2025-01-27T14:43:23.652Z",
      updatedAt: "2025-01-27T14:43:23.652Z",
    },
    {
      _id: "67979b8b652a8ac3ae9c220e",
      moodType: "happiness",
      intensity: 8,
      userId: "1",
      moodTime: "all day",
      date: "2024-11-10T00:00:00.000Z",
      __v: 0,
      createdAt: "2025-01-27T14:43:23.652Z",
      updatedAt: "2025-01-27T14:43:23.652Z",
    },
  ];

  // Loop through all entries in chartData, saving

  const dataSortedByDate = transformChartData(chartData);

  // FillSpace can most certainly be more efficient, but it works.
  // Loop through each entry. Find any entries for which there isn't any mood data.
  // For each entry: check that all the moodTypes have an associated value
  // If yes, move on to next entry.
  // If no, find the nearest point backwards and forwards.
  // eg. Found happiness = 0 at n-2, happiness = 10 n+3.
  // This would mean putting happiness = 2 at n-1, happiness = 4 at n, happiness = 6 at n + 1 and happiness = 8 at n + 2;

  // Need to extrapolate the other entries from the transformedData.

  const chartConfig = {
    energy: {
      label: "Energy",
      color: "hsl(var(--energy))",
    },
    happiness: {
      label: "Happiness",
      color: "hsl(var(--happiness))",
    },
    stress: {
      label: "Stress",
      color: "hsl(var(--stress))",
    },
  } satisfies ChartConfig;
  const [chartConfigData, setChartConfigData] =
    useState<ChartConfig>(chartConfig);
  const handleCheckChange = (chartLabel: keyof ChartConfig) => {
    setChartConfigData((prev) => {
      const newChartConfig = { ...prev } as ChartConfig;
      delete newChartConfig[chartLabel];
      return newChartConfig;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visualise your progress</CardTitle>
        <CardDescription>Plot your moods and activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 overflow-scroll justify-center p-2">
              {Object.entries(chartConfigData).map(
                ([chartLabel, chartValue], idx) => (
                  <div
                    className={cn(
                      `flex items-center gap-2 border-[1px] shadow-md shadow-gray-300 border-opacity-0 rounded-md p-2 text-black font-light`,
                      chartValue.label === "Energy" &&
                        "border-energy bg-energy/20",
                      chartValue.label === "Happiness" &&
                        "border-happiness bg-happiness/20",
                      chartValue.label === "Stress" &&
                        "border-stress bg-stress/20",
                      idx === 0 && "sticky"
                    )}
                    key={`mood-${chartValue.label}`}
                  >
                    <Checkbox
                      className={cn(
                        chartValue.label === "Energy" && "border-energy",
                        chartValue.label === "Happiness" && " border-happiness",
                        chartValue.label === "Stress" && "border-stress"
                      )}
                      defaultChecked
                      onCheckedChange={() => handleCheckChange(chartLabel)}
                    />
                    {chartValue.label}
                  </div>
                )
              )}
            </div>

            <AddToChart />

            <TimeFrameSelector />
          </div>

          <InteractiveChart
            chartConfig={chartConfigData}
            chartData={dataSortedByDate}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartViewer;

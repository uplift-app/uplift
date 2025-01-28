import { useState } from "react";
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
const ChartViewer = () => {
  // const chartData = [
  //   { month: "January", happiness: 186, stress: 80, energy: 100 },
  //   { month: "February", happiness: 305, stress: 200, energy: 0 },
  //   { month: "March", happiness: 237, stress: 120, energy: 80 },
  //   { month: "April", happiness: 73, stress: 190, energy: 72 },
  //   { month: "May", happiness: 209, stress: 130, energy: 130 },
  //   { month: "June", happiness: 214, stress: 140, energy: 150 },
  // ];

  const chartData: MoodEntry[] = [
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
      _id: "67979b8b652a8ac3ae9c2202",
      moodType: "stress",
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
  ];

  // Loop through all entries in chartData, saving
  type MoodEntry = {
    _id: string;
    moodType: "happiness" | "stress" | "energy"; // Add other mood types if needed
    intensity: number;
    userId: string;
    moodTime: string;
    date: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
  };

  type TransformedEntry = {
    date: string;
    happiness?: number;
    stress?: number;
    energy?: number;
  };

  // This was written by AI
  const transformChartData = (data: MoodEntry[]): TransformedEntry[] => {
    const groupedData: Record<string, TransformedEntry> = data.reduce(
      //Reduce is used to add the entries to the accumulator
      (acc, { date, moodType, intensity }) => {
        // Only add an entry with a new date if it doesn't exist yet
        if (!acc[date]) {
          acc[date] = { date };
        }
        // Add the mood type and intensity to the date
        acc[date][moodType] = intensity;
        return acc;
      },
      {} as Record<string, TransformedEntry>
    );

    return Object.values(groupedData);
  };

  const transformedData = transformChartData(chartData);
  const ogData = transformChartData(chartData);
  console.log("ogData", ogData);
  const moodTypes: (keyof TransformedEntry)[] = [
    "energy",
    "happiness",
    "stress",
  ];
  // Loop through each entry. Find any entries for which there isn't any mood data.
  // For each entry: check that all the moodTypes have an associated value
  // If yes, move on to next entry.
  // If no, find the nearest point backwards and forwards.
  // eg. Found happiness = 0 at n-2, happiness = 10 n+3.
  // This would mean putting happiness = 2 at n-1, happiness = 4 at n, happiness = 6 at n + 1 and happiness = 8 at n + 2;

  const fillSpace = (
    transformedData: TransformedEntry[],
    index: number,
    moodType: keyof TransformedEntry,
    baseValue: string | number | undefined
  ) => {
    // Type resolution
    if (typeof baseValue !== "number") {
      baseValue = 0;
    }

    // If we're at the start of the array, set the start mood to zero.
    if (index === 0) {
      transformedData[0][moodType] = 0 as never;
      return;
    }
    // If we're at the end of the data, set it to the last one
    else if (index === transformedData.length - 1) {
      transformedData[index][moodType] = transformedData[index - 1][
        moodType
      ] as never;
    }

    let baseIndex = index + 1;
    // n counts the steps forwards we've taken
    let n = 1;
    // next value tracks when we've found a next value in the array for the mood we're concerned with
    let nextValue: number | undefined = undefined;

    while (baseIndex < transformedData.length) {
      if (transformedData[baseIndex][moodType] === undefined) {
        // If we don't find the values in the next entry, increase the step count and the index
        n++;
        baseIndex++;
      } else {
        // otherwise set the nextValue to the found value and exit while loop
        nextValue = transformedData[baseIndex][moodType] as number;
        break;
      }
    }
    //
    if (nextValue !== undefined) {
      for (let j = 0; j < n; j++) {
        console.log(
          "mood",
          moodType,
          "base value",
          baseValue,
          "nextvalue",
          nextValue,
          "n",
          n,
          "index",
          index,
          "j",
          j
        );
        transformedData[index + j][moodType] = (baseValue +
          (nextValue - baseValue) / (n + 1 - j)) as never;
      }
    } else if (nextValue === undefined) {
      transformedData[index][moodType] = transformedData[index - 1][
        moodType
      ] as never;
    }
    // Find the next one
  };
  for (let i = 0; i < transformedData.length; i++) {
    for (let j = 0; j < moodTypes.length; j++) {
      if (transformedData[i][moodTypes[j]] === undefined) {
        let baseValue: string | number | undefined = 0;
        if (i !== 0) {
          baseValue = transformedData[i - 1][moodTypes[j]];
        }
        // Call the function to fill the space
        fillSpace(transformedData, i, moodTypes[j], baseValue);
      }
    }
  }
  // Need to extrapolate the other entries from the transformedData.

  console.log("transformedData", transformedData);
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
          </div>

          <InteractiveChart
            chartConfig={chartConfigData}
            chartData={transformedData}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartViewer;

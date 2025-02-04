import { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { InteractiveLineChart } from "@/components/inputs/InteractiveLineChart";
import { ChartConfig } from "@/components/ui/chart";
import { transformMoodData } from "@/lib/chartview-functions";
import TimeFrameSelector from "@/components/inputs/TimeFrameSelector";
import { errorHandler, getMoods } from "@/lib/ApiService";
import { MoodFromBackend, MoodSortedByDate } from "@/lib/interfaces";

const MoodChart = () => {
  const [chartData, setChartData] = useState<MoodFromBackend[]>([]);
  const fetchMoods = async () => {
    try {
      const data = await getMoods();
      setChartData(data);
      setDataFilteredAndSorted(transformMoodData(data, timeFrame));
    } catch (error) {
      errorHandler(error);
    }
  };

  // Fetch the mood and activity data from backend on first render
  useEffect(() => {
    fetchMoods();
  }, []);

  const [timeFrame, setTimeFrame] = useState("Last month");
  const [dataFilteredAndSorted, setDataFilteredAndSorted] = useState<
    MoodSortedByDate[]
  >([]);

  //Reset the filtered data when the timeframe changes
  useEffect(() => {
    setDataFilteredAndSorted(transformMoodData(chartData, timeFrame));
  }, [timeFrame]);

  // Initialise the chart configuration
  const chartConfig: ChartConfig = {
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
  };

  const [chartConfigData, setChartConfigData] =
    useState<ChartConfig>(chartConfig);

  // update the chart config if the user deselects any moods
  const handleCheckChange = (chartLabel: keyof ChartConfig) => {
    setChartConfigData((prev) => {
      const newChartConfig = { ...prev };

      if (chartLabel in newChartConfig) {
        // If it exists, remove it
        delete newChartConfig[chartLabel];
      } else {
        // If it doesn't exist, add it back from the original chartConfig
        newChartConfig[chartLabel] = chartConfig[chartLabel];
      }

      return newChartConfig;
    });
  };

  return (
    <Card className="flex p-4 flex-col space-y-4 pb-4">
      <CardTitle>Your moods</CardTitle>
      <div className=" gap-2">
        <div className="flex gap-2 overflow-scroll justify-center p-2">
          {Object.entries(chartConfig).map(([chartLabel, chartValue], idx) => (
            <div
              className={cn(
                `flex items-center gap-2 border-[1px] shadow-md shadow-gray-300 border-opacity-0 rounded-md p-2 text-black font-light`,
                chartValue.label === "Energy" && "border-energy bg-energy/20",
                chartValue.label === "Happiness" &&
                  "border-happiness bg-happiness/20",
                chartValue.label === "Stress" && "border-stress bg-stress/20",
                idx === 0 && "sticky"
              )}
              key={`mood-${chartValue.label}`}
            >
              <Checkbox
                className={cn(
                  chartValue.label === "Energetic" && "border-energy",
                  chartValue.label === "Happy" && " border-happiness",
                  chartValue.label === "Relaxed" && "border-stress"
                )}
                defaultChecked
                onCheckedChange={() => handleCheckChange(chartLabel)}
              />
              {chartValue.label}
            </div>
          ))}
        </div>

        <TimeFrameSelector timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
      </div>

      <InteractiveLineChart
        timeFrame={timeFrame}
        chartConfig={chartConfigData}
        chartData={dataFilteredAndSorted}
      />
    </Card>
  );
};

export default MoodChart;

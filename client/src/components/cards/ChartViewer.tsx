import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { InteractiveChart } from "../inputs/InteractiveChart";
import { ChartConfig } from "../ui/chart";
import AddToChart from "../inputs/AddToChart";
import { transformChartData } from "@/lib/chartview-functions";
import TimeFrameSelector from "../inputs/TimeFrameSelector";
import { getMoods } from "@/lib/ApiService";
import { MoodFromBackend, MoodSortedByDate } from "@/lib/interfaces";
import { useAuth } from "@clerk/clerk-react";

const ChartViewer = () => {
  const { getToken } = useAuth();
  // Fetch this data from the backend
  const [chartData, setChartData] = useState<MoodFromBackend[]>([]);
  const fetchMoods = async () => {
    try {
      const token = await getToken();
      if (token) {
        const data = await getMoods(token);
        setChartData(data);
      }
    } catch (error) {
      console.error(
        error instanceof Error
          ? error.message
          : "An error occurred fetching the moods in the chartViewer."
      );
    }
  };

  // Fetch the data from backend on first render
  useEffect(() => {
    fetchMoods();
  }, []);

  const [timeFrame, setTimeFrame] = useState("Last month");
  const [dataFilteredAndSorted, setDataFilteredAndSorted] = useState<
    MoodSortedByDate[]
  >([]);

  //Reset the filtered data when the timeframe changes
  useEffect(() => {
    setDataFilteredAndSorted(transformChartData(chartData, timeFrame));
  }, [timeFrame]);

  // Initialise the chart configuration
  const chartConfig: ChartConfig = {
    energetic: {
      label: "Energetic",
      color: "hsl(var(--energy))",
    },
    happy: {
      label: "Happy",
      color: "hsl(var(--happiness))",
    },
    relaxed: {
      label: "Relaxed",
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
                      chartValue.label === "Energetic" &&
                        "border-energy bg-energy/20",
                      chartValue.label === "Happy" &&
                        "border-happiness bg-happiness/20",
                      chartValue.label === "Relaxed" &&
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

            <TimeFrameSelector
              timeFrame={timeFrame}
              setTimeFrame={setTimeFrame}
            />
          </div>

          <InteractiveChart
            timeFrame={timeFrame}
            chartConfig={chartConfigData}
            chartData={dataFilteredAndSorted}
          />
          <AddToChart />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartViewer;

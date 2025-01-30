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
  useEffect(() => {
    fetchMoods();
  }, []);

  // Loop through all entries in chartData, saving

  const chartConfig = {
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

  const [timeFrame, setTimeFrame] = useState("Last month");
  const [dataFilteredAndSorted, setDataFilteredAndSorted] = useState<
    MoodSortedByDate[]
  >([]);

  useEffect(() => {
    setDataFilteredAndSorted(transformChartData(chartData, timeFrame));
  }, []);

  useEffect(() => {
    setDataFilteredAndSorted(transformChartData(chartData, timeFrame));
  }, [timeFrame]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visualise your progress</CardTitle>
        <CardDescription>Plot your moods and activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='prose space-y-4'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 overflow-scroll justify-center p-2'>
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

            <AddToChart />

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
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartViewer;

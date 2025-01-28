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
  const chartData = [
    { month: "January", happiness: 186, stress: 80, energy: 100 },
    { month: "February", happiness: 305, stress: 200, energy: 0 },
    { month: "March", happiness: 237, stress: 120, energy: 80 },
    { month: "April", happiness: 73, stress: 190, energy: 72 },
    { month: "May", happiness: 209, stress: 130, energy: 130 },
    { month: "June", happiness: 214, stress: 140, energy: 150 },
  ];

  const chartConfig = {
    energy: {
      label: "Energy",
      color: "hsl(var(--chart-1))",
    },
    happiness: {
      label: "Happiness",
      color: "hsl(var(--chart-2))",
    },
    stress: {
      label: "Stress",
      color: "hsl(var(--chart-3))",
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
            chartData={chartData}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartViewer;

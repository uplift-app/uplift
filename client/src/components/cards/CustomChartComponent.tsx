import {
  ActivityFromBackend,
  ActivitySortedByDate,
  CustomChart,
} from "@/lib/interfaces";
import { ChartConfig } from "../ui/chart";
import TimeFrameSelector from "../inputs/TimeFrameSelector";
import { useEffect, useState } from "react";
import { InteractiveAreaChart } from "../inputs/InteractiveAreaChart";
import { InteractiveBarChart } from "../inputs/InteractiveBarChart";
import { transformActivityData } from "@/lib/chartview-functions";
import { InteractiveLineChart } from "../inputs/InteractiveLineChart";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface CustomChartComponentProps {
  customChartData: CustomChart;
  activityData: ActivityFromBackend[];
  activityTypes: string[];
  onRemove: () => void;
}
const CustomChartComponent = ({
  customChartData,
  activityData,
  activityTypes,
  onRemove,
}: CustomChartComponentProps) => {
  const chartConfig: ChartConfig = customChartData.data.reduce<
    Record<string, { label: string; color: string }>
  >((acc, type, idx) => {
    acc[type] = {
      label: type,
      color: `hsl(var(--chart-${idx + 1}))`,
    };
    return acc;
  }, {});

  const [timeFrame, setTimeFrame] = useState("Last month");
  const [dataFilteredAndSorted, setDataFilteredAndSorted] = useState<
    ActivitySortedByDate[]
  >([]);
  useEffect(() => {
    setDataFilteredAndSorted(
      transformActivityData(activityData, timeFrame, activityTypes)
    );
  }, [timeFrame]);

  const description = customChartData.data
    .map((activity) => activity[0].toUpperCase() + activity.slice(1))
    .join(" + ");

  return (
    <Card className="p-4 space-y-4 basis-full lg:basis-[calc(50%-0.5rem)]">
      <CardTitle className="flex items-center">
        {description}{" "}
        <Button className="ml-auto" onClick={onRemove}>
          <X />
        </Button>
      </CardTitle>
      <CardContent className="space-y-4">
        <TimeFrameSelector timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
        {customChartData.type === "Area" && (
          <InteractiveAreaChart
            timeFrame={timeFrame}
            chartData={dataFilteredAndSorted}
            chartConfig={chartConfig}
          />
        )}
        {customChartData.type === "Bar" && (
          <InteractiveBarChart
            timeFrame={timeFrame}
            chartData={dataFilteredAndSorted}
            chartConfig={chartConfig}
          />
        )}
        {customChartData.type === "Line" && (
          <InteractiveLineChart
            timeFrame={timeFrame}
            chartData={dataFilteredAndSorted}
            chartConfig={chartConfig}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default CustomChartComponent;

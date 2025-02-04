import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AreaChartPlaceholder from "./AreaChartPlaceholder";
import BarChartPlaceholder from "./BarChartPlaceholder";
import LineChartPlaceholder from "./LineChartPlaceholder";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { ChartTypes } from "@/lib/interfaces";
interface ChartTypeSelectorProps {
  chosenChart: ChartTypes;
  setChosenChart: Dispatch<SetStateAction<ChartTypes>>;
}
const ChartTypeSelector = ({
  chosenChart,
  setChosenChart,
}: ChartTypeSelectorProps) => {
  const chartTypes = [
    {
      title: "Area" as ChartTypes,
      description: "Showing hours of reading and stretching",
      component: <AreaChartPlaceholder />,
    },
    {
      title: "Bar" as ChartTypes,
      description: "Showing time exercising and gaming",
      component: <BarChartPlaceholder />,
    },
    {
      title: "Line" as ChartTypes,
      description: "Showing meditation and playing guitar",
      component: <LineChartPlaceholder />,
    },
  ];
  return (
    <div className="flex sm:flex-col lg:flex-row p-4 gap-4">
      {chartTypes.map((chartType, key) => (
        <Card
          key={key}
          className={cn(
            "flex flex-col items-center cursor-pointer hover:bg-blue-200/50 transition-colors duration-500",
            chosenChart === chartType.title && "bg-blue-100/50 border-blue-400"
          )}
          onClick={() => setChosenChart(chartType.title)}
        >
          <CardHeader>
            <CardTitle>{chartType.title + " Chart"}</CardTitle>
            <CardDescription>{chartType.description}</CardDescription>
          </CardHeader>
          <CardContent>{chartType.component}</CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ChartTypeSelector;

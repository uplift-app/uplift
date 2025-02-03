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
import { useState } from "react";
import { cn } from "@/lib/utils";

const ChartTypeSelector = () => {
  const [chosenChart, setChosenChart] = useState("");
  const chartTypes = [
    {
      title: "Area Chart",
      description: "Showing hours of reading and stretching",
      component: <AreaChartPlaceholder />,
    },
    {
      title: "Bar Chart",
      description: "Showing time exercising and gaming",
      component: <BarChartPlaceholder />,
    },
    {
      title: "Line Chart",
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
            <CardTitle>{chartType.title}</CardTitle>
            <CardDescription>{chartType.description}</CardDescription>
          </CardHeader>
          <CardContent>{chartType.component}</CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ChartTypeSelector;

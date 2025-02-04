import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { AxisInterval } from "recharts/types/util/types";

interface ChartProps {
  chartConfig: ChartConfig;
  chartData: any;
  timeFrame: string;
}

export function InteractiveLineChart({
  chartData,
  chartConfig,
  timeFrame,
}: ChartProps) {
  const [interval, setInterval] = useState<AxisInterval>("preserveStartEnd");
  const formatDate = (timeFrame: string, dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      date.getDay()
    ];
    const month = date.toLocaleString("en-US", { month: "short" });

    switch (timeFrame) {
      case "Last week":
        setInterval("preserveStartEnd");
        return dayOfWeek;
      case "Last month":
        setInterval(6);
        return dayOfWeek;
      case "Last 3 months":
        setInterval(26);
        return month;
      case "Last 6 months":
        setInterval(26);
        return month;
      case "All time":
        setInterval(26);
        return month;
      default:
        return dayOfWeek;
    }
  };
  const chartKeys = Object.keys(chartConfig);
  return (
    <ChartContainer config={chartConfig} className="w-full bg-white rounded-lg">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(date) => formatDate(timeFrame, date)}
          interval={interval}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        {chartKeys.map((chartKey) => (
          <Line
            key={chartKey}
            dataKey={chartKey}
            type="natural"
            stroke={`var(--color-${chartKey})`}
            strokeWidth={2}
            dot={false}
          />
        ))}
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  );
}

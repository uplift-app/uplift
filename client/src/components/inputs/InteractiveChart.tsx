import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { AxisInterval } from "recharts/types/util/types";

interface ChartProps {
  chartConfig: ChartConfig;
  chartData: any;
  timeFrame: string;
}

export function InteractiveChart({
  chartData,
  chartConfig,
  timeFrame,
}: ChartProps) {
  const [interval, setInterval] = useState<AxisInterval>("preserveStartEnd");
  useEffect(() => {
    switch (timeFrame) {
      case "Last week":
        setInterval("preserveStartEnd");
        break;
      case "Last month":
        setInterval(6);
        break;
      case "Last 3 months":
        setInterval(26);
        break;
      case "Last 6 months":
        setInterval(26);
        break;
      case "All time":
        setInterval(26);
        break;
      default:
        setInterval("preserveStartEnd");
        break;
    }
  }, [timeFrame]);

  const formatDate = (timeFrame: string, dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      date.getDay()
    ];
    const month = date.toLocaleString("en-US", { month: "short" });
    return ["Last week", "Last month"].includes(timeFrame) ? dayOfWeek : month;
  };

  const chartKeys = Object.keys(chartConfig);

  return (
    <ChartContainer config={chartConfig} className='w-full bg-white rounded-lg'>
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
          dataKey='date'
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
            type='natural'
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

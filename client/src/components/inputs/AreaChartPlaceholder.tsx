import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const AreaChartPlaceholder = () => {
  const chartData = [
    { month: "January", reading: 18, stretching: 8 },
    { month: "February", reading: 30, stretching: 20 },
    { month: "March", reading: 23, stretching: 12 },
    { month: "April", reading: 73, stretching: 19 },
    { month: "May", reading: 20, stretching: 13 },
    { month: "June", reading: 21, stretching: 14 },
  ];

  const chartConfig = {
    reading: {
      label: "reading",
      color: "hsl(var(--chart-1))",
    },
    stretching: {
      label: "stretching",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-[200px]">
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="stretching"
            type="natural"
            fill="var(--color-stretching)"
            fillOpacity={0.4}
            stroke="var(--color-stretching)"
            stackId="a"
          />
          <Area
            dataKey="reading"
            type="natural"
            fill="var(--color-reading)"
            fillOpacity={0.4}
            stroke="var(--color-reading)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default AreaChartPlaceholder;

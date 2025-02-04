import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", exercising: 30, gaming: 8 },
  { month: "February", exercising: 25, gaming: 20 },
  { month: "March", exercising: 13, gaming: 12 },
  { month: "April", exercising: 13, gaming: 19 },
  { month: "May", exercising: 24, gaming: 13 },
  { month: "June", exercising: 21, gaming: 14 },
];

const chartConfig = {
  exercising: {
    label: "exercising",
    color: "hsl(var(--chart-1))",
  },
  gaming: {
    label: "gaming",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const BarChartPlaceholder = () => {
  return (
    <div className="w-[200px]">
      <ChartContainer config={chartConfig}>
        <BarChart
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

          <Bar dataKey="exercising" fill="var(--color-exercising)" radius={4} />
          <Bar dataKey="gaming" fill="var(--color-gaming)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default BarChartPlaceholder;

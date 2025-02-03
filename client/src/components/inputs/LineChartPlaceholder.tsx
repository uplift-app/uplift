import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", meditation: 5, guitar: 20 },
  { month: "February", meditation: 17, guitar: 10 },
  { month: "March", meditation: 13, guitar: 18 },
  { month: "April", meditation: 18, guitar: 9 },
  { month: "May", meditation: 10, guitar: 23 },
  { month: "June", meditation: 21, guitar: 14 },
];

const chartConfig = {
  meditation: {
    label: "meditation",
    color: "hsl(var(--chart-1))",
  },
  guitar: {
    label: "guitar",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const LineChartPlaceholder = () => {
  return (
    <div className="w-[200px]">
      <ChartContainer config={chartConfig}>
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
          <Line
            dataKey="meditation"
            type="monotone"
            stroke="var(--color-meditation)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="guitar"
            type="monotone"
            stroke="var(--color-guitar)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default LineChartPlaceholder;

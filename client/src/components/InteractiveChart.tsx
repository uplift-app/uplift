import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

interface ChartProps {
  chartConfig: ChartConfig;
  chartData: any;
}
export function InteractiveChart({ chartData, chartConfig }: ChartProps) {
  const chartKeys = Object.keys(chartConfig);
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
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

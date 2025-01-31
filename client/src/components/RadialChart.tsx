"use client";

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const maxValue = 10;

export function RadialChart({
  currentValue,
  moodType,
}: {
  currentValue: number;
  moodType: string;
}) {
  const percentage = Math.round((currentValue / maxValue) * 100);
  const chartData = [
    {
      name: `${moodType}`,
      curValue: currentValue,
      maxValue: maxValue - currentValue,
    },
  ];

  const chartConfig = {
    curValue: {
      label: `${moodType}`,
      color: "hsl(var(--chart-2))",
    },
    maxValue: {
      label: "maxValue",
      color: "#efefef",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{moodType}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="-mb-24 -mt-4 -mx-8 aspect-square w-60 max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={130}
          >
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {percentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        ></tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="curValue"
              stackId="a"
              cornerRadius={5}
              fill={"var(--color-curValue)"}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="maxValue"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-maxValue)"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Your average energy level is {currentValue}{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter> */}
    </Card>
  );
}

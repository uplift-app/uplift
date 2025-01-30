import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ChartTypeSelector = () => {
  const chartTypes = [
    { title: "Area Chart", description: "Showing hours of reading" },
    { title: "Bar Chart", description: "Showing time spent cleaning" },
    { title: "Line Chart", description: "Showing your meditation progress" },
  ];
  return (
    <div className="flex p-4 gap-4">
      {chartTypes.map((chartType) => (
        <Card>
          <CardHeader>
            <CardTitle>{chartType.title}</CardTitle>
            <CardDescription>{chartType.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default ChartTypeSelector;

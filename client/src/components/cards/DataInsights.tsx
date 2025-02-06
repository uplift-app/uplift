import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { useAnalysisDataContext } from "@/contexts/AnalysisDataContext";

const DataInsights = () => {
  const { analysisData } = useAnalysisDataContext();

  if (!analysisData || Object.keys(analysisData).length === 0) {
    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Data Insights</CardTitle>
          <CardDescription>
            No data available yet. Track activities and moods to gain insights.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const formatMoodInsights = () => {
    const moodMapping: { [key: string]: string } = {
      energy: "energy level",
      happiness: "happiness",
      stress: "relaxation",
    };

    return analysisData.avgMood.map((mood) => {
      const [key, value] = Object.entries(mood)[0];
      const formattedKey = moodMapping[key];
      return (
        <p key={key}>
          Your average {formattedKey} is {value.toFixed(1)}.
        </p>
      );
    });
  };

  const bestMoodTime = () => {
    let bestTime = Object.entries(analysisData.avgMoodtime).reduce(
      (prev, curr) =>
        Object.values(prev[1])[0] > Object.values(curr[1])[0] ? prev : curr
    );
    return `You feel best in the ${
      Object.keys(bestTime[1])[0]
    } with an average mood score of ${Object.values(bestTime[1])[0].toFixed(
      1
    )}.`;
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Data Insights</CardTitle>
        <CardDescription>
          Understand your mood patterns and activities.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <h2 className="text-lg font-semibold">Insights</h2>
        {formatMoodInsights()}
        <p>{bestMoodTime()}</p>
      </CardContent>
    </Card>
  );
};

export default DataInsights;

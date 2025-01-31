import { useAnalysisDataContext } from "@/contexts/AnalysisDataContext";
import { RadialChart } from "./RadialChart";

const MoodLevels = () => {
  const { analysisData } = useAnalysisDataContext();

  if (!analysisData || Object.keys(analysisData).length === 0) {
    return (
      <div>
        No data available yet. Track activities and moods to gain insights.
      </div>
    );
  }

  const formatMoodInsights = () => {
    const moodMapping: { [key: string]: string } = {
      energy: "energy level",
      happiness: "happiness",
      stress: "relaxation",
    };

    return analysisData.avgMood.map((mood, index) => {
      const [key, value] = Object.entries(mood)[0];
      const formattedKey = moodMapping[key];
      return (
        <RadialChart
          key={index}
          currentValue={value.toFixed(1)}
          moodType={formattedKey}
        />
      );
    });
  };

  return <div className="flex gap-4">{formatMoodInsights()}</div>;
};

export default MoodLevels;

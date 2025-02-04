import { useAnalysisDataContext } from "@/contexts/AnalysisDataContext";
import { RadialChart } from "./RadialChart";

const MoodLevels = () => {
  const { analysisData } = useAnalysisDataContext();

  if (
    !analysisData ||
    Object.keys(analysisData).length === 0 ||
    analysisData.avgMood.length === 0
  ) {
    return <p>No data available yet. Track moods to gain insights.</p>;
  }

  const formatMoodInsights = () => {
    return analysisData.avgMood.map((mood, index) => {
      const [key, value] = Object.entries(mood)[0];
      return (
        <RadialChart
          key={index}
          currentValue={value.toFixed(1)}
          moodType={key}
        />
      );
    });
  };

  return <div className="flex gap-4">{formatMoodInsights()}</div>;
};

export default MoodLevels;

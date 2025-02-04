import { useAnalysisDataContext } from "@/contexts/AnalysisDataContext";
import { RadialChart } from "../inputs/RadialChart";

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

  return (
    <div className='flex flex-col sm:flex-row flex-wrap gap-4'>
      {formatMoodInsights()}
    </div>
  );
};

export default MoodLevels;

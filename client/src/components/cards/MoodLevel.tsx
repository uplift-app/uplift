import { useAnalysisDataContext } from "@/contexts/AnalysisDataContext";
import { RadialChart } from "../inputs/RadialChart";
import { useEffect, useState } from "react";
import LoadingPage from "../pages/LoadingPage";

const MoodLevels = () => {
  const { analysisData } = useAnalysisDataContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(analysisData).length > 0) {
      setIsLoading(false);
    }
  }, [analysisData]);

  if (Object.keys(analysisData).length === 0 && !isLoading) {
    return (
      <div>
        No data available yet. Track activities and moods to gain insights.
      </div>
    );
  }

  if (isLoading) {
    return <LoadingPage />;
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
    <div className="flex flex-col sm:flex-row flex-wrap gap-4">
      {formatMoodInsights()}
    </div>
  );
};

export default MoodLevels;

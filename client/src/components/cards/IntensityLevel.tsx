import { useAnalysisDataContext } from "@/contexts/AnalysisDataContext";
import { useEffect, useState } from "react";
import { RadialChart } from "../inputs/RadialChart";
import LoadingPage from "../pages/LoadingPage";

const IntensityLevels = () => {
  const { analysisData } = useAnalysisDataContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(analysisData).length > 0) {
      setIsLoading(false);
    }
  }, [analysisData]);

  if (
    (Object.keys(analysisData).length === 0 ||
      analysisData.avgMood.length === 0) &&
    !isLoading
  ) {
    return (
      <div>
        No data available yet. Track activities and moods to gain insights.
      </div>
    );
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  const formatMoodTimeInsights = () => {
    const order = ["morning", "afternoon", "evening", "night", "all day"];

    return analysisData.avgMoodtime
      .sort((a, b) => {
        const timeA = Object.keys(a)[0];
        const timeB = Object.keys(b)[0];
        return order.indexOf(timeA) - order.indexOf(timeB);
      })
      .map((mood, index) => {
        let [key, value] = Object.entries(mood)[0];
        if (key === "all day") key = "all-day";

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
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          {formatMoodTimeInsights()}
        </div>
      )}
    </>
  );
};

export default IntensityLevels;

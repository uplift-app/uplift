import { useAnalysisDataContext } from "@/contexts/AnalysisDataContext";
import { RadialChart } from "../inputs/RadialChart";

const IntensityLevels = () => {
  const { analysisData } = useAnalysisDataContext();

  if (!analysisData || Object.keys(analysisData).length === 0) {
    return (
      <div>
        No data available yet. Track activities and moods to gain insights.
      </div>
    );
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
    <div className='flex flex-col sm:flex-row flex-wrap gap-4'>
      {formatMoodTimeInsights()}
    </div>
  );
};

export default IntensityLevels;

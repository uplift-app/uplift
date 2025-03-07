import { ActivityFromBackend, CustomChart } from "@/lib/interfaces";
import CustomChartComponent from "./CustomChartComponent";

interface CustomChartsWrapperProps {
  customCharts: CustomChart[];
  activityData: ActivityFromBackend[];
  activityTypes: string[];
  setCustomCharts: React.Dispatch<React.SetStateAction<CustomChart[]>>;
}
const CustomChartsWrapper = ({
  customCharts,
  activityData,
  activityTypes,
  setCustomCharts,
}: CustomChartsWrapperProps) => {
  const handleRemoveChart = (chartToRemove: CustomChart) => {
    setCustomCharts((prevCharts) =>
      prevCharts.filter((chart) => chart !== chartToRemove)
    );
  };
  return (
    <>
      {customCharts.map((customChartData) => (
        <CustomChartComponent
          onRemove={() => handleRemoveChart(customChartData)}
          customChartData={customChartData}
          activityData={activityData}
          activityTypes={activityTypes}
        />
      ))}
    </>
  );
};

export default CustomChartsWrapper;

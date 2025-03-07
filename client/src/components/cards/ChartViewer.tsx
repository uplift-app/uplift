import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import AddToChart from "@/components/inputs/AddToChart";
import {
  errorHandler,
  getActivities,
  getActivityTypes,
} from "@/lib/ApiService";
import { ActivityFromBackend, CustomChart } from "@/lib/interfaces";
import MoodChart from "../inputs/MoodChart";
import LoadingPage from "../pages/LoadingPage";
import CustomChartsWrapper from "./CustomChartsWrapper";

const ChartViewer = () => {
  const [activityData, setActivityData] = useState<ActivityFromBackend[]>([]);
  const [activityTypes, setActivityTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchActivityData = async () => {
    try {
      const activityTypes = await getActivityTypes();
      const data = await getActivities();
      setActivityData(data);
      setActivityTypes(activityTypes);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchActivityData().then(() => setIsLoading(false));
  }, []);

  const [customCharts, setCustomCharts] = useState<CustomChart[]>([]);

  return (
    <Card className="component-style !p-0 xl:col-span-2">
      <CardHeader>
        <CardTitle className="heading-style">Visualise your progress</CardTitle>
        <CardDescription>Plot your moods and activities</CardDescription>
      </CardHeader>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-stretch flex-wrap">
            <MoodChart />
            <CustomChartsWrapper
              activityTypes={activityTypes}
              customCharts={customCharts}
              setCustomCharts={setCustomCharts}
              activityData={activityData}
            />
          </div>
          <AddToChart setCustomCharts={setCustomCharts} />
        </CardContent>
      )}
    </Card>
  );
};

export default ChartViewer;

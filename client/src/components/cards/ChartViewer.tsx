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
import MoodChart from "../MoodChart";
import CustomChartsWrapper from "../CustomChartsWrapper";

const ChartViewer = () => {
  // Fetch this data from the backend
  const [activityData, setActivityData] = useState<ActivityFromBackend[]>([]);
  const [activityTypes, setActivityTypes] = useState<string[]>([]);

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

  // Fetch the mood and activity data from backend on first render
  useEffect(() => {
    fetchActivityData();
  }, []);

  // Initialise the chart configuration

  const [customCharts, setCustomCharts] = useState<CustomChart[]>([]);

  return (
    <Card className="component-style !p-0">
      <CardHeader>
        <CardTitle className="heading-style">
          Visualise your progress.
        </CardTitle>
        <CardDescription>Plot your moods and activities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <MoodChart />
        <CustomChartsWrapper
          activityTypes={activityTypes}
          customCharts={customCharts}
          setCustomCharts={setCustomCharts}
          activityData={activityData}
        />
        <AddToChart setCustomCharts={setCustomCharts} />
      </CardContent>
    </Card>
  );
};

export default ChartViewer;

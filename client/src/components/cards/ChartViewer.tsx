import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import AddToChart from "../inputs/AddToChart";
import { getActivities, getActivityTypes } from "@/lib/ApiService";
import { ActivityFromBackend, CustomChart } from "@/lib/interfaces";
import { useAuth } from "@clerk/clerk-react";
import MoodChart from "../MoodChart";
import CustomChartsWrapper from "../CustomChartsWrapper";

const ChartViewer = () => {
  const { getToken } = useAuth();
  // Fetch this data from the backend
  const [activityData, setActivityData] = useState<ActivityFromBackend[]>([]);
  const [activityTypes, setActivityTypes] = useState<string[]>([]);

  const fetchActivityData = async () => {
    try {
      const token = await getToken();
      if (token) {
        const activityTypes = await getActivityTypes(token);
        const data = await getActivities(token);
        setActivityData(data);
        setActivityTypes(activityTypes);
      }
    } catch (error) {
      console.error(
        error instanceof Error
          ? error.message
          : "An error occurred fetching the moods in the chartViewer."
      );
    }
  };

  // Fetch the mood and activity data from backend on first render
  useEffect(() => {
    fetchActivityData();
  }, []);

  // Initialise the chart configuration

  const [customCharts, setCustomCharts] = useState<CustomChart[]>([]);

  return (
    <Card className="bg-[#d7d7d7]">
      <CardHeader>
        <CardTitle>Visualise your progress</CardTitle>
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

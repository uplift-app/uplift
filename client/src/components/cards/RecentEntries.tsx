import { useEffect, useState } from "react";
import {
  getRecentActivities,
  getRecentMoods,
  deleteMood,
  deleteActivity,
  errorHandler,
  editMood,
  editActivity,
} from "@/lib/ApiService";
import { ActivityFromBackend, MoodFromBackend } from "@/lib/interfaces";
import { RecentEntryItem } from "../inputs/RecentEntryItem";

export function RecentEntries() {
  const [combinedEntries, setCombinedEntries] = useState<
    (MoodFromBackend | ActivityFromBackend)[]
  >([]);

  const fetchAndUpdateEntries = async () => {
    try {
      const [moods, activities] = await Promise.all([
        getRecentMoods(),
        getRecentActivities(),
      ]);

      const allEntries = [...moods, ...activities];

      const sortedEntries = allEntries.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      const limitedEntries = sortedEntries.slice(0, 10);

      setCombinedEntries(limitedEntries);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    fetchAndUpdateEntries();
  }, []);

  const handleDeleteMood = async (id: string) => {
    try {
      const response = await deleteMood(id);
      if (response) {
        fetchAndUpdateEntries();
      } else {
        console.error("Failed to delete the mood");
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleDeleteActivity = async (id: string) => {
    try {
      const response = await deleteActivity(id);
      if (response) {
        fetchAndUpdateEntries();
      } else {
        console.error("Failed to delete the activity");
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleEditMood = async (moodData: MoodFromBackend) => {
    try {
      const response = await editMood(moodData);
      return response;
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleEditActivity = async (activityData: ActivityFromBackend) => {
    try {
      const response = await editActivity(activityData);
      return response;
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="w-full component-style max-h-[80vh]">
      <h2 className="heading-style pb-2">Your recent entries</h2>
      <div className="flex flex-col gap-4 overflow-y-scroll max-h-[95%] ">
        <div className="flex flex-col gap-4">
          {combinedEntries.map((entry) => (
            <RecentEntryItem
              key={entry._id}
              entry={entry}
              type={entry.hasOwnProperty("moodType") ? "mood" : "activity"}
              handleEdit={
                entry.hasOwnProperty("moodType")
                  ? handleEditMood
                  : handleEditActivity
              }
              handleDelete={
                entry.hasOwnProperty("moodType")
                  ? handleDeleteMood
                  : handleDeleteActivity
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentEntries;

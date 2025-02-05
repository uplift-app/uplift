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
import LoadingPage from "../pages/LoadingPage";

export function RecentEntries() {
  const [combinedEntries, setCombinedEntries] = useState<
    (MoodFromBackend | ActivityFromBackend)[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true);
    fetchAndUpdateEntries().then(() => setIsLoading(false));
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
      setCombinedEntries((prevEntries) =>
        prevEntries.map((entry) => {
          if (entry._id === response._id) {
            return response;
          }
          return entry;
        })
      );
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleEditActivity = async (activityData: ActivityFromBackend) => {
    try {
      const response = await editActivity(activityData);
      setCombinedEntries((prevEntries) =>
        prevEntries.map((entry) => {
          if (entry._id === response._id) {
            return response;
          }
          return entry;
        })
      );
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className='w-full component-style'>
      <h2 className='heading-style pb-2'>Your recent entries</h2>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className='flex flex-col gap-4 overflow-y-scroll max-h-[calc(100vh-10.5rem)]'>
          <div className='flex flex-col gap-4'>
            {combinedEntries.length > 0 ? (
              combinedEntries.map((entry) => (
                <RecentEntryItem
                  key={entry._id}
                  entry={entry}
                  type={entry.hasOwnProperty("moodType") ? "mood" : "activity"}
                  handleEdit={(data: MoodFromBackend | ActivityFromBackend) => {
                    if ("moodType" in data) {
                      handleEditMood(data);
                    } else {
                      handleEditActivity(data);
                    }
                  }}
                  handleDelete={
                    entry.hasOwnProperty("moodType")
                      ? handleDeleteMood
                      : handleDeleteActivity
                  }
                />
              ))
            ) : (
              <div>
                No recent entries yet. Please add some activity and mood entries
                first.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecentEntries;

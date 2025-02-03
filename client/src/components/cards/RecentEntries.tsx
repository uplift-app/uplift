import { useEffect, useState } from "react";
import {
  getRecentActivities,
  getRecentMoods,
  deleteMood,
  deleteActivity,
  errorHandler,
} from "@/lib/ApiService";
import { ActivityFromBackend, MoodFromBackend } from "@/lib/interfaces";
import { RecentEntryItem } from "../inputs/RecentEntryItem";

export function RecentEntries() {
  const [recentMoods, setRecentMoods] = useState<MoodFromBackend[]>([]);
  const [recentActivities, setRecentActivities] = useState<
    ActivityFromBackend[]
  >([]);

  useEffect(() => {
    async function fetchRecentMoods() {
      const recentMoods = await getRecentMoods();
      setRecentMoods(recentMoods);
    }
    fetchRecentMoods();
  }, []);

  useEffect(() => {
    async function fetchRecentActivities() {
      const recentActivities = await getRecentActivities();
      setRecentActivities(recentActivities);
    }
    fetchRecentActivities();
  }, []);

  const handleDeleteMood = async (id: string) => {
    try {
      const response = await deleteMood(id);
      if (response) {
        const newMoods = await getRecentMoods();
        setRecentMoods(newMoods);
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
        const newActivities = await getRecentActivities();
        setRecentActivities(newActivities);
      } else {
        console.error("Failed to delete the activity");
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleEditMood = (id: string) => {
    console.log(`Edit mood entry with ID: ${id}`);
  };

  const handleEditActivity = (id: string) => {
    console.log(`Edit mood entry with ID: ${id}`);
  };

  return (
    <div className='w-full bg-[#d7d7d7] rounded-lg p-4 shadow-md'>
      <h2 className='text-[#162046] font-semibold text-lg'>
        Your recent entries
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
        <div className='space-y-4'>
          <h3 className='font-semibold text-xl mb-4'>Recent Moods</h3>
          <div className='flex flex-col gap-4'>
            {recentMoods.map((mood) => (
              <RecentEntryItem
                key={mood._id}
                entry={mood}
                type='mood'
                handleEdit={handleEditMood}
                handleDelete={handleDeleteMood}
              />
            ))}
          </div>
        </div>
        <div className='space-y-4'>
          <h3 className='font-semibold text-xl mb-4'>Recent Activities</h3>
          <div className='flex flex-col gap-4'>
            {recentActivities.map((activity) => (
              <RecentEntryItem
                key={activity._id}
                entry={activity}
                type='activity'
                handleEdit={handleEditActivity}
                handleDelete={handleDeleteActivity}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

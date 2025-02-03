import { deleteMood, errorHandler, getRecentMoods } from "@/lib/ApiService";
import { MoodFromBackend } from "@/lib/interfaces";
import { useEffect, useState } from "react";

export function RecentEntries() {
  const [recentMoods, setRecentMoods] = useState<MoodFromBackend[]>([]);

  useEffect(() => {
    async function fetchRecentMoods() {
      const recentMoods = await getRecentMoods();
      setRecentMoods(recentMoods);
    }
    fetchRecentMoods();
  }, []);

  const moodEmojis: Record<string, string> = {
    happiness: "😊",
    stress: "😡",
    energy: "😌",
  };

  const formatDate = (date: string) => {
    const formattedDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return formattedDate.toLocaleDateString(undefined, options);
  };

  const handleEdit = (id: string) => {
    console.log(`Edit mood with ID: ${id}`);
  };

  const handleDelete = async (_id: string) => {
    try {
      const response = await deleteMood(_id);

      if (response) {
        setRecentMoods((prevMoods) =>
          prevMoods.filter((mood) => mood._id !== _id)
        );
        console.log(`Deleted mood with ID: ${_id}`);
      } else {
        console.error("Failed to delete the mood");
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className='w-full bg-[#d7d7d7] rounded-lg p-4 shadow-md'>
      <h2 className='text-[#162046] font-semibold text-lg'>
        Your recent entries
      </h2>
      <div className='flex flex-col gap-4'>
        {recentMoods.map((mood: MoodFromBackend, index: number) => {
          const moodEmoji = moodEmojis[mood.moodType];
          const formattedDate = formatDate(mood.createdAt);
          return (
            <div
              key={`${mood.date}-${index}`}
              className='flex items-center gap-6 bg-white rounded-xl w-full p-4 text-black shadow-sm'
            >
              <div className='text-5xl'>{moodEmoji}</div>
              <div>
                <div>{formattedDate}</div>
                <div>{`${
                  mood.moodType.charAt(0).toUpperCase() + mood.moodType.slice(1)
                } - ${mood.intensity}`}</div>
                <div>{`${
                  mood.moodTime[0].toUpperCase() + mood.moodTime.slice(1)
                }`}</div>
              </div>
              <div className='ml-auto flex gap-4 mb-auto'>
                <div
                  className='text-2xl cursor-pointer'
                  onClick={() => handleEdit(mood._id)}
                >
                  ✍️
                </div>
                <div
                  className='text-2xl cursor-pointer'
                  onClick={() => handleDelete(mood._id)}
                >
                  🗑️
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

export function RecentEntries() {
  const [recentMoods, setRecentMoods] = useState<any>([]);

  useEffect(() => {
    async function getRecentMoods() {
      const mockMoods = [
        {
          moodType: "happy",
          intensity: 3,
          moodTime: "all day",
          date: "2024-10-29T00:00:00.000Z",
          activities: ["exercise"],
        },
        {
          moodType: "happy",
          intensity: 3,
          moodTime: "all day",
          date: "2024-10-29T00:00:00.000Z",
          activities: ["exercise"],
        },
        {
          moodType: "happy",
          intensity: 3,
          moodTime: "all day",
          date: "2024-10-29T00:00:00.000Z",
          activities: ["exercise"],
        },
        {
          moodType: "happy",
          intensity: 3,
          moodTime: "all day",
          date: "2024-10-29T00:00:00.000Z",
          activities: ["exercise"],
        },
      ];
      setRecentMoods(mockMoods);
    }
    getRecentMoods();
  }, []);

  return (
    <div className='w-full bg-[#d7d7d7] rounded-lg p-4 shadow-md'>
      <h2 className='text-[#162046] font-semibold text-lg'>
        Your recent entries
      </h2>
      <div className='flex flex-col gap-4'>
        {recentMoods.map((mood: any, index: number) => {
          return (
            <div
              key={`${mood.date}-${index}`}
              className='flex items-center gap-6 bg-white rounded-xl w-full p-4 text-black shadow-sm'
            >
              <div className='text-5xl'>🤪</div>
              <div>
                <div>January, 30th</div>
                <div>Happy (17:34)</div>
                <div>Exercise, Smoking</div>
              </div>
              <div className='ml-auto flex gap-4 mb-auto'>
                <div className='text-2xl cursor-pointer'>✍️</div>
                <div className='text-2xl cursor-pointer'>🗑️</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

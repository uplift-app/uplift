import { useEffect, useState } from "react";
import { getMoods } from "@/lib/ApiService";
import { Card } from "./ui/card";

export function RecentEntries() {
  const [recentMoods, setRecentMoods] = useState<any[]>([]);

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
    <div className="w-full component-style">
      <h2 className="heading-style pb-2">Your recent entries</h2>
      <div className="flex flex-col gap-4">
        {recentMoods.map((mood: any, index) => {
          return (
            <Card key={index} className="flex items-center gap-6 w-full p-4">
              <img src="icons/faces/smile.svg" alt="" className="w-12" />
              <div>
                <div>January, 30th</div>
                <div>Happy (17:34)</div>
                <div>Exercise, Smoking</div>
              </div>
              <div className="ml-auto flex gap-4 mb-auto">
                <img
                  src="icons/edit.svg"
                  alt=""
                  className="w-6 cursor-pointer"
                />
                <img
                  src="icons/trash.svg"
                  alt=""
                  className="w-5 cursor-pointer"
                />
              </div>
            </Card>
          );
        })}
        <div className="flex items-center gap-6 bg-white bg-opacity-50 border border-solid border-[#838383] rounded-xl w-full p-4 shadow-sm">
          <img src="icons/faces/laugh-beam.svg" alt="" className="w-12" />
          <img src="icons/faces/smile.svg" alt="" className="w-12" />
          <img src="icons/faces/meh.svg" alt="" className="w-12" />
          <img src="icons/faces/frown.svg" alt="" className="w-12" />
          <img src="icons/faces/dizzy.svg" alt="" className="w-12" />
          <div className="ml-auto flex gap-4 mb-auto">
            <img src="icons/edit.svg" alt="" className="w-6 cursor-pointer" />
            <img src="icons/trash.svg" alt="" className="w-5 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

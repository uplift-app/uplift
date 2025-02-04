import * as Dialog from "@radix-ui/react-dialog";
import MoodInput from "../cards/MoodInput";
import ActivityInput from "../cards/ActivityInput";
import {
  ActivityFromBackend,
  Mood,
  MoodFromBackend,
  RecentEntryItemProps,
} from "@/lib/interfaces";
import { X } from "lucide-react";
import Smiley0 from "../smileys/Smiley0";
import Smiley1 from "../smileys/Smiley1";
import Smiley2 from "../smileys/Smiley2";
import Smiley3 from "../smileys/Smiley3";
import Smiley4 from "../smileys/Smiley4";

const smileyArray = [
  <Smiley0 />,
  <Smiley1 />,
  <Smiley2 />,
  <Smiley3 />,
  <Smiley4 />,
];

export function RecentEntryItem({
  entry,
  type,
  handleEdit,
  handleDelete,
}: RecentEntryItemProps) {
  const moodEmojis: Record<string, string> = {
    happiness: "icons/faces/laugh-beam.svg", // Replace with appropriate svg file
    stress: "icons/faces/laugh-beam.svg", // Replace with appropriate svg file
    energy: "icons/faces/laugh-beam.svg", // Replace with appropriate svg file
  };
  const activityEmoji = "icons/faces/laugh-beam.svg"; //Replace with appropriate svg file
  const formatDate = (date: string) => {
    const formattedDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return formattedDate.toLocaleDateString(undefined, options);
  };

  const formattedDate = formatDate(entry.date);
  console.log(
    "moodintensity",
    (entry as MoodFromBackend).intensity,
    Math.min(Math.floor((entry as MoodFromBackend).intensity) / 2, 4)
  );

  return (
    <div className="flex items-center gap-6 w-full p-4 border-[1px] border-gray-300 shadow-md rounded-md">
      <div className="w-12">
        {type === "mood" &&
          smileyArray[
            Math.min(Math.floor((entry as MoodFromBackend).intensity / 2), 4)
          ]}
        {type === "activity" && <img src={activityEmoji} alt="Activity" />}
      </div>
      <div>
        <div className="font-extrabold underline">{formattedDate}</div>
        {type === "mood" && (
          <>
            <div className="flex gap-2">
              <p className="font-bold italic">
                {(entry as MoodFromBackend).moodType[0].toUpperCase() +
                  (entry as MoodFromBackend).moodType.slice(1) +
                  ":"}
              </p>
              <p>{(entry as MoodFromBackend).intensity}</p>
            </div>

            <div>{`${
              (entry as MoodFromBackend).moodTime[0].toUpperCase() +
              (entry as MoodFromBackend).moodTime.slice(1)
            }`}</div>
          </>
        )}
        {type === "activity" && (
          <>
            <div className="flex gap-2">
              <p className="font-bold italic">
                {(entry as ActivityFromBackend).activityType[0].toUpperCase() +
                  (entry as ActivityFromBackend).activityType.slice(1) +
                  ":"}
              </p>
              <p>{(entry as ActivityFromBackend).duration + " mins"}</p>
            </div>

            <div>{`${
              (entry as ActivityFromBackend).activityTime[0].toUpperCase() +
              (entry as ActivityFromBackend).activityTime.slice(1)
            }`}</div>
          </>
        )}
      </div>
      <div className="ml-auto flex gap-4 mb-auto">
        <Dialog.Root>
          <Dialog.Trigger
            className="text-2xl cursor-pointer"
            // onClick={() => handleEdit(entry._id)}
          >
            <img src="icons/edit.svg" alt="" className="w-6 cursor-pointer" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 p-8 bg-white rounded-lg shadow-lg">
              <Dialog.Title></Dialog.Title>
              <Dialog.Description></Dialog.Description>
              {type === "mood" && (
                <MoodInput
                  mood={entry as unknown as Mood}
                  edit={true}
                  clickHandler={(mood: Mood) =>
                    handleEdit({
                      _id: entry._id,
                      ...mood,
                    } as unknown as MoodFromBackend)
                  }
                />
              )}
              {type === "activity" && <ActivityInput />}
              <Dialog.Close className="mt-4 text-black hover:bg-gray-200 p-2 rounded absolute top-8 right-12">
                <X />
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <div
          className="text-2xl cursor-pointer"
          onClick={() => handleDelete(entry._id)}
        >
          <img src="icons/trash.svg" alt="" className="w-5 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default RecentEntryItem;

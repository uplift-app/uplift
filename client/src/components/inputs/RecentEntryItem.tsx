import * as Dialog from "@radix-ui/react-dialog";
import MoodInput from "../cards/MoodInput";
import ActivityInput from "../cards/ActivityInput";
import {
  ActivityFromBackend,
  Mood,
  MoodFromBackend,
  RecentEntryItemProps,
} from "@/lib/interfaces";

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

  return (
    <div className="flex items-center gap-6 w-full p-4">
      <div className="w-12">
        {type === "mood" && (
          <img
            src={moodEmojis[(entry as MoodFromBackend).moodType]}
            alt={(entry as MoodFromBackend).moodType}
          />
        )}
        {type === "activity" && <img src={activityEmoji} alt="Activity" />}
      </div>
      <div>
        <div>{formattedDate}</div>
        {type === "mood" && (
          <>
            <div>{`Mood: ${
              (entry as MoodFromBackend).moodType[0].toUpperCase() +
              (entry as MoodFromBackend).moodType.slice(1)
            } `}</div>
            <div>Intensity: {(entry as MoodFromBackend).intensity}</div>
            <div>{`${
              (entry as MoodFromBackend).moodTime[0].toUpperCase() +
              (entry as MoodFromBackend).moodTime.slice(1)
            }`}</div>
          </>
        )}
        {type === "activity" && (
          <>
            <div>{`Activity: ${
              (entry as ActivityFromBackend).activityType[0].toUpperCase() +
              (entry as ActivityFromBackend).activityType.slice(1)
            }`}</div>
            <div>{`Duration: ${
              (entry as ActivityFromBackend).duration
            } mins`}</div>
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
              <Dialog.Close className="mt-4 bg-gray-500 text-white p-2 rounded">
                Close
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

import * as Dialog from "@radix-ui/react-dialog";
import MoodInput from "../cards/MoodInput";
import ActivityInput from "../cards/ActivityInput";
import {
  ActivityFromBackend,
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
    happiness: "😊",
    stress: "😡",
    energy: "😌",
  };
  const activityEmoji = "🏃‍♂️";
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
    <div className='flex items-center gap-6 bg-white rounded-xl w-full p-4 text-black shadow-sm'>
      <div className='text-5xl'>
        {type === "mood" && moodEmojis[(entry as MoodFromBackend).moodType]}
        <div className='text-5xl'>{type === "activity" && activityEmoji}</div>
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
      <div className='ml-auto flex gap-4 mb-auto'>
        <Dialog.Root>
          <Dialog.Trigger
            className='text-2xl cursor-pointer'
            // onClick={() => handleEdit(entry._id)}
          >
            ✍️
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
            <Dialog.Content className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 p-8 bg-white rounded-lg shadow-lg'>
              <Dialog.Title></Dialog.Title>
              <Dialog.Description></Dialog.Description>
              {type === "mood" && <MoodInput />}
              {type === "activity" && <ActivityInput />}
              <Dialog.Close className='mt-4 bg-gray-500 text-white p-2 rounded'>
                Close
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <div
          className='text-2xl cursor-pointer'
          onClick={() => handleDelete(entry._id)}
        >
          🗑️
        </div>
      </div>
    </div>
  );
}

export default RecentEntryItem;

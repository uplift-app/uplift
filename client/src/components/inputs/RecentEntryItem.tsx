import * as Dialog from "@radix-ui/react-dialog";
import {
  ActivityFromBackend,
  MoodFromBackend,
  RecentEntryItemProps,
} from "@/lib/interfaces";
import EditMood from "../cards/EditMood";
import EditActivity from "../cards/EditActivity";
import { useState } from "react";

export function RecentEntryItem({
  entry,
  type,
  handleEdit,
  handleDelete,
}: RecentEntryItemProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const moodEmojis: Record<string, string> = {
    0: "icons/faces/dizzy.svg",
    1: "icons/faces/dizzy.svg",
    2: "icons/faces/frown.svg",
    3: "icons/faces/frown.svg",
    4: "icons/faces/meh.svg",
    5: "icons/faces/meh.svg",
    6: "icons/faces/smile.svg",
    7: "icons/faces/smile.svg",
    8: "icons/faces/laugh-beam.svg",
    9: "icons/faces/laugh-beam.svg",
    10: "icons/faces/laugh-beam.svg",
  };

  const activityEmoji = "icons/running-man.svg";

  const formatDate = (date: Date) => {
    const formattedDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return formattedDate.toLocaleDateString(undefined, options);
  };
  const formattedDate = formatDate(entry.date);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className='flex items-center gap-6 w-full p-4'>
      <div className='w-12'>
        {type === "mood" && (
          <img src={moodEmojis[(entry as MoodFromBackend).intensity]} />
        )}
        {type === "activity" && <img src={activityEmoji} alt='Activity' />}
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
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Dialog.Trigger className='text-2xl cursor-pointer'>
            <img
              src='icons/edit.svg'
              alt=''
              className='w-6 cursor-pointer'
              onClick={() => setIsDialogOpen(true)}
            />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
            <Dialog.Content className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 p-8 bg-white rounded-lg shadow-lg'>
              <Dialog.Title></Dialog.Title>
              <Dialog.Description></Dialog.Description>
              {type === "mood" && (
                <EditMood
                  entry={entry as MoodFromBackend}
                  handleClose={handleCloseDialog}
                  handleEdit={handleEdit}
                />
              )}
              {type === "activity" && (
                <EditActivity
                  entry={entry as ActivityFromBackend}
                  handleClose={handleCloseDialog}
                  handleEdit={handleEdit}
                />
              )}
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
          <img src='icons/trash.svg' alt='' className='w-5 cursor-pointer' />
        </div>
      </div>
    </div>
  );
}

export default RecentEntryItem;

import {
  MoodFromBackend,
  ActivityFromBackend,
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

  const formattedDate = formatDate(entry.createdAt);

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
            <div>{`${
              (entry as MoodFromBackend).moodType[0].toUpperCase() +
              (entry as MoodFromBackend).moodType.slice(1)
            } - ${(entry as MoodFromBackend).intensity}`}</div>
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
            <div>{`Time: ${
              (entry as ActivityFromBackend).activityTime[0].toUpperCase() +
              (entry as ActivityFromBackend).activityTime.slice(1)
            }`}</div>
          </>
        )}
      </div>
      <div className='ml-auto flex gap-4 mb-auto'>
        <div
          className='text-2xl cursor-pointer'
          onClick={() => handleEdit(entry._id)}
        >
          ✍️
        </div>
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

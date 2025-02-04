export interface Mood {
  moodType: string;
  intensity: number;
  moodTime: Time;
  date: Date;
}

export interface Activity {
  duration: number;
  activityType: string;
  activityTime: Time;
  date: Date;
}

export type MoodFromBackend = {
  _id: string;
  moodType: string;
  intensity: number;
  userId: string;
  moodTime: Time;
  date: Date;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type ActivityFromBackend = {
  _id: string;
  duration: number;
  activityType: string;
  userId: string;
  activityTime: Time;
  isHabit: boolean;
  date: Date;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type Time =
  | "morning"
  | "afternoon"
  | "evening"
  | "night"
  | "all day"
  | "";

export interface Quote {
  q: string;
  a: string;
  h: string;
}

interface RecentEntryItemProps {
  entry: MoodFromBackend | ActivityFromBackend;
  type: "mood" | "activity";
  handleEdit: (updatedEntry: ActivityFromBackend | MoodFromBackend) => void;
  handleDelete: (id: string) => void;
}

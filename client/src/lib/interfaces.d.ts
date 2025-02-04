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
  moodType: "happiness" | "stress" | "energy"; // Add other mood types if needed
  intensity: number;
  userId: string;
  moodTime: string;
  date: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type ActivityFromBackend = {
  activityTime: string;
  activityType: string;
  createdAt: string;
  date: string;
  duration: number;
  isHabit: boolean;
  updatedAt: string;
  userId: string;
  __v: number;
  _id: string;
}

export type MoodSortedByDate = {
  date: string;
  happiness?: number;
  energy?: number;
  stress?: number;
};

export type Time =
  | "morning"
  | "afternoon"
  | "evening"
  | "night"
  | "all day"
  | "";

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
  moodType: "happy" | "relaxed" | "energetic"; // Add other mood types if needed
  intensity: number;
  userId: string;
  moodTime: string;
  date: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type MoodSortedByDate = {
  date: string;
  happy?: number;
  energetic?: number;
  relaxed?: number;
};

export type Time =
  | "morning"
  | "afternoon"
  | "evening"
  | "night"
  | "all day"
  | "";

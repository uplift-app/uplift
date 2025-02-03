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

export interface Quote {
  q: string;
  a: string;
  h: string;
}

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

export type Time =
  | "morning"
  | "afternoon"
  | "evening"
  | "night"
  | "all day"
  | "";

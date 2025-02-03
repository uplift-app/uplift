export interface Mood {
  moodType: MoodTypes;
  intensity: number;
  moodTime: Time;
  date: Date;
}
export type MoodTypes = "happiness" | "energy" | "stress";
export interface Activity {
  duration: number;
  activityType: string;
  activityTime: Time;
  date: Date;
}

export type MoodFromBackend = {
  _id: string;
  moodType: MoodTypes; 
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
} & Partial<Record<MoodTypes, number>>;

export type Time =
  | "morning"
  | "afternoon"
  | "evening"
  | "night"
  | "all day"
  | "";


export type ChartTypes = "Area" | "Bar" | "Line"
export interface CustomChart {
  type: ChartTypes;
  data: string[];
}

export type ActivityFromBackend = {
  __v: number;
  _id: string;
  activityTime: string; 
  activityType: string;
  createdAt: string;
  date: string;
  duration: number;
  isHabit: boolean;  
  updatedAt: string;
  userId: string;
};


export type ActivitySortedByDate = {
  date: string;
  [key: string]: number | string;
};

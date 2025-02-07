import { ReactNode } from "react";

export type Time =
  | "morning"
  | "afternoon"
  | "evening"
  | "night"
  | "all day"
  | "";

export type ChartTypes = "Area" | "Bar" | "Line";

export type MoodTypes = "" | "happiness" | "energy" | "stress";

export interface Mood {
  moodType: string;
  intensity: number;
  moodTime: Time;
  date: Date;
}

export type MoodFromBackend = {
  _id: string;
  moodType: MoodTypes;
  intensity: number;
  userId: string;
  moodTime: Time;
  date: Date;
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

export interface MoodEntry {
  date: Date;
  intensity: number;
}

export interface AvgMoodEntry {
  date: string;
  avgIntensity: number | null;
}

export interface Activity {
  duration: number;
  activityType: string;
  activityTime: Time;
  date: Date;
}

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

export type ActivitySortedByDate = {
  date: string;
  [key: string]: number | string;
};

export interface CustomChart {
  type: ChartTypes;
  data: string[];
}

export interface Quote {
  q: string;
  a: string;
  h: string;
}

export interface AnalysisData {
  avgMood: Array<object>;
  avgMoodtime: Array<object>;
  avgActivityIntensity: Array<object>;
  avgActivityDuration: Array<object>;
  avgMoodActivitytime: Array<object>;
  positiveEffects: Array<{
    moodType: string;
    moodTime: string;
    activities: Array<string>;
    avgIntensity: number;
  }>;
  activityCounts: Array<object>;
  moodCounts: Array<object>;
  topActivities: Array<object>;
  lowMoodActivities: Array<object>;
  highImpactActivites: Array<string>;
}

export interface RecentEntryItemProps {
  entry: MoodFromBackend | ActivityFromBackend;
  type: "mood" | "activity";
  handleEdit: (data: MoodFromBackend | ActivityFromBackend) => void;
  handleDelete: (id: string) => void;
}

export interface MoodInputProps {
  mood?: Mood;
  edit?: boolean;
  clickHandler?: (mood: Mood) => void;
  onEntryAdded?: () => void;
  closeDialog?: () => void;
}

export interface ActivityInputProps {
  activityProp?: Activity;
  edit?: boolean;
  clickHandler?: (activity: Activity) => void;
  onEntryAdded?: () => void;
  closeDialog?: () => void;
}

export interface RecentEntriesProps {
  updateTrigger: boolean;
}

export interface AnalysisDataContextType {
  analysisData: AnalysisData;
  setAnalysisData: React.Dispatch<React.SetStateAction<AnalysisData>>;
}

export interface AnalysisDataProviderProps {
  children: ReactNode;
}

export interface ChartProps {
  chartConfig: ChartConfig;
  chartData: ActivitySortedByDate[];
  timeFrame: string;
}

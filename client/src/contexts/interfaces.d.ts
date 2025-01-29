import { ReactNode } from "react";

export interface AnalysisDataContextType {
  analysisData: AnalysisData;
  setAnalysisData: React.Dispatch<React.SetStateAction<AnalysisData>>;
}

export interface AnalysisDataProviderProps {
  children: ReactNode;
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

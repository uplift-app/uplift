export interface PostMoodProps {
    moodType: string;
    intensity: number;
    moodTime: Time;
    date: Date;
}

export interface PostActivityProps {
    duration: number;
    activityType: string;
    activityTime: Time;
    date: Date;
  }

  export type Time = "morning" | "afternoon" | "evening" | "night" | "all day";

  duration, activityType, activityTime, isHabit, date

  
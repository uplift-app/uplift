export interface IUser {
  email: string;
  username: string;
  password: string;
}

export interface IMood {
  moodType: string;
  intensity: number;
  userId: string;
  moodTime: Time;
}

export interface IActivity {
  duration: number;
  activityType: string;
  userId: string;
  activityTime: Time;
  isHabit: boolean;
}

export type Time = "morning" | "afternoon" | "evening" | "all day";

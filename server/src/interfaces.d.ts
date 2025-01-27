import { User } from "./models/user";

declare global {
  namespace Express {
    export interface Request {
      user: UserModel;
    }
  }
}

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
  date: Date;
}

export interface IActivity {
  duration: number;
  activityType: string;
  userId: string;
  activityTime: Time;
  isHabit: boolean;
  date: Date;
}

export type Time = "morning" | "afternoon" | "evening" | "night" | "all day";

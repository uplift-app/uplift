import { User } from "./models/user";

export type Time = "morning" | "afternoon" | "evening" | "night" | "all day";

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
  moodType: "happiness" | "stress" | "energy";
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

export interface QueryFilter {
  userId: string;
  date?: {
    $gte?: Date;
    $lte?: Date;
  };
}

interface JwtProps {
  userId: string;
}

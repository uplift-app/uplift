export interface User {
  email: string;
  username: string;
  password: string;
  _id: string;
}

export interface Mood {
  moodType: string;
  intensity: number;
  userId: string;
  moodTime: string;
  date: Date;
}

export interface Activity {
  duration: number;
  activityType: string;
  userId: string;
  activityTime: string;
  isHabit: boolean;
  date: Date;
}

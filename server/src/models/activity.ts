import mongoose, { Schema, Document } from "mongoose";

export interface Activity extends Document {
  duration: number;
  activityType: string;
  userId: string;
  activityTime: string;
  isHabit: boolean;
  date: Date;
}

const ActivitySchema: Schema = new Schema({
  duration: { type: Number, required: true },
  activityType: { type: String, required: true },
  userId: { type: String, required: true },
  activityTime: { type: String, required: true },
  isHabit: { type: Boolean, required: true },
  date: { type: Date, required: true },
});

const Activity = mongoose.model<Activity>("Activity", ActivitySchema);
export default Activity;

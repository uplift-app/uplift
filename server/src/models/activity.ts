import mongoose, { Schema } from "mongoose";
import { IActivity } from "../interfaces";

const ActivitySchema: Schema = new Schema(
  {
    duration: { type: Number, required: true },
    activityType: { type: String, required: true },
    userId: { type: String, required: true },
    activityTime: {
      type: String,
      required: true,
      enum: ["morning", "afternoon", "evening", "night", "all day"],
    },
    isHabit: { type: Boolean, required: true, default: false },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Activity = mongoose.model<IActivity>("Activity", ActivitySchema);
export default Activity;

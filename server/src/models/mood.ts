import mongoose, { Schema } from "mongoose";
import { IMood } from "../interfaces";

const MoodSchema: Schema = new Schema(
  {
    moodType: {
      type: String,
      enum: ["happiness", "stress", "energy"],
      required: true,
    },
    intensity: { type: Number, required: true },
    userId: { type: String, required: true },
    moodTime: {
      type: String,
      enum: ["morning", "afternoon", "evening", "night", "all day"],
      required: true,
    },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Mood = mongoose.model<IMood>("Mood", MoodSchema);
export default Mood;

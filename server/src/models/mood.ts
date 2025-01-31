import mongoose, { Schema } from "mongoose";
import { IMood } from "../interfaces";

const MoodSchema: Schema = new Schema(
  {
    moodType: {
      type: String,
      required: true,
      enum: ["happiness", "stress", "energy"],
    },
    intensity: { type: Number, required: true },
    userId: { type: String, required: true },
    moodTime: {
      type: String,
      required: true,
      enum: ["morning", "afternoon", "evening", "night", "all day"],
    },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Mood = mongoose.model<IMood>("Mood", MoodSchema);
export default Mood;

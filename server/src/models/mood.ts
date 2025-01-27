import mongoose, { Schema } from "mongoose";
import { IMood } from "../interfaces";

const MoodSchema: Schema = new Schema({
  moodType: { type: String, required: true },
  intensity: { type: Number, required: true },
  userId: { type: String, required: true },
  moodTime: { type: String, required: true },
  date: { type: Date, required: true },
});

const Mood = mongoose.model<IMood>("Mood", MoodSchema);
export default Mood;

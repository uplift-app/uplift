import mongoose, { Schema } from "mongoose";
import { Mood } from "../interfaces";

const MoodSchema: Schema = new Schema({
  moodType: { type: String, required: true },
  intensity: { type: Number, required: true },
  userId: { type: String, required: true },
  moodTime: { type: String, required: true },
  date: { type: Date, required: true },
});

const Mood = mongoose.model<Mood>("Mood", MoodSchema);
export default Mood;

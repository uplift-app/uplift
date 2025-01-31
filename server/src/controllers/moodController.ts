import { Request, Response } from "express";
import Mood from "../models/mood";
import { buildQuery, fetchMoods } from "../middleware/databaseQuery";

export const getMoods = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user;
    const { startDate, endDate } = req.query;
    const query = buildQuery(userId, startDate as string, endDate as string);
    const moods = await fetchMoods(query);
    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving moods", error });
  }
};

export const addMood = async (req: Request, res: Response) => {
  try {
    const { moodType, intensity, moodTime, date } = req.body;
    const { userId } = req.user;
    const newMood = new Mood({ moodType, intensity, userId, moodTime, date });
    await newMood.save();
    res.status(201).json(newMood);
  } catch (error) {
    res.status(500).json({ message: "Error adding mood", error });
  }
};

export const editMood = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;
  const { userId } = req.user;
  try {
    const mood = await Mood.findById(id);
    if (mood && mood.userId === userId) {
      const updatedmood = await Mood.findByIdAndUpdate(id, updates, {
        new: true,
      });
      res.status(200).json(updatedmood);
    } else res.status(404).json({ message: "Mood not found" });
  } catch (error) {
    res.status(500).json({ message: "Error updating mood", error });
  }
};

export const deleteMood = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const mood = await Mood.findById(id);
    if (mood && mood.userId === userId) {
      await Mood.findByIdAndDelete(id);
      res.status(200).json({ message: "Mood deleted successfully" });
    } else res.status(404).json({ message: "Mood not found" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting mood", error });
  }
};

export const getMoodTypes = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user;
    const activityTypes = await Mood.distinct("moodType", { userId });
    res.status(200).json(activityTypes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving mood types", error });
  }
};

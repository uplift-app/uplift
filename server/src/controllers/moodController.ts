import { Request, Response } from "express";
import Mood from "../models/mood";
import { QueryFilter } from "../interfaces";

export const getMoodsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user;
    const { startDate, endDate } = req.query;
    const query: QueryFilter = { userId };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate as string);
      if (endDate) query.date.$lte = new Date(endDate as string);
    }

    const moods = await Mood.find(query);
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
      res.status(200).json({ message: "mood deleted successfully" });
    } else res.status(404).json({ message: "Mood not found" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting mood", error });
  }
};

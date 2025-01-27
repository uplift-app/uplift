import { Request, Response } from "express";
import Mood from "../models/mood";

export const getMoodsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { startDate, endDate } = req.query;

  try {
    const query: any = { userId };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.createdAt.$gte = new Date(startDate as string);
      if (endDate) query.createdAt.$lte = new Date(endDate as string);
    }

    const moods = await Mood.find(query);
    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving moods", error });
  }
};

export const addMood = async (req: Request, res: Response) => {
  const { moodType, intensity, userId, moodTime, date } = req.body;
  try {
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
  try {
    const updatedMood = await Mood.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedMood) {
      res.status(404).json({ message: "Mood not found" });
    }
    res.status(200).json(updatedMood);
  } catch (error) {
    res.status(500).json({ message: "Error updating mood", error });
  }
};

export const deleteMood = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedMood = await Mood.findByIdAndDelete(id);
    if (!deletedMood) {
      res.status(404).json({ message: "Mood not found" });
    }
    res.status(200).json({ message: "Mood deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting mood", error });
  }
};

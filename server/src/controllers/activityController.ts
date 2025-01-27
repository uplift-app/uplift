import { Request, Response } from "express";
import Activity from "../models/activity";

export const getActivitiesByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { startDate, endDate } = req.query;

  try {
    const query: any = { userId };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate as string);
      if (endDate) query.date.$lte = new Date(endDate as string);
    }

    const activities = await Activity.find(query);
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving activities", error });
  }
};

export const addActivity = async (req: Request, res: Response) => {
  const { duration, activityType, userId, activityTime, isHabit, date } =
    req.body;
  try {
    const newActivity = new Activity({
      duration,
      activityType,
      userId,
      activityTime,
      isHabit,
      date,
    });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ message: "Error adding activity", error });
  }
};

export const editActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedActivity) {
      res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(500).json({ message: "Error updating activity", error });
  }
};

export const deleteActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedActivity = await Activity.findByIdAndDelete(id);
    if (!deletedActivity) {
      res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting activity", error });
  }
};

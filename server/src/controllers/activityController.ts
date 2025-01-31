import { Request, Response } from "express";
import Activity from "../models/activity";
import { buildQuery, fetchActivities } from "../middleware/databaseQuery";

export const getActivities = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const { userId } = req.user;
    const query = buildQuery(userId, startDate as string, endDate as string);
    const activities = await fetchActivities(query);
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving activities", error });
  }
};

export const addActivity = async (req: Request, res: Response) => {
  try {
    const { duration, activityType, activityTime, isHabit, date } = req.body;
    const { userId } = req.user;
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
  const { userId } = req.user;

  try {
    const activity = await Activity.findById(id);
    if (activity && activity.userId === userId) {
      const updatedActivity = await Activity.findByIdAndUpdate(id, updates, {
        new: true,
      });
      res.status(200).json(updatedActivity);
    } else res.status(404).json({ message: "Activity not found" });
  } catch (error) {
    res.status(500).json({ message: "Error updating activity", error });
  }
};

export const deleteActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const activity = await Activity.findById(id);
    if (activity && activity.userId === userId) {
      await Activity.findByIdAndDelete(id);
      res.status(200).json({ message: "Activity deleted successfully" });
    } else res.status(404).json({ message: "Activity not found" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting activity", error });
  }
};

export const getActivityTypes = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user;
    const activityTypes = await Activity.distinct("activityType", { userId });
    res.status(200).json(activityTypes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving activity types", error });
  }
};

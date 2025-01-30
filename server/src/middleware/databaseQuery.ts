import { QueryFilter } from "../interfaces";
import Activity from "../models/activity";
import Mood from "../models/mood";

export const buildQuery = (
  userId: string,
  startDate?: string,
  endDate?: string
): QueryFilter => {
  const query: QueryFilter = { userId };

  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  return query;
};

export const fetchActivities = async (query: QueryFilter) => {
  return await Activity.find(query);
};

export const fetchMoods = async (query: QueryFilter) => {
  return await Mood.find(query);
};

import { AnalysisData } from "@/contexts/interfaces";
import {
  Mood,
  Activity,
  MoodFromBackend,
  Quote,
  ActivityFromBackend,
} from "./interfaces";
import Cookie from "js-cookie";
//TODO: remove any types

const BASE_URL = "http://localhost:3000";

export async function getCookie() {
  const cookie = Cookie.get("__session");
  return cookie;
}

export async function makeServerRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const token = await getCookie();
    if (!token) {
      throw new Error("Authentication token is missing");
    }
    const headers = new Headers(options?.headers);
    headers.append("Authorization", `Bearer ${token}`);
    const updatedOptions: RequestInit = {
      ...options,
      headers: headers,
    };
    const response = await fetch(`${BASE_URL}/${endpoint}`, updatedOptions);
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    return (await response.json()) as T;
  } catch (error) {
    return errorHandler(error);
  }
}

export const getMoods = async (): Promise<MoodFromBackend[]> => {
  try {
    return await makeServerRequest("mood");
  } catch (error) {
    return errorHandler(error);
  }
};

export const getRecentMoods = async (): Promise<MoodFromBackend[]> => {
  try {
    const moods = await getMoods();
    const sortedMoods = moods.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    const recentMoods = sortedMoods.slice(0, 10);

    return recentMoods;
  } catch (error) {
    return errorHandler(error);
  }
};

export const postMood = async (moodData: Mood): Promise<any> => {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(moodData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return await makeServerRequest("mood", options);
  } catch (error) {
    return errorHandler(error);
  }
};

export const deleteMood = async (id: string) => {
  try {
    const options = {
      method: "DELETE",
    };
    const response = await makeServerRequest(`mood/${id}`, options);
    return response;
  } catch (error) {
    errorHandler(error);
  }
};

export const getActivities = async (): Promise<ActivityFromBackend[]> => {
  try {
    return await makeServerRequest("activity");
  } catch (error) {
    return errorHandler(error);
  }
};

export const getRecentActivities = async (): Promise<ActivityFromBackend[]> => {
  try {
    const activities = await getActivities();
    const sortedActivities = activities.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    const recentActivities = sortedActivities.slice(0, 10);
    return recentActivities;
  } catch (error) {
    return errorHandler(error);
  }
};

export const getActivityTypes = async (): Promise<any> => {
  try {
    return await makeServerRequest("activity/types");
  } catch (error) {
    return errorHandler(error);
  }
};

export const postActivity = async (activity: Activity): Promise<any> => {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(activity),
      headers: { "content-type": "application/json" },
    };
    return await makeServerRequest("activity", options);
  } catch (error) {
    return errorHandler(error);
  }
};

export const deleteActivity = async (id: string) => {
  try {
    const options = {
      method: "DELETE",
    };
    const response = await makeServerRequest(`activity/${id}`, options);
    return response;
  } catch (error) {
    errorHandler(error);
  }
};

export const getAnalysis = async (): Promise<AnalysisData> => {
  try {
    return await makeServerRequest("analysis");
  } catch (error) {
    return errorHandler(error);
  }
};

export const getQuote = async (): Promise<Quote[]> => {
  try {
    return await makeServerRequest("quote");
  } catch (error) {
    return errorHandler(error);
  }
};

export const errorHandler = (error: unknown): never => {
  if (error instanceof Error) {
    console.error("API Error:", error.message);
    throw new Error(error.message);
  }
  console.error("Unknown API error occurred");
  throw new Error("Unknown error occurred");
};

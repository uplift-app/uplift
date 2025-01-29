import { PostMoodProps, PostActivityProps } from "./interfaces";
//TODO: remove any types

const BASE_URL = "http://localhost:3000";

export async function makeServerRequest<T>(
  endpoint: string,
  token: string | undefined,
  options?: RequestInit
): Promise<T> {
  try {
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
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`API Error: ${errorMessage}`);
  }
}

export const getMoods = async (
  token: string | undefined
): Promise<PostMoodProps[]> => {
  try {
    return await makeServerRequest("mood", token);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(errorMessage);
  }
};

// Get all activities

const getActivityTypes = async (token: string | undefined): Promise<any> => {
  try {
    return await makeServerRequest("activity/types", token);
  } catch (error) {
    error instanceof Error ? error.message : "Unknown error occurred";
  }
};

// Post a new activity
// Post an activity -> activity type, activity duration, activity time

const postActivity = async (
  activity: PostActivityProps,
  token: string | undefined
): Promise<any> => {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(activity),
      headers: { "constent-type": "application/json" },
    };
    return await makeServerRequest("activity", token, options);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(errorMessage);
  }
};

// -> Returns the updated list of activities

// Post a new mood

const postMood = async (
  moodData: PostMoodProps,
  token: string | undefined
): Promise<any> => {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(moodData),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(errorMessage);
  }
};
// Post a mood -> Mood type, mood intensity, mood time
// -> Returns the updated list of moods

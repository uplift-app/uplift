import { PostMoodProps, PostActivityProps } from "./interfaces";
//TODO: remove any types


const BASE_URL = "http://localhost:3000"

async function makeServerRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, options);
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    return (await response.json());
  } catch (error) {
    const errorMessage =
    error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`API Error: ${errorMessage}`);
  }
}


// Get all moods
export const getMoods = async (): Promise<PostMoodProps[]> => {
  try {
    return await makeServerRequest("mood");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(errorMessage)
  }
}


// Get all activities

export const getActivityTypes = async (): Promise<any> => {
    try {
        return await makeServerRequest("activity/types");
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        throw new Error(errorMessage)
    }
}

// Post a new activity
// Post an activity -> activity type, activity duration, activity time

export const postActivity = async (activity: PostActivityProps): Promise<any> => {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(activity),
      headers: { "constent-type": "application/json"}
    }
    return await makeServerRequest("activity", options);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(errorMessage)
  }
}


// -> Returns the updated list of activities 


// Post a new mood


export const postMood = async ( moodData: PostMoodProps): Promise<any> => {
    try {
        const options =  { method: "POST", 
        body: JSON.stringify(moodData),
        headers: {
            "Content-Type": "application/json"
        },
    }
    return await makeServerRequest("moods", options);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        throw new Error(errorMessage)
    }
}
// Post a mood -> Mood type, mood intensity, mood time
// -> Returns the updated list of moods 
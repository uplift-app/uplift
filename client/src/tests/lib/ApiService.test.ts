import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import {
  getMoods,
  postMood,
  getActivityTypes,
  postActivity,
  getAnalysis,
} from "@/lib/ApiService";
import { Mood, Activity } from "@/lib/interfaces";

const BASE_URL = "http://localhost:3000";

global.fetch = vi.fn();

// Properly mock `js-cookie`
vi.mock("js-cookie", () => ({
  default: {
    get: vi.fn(() => "mocked-token"), // Simulates a session token
  },
}));

beforeEach(() => {
  vi.resetAllMocks();
  (global.fetch as Mock).mockImplementation(async (url, options) => {
    return {
      ok: true,
      json: async () => {
        if (url === `${BASE_URL}/mood` && !options.method) {
          return [
            {
              moodType: "happy",
              intensity: 7,
              moodTime: "morning",
              date: "2024-02-01",
            },
          ];
        }
        if (url === `${BASE_URL}/activity/types`) {
          return ["Running", "Swimming", "Yoga"];
        }
        if (url === `${BASE_URL}/analysis`) {
          return { avgMood: [{ happiness: 7.5 }], avgMoodtime: {} };
        }
        return { success: true };
      },
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer mocked-token",
      }),
    };
  });
});

describe("ApiService", () => {
  it("fetches moods successfully", async () => {
    const result = await getMoods();
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/mood`,
      expect.objectContaining({
        headers: expect.any(Headers), // Ensures headers are set properly
      })
    );
    expect(result).toEqual([
      {
        moodType: "happy",
        intensity: 7,
        moodTime: "morning",
        date: "2024-02-01",
      },
    ]);
  });

  it("fetches activity types successfully", async () => {
    const result = await getActivityTypes();
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/activity/types`,
      expect.objectContaining({
        headers: expect.any(Headers),
      })
    );
    expect(result).toEqual(["Running", "Swimming", "Yoga"]);
  });

  it("posts a mood successfully", async () => {
    const moodData: Mood = {
      moodType: "happiness",
      intensity: 8,
      moodTime: "evening",
      date: new Date(),
    };

    const result = await postMood(moodData);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/mood`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(moodData),
        headers: expect.any(Headers),
      })
    );
    expect(result).toEqual({ success: true });
  });

  it("posts an activity successfully", async () => {
    const activityData: Activity = {
      activityType: "Running",
      activityTime: "morning",
      duration: 30,
      date: new Date(),
    };

    const result = await postActivity(activityData);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/activity`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(activityData),
        headers: expect.any(Headers),
      })
    );
    expect(result).toEqual({ success: true });
  });

  it("fetches analysis data successfully", async () => {
    const result = await getAnalysis();
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/analysis`,
      expect.objectContaining({
        headers: expect.any(Headers),
      })
    );
    expect(result).toEqual({ avgMood: [{ happiness: 7.5 }], avgMoodtime: {} });
  });
});

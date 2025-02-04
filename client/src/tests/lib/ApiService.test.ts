import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import {
  getMoods,
  postMood,
  getActivityTypes,
  postActivity,
  getAnalysis,
} from "@/lib/ApiService";
import { Mood, Activity } from "@/lib/interfaces";

const mockToken = "fake-token";
const BASE_URL = "http://localhost:3000";

global.fetch = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
});

describe("ApiService", () => {
  it("fetches moods successfully", async () => {
    const mockMoods = [
      { moodType: "happy", intensity: 7, moodTime: "morning", date: "2024-02-01" },
    ];

    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockMoods),
    });

    const result = await getMoods(mockToken);
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/mood`, expect.any(Object));
    expect(result).toEqual(mockMoods);
  });

  it("handles error when fetching moods fails", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      json: vi.fn(),
    });

    await expect(getMoods(mockToken)).rejects.toThrow("Error fetching data");
  });

  it("fetches activity types successfully", async () => {
    const mockActivities = ["Running", "Swimming", "Yoga"];

    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockActivities),
    });

    const result = await getActivityTypes(mockToken);
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/activity/types`, expect.any(Object));
    expect(result).toEqual(mockActivities);
  });

  it("posts a mood successfully", async () => {
    const moodData: Mood = {
      moodType: "happy",
      intensity: 8,
      moodTime: "evening",
      date: new Date(),
    };

    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    });

    const result = await postMood(moodData, mockToken);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/mood`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(moodData),
      })
    );
    expect(result).toEqual({ success: true });
  });

  it("handles error when posting mood fails", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      json: vi.fn(),
    });

    await expect(postMood({ moodType: "sad", intensity: 3, moodTime: "night", date: new Date() }, mockToken))
      .rejects.toThrow("Error fetching data");
  });

  it("posts an activity successfully", async () => {
    const activityData: Activity = {
      activityType: "Running",
      activityTime: "morning",
      duration: 30,
      date: new Date(),
    };

    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    });

    const result = await postActivity(activityData, mockToken);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/activity`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(activityData),
      })
    );
    expect(result).toEqual({ success: true });
  });

  it("fetches analysis data successfully", async () => {
    const mockAnalysis = { avgMood: [{ happiness: 7.5 }], avgMoodtime: {} };

    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockAnalysis),
    });

    const result = await getAnalysis(mockToken);
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/analysis`, expect.any(Object));
    expect(result).toEqual(mockAnalysis);
  });

  it("handles error when fetching analysis data fails", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      json: vi.fn(),
    });

    await expect(getAnalysis(mockToken)).rejects.toThrow("Error fetching data");
  });

  it("handles missing authentication token", async () => {
    await expect(getMoods(undefined)).rejects.toThrow("Authentication token is missing");
  });
});

import request from "supertest";
import { app } from "../index";
import Mood from "../models/mood";

describe("Mood Controller", () => {
  it("should create a new mood", async () => {
    const newMood = {
      moodType: "happy",
      intensity: 8,
      userId: "12345",
      moodTime: "morning",
      date: new Date().toISOString(),
    };

    const response = await request(app).post("/mood").send(newMood);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      moodType: "happy",
      intensity: 8,
      userId: "12345",
      moodTime: "morning",
    });

    const moodInDb = await Mood.findOne({ userId: "12345" });
    expect(moodInDb).not.toBeNull();
  });

  it("should retrieve moods by userId", async () => {
    const userId = "12345";
    await Mood.create({
      moodType: "excited",
      intensity: 9,
      userId,
      moodTime: "afternoon",
      date: new Date(),
    });

    const response = await request(app).get(`/mood/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      moodType: "excited",
      intensity: 9,
      userId,
      moodTime: "afternoon",
    });
  });

  it("should retrieve moods within a date range", async () => {
    const userId = "12345";
    await Mood.create([
      {
        moodType: "relaxed",
        intensity: 7,
        userId,
        moodTime: "evening",
        date: new Date("2025-01-15"),
      },
      {
        moodType: "anxious",
        intensity: 4,
        userId,
        moodTime: "morning",
        date: new Date("2025-01-25"),
      },
    ]);

    const response = await request(app)
      .get(`/mood/${userId}`)
      .query({ startDate: "2025-01-14", endDate: "2025-01-20" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      moodType: "relaxed",
      intensity: 7,
      date: "2025-01-15T00:00:00.000Z",
    });
  });

  it("should delete a mood", async () => {
    const mood = await Mood.create({
      moodType: "sad",
      intensity: 3,
      userId: "12345",
      moodTime: "afternoon",
      date: new Date(),
    });

    const response = await request(app).delete(`/mood/${mood._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: "Mood deleted successfully",
    });

    const deletedMood = await Mood.findById(mood._id);
    expect(deletedMood).toBeNull();
  });
});

import request from "supertest";
import { app } from "../index";
import Activity from "../models/activity";

describe("Activity Controller", () => {
  it("should create a new activity", async () => {
    const newActivity = {
      duration: 60,
      activityType: "jogging",
      userId: "12345",
      activityTime: "morning",
      isHabit: true,
      date: new Date().toISOString(),
    };

    const response = await request(app).post("/activity").send(newActivity);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      duration: 60,
      activityType: "jogging",
      userId: "12345",
      activityTime: "morning",
      isHabit: true,
    });

    const activityInDb = await Activity.findOne({ userId: "12345" });
    expect(activityInDb).not.toBeNull();
  });

  it("should retrieve activities by userId", async () => {
    const userId = "12345";
    await Activity.create({
      duration: 30,
      activityType: "reading",
      userId,
      activityTime: "afternoon",
      isHabit: false,
      date: new Date(),
    });

    const response = await request(app).get(`/activity/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      duration: 30,
      activityType: "reading",
      userId,
      activityTime: "afternoon",
    });
  });

  it("should retrieve activities within a date range", async () => {
    const userId = "12345";
    await Activity.create([
      {
        duration: 30,
        activityType: "reading",
        userId,
        activityTime: "afternoon",
        isHabit: false,
        date: new Date("2025-01-20"),
      },
      {
        duration: 60,
        activityType: "jogging",
        userId,
        activityTime: "morning",
        isHabit: true,
        date: new Date("2025-01-25"),
      },
    ]);

    const response = await request(app)
      .get(`/activity/${userId}`)
      .query({ startDate: "2025-01-19", endDate: "2025-01-21" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      activityType: "reading",
      date: "2025-01-20T00:00:00.000Z",
    });
  });

  it("should delete an activity", async () => {
    const activity = await Activity.create({
      duration: 30,
      activityType: "reading",
      userId: "12345",
      activityTime: "afternoon",
      isHabit: false,
      date: new Date(),
    });

    const response = await request(app).delete(`/activity/${activity._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: "Activity deleted successfully",
    });

    const deletedActivity = await Activity.findById(activity._id);
    expect(deletedActivity).toBeNull();
  });
});

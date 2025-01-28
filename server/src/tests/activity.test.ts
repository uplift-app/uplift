import request from "supertest";
import express, { Application, RequestHandler } from "express";
import auth from "../middleware/auth";
import * as activityController from "../controllers/activityController";

const app: Application = express();
app.use(express.json());

app.get("/activity", auth as RequestHandler, activityController.getActivities);
app.post("/activity", auth as RequestHandler, activityController.addActivity);
app.put(
  "/activity/:id",
  auth as RequestHandler,
  activityController.editActivity
);
app.delete(
  "/activity/:id",
  auth as RequestHandler,
  activityController.deleteActivity
);

describe("activityController", () => {
  const activityPayload = {
    duration: 30,
    activityType: "Exercise",
    activityTime: "morning",
    isHabit: true,
    date: new Date(),
  };

  it("should add an activity", async () => {
    const response = await request(app).post("/activity").send(activityPayload);
    expect(response.status).toBe(201);
    expect(response.body.activityType).toBe(activityPayload.activityType);
  });

  it("should retrieve activities by user ID", async () => {
    await request(app).post("/activity").send(activityPayload);
    const response = await request(app).get("/activity");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should edit an activity", async () => {
    const activity = await request(app).post("/activity").send(activityPayload);
    const response = await request(app)
      .put(`/activity/${activity.body._id}`)
      .send({ activityType: "Reading" });
    expect(response.status).toBe(200);
    expect(response.body.activityType).toBe("Reading");
  });

  it("should delete an activity", async () => {
    const activity = await request(app).post("/activity").send(activityPayload);
    const response = await request(app).delete(
      `/activity/${activity.body._id}`
    );
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Activity deleted successfully");
  });
});

import request from "supertest";
import express, { Application, RequestHandler } from "express";
import auth from "../middleware/auth";
import * as moodController from "../controllers/moodController";

const app: Application = express();
app.use(express.json());

app.get("/mood", auth as RequestHandler, moodController.getMoodsByUserId);
app.post("/mood/:id", auth as RequestHandler, moodController.addMood);
app.put("/mood/:id", auth as RequestHandler, moodController.editMood);
app.delete("/mood/:id", auth as RequestHandler, moodController.deleteMood);

describe("moodController", () => {
  const moodPayload = {
    moodType: "Happy",
    intensity: 5,
    moodTime: "morning",
    date: new Date(),
  };

  it("should add a mood", async () => {
    const response = await request(app).post("/mood").send(moodPayload);
    expect(response.status).toBe(201);
    expect(response.body.moodType).toBe(moodPayload.moodType);
  });

  it("should retrieve moods by user ID", async () => {
    await request(app).post("/mood").send(moodPayload);
    const response = await request(app).get("/mood");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
  it("should edit a mood", async () => {
    const mood = await request(app).post("/mood").send(moodPayload);
    const response = await request(app)
      .put(`/mood/${mood.body._id}`)
      .send({ moodType: "Sad" });
    expect(response.status).toBe(200);
    expect(response.body.moodType).toBe("Sad");
  });

  it("should delete a mood", async () => {
    const mood = await request(app).post("/mood").send(moodPayload);
    const response = await request(app).delete(`/mood/${mood.body._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Mood deleted successfully");
  });
});

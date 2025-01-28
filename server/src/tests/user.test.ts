import request from "supertest";
import express, { Application } from "express";
import * as userController from "../controllers/userController";

const app: Application = express();
app.use(express.json());

app.post("/user/login", userController.login);
app.post("/user/register", userController.addUser);

describe("userController", () => {
  const userPayload = {
    email: "testuser@example.com",
    username: "testuser",
    password: "password123",
  };

  it("should create a new user", async () => {
    const response = await request(app)
      .post("/user/register")
      .send(userPayload);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  it("should not allow duplicate users", async () => {
    await request(app).post("/user/register").send(userPayload);
    const response = await request(app)
      .post("/user/register")
      .send(userPayload);
    expect(response.status).toBe(409);
  });

  it("should allow valid login", async () => {
    await request(app).post("/user/register").send(userPayload);
    const response = await request(app).post("/user/login").send({
      email: userPayload.email,
      password: userPayload.password,
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
  });

  it("should reject invalid login", async () => {
    const response = await request(app).post("/user/login").send({
      email: "wrong@example.com",
      password: "wrongpassword",
    });
    expect(response.status).toBe(404);
  });
});

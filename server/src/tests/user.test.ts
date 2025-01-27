import request from "supertest";
import { app } from "../index";
import User from "../models/user";

describe("User Controller", () => {
  it("should create a new user", async () => {
    const newUser = {
      email: "test@user.com",
      username: "Test Johnson",
      password: "Test123",
    };

    const response = await request(app).post("/user").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      email: "test@user.com",
      username: "Test Johnson",
      password: "Test123",
    });

    const userInDb = await User.findOne({ email: "test@user.com" });
    expect(userInDb).not.toBeNull();
  });
});

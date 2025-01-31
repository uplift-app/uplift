import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import User from "../models/user";
import { login, addUser } from "../controllers/userController";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../models/user");

describe("User Controller", () => {
  describe("login", () => {
    it("should return 200 with access token when credentials are correct", async () => {
      const user = {
        id: "123",
        email: "test@example.com",
        password: "hashedPassword",
      };

      (User.findOne as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("mockAccessToken");

      const req = {
        body: {
          email: "test@example.com",
          password: "correctPassword",
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        "correctPassword",
        "hashedPassword"
      );
      expect(jwt.sign).toHaveBeenCalledWith({ id: "123" }, "jsonwebtoken");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ accessToken: "mockAccessToken" });
    });

    it("should return 401 with error message when password is incorrect", async () => {
      const user = {
        id: "123",
        email: "test@example.com",
        password: "hashedPassword",
      };

      (User.findOne as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const req = {
        body: {
          email: "test@example.com",
          password: "wrongPassword",
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        "wrongPassword",
        "hashedPassword"
      );
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({ message: "Wrong credentials!" });
    });

    it("should return 404 when user not found", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const req = {
        body: {
          email: "nonexistent@example.com",
          password: "anyPassword",
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({
        email: "nonexistent@example.com",
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return 500 when there is an error retrieving the user", async () => {
      (User.findOne as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const req = {
        body: {
          email: "test@example.com",
          password: "anyPassword",
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error retrieving user",
        error: expect.any(Error),
      });
    });
  });

  describe("addUser", () => {
    it("should return 201 with access token when user is successfully created", async () => {
      const newUser = {
        id: "123",
        email: "test@example.com",
        username: "testUser",
        password: "hashedPassword",
      };

      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
      (User.prototype.save as jest.Mock).mockResolvedValue(newUser);
      (jwt.sign as jest.Mock).mockReturnValue("mockAccessToken");

      const req = {
        body: {
          email: "test@example.com",
          username: "testUser",
          password: "password123",
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await addUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(bcrypt.hash).toHaveBeenCalledWith("password123", "10");
      expect(User.prototype.save).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalledWith({ id: "123" }, "jsonwebtoken");
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ accessToken: "mockAccessToken" });
    });

    it("should return 409 when user already exists", async () => {
      const existingUser = {
        id: "123",
        email: "test@example.com",
        username: "testUser",
        password: "hashedPassword",
      };

      (User.findOne as jest.Mock).mockResolvedValue(existingUser);

      const req = {
        body: {
          email: "test@example.com",
          username: "testUser",
          password: "password123",
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await addUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.send).toHaveBeenCalledWith({
        message: "User already exists!",
      });
    });

    it("should return 500 when there is an error adding the user", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
      (User.prototype.save as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const req = {
        body: {
          email: "test@example.com",
          username: "testUser",
          password: "password123",
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await addUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error adding user",
        error: expect.any(Error),
      });
    });
  });
});

import { Request, Response, NextFunction } from "express";
import authMiddleware from "../middleware/auth";
import jwt from "jsonwebtoken";
import User from "../models/user";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

jest.mock("../models/user", () => ({
  findOne: jest.fn(),
}));

describe("Auth Middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it("should return 403 if no authorization header is provided", async () => {
    await authMiddleware(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token is invalid", async () => {
    req.headers = { authorization: "Bearer testtoken" };
    (jwt.verify as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Invalid token");
    });
    await authMiddleware(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if user is not found", async () => {
    req.headers = { authorization: "Bearer testtoken" };
    (jwt.verify as jest.Mock).mockImplementationOnce(() => ({ id: "1" }));
    (User.findOne as jest.Mock).mockResolvedValue(null);
    await authMiddleware(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("should attach user to req and call next if token is valid and user is found", async () => {
    req.headers = { authorization: "Bearer testtoken" };
    const mockUser = { id: "1", email: "test@mood.com", username: "moodman" };
    (jwt.verify as jest.Mock).mockImplementationOnce(() => ({ id: "1" }));
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    await authMiddleware(req as Request, res as Response, next);
    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });
});

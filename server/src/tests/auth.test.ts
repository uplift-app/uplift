import { Request, Response, NextFunction } from "express";
import authMiddleware from "../middleware/auth";
import { getAuth } from "@clerk/express";

jest.mock("@clerk/express", () => ({
  getAuth: jest.fn(),
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
      send: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it("should return 401 if no user is authenticated", async () => {
    (getAuth as jest.Mock).mockReturnValue({ userId: null });

    await authMiddleware(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Authentication required");
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if user is authenticated", async () => {
    (getAuth as jest.Mock).mockReturnValue({ userId: "123" });

    await authMiddleware(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should return 401 if an error occurs while checking auth", async () => {
    (getAuth as jest.Mock).mockImplementation(() => {
      throw new Error("Something went wrong");
    });

    await authMiddleware(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});

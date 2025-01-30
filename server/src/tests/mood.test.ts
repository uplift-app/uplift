import { Request, Response } from "express";
import Mood from "../models/mood";
import {
  getMoods,
  addMood,
  editMood,
  deleteMood,
  getMoodTypes,
} from "../controllers/moodController";

jest.mock("../models/mood");

describe("Mood Controller", () => {
  describe("getMoods", () => {
    it("should return 200 with list of moods for a user", async () => {
      const userId = "testUserId";
      const moods = [
        {
          userId,
          moodType: "happiness",
          intensity: 5,
          moodTime: "morning",
          date: new Date(),
        },
        {
          userId,
          moodType: "stress",
          intensity: 3,
          moodTime: "evening",
          date: new Date(),
        },
      ];

      (Mood.find as jest.Mock).mockResolvedValue(moods);

      const req = {
        user: { userId },
        query: {},
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await getMoods(req, res);

      expect(Mood.find).toHaveBeenCalledWith({ userId });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(moods);
    });

    it("should return filtered moods based on startDate and endDate", async () => {
      const userId = "testUserId";
      const startDate = "2025-01-01";
      const endDate = "2025-01-31";
      const moods = [
        {
          userId,
          moodType: "energy",
          intensity: 7,
          moodTime: "afternoon",
          date: new Date(startDate),
        },
        {
          userId,
          moodType: "energy",
          intensity: 7,
          moodTime: "afternoon",
          date: new Date(endDate),
        },
      ];

      (Mood.find as jest.Mock).mockResolvedValue(moods);

      const req = {
        user: { userId },
        query: { startDate, endDate },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await getMoods(req, res);

      expect(Mood.find).toHaveBeenCalledWith({
        userId,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(moods);
    });

    it("should return 500 if an error occurs", async () => {
      const userId = "testUserId";
      (Mood.find as jest.Mock).mockRejectedValue(new Error("Database error"));

      const req = { user: { userId }, query: {} } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await getMoods(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error retrieving moods",
        error: expect.any(Error),
      });
    });
  });

  describe("addMood", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
      req = {
        body: {
          moodType: "happiness",
          intensity: 8,
          moodTime: "morning",
          date: "2025-01-28",
        },
        user: { userId: "mockUserId" },
      };

      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it("should successfully add a mood and return status 201", async () => {
      const mockSave = jest.fn().mockResolvedValue({
        ...req.body,
        userId: req.user.userId,
      });
      (Mood.prototype.save as jest.Mock) = mockSave;

      await addMood(req as Request, res as Response);

      expect(mockSave).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("should return a 500 error if there is an error during Mood creation", async () => {
      const mockSave = jest.fn().mockRejectedValue(new Error("Database Error"));
      (Mood.prototype.save as jest.Mock) = mockSave;

      await addMood(req as Request, res as Response);

      expect(mockSave).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error adding mood",
        error: new Error("Database Error"),
      });
    });
  });

  describe("getMoodTypes", () => {
    it("should return 200 with mood types", async () => {
      const userId = "testUserId";
      const moodTypes = ["happiness", "stress", "energy"];

      (Mood.distinct as jest.Mock).mockResolvedValue(moodTypes);

      const req = { user: { userId } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await getMoodTypes(req, res);

      expect(Mood.distinct).toHaveBeenCalledWith("moodType", { userId });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(moodTypes);
    });

    it("should return 500 if an error occurs", async () => {
      const userId = "testUserId";

      (Mood.distinct as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const req = { user: { userId } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await getMoodTypes(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error retrieving mood types",
        error: expect.any(Error),
      });
    });
  });
});

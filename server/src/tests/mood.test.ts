import {
  getMoodsByUserId,
  addMood,
  editMood,
  deleteMood,
} from "../controllers/moodController";
import { Request, Response } from "express";
import Mood from "../models/mood";

jest.mock("../models/mood");

describe("Mood Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  const userId = "mockUserId";

  beforeEach(() => {
    req = {
      user: { userId },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("getMoodsByUserId", () => {
    it("should return moods for a given userId and date range", async () => {
      const mockMoods = [{ moodType: "Happy", intensity: 5, userId }];
      const mockFind = jest.fn().mockResolvedValue(mockMoods);
      (Mood.find as jest.Mock) = mockFind;

      req.query = { startDate: "2025-01-01", endDate: "2025-01-31" };

      await getMoodsByUserId(req as Request, res as Response);

      expect(mockFind).toHaveBeenCalledWith({
        userId,
        date: { $gte: new Date("2025-01-01"), $lte: new Date("2025-01-31") },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockMoods);
    });

    it("should return all moods for a user if no date range is provided", async () => {
      const mockMoods = [{ moodType: "Happy", intensity: 5, userId }];
      const mockFind = jest.fn().mockResolvedValue(mockMoods);
      (Mood.find as jest.Mock) = mockFind;
      req.query = {};
      await getMoodsByUserId(req as Request, res as Response);
      expect(mockFind).toHaveBeenCalledWith({ userId });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockMoods);
    });

    it("should return an error if mood retrieval fails", async () => {
      const mockFind = jest.fn().mockRejectedValue(new Error("Database Error"));
      (Mood.find as jest.Mock) = mockFind;

      await getMoodsByUserId(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error retrieving moods",
        error: expect.any(Error),
      });
    });
  });

  describe("addMood", () => {
    it("should successfully add a new mood and return status 201", async () => {
      const newMood = {
        moodType: "Happy",
        intensity: 5,
        userId,
        moodTime: "2025-01-28T10:00:00Z",
        date: "2025-01-28",
      };
      const mockSave = jest.fn().mockResolvedValue(newMood);
      (Mood.prototype.save as jest.Mock) = mockSave;

      req.body = newMood;

      await addMood(req as Request, res as Response);

      expect(mockSave).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("should return an error if adding the mood fails", async () => {
      const mockSave = jest.fn().mockRejectedValue(new Error("Database Error"));
      (Mood.prototype.save as jest.Mock) = mockSave;

      req.body = {
        moodType: "Sad",
        intensity: 3,
        userId,
        moodTime: "2025-01-28T10:00:00Z",
        date: "2025-01-28",
      };

      await addMood(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error adding mood",
        error: expect.any(Error),
      });
    });
  });

  describe("editMood", () => {
    it("should successfully update the mood and return status 200", async () => {
      const mockMood = { moodType: "Happy", intensity: 5, userId };
      const updatedMood = { moodType: "Excited", intensity: 6, userId };
      const mockFindById = jest.fn().mockResolvedValue(mockMood);
      const mockFindByIdAndUpdate = jest.fn().mockResolvedValue(updatedMood);

      (Mood.findById as jest.Mock) = mockFindById;
      (Mood.findByIdAndUpdate as jest.Mock) = mockFindByIdAndUpdate;

      req.params = { id: "mockMoodId" };
      req.body = updatedMood;

      await editMood(req as Request, res as Response);

      expect(mockFindById).toHaveBeenCalledWith("mockMoodId");
      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
        "mockMoodId",
        updatedMood,
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedMood);
    });

    it("should return 404 if mood not found or not belonging to the user", async () => {
      const mockFindById = jest.fn().mockResolvedValue(null);
      (Mood.findById as jest.Mock) = mockFindById;

      req.params = { id: "nonExistentMoodId" };

      await editMood(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Mood not found" });
    });

    it("should return an error if updating the mood fails", async () => {
      const mockFindById = jest.fn().mockResolvedValue({ userId });
      const mockFindByIdAndUpdate = jest
        .fn()
        .mockRejectedValue(new Error("Database Error"));
      (Mood.findById as jest.Mock) = mockFindById;
      (Mood.findByIdAndUpdate as jest.Mock) = mockFindByIdAndUpdate;

      req.params = { id: "mockMoodId" };
      req.body = { moodType: "Sad" };

      await editMood(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error updating mood",
        error: expect.any(Error),
      });
    });
  });

  describe("deleteMood", () => {
    it("should successfully delete a mood and return status 200", async () => {
      const mockFindById = jest.fn().mockResolvedValue({ userId });
      const mockFindByIdAndDelete = jest.fn().mockResolvedValue(null);

      (Mood.findById as jest.Mock) = mockFindById;
      (Mood.findByIdAndDelete as jest.Mock) = mockFindByIdAndDelete;

      req.params = { id: "mockMoodId" };

      await deleteMood(req as Request, res as Response);

      expect(mockFindById).toHaveBeenCalledWith("mockMoodId");
      expect(mockFindByIdAndDelete).toHaveBeenCalledWith("mockMoodId");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "mood deleted successfully",
      });
    });

    it("should return 404 if mood not found or not belonging to the user", async () => {
      const mockFindById = jest.fn().mockResolvedValue(null);
      (Mood.findById as jest.Mock) = mockFindById;

      req.params = { id: "nonExistentMoodId" };

      await deleteMood(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Mood not found" });
    });

    it("should return an error if deleting the mood fails", async () => {
      const mockFindById = jest.fn().mockResolvedValue({ userId });
      const mockFindByIdAndDelete = jest
        .fn()
        .mockRejectedValue(new Error("Database Error"));

      (Mood.findById as jest.Mock) = mockFindById;
      (Mood.findByIdAndDelete as jest.Mock) = mockFindByIdAndDelete;

      req.params = { id: "mockMoodId" };

      await deleteMood(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error deleting mood",
        error: expect.any(Error),
      });
    });
  });
});

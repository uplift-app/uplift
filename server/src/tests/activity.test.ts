import { Request, Response } from "express";
import Activity from "../models/activity";
import {
  getActivities,
  addActivity,
  editActivity,
  deleteActivity,
  getActivityTypes,
} from "../controllers/activityController";

jest.mock("../models/activity");

describe("Activity Controller", () => {
  describe("getActivities", () => {
    it("should return 200 with list of activities for a user", async () => {
      const userId = "testUserId";
      const activities = [
        { userId, activityType: "running", duration: 30, date: new Date() },
        { userId, activityType: "cycling", duration: 45, date: new Date() },
      ];

      (Activity.find as jest.Mock).mockResolvedValue(activities);

      const req = {
        user: { userId },
        query: {},
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await getActivities(req, res);

      expect(Activity.find).toHaveBeenCalledWith({ userId });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(activities);
    });

    it("should return filtered activities based on startDate and endDate", async () => {
      const userId = "testUserId";
      const activities = [
        { userId, activityType: "running", duration: 30, date: new Date() },
      ];
      const startDate = "2025-01-01";
      const endDate = "2025-01-31";

      (Activity.find as jest.Mock).mockResolvedValue(activities);

      const req = {
        user: { userId },
        query: { startDate, endDate },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await getActivities(req, res);

      expect(Activity.find).toHaveBeenCalledWith({
        userId,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(activities);
    });

    it("should return 500 if an error occurs", async () => {
      const userId = "testUserId";
      (Activity.find as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const req = { user: { userId }, query: {} } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await getActivities(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error retrieving activities",
        error: expect.any(Error),
      });
    });
  });

  describe("addActivity", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
      req = {
        body: {
          duration: 30,
          activityType: "Running",
          activityTime: "2025-01-28T08:00:00Z",
          isHabit: false,
          date: "2025-01-28",
        },
        user: { userId: "mockUserId" },
      };

      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it("should successfully add an activity and return status 201", async () => {
      const mockSave = jest.fn().mockResolvedValue({
        ...req.body,
        userId: req.user.userId,
      });
      (Activity.prototype.save as jest.Mock) = mockSave;

      await addActivity(req as Request, res as Response);

      expect(mockSave).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("should return a 500 error if there is an error during activity creation", async () => {
      const mockSave = jest.fn().mockRejectedValue(new Error("Database Error"));
      (Activity.prototype.save as jest.Mock) = mockSave;

      await addActivity(req as Request, res as Response);

      expect(mockSave).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error adding activity",
        error: new Error("Database Error"),
      });
    });
  });

  describe("editActivity", () => {
    it("should return 200 with updated activity if the user owns it", async () => {
      const activityId = "testActivityId";
      const updates = { duration: 45 };
      const userId = "testUserId";
      const existingActivity = {
        userId,
        activityType: "running",
        duration: 30,
        date: new Date(),
      };

      (Activity.findById as jest.Mock).mockResolvedValue(existingActivity);
      (Activity.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        ...existingActivity,
        ...updates,
      });

      const req = {
        user: { userId },
        params: { id: activityId },
        body: updates,
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await editActivity(req, res);

      expect(Activity.findById).toHaveBeenCalledWith(activityId);
      expect(Activity.findByIdAndUpdate).toHaveBeenCalledWith(
        activityId,
        updates,
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        ...existingActivity,
        ...updates,
      });
    });

    it("should return 404 if activity not found or user does not own it", async () => {
      const activityId = "testActivityId";
      const updates = { duration: 45 };
      const userId = "testUserId";

      (Activity.findById as jest.Mock).mockResolvedValue(null);

      const req = {
        user: { userId },
        params: { id: activityId },
        body: updates,
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await editActivity(req, res);

      expect(Activity.findById).toHaveBeenCalledWith(activityId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Activity not found",
      });
    });

    it("should return 500 if an error occurs", async () => {
      const activityId = "testActivityId";
      const updates = { duration: 45 };
      const userId = "testUserId";

      (Activity.findById as jest.Mock).mockResolvedValue({ userId });
      (Activity.findByIdAndUpdate as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const req = {
        user: { userId },
        params: { id: activityId },
        body: updates,
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await editActivity(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error updating activity",
        error: expect.any(Error),
      });
    });
  });

  describe("deleteActivity", () => {
    it("should return 200 with success message if activity is deleted", async () => {
      const activityId = "testActivityId";
      const userId = "testUserId";
      const existingActivity = {
        userId,
        activityType: "running",
        duration: 30,
        date: new Date(),
      };

      (Activity.findById as jest.Mock).mockResolvedValue(existingActivity);
      (Activity.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const req = {
        user: { userId },
        params: { id: activityId },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await deleteActivity(req, res);

      expect(Activity.findById).toHaveBeenCalledWith(activityId);
      expect(Activity.findByIdAndDelete).toHaveBeenCalledWith(activityId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Activity deleted successfully",
      });
    });

    it("should return 404 if activity is not found", async () => {
      const activityId = "testActivityId";
      const userId = "testUserId";

      (Activity.findById as jest.Mock).mockResolvedValue(null);

      const req = {
        user: { userId },
        params: { id: activityId },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await deleteActivity(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Activity not found",
      });
    });

    it("should return 500 if an error occurs", async () => {
      const activityId = "testActivityId";
      const userId = "testUserId";

      (Activity.findById as jest.Mock).mockResolvedValue({ userId });
      (Activity.findByIdAndDelete as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const req = {
        user: { userId },
        params: { id: activityId },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await deleteActivity(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error deleting activity",
        error: expect.any(Error),
      });
    });
  });

  describe("getActivityTypes", () => {
    it("should return 200 with activity types", async () => {
      const userId = "testUserId";
      const activityTypes = ["running", "cycling"];

      (Activity.distinct as jest.Mock).mockResolvedValue(activityTypes);

      const req = { user: { userId } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await getActivityTypes(req, res);

      expect(Activity.distinct).toHaveBeenCalledWith("activityType", {
        userId,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(activityTypes);
    });

    it("should return 500 if an error occurs", async () => {
      const userId = "testUserId";

      (Activity.distinct as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const req = { user: { userId } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await getActivityTypes(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error retrieving activity types",
        error: expect.any(Error),
      });
    });
  });
});

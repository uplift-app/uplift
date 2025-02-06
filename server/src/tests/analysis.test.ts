import { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";
import {
  fetchActivities,
  fetchMoods,
  buildQuery,
} from "../middleware/databaseQuery";
import { analyseData } from "../controllers/analysisController";

jest.mock("child_process");
jest.mock("../middleware/databaseQuery");

jest.mock("fs", () => ({
  writeFileSync: jest.fn(),
  unlinkSync: jest.fn(),
}));

jest.mock("path", () => ({
  resolve: jest.fn(),
  join: jest.fn(),
}));

describe("analyseData", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let sendSpy: jest.Mock;
  let jsonSpy: jest.Mock;
  let pythonSpawnSpy: jest.Mock;
  let fetchMoodsMock: jest.Mock;
  let fetchActivitiesMock: jest.Mock;
  let buildQueryMock: jest.Mock;

  beforeEach(() => {
    sendSpy = jest.fn();
    jsonSpy = jest.fn();
    pythonSpawnSpy = jest.fn();
    fetchMoodsMock = jest.fn();
    fetchActivitiesMock = jest.fn();
    buildQueryMock = jest.fn();

    req = {
      query: {
        startDate: "2022-01-01",
        endDate: "2022-12-31",
      },
      user: {
        userId: "user123",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: sendSpy,
      json: jsonSpy,
    };

    (path.resolve as jest.Mock).mockReturnValue("/mock/path");
    (path.join as jest.Mock).mockReturnValue("/mock/python/path");

    (fetchMoods as jest.Mock) = fetchMoodsMock;
    (fetchActivities as jest.Mock) = fetchActivitiesMock;
    (buildQuery as jest.Mock) = buildQueryMock;
  });

  it("should successfully analyse data and return the result", async () => {
    buildQueryMock.mockReturnValue("someQuery");
    fetchMoodsMock.mockResolvedValue([{ mood: "happy" }]);
    fetchActivitiesMock.mockResolvedValue([{ activity: "running" }]);

    pythonSpawnSpy.mockImplementationOnce(
      (
        scriptPath: string,
        args: string[],
        callback: (err: string | null, result: string | null) => void
      ) => {
        callback(null, '{"result": "success"}');
      }
    );

    await analyseData(req as Request, res as Response);

    expect(fetchMoodsMock).toHaveBeenCalledWith("someQuery");
    expect(fetchActivitiesMock).toHaveBeenCalledWith("someQuery");

    expect(fs.writeFileSync).toHaveBeenCalledTimes(2);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "/mock/path",
      JSON.stringify([{ mood: "happy" }])
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "/mock/path",
      JSON.stringify([{ activity: "running" }])
    );
  });

  it("should handle error in Python script execution", async () => {
    pythonSpawnSpy.mockImplementationOnce(
      (
        scriptPath: string,
        args: string[],
        callback: (err: string | null, result: string | null) => void
      ) => {
        callback("Error: Python script failed", null);
      }
    );

    await analyseData(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("should handle errors in fetchMoods or fetchActivities", async () => {
    fetchMoodsMock.mockRejectedValue(new Error("Database error"));

    await analyseData(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonSpy).toHaveBeenCalledWith({
      message: "Error analysing data",
      error: expect.any(Error),
    });
  });

  it("should handle missing query parameters gracefully", async () => {
    const invalidReq = {
      query: {},
      user: {
        userId: "user123",
      },
    } as Partial<Request>;

    const invalidRes = {
      status: jest.fn().mockReturnThis(),
      send: sendSpy,
      json: jsonSpy,
    } as unknown as Response;

    await analyseData(invalidReq as Request, invalidRes);

    expect(invalidRes.status).toHaveBeenCalledWith(500);
    expect(invalidRes.json).toHaveBeenCalledWith({
      message: "Error analysing data",
      error: expect.any(Error),
    });
  });
});

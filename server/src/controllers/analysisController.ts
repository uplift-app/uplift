import { spawn } from "child_process";
import { Request, Response } from "express";
import * as fs from "fs";
import path from "path";
import {
  buildQuery,
  fetchActivities,
  fetchMoods,
} from "../middleware/databaseQuery";

export const analyseData = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const query = buildQuery(
      req.user.userId,
      startDate as string,
      endDate as string
    );

    const moods = await fetchMoods(query);
    const activities = await fetchActivities(query);

    const moodPath = path.resolve(__dirname, "../../mocks/mood.json");
    const activityPath = path.resolve(__dirname, "../../mocks/activity.json");
    fs.writeFileSync(moodPath, JSON.stringify(moods));
    fs.writeFileSync(activityPath, JSON.stringify(activities));

    runPython("scripts/analysis/analyse.py", (err: string, result: string) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(JSON.parse(result.replace(/'/g, '"')));
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error analysing data", error });
  }
};

function runPython(scriptPath: string, callback: Function) {
  const pythonExecutable =
    process.platform === "win32"
      ? path.join(__dirname, "../../venv/Scripts/python.exe")
      : "python";
  const pythonProcess = spawn(pythonExecutable, [scriptPath]);

  let data = "";
  pythonProcess.stdout.on("data", (chunk) => {
    data += chunk.toString();
  });

  pythonProcess.stderr.on("data", (error) => {
    console.error(`stderr: ${error}`);
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      console.log(`Python script exited with code ${code}`);
      callback(`Error: Script exited with code ${code}`, null);
    } else {
      console.log("Python script executed successfully");
      callback(null, data);
    }
  });
}

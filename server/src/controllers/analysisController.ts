import { Request, Response } from "express";
import { spawn } from "child_process";
import Mood from "../models/mood";
import Activity from "../models/activity";
import * as fs from "fs";
import path from "path";

export const analyseData = async (req: Request, res: Response) => {
  // TODO: this is intentionally hardcoded. database queries will be modularised; and should probably add some more error checks here
  const moods = await Mood.find({ userId: 1 });
  const activities = await Activity.find({ userId: 1 });

  const moodPath = path.resolve(__dirname, "../../mocks/mood.json");
  const activityPath = path.resolve(__dirname, "../../mocks/activity.json");
  fs.writeFileSync(moodPath, JSON.stringify(moods));
  fs.writeFileSync(activityPath, JSON.stringify(activities));

  runPython("scripts/analysis/analyse.py", (err: string, result: string) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // cleanup breaks the code; i think its because react executes every request twice in dev mode
      // the request are async made and the deleting the files in one request might lead to the error in the second request
      // fs.unlinkSync(moodPath);
      // fs.unlinkSync(activityPath);
      res.json(JSON.parse(result.replace(/'/g, '"')));
    }
  });
};

function runPython(scriptPath: string, callback: Function) {
  const pythonExecutable = path.join(
    __dirname,
    "../../venv/Scripts/python.exe"
  ); // Adjust path to match the project structure
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

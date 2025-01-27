"use strict";

import { Router } from "express";
import {
  addMood,
  deleteMood,
  editMood,
  getMoodsByUserId,
} from "../controllers/moodController";

const moodRouter = Router();

moodRouter.get("/:userId", getMoodsByUserId);
moodRouter.post("/", addMood);
moodRouter.put("/:id", editMood);
moodRouter.delete("/:id", deleteMood);

export default moodRouter;

"use strict";

import { Router } from "express";
import { getActivitiesByUserId } from "../controllers/activityController";
import { addMood, deleteMood, editMood } from "../controllers/moodController";

const moodRouter = Router();

moodRouter.get("/:userId", getActivitiesByUserId);
moodRouter.post("/", addMood);
moodRouter.put("/:id", editMood);
moodRouter.delete("/:id", deleteMood);

export default moodRouter;

"use strict";

import { RequestHandler, Router } from "express";
import {
  addMood,
  deleteMood,
  editMood,
  getMoods,
} from "../controllers/moodController";
import authMiddleware from "../middleware/auth";

const moodRouter = Router();

moodRouter.get("/", authMiddleware as RequestHandler, getMoods);
moodRouter.post("/", authMiddleware as RequestHandler, addMood);
moodRouter.put("/:id", authMiddleware as RequestHandler, editMood);
moodRouter.delete("/:id", authMiddleware as RequestHandler, deleteMood);

export default moodRouter;

"use strict";

import { RequestHandler, Router } from "express";
import {
  addActivity,
  deleteActivity,
  editActivity,
  getActivitiesByUserId,
} from "../controllers/activityController";
import authMiddleware from "../middleware/auth";

const activityRouter = Router();

activityRouter.get(
  "/",
  authMiddleware as RequestHandler,
  getActivitiesByUserId
);
activityRouter.post("/", authMiddleware as RequestHandler, addActivity);
activityRouter.put("/:id", authMiddleware as RequestHandler, editActivity);
activityRouter.delete("/:id", authMiddleware as RequestHandler, deleteActivity);

export default activityRouter;

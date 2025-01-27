"use strict";

import { Router } from "express";
import {
  addActivity,
  deleteActivity,
  editActivity,
  getActivitiesByUserId,
} from "../controllers/activityController";

const activityRouter = Router();

activityRouter.get("/:userId", getActivitiesByUserId);
activityRouter.post("/", addActivity);
activityRouter.put("/:id", editActivity);
activityRouter.delete("/:id", deleteActivity);

export default activityRouter;

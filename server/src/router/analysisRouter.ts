"use strict";

import { Router } from "express";
import { analyseData } from "../controllers/analysisController";
import authMiddleware from "../middleware/auth";

const analysisRouter = Router();

analysisRouter.get("/", authMiddleware, analyseData);

export default analysisRouter;

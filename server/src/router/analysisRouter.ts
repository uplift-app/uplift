"use strict";

import { Router } from "express";
import { analyseData } from "../controllers/analysisController";

const analysisRouter = Router();

analysisRouter.get("/", analyseData);

export default analysisRouter;

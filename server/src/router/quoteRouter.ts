"use strict";

import { Router } from "express";
import { getQuote } from "../controllers/quoteController";

const quoteRouter = Router();

quoteRouter.get("/", getQuote);

export default quoteRouter;

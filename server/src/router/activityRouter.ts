"use strict";

import { Request, Response, Router } from "express";

const activityRouter = Router();

activityRouter.get("/", (req: Request, res: Response) => {
  res.send("/GET activity");
});

activityRouter.post("/", (req: Request, res: Response) => {
  res.send("/POST activity");
});

activityRouter.put("/", (req: Request, res: Response) => {
  res.send("/PUT activity");
});

activityRouter.delete("/", (req: Request, res: Response) => {
  res.send("/DELETE activity");
});

export default activityRouter;

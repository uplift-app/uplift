"use strict";

import { Request, Response, Router } from "express";

const moodRouter = Router();

moodRouter.get("/", (req: Request, res: Response) => {
  res.send("/GET mood");
});

moodRouter.post("/", (req: Request, res: Response) => {
  res.send("/POST mood");
});

moodRouter.put("/", (req: Request, res: Response) => {
  res.send("/PUT mood");
});

moodRouter.delete("/", (req: Request, res: Response) => {
  res.send("/DELETE mood");
});

export default moodRouter;

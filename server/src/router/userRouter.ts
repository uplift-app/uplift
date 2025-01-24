"use strict";

import { Request, Response, Router } from "express";

const userRouter = Router();

userRouter.get("/", (req: Request, res: Response) => {
  res.send("/GET user");
});

userRouter.post("/", (req: Request, res: Response) => {
  res.send("/POST user");
});

export default userRouter;

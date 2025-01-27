"use strict";

import { Router } from "express";
import { addUser, getUserById } from "../controllers/userController";

const userRouter = Router();
userRouter.get("/:id", getUserById);
userRouter.post("/", addUser);

export default userRouter;

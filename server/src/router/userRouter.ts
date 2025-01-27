"use strict";

import { Router } from "express";
import { addUser, login } from "../controllers/userController";

const userRouter = Router();
userRouter.post("/login", login);
userRouter.post("/register", addUser);

export default userRouter;

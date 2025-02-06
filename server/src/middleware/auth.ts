"use strict";
import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = getAuth(req);
    if (userId) {
      req.user = { userId };
      req.user.userId = "1"; //Hardcoded to replace userId to match database
      next();
    } else {
      res.status(401).send("Authentication required");
    }
  } catch (error) {
    res.status(401);
  }
};

export default authMiddleware;

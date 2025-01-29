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
    if (!userId) {
      res.status(401).send("Authentication required");
    } else next();
  } catch (error) {
    res.status(401);
  }
};

export default authMiddleware;

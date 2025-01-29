"use strict";
import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import User from "../models/user";
// import { JwtProps } from "../interfaces";

const SECRET_KEY = process.env.SECRET_KEY || "default";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // const authHeaders = req.headers["authorization"];
  // if (authHeaders) {
  // const token = authHeaders.split(" ")[1];
  try {
    /* Commented out until front end can authenticate. To replace hard coded user below once authentication implemented
      const { userId } = jwt.verify(token, SECRET_KEY) as JwtProps;

      const user = await User.findOne({ id: userId });
      if (!user) res.status(401);
      const user = await User.findOne({ id: userId });
      if (!user) res.status(401);
      req.user = user;
      */
    req.user = {
      email: "test@mood.com",
      username: "moodman",
      password: "$2b$10$Kq3keyn/73cxdMsCXg3iC.FKDVR9rq.imYcjycVaiKZ8ObFkYp12y",
      userId: "1",
    };
    next();
  } catch (error) {
    res.status(401);
  }
  // } else res.status(403);
};

export default authMiddleware;

"use strict";
// import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    req.user = {
      email: "test@mood.com",
      username: "moodman",
      password: "$2b$10$Kq3keyn/73cxdMsCXg3iC.FKDVR9rq.imYcjycVaiKZ8ObFkYp12y",
      userId: "1",
    };
    next();
    // const { userId } = getAuth(req);
    // console.log(userId);
    // if (!userId) {
    //   res.status(401).send("Authentication required");
    // } else {
    //   req.user = { userId };
    //   next();
    // }
  } catch (error) {
    res.status(401);
  }
};

export default authMiddleware;

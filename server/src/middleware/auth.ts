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
) => {
  const authHeaders = req.headers["authorization"];
  //! commented out because without authentication implemented FE cannot communicate with BE
  // if (authHeaders) {
  //   const token = authHeaders.split(" ")[1];
  //   try {
      /* Commented out until front end can authenticate. To replace hard coded user below once authentication implemented
      const { id } = jwt.verify(token, SECRET_KEY) as JwtProps;

      const user = await User.findOne({ id: id });
      if (!user) return res.status(401);
      req.user = user;
      */
  //     req.user = {
  //       email: "test@mood.com",
  //       username: "moodman",
  //       password:
  //         "$2b$10$Kq3keyn/73cxdMsCXg3iC.FKDVR9rq.imYcjycVaiKZ8ObFkYp12y",
  //       userId: "1",
  //     };
  //     next();
  //   } catch (error) {
  //     res.status(401);
  //   }
  // } else return res.status(403);
  try {
    req.user = {
      email: "test@mood.com",
      username: "moodman",
      password:
        "$2b$10$Kq3keyn/73cxdMsCXg3iC.FKDVR9rq.imYcjycVaiKZ8ObFkYp12y",
      userId: "1",
    };
    next();
  } catch (error) {
    res.status(401);
  }
};

export default authMiddleware;

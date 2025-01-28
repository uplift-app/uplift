"use strict";
import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import User from "../models/user";

const SECRET_KEY = process.env.SECRET_KEY || "default";

// interface JwtProps {
//   id: string;
// }

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) return res.status(403);
  // const token = authHeaders.split(" ")[1];

  try {
    /* Commented out until front end can authenticate. To replace hard coded user below once authentication implemented
    const { id } = jwt.verify(token, SECRET_KEY) as JwtProps;

    const user = await User.findOne({ where: { id: id } });
    if (!user) return res.status(401);
    req.user = user;
    */
    req.user = {
      email: "test@mood.com",
      username: "moodman",
      password: "$2b$10$Kq3keyn/73cxdMsCXg3iC.FKDVR9rq.imYcjycVaiKZ8ObFkYp12y",
      id: "1",
    };
    next();
  } catch (error) {
    res.status(401);
  }
};

export default authMiddleware;

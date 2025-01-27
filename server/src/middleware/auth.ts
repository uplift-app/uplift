"use strict";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

const SECRET_KEY = process.env.SECRET_KEY || "default";

interface JwtProps {
  id: string;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(" ")[1];

  try {
    const { id } = jwt.verify(token, SECRET_KEY) as JwtProps;

    const user = await User.findOne({ where: { id: id } });
    if (!user) return res.sendStatus(401);
    req.user = user;

    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

export default authMiddleware;

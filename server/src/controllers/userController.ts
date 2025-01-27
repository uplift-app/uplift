import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const rounds = process.env.SALT_ROUNDS || 10;
const SECRET_KEY = process.env.SECRET_KEY || "default";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
        res.status(200).send({ accessToken });
      } else {
        res.status(401).send({ message: "Wrong credentials!" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      res.status(409).send({ message: "User already exists!" });
    }
    const hash = await bcrypt.hash(password, rounds);
    const newUser = new User({
      email: email,
      username: username,
      password: hash,
    });
    await newUser.save();
    const accessToken = jwt.sign({ id: newUser.id }, SECRET_KEY);
    res.status(201).json(accessToken);
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
};

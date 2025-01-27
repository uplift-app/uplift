import { Request, Response } from "express";
import User from "../models/user";

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
};

export const addUser = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    const newUser = new User({ email, username, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
};

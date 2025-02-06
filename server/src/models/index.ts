"use strict";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";
const DATABASE_NAME = process.env.DATABASE_NAME || "uplift";

export const connectDB = async () => {
  try {
    await mongoose.connect(`${DATABASE_URL}/${DATABASE_NAME}`);
    console.log("Connected to database", DATABASE_NAME);
  } catch (e) {
    console.log(`MongoDB connection error: ${e}`);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
};

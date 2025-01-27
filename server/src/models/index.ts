"use strict";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`
    );
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log(`MongoDB connection error: ${e}`);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
};

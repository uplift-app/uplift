"use strict";
import mongoose from "mongoose";

const databaseURL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";
const databaseName = process.env.DATABASE_NAME || "uplift";

export const connectDB = async () => {
  try {
    await mongoose.connect(`${databaseURL}/${databaseURL}`);
  } catch (e) {
    console.log(`MongoDB connection error: ${e}`);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
};

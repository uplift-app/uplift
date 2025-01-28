import mongoose from "mongoose";
import { connectDB, disconnectDB } from "../models";
import dotenv from "dotenv";

dotenv.config();

beforeAll(async () => {
  process.env.DATABASE_NAME = process.env.TEST_DATABASE_NAME || "uplift-test";
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

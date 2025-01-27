import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectDB, disconnectDB } from "../models";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
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

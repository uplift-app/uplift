"use strict";
import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect(
      `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`
    );
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log(`MongoDB connection error: ${e}`);
  }
})();

export default mongoose;

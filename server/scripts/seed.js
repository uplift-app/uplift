"use strict";
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Activity = require("../dist/models/activity.js").default;
const Mood = require("../dist/models/mood.js").default;
const User = require("../dist/models/user.js").default;
const activityData = require("../mocks/activity.js");
const moodData = require("../mocks/mood.js");
const userData = require("../mocks/user.js");
const dotenv = require("dotenv");

dotenv.config();

const databaseURL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";
const databaseName = process.env.DATABASE_NAME || "uplift";

const clearDatabase = async () => {
  await Activity.deleteMany();
  await Mood.deleteMany();
  await User.deleteMany();
  console.log("MongoDB cleared!");
};

const fillDatabase = async () => {
  await Activity.insertMany(activityData);

  await Mood.insertMany(moodData);

  for (const user of userData) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    await User.create({
      ...user,
      password: hashedPassword,
    });
  }
  console.log("MongoDB filled successfully!");
};

(async () => {
  await mongoose.connect(`${databaseURL}/${databaseName}`);
  console.log("Connected to MongoDB!");
  await clearDatabase();
  await fillDatabase();
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB!");
})();

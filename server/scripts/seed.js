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
  console.log(process.env.DATABASE_URL);
  await mongoose.connect(
    `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`
  );
  console.log("Connected to MongoDB!");
  await clearDatabase();
  await fillDatabase();
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB!");
})();

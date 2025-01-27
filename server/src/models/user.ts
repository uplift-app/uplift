import mongoose, { Schema } from "mongoose";
import { User } from "../interfaces";

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<User>("User", UserSchema);
export default User;

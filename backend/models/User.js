import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
  favorites: [String]
});

export default mongoose.model("User", userSchema);

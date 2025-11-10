import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.json({ error: "Please enter a valid email address" });
    }

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.json({ error: "Username or Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, name, email, password: hashedPassword });

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.json(err);
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) return res.json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ error: "Incorrect password" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );

    res.json({ message: "Login successful", token, username: user.username });
  } catch (err) {
    res.json(err);
  }
};

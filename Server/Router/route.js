import express from "express";
import bcrypt from "bcrypt";
import User from "../schema/userschema.js";

const router = express.Router();


router.post("/add", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    console.log(req.body);
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Save new user
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    const newUser = new User({ name, email, mobile, password: hashPassword });
    await newUser.save();

    res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error while registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;

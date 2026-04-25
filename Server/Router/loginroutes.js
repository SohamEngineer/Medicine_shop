import express from "express";
import User from "../schema/userschema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || process.env.JWT_SECRET_KEY || "Soham@hello";
const loginRouter = express.Router();

loginRouter.use(express.json());


//  Login Route
loginRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "email and password required" });
        }
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User Not Found" });
        }

        console.log(user)

        // return res.json(user)

        // Compare password
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(400).json({ message: "Password does not match" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
        console.log(token);
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                name: user.name,
                role: user.role,
            }
        });
    } catch (error) {
        console.error("Error in login route:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default loginRouter;


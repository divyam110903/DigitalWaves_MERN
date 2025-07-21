import express from 'express';
import dotenv from "dotenv";
import { adminAuth } from "../middleware/adminAuth.js";
dotenv.config();
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.status(200).json({
      success: true,
      adminKey: process.env.ADMIN_KEY,
      message: "Login successful"
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password"
    });
  }
});

export default router;
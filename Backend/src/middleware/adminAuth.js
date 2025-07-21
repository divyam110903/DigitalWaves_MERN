import dotenv from "dotenv";
dotenv.config();

export const adminAuth = (req, res, next) => {
  const token = req.headers["x-admin-key"];
  if (!token || token !== process.env.ADMIN_KEY) {
    return res.status(403).json({ message: "Forbidden - Invalid Admin Key" });
  }
  next();
};
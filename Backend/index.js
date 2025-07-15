import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import DwRoutes from "./src/Routes/DwRoutes.js";
import AboutRouter from "./src/Routes/AboutRouter.js";
import ContactRouter from "./src/Routes/ContactRouter.js";
import ClientRouter from "./src/Routes/ClientRouter.js";
import HomeRouter from "./src/Routes/HomeRouter.js";
dotenv.config(); 

const app = express();


app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


app.use("/", DwRoutes);
app.use("/api/about", AboutRouter);
app.use("/api/contact",ContactRouter);
app.use("/api/client", ClientRouter);
app.use("/api/home",HomeRouter);

const startServer = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    app.listen(2200, () => {
      console.log("Server is running on port 2200");
    });

  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};



startServer();
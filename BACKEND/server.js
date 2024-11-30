// Package Imports
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// File Imports
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cookieParser());
console.log("PORT from .env:", process.env.PORT);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes );
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Server
app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running on port ${port}`);
});

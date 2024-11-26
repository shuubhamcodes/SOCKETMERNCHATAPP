// Package Imports
import express from "express";
import dotenv from "dotenv";
// File Imports
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse incoming requests with JSON payloads
console.log("PORT from .env:", process.env.PORT);

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Server
app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running on port ${port}`);
});

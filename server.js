import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from './routes/contact.js';
import applyRoutes from "./routes/apply.js";
import adminRoutes from "./routes/admin.js";
import programRoutes from "./routes/program.js";
import authRoutes from "./routes/auth.js";
import path from "path";



// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(contactRoutes);
app.use("/api/apply", applyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/program", programRoutes);
app.use("/uploads", express.static("uploads"));
console.log("✅ Auth routes loaded");
app.use("/api/auth", authRoutes);



// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
  })
  .catch((err) => {
    console.log("MongoDB connection error ❌:", err);
  });

// Default route
app.get("/", (req, res) => {
  res.send("VolunteerConnect backend running 🚀");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

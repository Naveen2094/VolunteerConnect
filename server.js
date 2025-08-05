import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from './routes/contact.js';
import applyRoutes from "./routes/apply.js";
import adminRoutes from "./routes/admin.js";


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

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected successfully ✅");
})
.catch((err) => {
  console.error("MongoDB connection error ❌:", err);
});

// Default route
app.get("/", (req, res) => {
  res.send("VolunteerConnect backend running 🚀");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

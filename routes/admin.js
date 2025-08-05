import express from "express";
import ApplyModel from "../models/Apply.js";

const router = express.Router();

router.get("/applications", async (req, res) => {
  try {
    const applications = await ApplyModel.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

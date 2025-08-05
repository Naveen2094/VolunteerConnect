import express from "express";
import ApplyModel from "../models/Apply.js"; 

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, programInterest } = req.body;

    if (!name || !email || !phone || !programInterest) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newApplication = new ApplyModel({
      name,
      email,
      phone,
      programInterest,
    });

    await newApplication.save();

    res.status(201).json({ message: "Application saved successfully" });
  } catch (error) {
    console.error("Error saving application:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

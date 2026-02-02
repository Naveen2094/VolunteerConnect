import express from "express";
import ApplyModel from "../models/Apply.js";

const router = express.Router();

/**
 * TEST ROUTE – Volunteer applies to a program
 * (No login, dummy IDs, for learning only)
 */
router.get("/test-apply", async (req, res) => {
  try {
    const application = new ApplyModel({
      userId: "507f1f77bcf86cd799439011",   // dummy ObjectId
      programId: "507f191e810c19729de860ea", // dummy ObjectId
      name: "Test Volunteer",
      email: "testvolunteer@gmail.com",
      phone: "9999999999",
      status: "applied"
    });

    const savedApplication = await application.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error("Error saving application:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

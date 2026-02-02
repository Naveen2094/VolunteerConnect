import express from "express";
import ApplyModel from "../models/Apply.js";

const router = express.Router();

/**
 * View ALL applications (applied + approved + rejected)
 */
router.get("/applications", async (req, res) => {
  try {
    const applications = await ApplyModel.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * View ONLY approved applications
 */
router.get("/applications/approved", async (req, res) => {
  try {
    const approvedApplications = await ApplyModel.find({
      status: "approved"
    }).sort({ createdAt: -1 });

    res.json(approvedApplications);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * View approved volunteers for a specific program
 */
router.get("/program/:programId/volunteers", async (req, res) => {
  try {
    const approvedVolunteers = await ApplyModel.find({
      programId: req.params.programId,
      status: "approved"
    });

    res.json(approvedVolunteers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * TEST ROUTE – Admin approves an application
 */
router.get("/approve/:id", async (req, res) => {
  try {
    const application = await ApplyModel.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * TEST ROUTE – Admin rejects an application
 */
router.get("/reject/:id", async (req, res) => {
  try {
    const application = await ApplyModel.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

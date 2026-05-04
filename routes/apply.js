import express from "express";
import ApplyModel from "../models/Apply.js";
import Program from "../models/Program.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, programId, programTitle, name, email, phone } = req.body;

    if (!userId || !programId || !name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const program = await Program.findById(programId);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    if (!["verified", "approved"].includes(program.status)) {
      return res.status(400).json({ message: "Program is not open for applications" });
    }

    if ((program.currentVolunteers || 0) >= (program.requiredVolunteers || 0)) {
      if (program.status !== "closed") {
        program.status = "closed";
        await program.save();
      }
      return res.status(400).json({ message: "Program Full" });
    }

    const application = new ApplyModel({
      userId,
      programId,
      programTitle: programTitle || program.title,
      name,
      email,
      phone,
      status: "applied",
    });

    await application.save();

    program.currentVolunteers = (program.currentVolunteers || 0) + 1;
    if (program.currentVolunteers >= program.requiredVolunteers) {
      program.status = "closed";
    }
    await program.save();

    res.status(201).json({
      message: "Application submitted successfully!",
      application,
      program: {
        _id: program._id,
        currentVolunteers: program.currentVolunteers,
        requiredVolunteers: program.requiredVolunteers,
        status: program.status,
      },
    });
  } catch (error) {
    console.error("Error saving application:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user/:email", async (req, res) => {
  try {
    const applications = await ApplyModel.find({ email: req.params.email })
      .populate("programId")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error("Error fetching user applications:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/test-apply", async (req, res) => {
  try {
    const application = new ApplyModel({
      userId: "507f1f77bcf86cd799439011",
      programId: "507f191e810c19729de860ea",
      programTitle: "Test Volunteer Program",
      name: "Test Volunteer",
      email: "testvolunteer@gmail.com",
      phone: "9999999999",
      status: "applied",
    });

    const savedApplication = await application.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error("Error saving application:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

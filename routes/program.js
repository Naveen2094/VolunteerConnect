import express from "express";
import multer from "multer";
import Program from "../models/Program.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/programs");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    console.log("Program create body:", req.body);

    const {
      title,
      shortDesc,
      category,
      location,
      requiredVolunteers,
      startDate,
      endDate,
      startTime,
      endTime,
      createdBy,
    } = req.body;

    if (!title || !shortDesc || !category || !location || !requiredVolunteers || !startDate || !startTime) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }

    const program = new Program({
      title,
      shortDesc,
      category,
      location,
      requiredVolunteers,
      currentVolunteers: 0,
      startDate,
      endDate,
      startTime,
      endTime,
      image: req.file?.filename,
      status: "created",
      createdBy,
    });

    await program.save();

    res.status(201).json({
      message: "Program submitted for admin verification",
      program,
    });
  } catch (err) {
    console.error("CREATE PROGRAM ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user/:name", async (req, res) => {
  try {
    const programs = await Program.find({ createdBy: req.params.name }).sort({ createdAt: -1 });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/admin/all", async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/approve/:id", async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, { status: "verified" }, { new: true });

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.json({ message: "Program approved successfully", program });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/reject/:id", async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.json({ message: "Program rejected successfully", program });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const programs = await Program.find({ status: { $in: ["verified", "closed", "approved"] } }).sort({ createdAt: -1 });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.json({ message: "Program deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

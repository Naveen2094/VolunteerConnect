import express from "express";
import multer from "multer";
import Program from "../models/Program.js";

const router = express.Router();

/* =======================
   MULTER CONFIG
======================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/programs");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* =======================
   USER – CREATE PROGRAM
   Status: pending
======================= */
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    console.log("📦 BODY:", req.body);
    console.log("🖼 FILE:", req.file);

    const { title, shortDesc, longDesc, createdBy } = req.body;

    if (!title || !shortDesc || !longDesc || !createdBy) {
      return res.status(400).json({ message: "All fields required" });
    }

    const program = new Program({
      title,
      shortDesc,
      longDesc,
      image: req.file ? req.file.filename : null,
      status: "pending",
      createdBy,
    });

    await program.save();

    res.status(201).json({
      message: "Program submitted for admin verification",
    });
  } catch (err) {
    console.error("❌ CREATE PROGRAM ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


/* =======================
   ADMIN – VIEW ALL PROGRAMS
======================= */
router.get("/admin/all", async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =======================
   ADMIN – APPROVE PROGRAM
======================= */
router.put("/approve/:id", async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.json({ message: "Program approved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =======================
   ADMIN – REJECT PROGRAM
======================= */
router.put("/reject/:id", async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.json({ message: "Program rejected successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =======================
   PUBLIC – VIEW APPROVED PROGRAMS ONLY
======================= */
router.get("/", async (req, res) => {
  try {
    const programs = await Program.find({ status: "approved" }).sort({
      createdAt: -1,
    });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =======================
   ADMIN – DELETE PROGRAM
======================= */
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

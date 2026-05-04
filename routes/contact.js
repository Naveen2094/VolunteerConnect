import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new Contact({
      name,
      email,
      subject,
      message,
    });

    await newMessage.save();

    return res.status(201).json({
      message: "Message stored successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/api/contact/messages", async (_req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    return res.json(messages);
  } catch (error) {
    console.error("Fetch contact messages error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;

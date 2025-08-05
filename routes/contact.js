import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

router.post('/api/contact', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: 'Message received ✅' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save contact message' });
  }
});

export default router;

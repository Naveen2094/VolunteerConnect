const express = require('express');
const router = express.Router();
const Program = require('../models/Program');

router.get('/', async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

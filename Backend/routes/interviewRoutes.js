const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');

// POST: Create new interview
router.post('/', async (req, res) => {
  try {
    const interview = new Interview(req.body);
    const saved = await interview.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: All interviews
router.get('/', async (req, res) => {
  try {
    const interviews = await Interview.find();
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

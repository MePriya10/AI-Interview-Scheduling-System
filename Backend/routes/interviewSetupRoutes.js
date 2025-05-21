// routes/interviewSetup.js
const express = require('express');
const router = express.Router();
const InterviewRequest = require('../models/InterviewRequest');

router.post('/interview-setup', async (req, res) => {
 
});

router.post('/setupInterview', async (req, res) => {
  try {
    const { role, date, duration, candidateIds } = req.body;

    if (!role || !date || !duration || !candidateIds || candidateIds.length === 0) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const setup = new InterviewRequest({ role, date, duration, candidateIds });
    await setup.save();

    res.status(201).json({ message: 'Interview setup saved', setupId: setup._id });
  } catch (err) {
    console.error('Error saving interview setup:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

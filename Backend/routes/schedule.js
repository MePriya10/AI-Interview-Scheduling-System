const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const dummyInterviewerIds = ['int001', 'int002', 'int003'];

router.post('/generate-schedule', async (req, res) => {
  try {
    const { date, interviews } = req.body;

    if (!date || !Array.isArray(interviews) || interviews.length === 0) {
      return res.status(400).json({ message: 'Missing or invalid data' });
    }

    const candidateIds = interviews.map(i => i.candidateId);
    const candidates = await Candidate.find({ candidateId: { $in: candidateIds } });

    if (candidates.length !== candidateIds.length) {
      return res.status(404).json({ message: 'Some candidate IDs not found in DB' });
    }

    const schedule = [];
    let currentHour = 10;

    for (let i = 0; i < interviews.length; i++) {
      const { candidateId, role, duration, interviewName } = interviews[i];
      const candidate = candidates.find(c => c.candidateId === candidateId);

      if (!candidate) continue;

      // Greedy: assign first free available slot not already used
      let assignedTime = candidate.availability.find(slot => !schedule.some(s => s.time === slot));
      if (!assignedTime) {
        assignedTime = `${currentHour}:00`;
      }

      const interviewerId = dummyInterviewerIds[i % dummyInterviewerIds.length];

      schedule.push({
        interviewName,
        role,
        date,
        time: assignedTime,
        duration,
        candidateId,
        interviewerId
      });

      currentHour++;
    }

    res.json({
      message: 'Schedule generated using candidate data and DAA logic',
      schedule
    });

  } catch (error) {
    console.error('Error generating schedule:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

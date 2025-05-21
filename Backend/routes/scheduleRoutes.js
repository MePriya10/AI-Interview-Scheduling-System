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
      const preferredTime = `${currentHour}:00`;
      const time = candidate.availability.includes(preferredTime) ? preferredTime : `${currentHour + 1}:00`;
      const interviewerId = dummyInterviewerIds[i % dummyInterviewerIds.length];

      schedule.push({
        interviewName,
        role,
        date,
        time,
        duration,
        candidateId,
        interviewerId
      });

      currentHour++;
    }

    res.json({
      message: 'Schedule generated successfully using candidate data.',
      schedule
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

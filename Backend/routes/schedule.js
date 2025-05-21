const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const Interviewer = require("../models/Interviewer");

// POST /api/generate-schedule
router.post("/generate-schedule", async (req, res) => {
  const { date, interviews } = req.body;

  try {
    const schedule = [];

    for (let interview of interviews) {
      const { role, duration, candidateIds } = interview;

      // 1. Get interviewers for the role
      const interviewers = await Interviewer.find({ role });

      // 2. For each candidate, find a time and interviewer
      for (let candidateId of candidateIds) {
        const candidate = await Candidate.findOne({ candidateId });

        if (!candidate) continue;

        // Match candidate & interviewer availability
        for (let time of candidate.availability) {
          const availableInterviewer = interviewers.find((i) =>
            i.availability.includes(time)
          );

          if (availableInterviewer) {
            schedule.push({
              interviewName: `${role} - ${candidateId}`,
              role,
              date,
              time,
              duration,
              candidateId,
              interviewerId: availableInterviewer.interviewerId,
            });

            // Remove that slot to avoid reuse
            candidate.availability = candidate.availability.filter(
              (t) => t !== time
            );
            availableInterviewer.availability = availableInterviewer.availability.filter(
              (t) => t !== time
            );

            break; // Go to next candidate
          }
        }
      }
    }

    res.json({ schedule });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Schedule generation failed." });
  }
});

module.exports = router;

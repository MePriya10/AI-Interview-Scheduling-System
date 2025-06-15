const { generateInterviewPairs } = require("../utils/matchPairs");
const { assignSlots } = require("../utils/scheduler");

const runScheduler = (req, res) => {
  const { selectedCandidateIds, maxInterviewsPerDay, startDate, interviewTitle, role } = req.body;

  try {
    console.log("Received Candidate IDs:", selectedCandidateIds);

    const pairs = generateInterviewPairs(selectedCandidateIds);
    console.log("Interview pairs generated:", pairs.length);

    if (pairs.length === 0) {
      return res.status(200).json({
        schedule: [],
        message: "No matching time slots found.",
      });
    }

    const slotTimes = [...new Set(pairs.map((p) => p.slot))];

    const schedule = assignSlots({
      interviewPairs: pairs,
      selectedCandidateIds,
      maxInterviewsPerDay,
      startDate,
      slotTimes,
      interviewTitle,
      role,
    });

    res.status(200).json(schedule);
  } catch (error) {
    console.error("Scheduler error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { runScheduler };

const { generateInterviewPairs } = require("../utils/matchPairs");
const { assignSlots } = require("../utils/scheduler");

const runScheduler = (req, res) => {
  const { selectedCandidateIds, maxInterviewsPerDay, startDate } = req.body;

  try {
    const pairs = generateInterviewPairs();
    const slotTimes = [...new Set(pairs.map(p => p.slot))];

    const schedule = assignSlots({
      interviewPairs: pairs,
      selectedCandidateIds,
      maxInterviewsPerDay,
      startDate,
      slotTimes
    });

    res.status(200).json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate schedule" });
  }
};

module.exports = { runScheduler };

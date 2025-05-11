const Interview = require("../models/Interview");

exports.scheduleInterview = async (req, res) => {
  try {
    const interview = new Interview(req.body);
    await interview.save();
    res.status(201).json({ message: "Interview scheduled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find().populate("candidate interviewer");
    res.status(200).json(interviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

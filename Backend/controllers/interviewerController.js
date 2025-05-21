const Interviewer = require('../models/Interviewer');

// Bulk add multiple interviewers
exports.bulkAddInterviewers = async (req, res) => {
  try {
    const interviewers = req.body; // Expecting an array of interviewer objects
    const result = await Interviewer.insertMany(interviewers);
    res.status(201).json({ message: 'Interviewers added successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a single interviewer
exports.createInterviewer = async (req, res) => {
  try {
    const interviewer = new Interviewer(req.body);
    const savedInterviewer = await interviewer.save();
    res.status(201).json(savedInterviewer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all interviewers
exports.getAllInterviewers = async (req, res) => {
  try {
    const interviewers = await Interviewer.find();
    res.json(interviewers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get interviewer by ID
exports.getInterviewerById = async (req, res) => {
  try {
    const interviewer = await Interviewer.findOne({ interviewerId: req.params.interviewerId });
    if (!interviewer) return res.status(404).json({ message: 'Interviewer not found' });
    res.json(interviewer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update interviewer by ID
exports.updateInterviewer = async (req, res) => {
  try {
    const updatedInterviewer = await Interviewer.findOneAndUpdate(
      { interviewerId: req.params.interviewerId },
      req.body,
      { new: true }
    );
    if (!updatedInterviewer) return res.status(404).json({ message: 'Interviewer not found' });
    res.json(updatedInterviewer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete interviewer by ID
exports.deleteInterviewer = async (req, res) => {
  try {
    const deletedInterviewer = await Interviewer.findOneAndDelete({ interviewerId: req.params.interviewerId });
    if (!deletedInterviewer) return res.status(404).json({ message: 'Interviewer not found' });
    res.json({ message: 'Interviewer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

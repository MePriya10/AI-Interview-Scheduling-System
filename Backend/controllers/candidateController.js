const Candidate = require('../models/Candidate');

// Bulk add multiple candidates
exports.bulkAddCandidates = async (req, res) => {
  try {
    const candidates = req.body; // Expecting an array of candidate objects
    const result = await Candidate.insertMany(candidates);
    res.status(201).json({ message: 'Candidates added successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a single candidate
exports.createCandidate = async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    const savedCandidate = await candidate.save();
    res.status(201).json(savedCandidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all candidates
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get candidate by ID
exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findOne({ candidateId: req.params.candidateId });
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update candidate by ID
exports.updateCandidate = async (req, res) => {
  try {
    const updatedCandidate = await Candidate.findOneAndUpdate(
      { candidateId: req.params.candidateId },
      req.body,
      { new: true }
    );
    if (!updatedCandidate) return res.status(404).json({ message: 'Candidate not found' });
    res.json(updatedCandidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete candidate by ID
exports.deleteCandidate = async (req, res) => {
  try {
    const deletedCandidate = await Candidate.findOneAndDelete({ candidateId: req.params.candidateId });
    if (!deletedCandidate) return res.status(404).json({ message: 'Candidate not found' });
    res.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

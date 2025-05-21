// models/InterviewRequest.js
const mongoose = require('mongoose');

const InterviewRequestSchema = new mongoose.Schema({
  role: { type: String, required: true },
  date: { type: String, required: true }, // We'll use a string like "2025-04-10"
  duration: { type: Number, required: true }, // in minutes
  candidateIds: [{ type: String, required: true }], // Array of candidate IDs
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('InterviewRequest', InterviewRequestSchema);

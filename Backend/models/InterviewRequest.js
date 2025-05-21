// Backend/models/InterviewRequest.js

const mongoose = require('mongoose');

const interviewRequestSchema = new mongoose.Schema({
  role: String,
  interviewerName: String,
  candidateIds: [String],
  duration: Number,
  date: String
});

module.exports = mongoose.model('InterviewRequest', interviewRequestSchema);

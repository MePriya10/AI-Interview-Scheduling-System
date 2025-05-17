// models/Interview.js
const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  interviewTitle: {
    type: String,
    required: true,
  },
  scheduledTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number, // in minutes
    required: true,
  },
  interviewer: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled'],
    default: 'Scheduled',
  },
});

module.exports = mongoose.model('Interview', InterviewSchema);

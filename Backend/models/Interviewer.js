const mongoose = require('mongoose');

const interviewerSchema = new mongoose.Schema({
  interviewerId: { type: String, required: true, unique: true },
  interviewerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  availableSlots: [{ type: String }], // e.g. ["Wed 3PM", "Mon 9AM", "Thu 10AM"]
}, { timestamps: true });

module.exports = mongoose.model('Interviewer', interviewerSchema);

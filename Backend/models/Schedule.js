// models/Schedule.js
const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  setupId: { type: mongoose.Schema.Types.ObjectId, ref: 'InterviewRequest' },
  schedule: [{}], // You can define more structured fields here
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);

const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  candidateId: { type: String, required: true, unique: true },
  candidateName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  availableSlots: [{ type: String }], // e.g. ["Wed 3PM", "Mon 9AM", "Thu 10AM"]
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);

const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  interviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  time: String,
  status: { type: String, default: "scheduled" }
});

module.exports = mongoose.model("Interview", interviewSchema);

const express = require("express");
const router = express.Router();
const { scheduleInterview, getInterviews } = require("../controllers/interviewController");
// You can later import your controller here
// const { scheduleInterview, getInterviews } = require("../controllers/interviewController");

// Dummy GET route (just to test that it's working)
router.get("/", (req, res) => {
  res.send("✅ Schedule route is working!");
});

module.exports = router;

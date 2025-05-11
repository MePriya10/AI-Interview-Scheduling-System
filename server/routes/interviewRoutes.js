const express = require("express");
const router = express.Router();
const { scheduleInterview, getInterviews } = require("../controllers/interviewController");

router.post("/schedule", scheduleInterview);
router.get("/", getInterviews);

module.exports = router;

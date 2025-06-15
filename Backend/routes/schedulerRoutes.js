const express = require("express");
const router = express.Router();
const { runScheduler } = require("../controllers/schedulerController");

router.post("/schedule", runScheduler);

module.exports = router;

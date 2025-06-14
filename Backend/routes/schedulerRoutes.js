const express = require("express");
const { runScheduler } = require("../controllers/schedulerController");
const router = express.Router();

router.post("/generate", runScheduler);

module.exports = router;

const express = require('express');
const { generateScheduleController } = require('../controllers/scheduleController');

const router = express.Router();

router.post('/generate-schedule', generateScheduleController);

module.exports = router;

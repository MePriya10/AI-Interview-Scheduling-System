const express = require('express');
const router = express.Router();
const interviewerController = require('../controllers/interviewerController');

// Bulk add multiple interviewers
router.post('/bulk-add', interviewerController.bulkAddInterviewers);

// Single interviewer CRUD
router.post('/', interviewerController.createInterviewer);
router.get('/', interviewerController.getAllInterviewers);
router.get('/:interviewerId', interviewerController.getInterviewerById);
router.put('/:interviewerId', interviewerController.updateInterviewer);
router.delete('/:interviewerId', interviewerController.deleteInterviewer);

module.exports = router;



const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

// Bulk add multiple candidates
router.post('/bulk-add', candidateController.bulkAddCandidates);

// Single candidate CRUD
router.post('/', candidateController.createCandidate);
router.get('/', candidateController.getAllCandidates);
router.get('/:candidateId', candidateController.getCandidateById);
router.put('/:candidateId', candidateController.updateCandidate);
router.delete('/:candidateId', candidateController.deleteCandidate);

module.exports = router;

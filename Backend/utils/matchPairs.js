const candidates = require('../../Data/candidatesDetails.json');
const interviewers = require("../../Data/interviewersDetails.json");

function generateInterviewPairs() {
  const pairs = [];

  for (const candidate of candidates) {
    for (const interviewer of interviewers) {
      const commonSlots = candidate.availableSlots.filter(slot =>
        interviewer.availableSlots.includes(slot)
      );

      for (const slot of commonSlots) {
        pairs.push({
          candidateId: candidate.candidateId,
          candidateName: candidate.candidateName,
          interviewerId: interviewer.interviewerId,
          interviewerName: interviewer.interviewerName,
          slot,
        });
      }
    }
  }

  return pairs;
}

module.exports = { generateInterviewPairs };

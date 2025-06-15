function generateInterviewPairs(candidateIds = []) {
  const pairs = [];
  const candidates = require("../../Data/candidatesDetails.json");
  const interviewers = require("../../Data/interviewersDetails.json");

  for (const candidate of candidates) {
    if (!candidateIds.includes(candidate.candidateId)) continue;

    if (!Array.isArray(candidate.availableSlots) || !candidate.email) {
      console.warn(`Invalid candidate data for: ${candidate.candidateName}`);
      continue;
    }

    let hasPerfectMatch = false;

    for (const interviewer of interviewers) {
      if (!Array.isArray(interviewer.availableSlots)) {
        console.warn(`Invalid interviewer data for: ${interviewer.interviewerName}`);
        continue;
      }

      const commonSlots = candidate.availableSlots.filter((slot) =>
        interviewer.availableSlots.includes(slot)
      );

      if (commonSlots.length > 0) {
        hasPerfectMatch = true;
        for (const slot of commonSlots) {
          pairs.push({
            candidateId: candidate.candidateId,
            candidateName: candidate.candidateName,
            candidateEmail: candidate.email,
            interviewerId: interviewer.interviewerId,
            interviewerName: interviewer.interviewerName,
            interviewerEmail: interviewer.email,
            slot,
          });
        }
      }
    }

    // If no perfect match, assign the first available interviewer and candidate slot
    if (!hasPerfectMatch) {
      const fallbackInterviewer = interviewers.find(
        (intv) => Array.isArray(intv.availableSlots) && intv.availableSlots.length > 0
      );
      const fallbackSlot = candidate.availableSlots[0] || (fallbackInterviewer?.availableSlots[0]);

      if (fallbackInterviewer && fallbackSlot) {
        console.warn(`No perfect match for ${candidate.candidateName}, assigning fallback.`);

        pairs.push({
          candidateId: candidate.candidateId,
          candidateName: candidate.candidateName,
          candidateEmail: candidate.email,
          interviewerId: fallbackInterviewer.interviewerId,
          interviewerName: fallbackInterviewer.interviewerName,
          interviewerEmail: fallbackInterviewer.email,
          slot: fallbackSlot,
        });
      }
    }
  }

  console.log(`Total pairs created: ${pairs.length}`);
  return pairs;
}

module.exports ={generateInterviewPairs};
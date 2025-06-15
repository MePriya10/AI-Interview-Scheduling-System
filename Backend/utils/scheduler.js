const moment = require("moment");

// Build conflict graph
function buildConflictGraph(interviewPairs) {
  const graph = new Map();

  for (let i = 0; i < interviewPairs.length; i++) {
    graph.set(i, new Set());

    for (let j = 0; j < interviewPairs.length; j++) {
      if (i === j) continue;

      if (
        interviewPairs[i].candidateId === interviewPairs[j].candidateId ||
        interviewPairs[i].interviewerId === interviewPairs[j].interviewerId
      ) {
        graph.get(i).add(j);
      }
    }
  }

  return graph;
}

// Graph coloring to avoid slot conflicts
function greedyColoring(graph) {
  const colorMap = {};

  for (let node of graph.keys()) {
    const usedColors = new Set();

    for (let neighbor of graph.get(node)) {
      if (colorMap[neighbor] !== undefined) {
        usedColors.add(colorMap[neighbor]);
      }
    }

    let color = 0;
    while (usedColors.has(color)) {
      color++;
    }

    colorMap[node] = color;
  }

  return colorMap;
}

function assignSlots({
  interviewPairs,
  selectedCandidateIds,
  maxInterviewsPerDay,
  startDate,
  slotTimes,
  interviewTitle,
  role,
}) {
  console.log("Received interviewTitle:", interviewTitle);
  const scheduled = [];
  const usedSlotsPerDay = {};
  const usedInterviewers = new Set();
  const usedCandidates = new Set();

  const maxDays = 3;
  const baseDate = new Date(startDate);

  if (isNaN(baseDate.getTime())) {
    throw new Error("Invalid startDate");
  }

  for (const candidateId of selectedCandidateIds) {
    const pairsForCandidate = interviewPairs.filter(
      (pair) => pair.candidateId === candidateId
    );

    let scheduledForThisCandidate = false;

    for (let dayOffset = 0; dayOffset < maxDays && !scheduledForThisCandidate; dayOffset++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + dayOffset);
      const dateStr = date.toISOString().split("T")[0];

      if (!usedSlotsPerDay[dateStr]) {
        usedSlotsPerDay[dateStr] = new Set();
      }

      if (!startDate || isNaN(Date.parse(startDate))) {
        throw new Error("Invalid startDate provided to scheduler.");
      }
      

      for (const pair of pairsForCandidate) {
        if (
          !usedSlotsPerDay[dateStr].has(pair.slot) &&
          !usedInterviewers.has(pair.interviewerId) &&
          !usedCandidates.has(pair.candidateId)
        ) {
          scheduled.push({
            interviewName: interviewTitle?.trim() !== "" ? interviewTitle : `Interview for ${pair.candidateName}`,

            role: role || "N/A",
            date: dateStr,
            time: pair.slot,
            duration: 30,
            candidateId: pair.candidateId,
            candidateName: pair.candidateName,
            candidateEmail: pair.candidateEmail,
            interviewerId: pair.interviewerId,
            interviewerName: pair.interviewerName,
            interviewerEmail: pair.interviewerEmail,
          });

          usedSlotsPerDay[dateStr].add(pair.slot);
          usedInterviewers.add(pair.interviewerId);
          usedCandidates.add(pair.candidateId);
          scheduledForThisCandidate = true;
          break;
        }
      }
    }

    if (!scheduledForThisCandidate) {
      console.warn(`Could not schedule candidate ${candidateId} within 3 days.`);
    }
  }

  console.table(scheduled);
  return { schedule: scheduled };
}

module.exports = { assignSlots };

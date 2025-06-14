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

// Assign actual date-time slots to conflict-free pairs
function assignSlots({
  interviewPairs,
  slotTimes,
  startDate,
  maxInterviewsPerDay,
  selectedCandidateIds,
}) {
  // Safety check: ensure selectedCandidateIds is an array before filter
  if (!Array.isArray(selectedCandidateIds)) {
    selectedCandidateIds = [];
  }

  // Filter only selected candidates
  interviewPairs = interviewPairs.filter((pair) =>
    selectedCandidateIds.includes(pair.candidateId)
  );

  const graph = buildConflictGraph(interviewPairs);
  const colorMap = greedyColoring(graph);

  const usedSlots = new Set();
  const rawSchedule = [];

  const slotsPerDay = Math.min(maxInterviewsPerDay, slotTimes.length);

  for (let i = 0; i < interviewPairs.length; i++) {
    const color = colorMap[i];

    let dayOffset = Math.floor(color / slotsPerDay);
    let slotIndex = color % slotsPerDay;

    const date = moment(startDate).add(dayOffset, "days").format("YYYY-MM-DD");
    const time = slotTimes[slotIndex];
    const slotKey = `${date}-${time}`;

    if (usedSlots.has(slotKey)) continue; // Skip used time slot

    usedSlots.add(slotKey);

    const pair = interviewPairs[i];

    rawSchedule.push({
      interviewName: `Interview ${rawSchedule.length + 1}`,
      role: "Software Engineer", // You can make this dynamic if needed
      date,
      time,
      duration: 30, // Fixed or dynamic
      candidateId: pair.candidateId,
      interviewerId: pair.interviewerId,
    });
  }

  return { schedule: rawSchedule };
}

module.exports = { assignSlots };

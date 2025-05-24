const moment = require("moment");

// Step 1: Build conflict graph based on candidate/interviewer clashes
function buildConflictGraph(interviewPairs) {
  const graph = new Map();

  for (let i = 0; i < interviewPairs.length; i++) {
    graph.set(i, new Set());

    for (let j = 0; j < interviewPairs.length; j++) {
      if (i === j) continue;

      // Conflict if same candidate or same interviewer
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

// Step 2: Greedy graph coloring to assign slot indices
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

// Step 3: Schedule interviews using slot mapping and conflict-free coloring
function assignSlots({
  interviewPairs,
  slotTimes,
  startDate,
  maxInterviewsPerDay,
  selectedCandidateIds,
}) {
  // Step 3.1: Filter only selected candidates
  interviewPairs = interviewPairs.filter((pair) =>
    selectedCandidateIds.includes(pair.candidateId)
  );

  // Step 3.2: Build conflict graph and get coloring
  const graph = buildConflictGraph(interviewPairs);
  const colorMap = greedyColoring(graph);

  const schedule = [];
  const slotsPerDay = Math.min(maxInterviewsPerDay, slotTimes.length);
  const usedSlots = new Set();

  // Step 3.3: Recursive slot assignment
  function assign(index) {
    if (index >= interviewPairs.length) return true; // Base case

    const color = colorMap[index];
    let dayOffset = Math.floor(color / slotsPerDay);
    let slotIndex = color % slotsPerDay;

    while (true) {
      const date = moment(startDate).add(dayOffset, "days").format("YYYY-MM-DD");
      const slot = slotTimes[slotIndex];
      const key = `${date}-${slot}`;

      if (!usedSlots.has(key)) {
        usedSlots.add(key);

        schedule.push({
          date,
          slot,
          candidate: {
            id: interviewPairs[index].candidateId,
            name: interviewPairs[index].candidateName,
          },
          interviewer: {
            id: interviewPairs[index].interviewerId,
            name: interviewPairs[index].interviewerName,
          },
        });

        if (assign(index + 1)) return true;

        // Backtrack if failed
        usedSlots.delete(key);
        schedule.pop();
      }

      // Move to next day
      dayOffset++;
      if (dayOffset > 30) break; // Avoid infinite loop
    }

    return false;
  }

  assign(0);
  return schedule;
}

module.exports = { assignSlots };

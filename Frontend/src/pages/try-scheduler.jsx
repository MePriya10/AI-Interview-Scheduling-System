import React, { useState } from "react";

const TryScheduler = () => {
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleGenerated, setScheduleGenerated] = useState(false);
  const [interviewList, setInterviewList] = useState([]);
  const [error, setError] = useState(null);

  const handleScheduleGeneration = async () => {
    setIsScheduling(true);
    setError(null);

    try {
      // Call your backend API here to generate schedule
      const response = await fetch("/api/generate-schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // You can send required data here, e.g.
        // body: JSON.stringify({ interviews: yourData }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate schedule");
      }

      const data = await response.json();
      setInterviewList(data.schedule || []); // assuming backend returns { schedule: [...] }
      setScheduleGenerated(true);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 pt-24 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">Interview Scheduler</h1>

        {!scheduleGenerated ? (
          <>
            <p className="text-gray-600 mb-6">
              Click the button below to generate the interview schedule.
            </p>

            {error && (
              <p className="text-red-600 mb-4 font-semibold">{error}</p>
            )}

            <button
              onClick={handleScheduleGeneration}
              disabled={isScheduling}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-purple-700 transition"
            >
              {isScheduling ? "Scheduling..." : "Generate Schedule"}
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Scheduled Interviews</h2>
            {interviewList.length === 0 ? (
              <p>No scheduled interviews available.</p>
            ) : (
              <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-left mt-4">
                <thead className="bg-purple-100 text-purple-800">
                  <tr>
                    <th className="py-2 px-4">Interview Name</th>
                    <th className="py-2 px-4">Role</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Time</th>
                    <th className="py-2 px-4">Duration</th>
                    <th className="py-2 px-4">Candidate ID</th>
                    <th className="py-2 px-4">Interviewer ID</th>
                  </tr>
                </thead>
                <tbody>
                  {interviewList.map((item, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="py-2 px-4">{item.interviewName}</td>
                      <td className="py-2 px-4">{item.role}</td>
                      <td className="py-2 px-4">{item.date}</td>
                      <td className="py-2 px-4">{item.time}</td>
                      <td className="py-2 px-4">{item.duration} mins</td>
                      <td className="py-2 px-4">{item.candidateId}</td>
                      <td className="py-2 px-4">{item.interviewerId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TryScheduler;

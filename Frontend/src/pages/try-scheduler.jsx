import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TryScheduler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleGenerated, setScheduleGenerated] = useState(false);
  const [interviewList, setInterviewList] = useState([]);
  const [error, setError] = useState(null);

  const interviewData = location.state;

  console.log("📦 Raw location.state:", location.state);
  

  useEffect(() => {
    if (!interviewData || !interviewData.startDate) {
      setError("Missing interview data or start date.");
    }
  }, [interviewData]);


    const handleScheduleGeneration = async () => {
      setIsScheduling(true);
      setError(null);
    
      try {
        if (!interviewData || !interviewData.startDate) {
          throw new Error("Missing interview data or start date.");
        }
    
        const finalPayload = {
          ...interviewData,
          selectedCandidateIds: interviewData?.selectedCandidateIds || [],
        };
    
        const response = await fetch("http://localhost:5000/api/scheduler/schedule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalPayload),
        });
    
        if (!response.ok) {
          throw new Error("Failed to generate schedule. Please try again.");
        }
    
        const data = await response.json();
    
        if (!data.schedule || !Array.isArray(data.schedule)) {
          throw new Error("Invalid response format from backend.");
        }
    
        setInterviewList(data.schedule);
        setScheduleGenerated(true);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setIsScheduling(false);
      }
    };
    

  // If user refreshes the page or no state was passed
  if (!interviewData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 pt-24 px-6 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-xl max-w-xl">
          <p className="text-red-600 text-xl font-semibold mb-4">
            Interview data not found.
          </p>
          <p className="text-gray-600 mb-6">
            Please go back to the dashboard and start the scheduling process again.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 pt-24 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">
          Interview Scheduler
        </h1>

        {!scheduleGenerated ? (
          <>
            <p className="text-gray-600 mb-6">
              Click below to run the scheduling algorithm and generate the
              interview schedule.
            </p>

            {error && (
              <p className="text-red-600 mb-4 font-semibold">{error}</p>
            )}

            <button
              onClick={handleScheduleGeneration}
              disabled={isScheduling}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-purple-700 transition"
            >
              {isScheduling ? "Generating Schedule..." : "Generate Schedule"}
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Scheduled Interviews
            </h2>

            {interviewList.length === 0 ? (
              <p>No scheduled interviews returned.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-left mt-4">
                  <thead className="bg-purple-100 text-purple-800">
                    <tr>
                      <th className="py-2 px-4">Title</th>
                      <th className="py-2 px-4">Role</th>
                      <th className="py-2 px-4">Date</th>
                      <th className="py-2 px-4">Time</th>
                      <th className="py-2 px-4">Duration</th>
                      <th className="py-2 px-4">Candidate Name</th>
                      <th className="py-2 px-4">Candidate ID</th>
                      <th className="py-2 px-4">Candidate Email</th>
                      <th className="py-2 px-4">Interviewer Name</th>
                      <th className="py-2 px-4">Interviewer ID</th>
                      <th className="py-2 px-4">Interviewer Email</th>
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
                        <td className="py-2 px-4">{item.candidateName}</td>
                        <td className="py-2 px-4">{item.candidateId}</td>
                        <td className="py-2 px-4">{item.candidateEmail}</td>
                        <td className="py-2 px-4">{item.interviewerName}</td>
                        <td className="py-2 px-4">{item.interviewerId}</td>
                        <td className="py-2 px-4">{item.interviewerEmail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default TryScheduler;

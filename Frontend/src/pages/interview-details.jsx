import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const InterviewDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const interviewTitleFromState = location.state?.title || "";
  const numInterviews = location.state?.numInterviews || 1;
  const interviewDate = location.state?.date || "";

  const [interviewName, setInterviewName] = useState("");
  const [role, setRole] = useState("");
  const [duration, setDuration] = useState("");
  const [candidateId, setCandidateId] = useState("");

  const [currentCount, setCurrentCount] = useState(1);
  const [allInterviews, setAllInterviews] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const handleNext = (e) => {
    e.preventDefault();

    const interviewData = {
      interviewTitle: interviewTitleFromState,
      interviewName,
      role,
      duration,
      date: interviewDate,
      candidateId,
    };

    const updatedList = [...allInterviews, interviewData];
    setAllInterviews(updatedList);
    setShowPopup(true);

    if (currentCount < numInterviews) {
      setCurrentCount(currentCount + 1);
      // Reset form
      setInterviewName("");
      setRole("");
      setDuration("");
      setCandidateId("");
    } else {
      // All interviews collected
      navigate("/try-scheduler", {
        state: {
          interviewTitle: interviewTitleFromState,
          date: interviewDate,
          interviews: updatedList,
        },
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 pt-24 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Interview {currentCount} of {numInterviews} for:{" "}
          <span className="text-purple-600">{interviewTitleFromState}</span>
        </h2>

        <form onSubmit={handleNext} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Interview Name
            </label>
            <input
              type="text"
              placeholder="e.g. May Summer Hiring Challenge"
              value={interviewName}
              onChange={(e) => setInterviewName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Role Applied For
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Candidate ID
            </label>
            <input
              type="text"
              value={candidateId}
              onChange={(e) => setCandidateId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              required
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-400 transition"
            >
              ← Back
            </button>

            <button
              type="submit"
              className={`${
                currentCount > numInterviews
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              } text-white px-6 py-2 rounded-xl font-semibold transition`}
            >
              {currentCount < numInterviews ? "Save & Next →" : "Finish →"}
            </button>
          </div>
        </form>
      </div>

      {showPopup && (
        <div className="absolute top-5 right-5 bg-purple-600 text-white px-6 py-3 rounded-xl shadow-lg transition">
          Interview {currentCount} of {numInterviews} filled ✅
        </div>
      )}
    </div>
  );
};

export default InterviewDetails;

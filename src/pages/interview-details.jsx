import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const InterviewDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const interviewTitleFromState = location.state?.title || "";

  const [interviewName, setInterviewName] = useState("");
  const [role, setRole] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [interviewerId, setInterviewerId] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");

  const handleSendForm = (e) => {
    e.preventDefault();
    setIsSending(true);

    const generateGoogleFormLink = (interviewName, role) => {
      const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdwxdgwUBv0AAOusa6KrMAcCIa1zGJwwzTA-sjH-lOGdS0Yxg/viewform?";
      const interviewNameParam = `entry.1340369989=${encodeURIComponent(interviewName)}`;
      const roleParam = `&entry.709177397=${encodeURIComponent(role)}`;
      return baseUrl + interviewNameParam + roleParam;
    };

    const finalURL = generateGoogleFormLink(interviewName, role);

    // Simulate delay
    setTimeout(() => {
      setGeneratedLink(finalURL);
      setIsSending(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 pt-24 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Interview Details for:{" "}
          <span className="text-purple-600">{interviewTitleFromState}</span>
        </h2>

        <form onSubmit={handleSendForm} className="space-y-5">
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
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Interviewer ID
            </label>
            <input
              type="text"
              value={interviewerId}
              onChange={(e) => setInterviewerId(e.target.value)}
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
              className="bg-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-purple-700 transition"
              disabled={isSending}
            >
              {isSending ? "Sending Form..." : "Send Form"}
            </button>
          </div>
        </form>

        {generatedLink && (
          <div className="mt-8 text-center">
            <p className="text-green-600 font-semibold mb-2">
              Google Form Link Generated:
            </p>
            <a
              href={generatedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {generatedLink}
            </a>

            <div className="mt-6">
              <button
                onClick={() => navigate("/try-scheduler")}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewDetails;

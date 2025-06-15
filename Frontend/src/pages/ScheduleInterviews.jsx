import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ScheduleInterviews = () => {
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [numInterviews, setNumInterviews] = useState(1);
  const [date, setDate] = useState("");
  const [candidateInput, setCandidateInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxFutureDate = new Date();
    maxFutureDate.setMonth(maxFutureDate.getMonth() + 3);

    if (selectedDate < today) {
      alert("Please select a valid date. You cannot schedule interviews in the past.");
      return;
    }

    if (selectedDate > maxFutureDate) {
      alert("You can only schedule interviews up to 3 months in advance.");
      return;
    }

    const candidateIds = candidateInput
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    if (candidateIds.length === 0) {
      alert("Please enter at least one candidate ID.");
      return;
    }

    if (candidateIds.length < numInterviews) {
      alert(
        `You selected ${numInterviews} interviews, but only provided ${candidateIds.length} candidate ID(s).`
      );
      return;
    }

    if (candidateIds.length > numInterviews) {
      alert(
        `You selected ${numInterviews} interviews, but provided ${candidateIds.length} candidate ID(s).`
      );
      return;
    }

    // ✅ Navigate with correct keys
    navigate("/try-scheduler", {
      state: {
        interviewTitle: title,
        role,
        numberOfInterviews: numInterviews,
        startDate: date,        // was `startDate` undefined — now fixed
        selectedCandidateIds: candidateIds,           // changed from `selectedCandidateIds`
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 pt-24 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Schedule a New Interview
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Interview Title
            </label>
            <input
              type="text"
              placeholder="e.g. August Hiring Challenge"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-purple-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Role
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-purple-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Number of Interviews
            </label>
            <select
              value={numInterviews}
              onChange={(e) => setNumInterviews(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-purple-400 focus:outline-none"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Interview Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-purple-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Candidate IDs (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g. c001,c002,c003"
              value={candidateInput}
              onChange={(e) => setCandidateInput(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-purple-400 focus:outline-none"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-purple-500 text-white font-semibold px-6 py-2 rounded-xl hover:bg-purple-600 transition"
            >
              Schedule Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleInterviews;

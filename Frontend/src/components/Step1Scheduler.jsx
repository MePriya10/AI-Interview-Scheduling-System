import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Step1Scheduler = () => {
  const location = useLocation();

  // Data passed from previous page
  const date = location.state?.date || "";
  const candidateIds = location.state?.candidateIds || [];
  const interviewerIds = location.state?.interviewerIds || [];

  // Local input states for user input on this page
  const [interviewTitle, setInterviewTitle] = useState("");
  const [role, setRole] = useState("");
  const [duration, setDuration] = useState("");

  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Function to send data to backend
  const handleSubmit = async () => {
    setError(null);
    setSuccessMsg(null);

    // Validate inputs simply
    if (!interviewTitle.trim() || !role.trim() || !duration) {
      setError("Please fill all fields");
      return;
    }

    // Build data object as backend expects
    const interviewData = {
        date,
        interviews: [
          {
            role: role.trim(),
            duration: Number(duration),
            candidates: candidateIds,
            interviewers: interviewerIds,
          },
        ],
      };
      

    console.log("Sending data to backend:", interviewData);

    try {
      const response = await fetch("/api/generate-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(interviewData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to generate schedule");
      }

      const data = await response.json();
      setSuccessMsg("Schedule generated successfully!");
      console.log("Backend response:", data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Step 1: Interview Details</h2>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Interview Title</label>
        <input
          type="text"
          value={interviewTitle}
          onChange={(e) => setInterviewTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter interview title"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Role</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter role"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Duration (minutes)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter duration in minutes"
          min="1"
        />
      </div>

      <div className="mb-4">
        <p>
          <strong>Date: </strong>
          {date || "No date provided"}
        </p>
      </div>

      {error && (
        <p className="mb-4 text-red-600 font-semibold">{error}</p>
      )}

      {successMsg && (
        <p className="mb-4 text-green-600 font-semibold">{successMsg}</p>
      )}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Submit & Generate Schedule
      </button>
    </div>
  );
};

export default Step1Scheduler;

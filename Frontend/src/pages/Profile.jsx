import React, { useEffect, useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [recruiterId, setRecruiterId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch profile");

        // Adjust this line if your API response is nested like { user: {...} }
        const user = data.user || data;

        setProfile(user);
        setRecruiterId(user.recruiterId || "");
        setCompanyName(user.companyName || "");
        setError("");
      } catch (err) {
        setError(err.message);
        setProfile(null);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      setError("");
      setSuccess("");

      const token = localStorage.getItem("authToken");
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recruiterId, companyName }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      setSuccess("Profile updated successfully!");
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  if (error) {
    return (
      <div className="text-red-600 mt-20 p-4 text-center font-semibold">
        {error}
      </div>
    );
  }

  if (!profile) {
    return <div className="mt-20 p-4 text-center">Loading...</div>;
  }

  return (
    <div className="pt-20 px-4 min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex justify-center items-start">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
          Recruiter Profile
        </h2>

        <div className="space-y-6">
          {/* Name (readonly) */}
          <div>
            <label className="block text-sm text-gray-700 font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              value={profile.name}
              readOnly
              className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-300 cursor-not-allowed"
            />
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="block text-sm text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              readOnly
              className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-300 cursor-not-allowed"
            />
          </div>

          {/* Recruiter ID (editable) */}
          <div>
            <label className="block text-sm text-gray-700 font-semibold mb-1">
              Recruiter ID
            </label>
            <input
              type="text"
              value={recruiterId}
              onChange={(e) => setRecruiterId(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300"
              placeholder="Enter your recruiter ID"
            />
          </div>

          {/* Company Name (editable) */}
          <div>
            <label className="block text-sm text-gray-700 font-semibold mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300"
              placeholder="Enter your company name"
            />
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            className="mt-4 w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Save Changes
          </button>

          {/* Success message */}
          {success && (
            <p className="text-green-600 mt-2 text-center font-semibold">
              {success}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

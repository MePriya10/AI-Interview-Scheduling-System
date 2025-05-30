import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ isOpen, onClose, defaultMode = "login" }) => {
  const [mode, setMode] = useState(defaultMode);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url =
        mode === "signup"
          ? "http://localhost:5000/api/auth/signup"
          : "http://localhost:5000/api/auth/login";

      const response = await axios.post(url, formData);

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userName", response.data.user.name);

      alert(`${mode === "signup" ? "Account created" : "Logged in"} successfully!`);

      onClose();
      navigate("/dashboard");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Authentication failed. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setError("");
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-800">
          {mode === "login" ? "Login" : "Create Account"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold transition"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={toggleMode} className="text-purple-600 hover:underline font-medium">
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 text-center w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthModal;

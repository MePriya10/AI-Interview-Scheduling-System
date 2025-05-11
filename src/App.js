import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import ConfigureSettings from "./pages/ConfigureSettings";
import Schedule from "./pages/Schedule";
import Availability from "./pages/Availability";
import Profile from "./pages/Profile";
import AIInsights from "./pages/AiInsights";

import Navbar from "./components/Header";

function App() {
  return (
    <Router>
      <Navbar /> {/* Shows on every page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/configureSettings" element={<ConfigureSettings />} />
        <Route path="/settings" element={<ConfigureSettings />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/ai-insights" element={<AIInsights />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

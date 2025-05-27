import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Header";
import Analytics from "./pages/Analytics";

import AIInsights from "./pages/AiInsights";
import { AuthProvider } from "./pages/AuthContext";
import ScheduleInterviews from "./pages/ScheduleInterviews";
import InterviewDetails from "./pages/interview-details";
import TryScheduler from "./pages/try-scheduler";
import Step1Scheduler from "./components/Step1Scheduler";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/step1-scheduler" element={<Step1Scheduler />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/analytics" element={<Analytics />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ScheduleInterviews" element={<ScheduleInterviews />} />
          <Route path="/interview-details" element={<InterviewDetails />} />
          <Route path="/try-scheduler" element={<TryScheduler />} />
          <Route path="/ai-insights" element={<AIInsights />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}


export default App;

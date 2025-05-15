import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Header";
import Analytics from "./pages/Analytics";
import Schedule from "./pages/Schedule";
import AIInsights from "./pages/AiInsights";
import { AuthProvider } from "./pages/AuthContext";
import ScheduleInterviews from "./pages/ScheduleInterviews";
import InterviewDetails from "./pages/interview-details";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
        
         {/* <Route path="/profile" element={<Profile />} /> */}

          <Route
            path="/analytics"
            element={
              
                <Analytics />
  
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ScheduleInterviews" element={<ScheduleInterviews/>}/>
          
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/interview-details" element={<InterviewDetails />} />
      
        
          <Route
            path="/ai-insights"
            element={
              
                <AIInsights />
              
            }

          />
        </Routes>

        
      </Router>
    </AuthProvider>
  );
}

export default App;

// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Availability from './pages/Availability';
import Schedule from './pages/Schedule';
import Navbar from './components/Header'; // import the new Navbar
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <Navbar /> {/* add it outside Routes so it shows on every page */}
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/availability"
          element={
            <ProtectedRoute>
              <Availability />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <Schedule />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


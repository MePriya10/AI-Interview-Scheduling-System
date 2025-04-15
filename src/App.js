// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Availability from './pages/Availability';
import Schedule from './pages/Schedule';
import Navbar from './components/Header'; // ✅ import the new Navbar

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ add it outside Routes so it shows on every page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </Router>
  );
}

export default App;

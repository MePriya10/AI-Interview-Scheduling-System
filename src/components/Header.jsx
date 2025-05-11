import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();  // Hook to navigate programmatically

  // Check if the user is authenticated by looking for a token
  const isAuthenticated = localStorage.getItem('authToken'); // Modify based on your storage mechanism
  const userName = localStorage.getItem('userName'); // Assuming you saved the username in localStorage

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');  // Remove the auth token
    localStorage.removeItem('userName');  // Remove the username
    navigate('/login');  // Redirect to login page
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* LOGO + BRAND NAME */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo192.png" alt="SchedulAI Logo" className="h-8 w-8" /> {/* ✅ Logo */}
          <span className="text-xl font-bold text-blue-800">SchedulAI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-blue-800 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/availability" className="hover:text-blue-600">Availability</Link>
          <Link to="/schedule" className="hover:text-blue-600">Schedule</Link>

          {/* Authenticated User Section */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-blue-600">{userName}</span> {/* Display user's name */}
              <button
                onClick={handleLogout}
                className="text-blue-600 hover:text-blue-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-blue-600">Login</Link>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-blue-800"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-white text-blue-800 space-y-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block">Home</Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block">Dashboard</Link>
          <Link to="/availability" onClick={() => setMenuOpen(false)} className="block">Availability</Link>
          <Link to="/schedule" onClick={() => setMenuOpen(false)} className="block">Schedule</Link>

          {/* Authenticated User Section */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-blue-600">{userName}</span>
              <button
                onClick={handleLogout}
                className="text-blue-600 hover:text-blue-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-blue-600">Login</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;


import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import AuthModal from "./AuthModal";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const name = localStorage.getItem("userName");

    setIsAuthenticated(!!token);
    setUserName(name || "");
  }, [location.pathname, showAuthModal]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    setUserName("");
    setMenuOpen(false);
    navigate("/");
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setMenuOpen(false);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo192.png" alt="SchedulAI Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-blue-800">SchedulAI</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-blue-800 font-medium">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>

              {/* Profile icon and user name */}
              <Link
                to="/profile"
                className="flex items-center space-x-2 hover:text-blue-600"
                title="Profile"
              >
                <User className="w-5 h-5 text-blue-700 cursor-pointer" />
                <span>{userName.charAt(0).toUpperCase() + userName.slice(1)}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="text-blue-600 hover:text-blue-500 ml-4"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => openAuthModal("signup")}
                className="hover:text-blue-600"
              >
                Signup
              </button>
              <button
                onClick={() => openAuthModal("login")}
                className="hover:text-blue-600"
              >
                Login
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-blue-800"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-white text-blue-800 space-y-4 flex flex-col">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center space-x-2"
              >
                <User className="w-5 h-5" />
                <span>{userName.charAt(0).toUpperCase() + userName.slice(1)}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-left text-blue-600 hover:text-blue-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => openAuthModal("signup")}>Signup</button>
              <button onClick={() => openAuthModal("login")}>Login</button>
            </>
          )}
        </div>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={closeAuthModal}
        defaultMode={authMode}
      />
    </header>
  );
};

export default Header;

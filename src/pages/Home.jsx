import React, { useRef, useState } from 'react';
import {
  FaCalendarCheck,
  FaBell,
  FaSyncAlt,
  FaVideo,
  FaBrain,
  FaClock
} from 'react-icons/fa';
import AuthModal from '../components/AuthModal';

const Home = () => {
  const featuresRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openModal = (mode = "login") => {
    setAuthMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen text-gray-800 bg-white overflow-x-hidden">
      {/* 🔹 Hero Section */}
      <section className="relative z-20 flex flex-col items-center justify-center text-center px-6 min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-purple-900">
          Schedule Smarter.<br /> Interview Easier.
        </h1>
        <p className="text-lg md:text-xl text-purple-700 mb-10 max-w-xl">
          AI-powered scheduling with built-in intelligence and automation.
        </p>
        <button
          onClick={scrollToFeatures}
          className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition"
        >
          Get Started
        </button>
      </section>

      {/* 🔹 Features Section */}
      <section ref={featuresRef} id="features" className="relative z-20 py-20 px-6 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-800">Why ScheduleAI?</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
          {[{
            icon: <FaBrain />, label: "AI Conflict Detection"
          }, {
            icon: <FaCalendarCheck />, label: "Calendar Sync"
          }, {
            icon: <FaVideo />, label: "Virtual Meeting Links"
          }, {
            icon: <FaSyncAlt />, label: "Smart Rescheduling"
          }, {
            icon: <FaBell />, label: "Reminders & Alerts"
          }, {
            icon: <FaClock />, label: "Predictive Suggestions"
          }].map(({ icon, label }, i) => (
            <div key={i} className="p-6 bg-purple-100 rounded-xl hover:bg-purple-200 transition duration-300">
              <div className="text-4xl mb-4 text-purple-800">{icon}</div>
              <p className="text-purple-800 text-lg font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 CTA Section */}
      <section
        id="cta"
        className="relative z-20 py-20 px-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 text-center"
      >
        <h2 className="text-4xl font-bold mb-6 text-white">Ready to Simplify Interviews?</h2>
        <p className="text-lg text-indigo-100 mb-8">
          Join companies using ScheduleAI to streamline and automate the hiring process.
        </p>
        <button
          onClick={() => openModal("login")}
          className="bg-white text-indigo-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Try ScheduleAI
        </button>
      </section>

      {/* 🔹 Auth Modal */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={closeModal}
        defaultMode={authMode}
      />
    </div>
  );
};

export default Home;

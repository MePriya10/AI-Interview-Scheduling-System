import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaRobot,
  FaChartLine,
  FaPlayCircle,
} from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 text-gray-800 pt-24 px-6 pb-12 overflow-y-auto">
      {/* Page Heading */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-purple-900 mb-3 animate-pulse">
          Welcome to Interview Scheduler! 
        </h1>
        <p className="text-purple-700 text-lg max-w-xl mx-auto">
          Effortlessly manage your interview scheduling and get AI-powered insights to optimize your hiring process.
        </p>
      </header>

      {/* Quick Stats */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-purple-800 mb-6 border-b-2 border-purple-300 pb-2 max-w-xs mx-auto">
          Quick Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <DashboardCard
            icon={<FaCalendarAlt />}
            title="Scheduling"
            description="View and manage all your interview schedules."
            link="/schedule"
          />
          <DashboardCard
            icon={<FaRobot />}
            title="AI Insights"
            description="Get AI recommendations and conflict resolutions."
            link="/ai-insights"
          />
          <DashboardCard
            icon={<FaChartLine />}
            title="Analytics"
            description="Analyze interview metrics and performance."
            link="/analytics"
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-16 text-center">
        <h2 className="text-2xl font-bold text-purple-800 mb-6 border-b-2 border-purple-300 pb-2 max-w-xs mx-auto">
          Ready to get started?
        </h2>
        <Link
          to="/schedule"
          className="inline-block bg-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-700 transition shadow-lg"
        >
          Schedule an Interview
        </Link>
      </section>
    </div>
  );
}

// Reusable Card for Stats
const DashboardCard = ({ icon, title, description, link }) => (
  <Link
    to={link}
    className="bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition max-w-xs mx-auto"
  >
    <div className="text-5xl text-purple-700 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-purple-800 mb-2">{title}</h3>
    <p className="text-sm text-purple-700">{description}</p>
  </Link>
);

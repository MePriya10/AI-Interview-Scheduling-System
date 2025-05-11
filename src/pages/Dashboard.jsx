import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaUserClock,
  FaRobot,
  FaChartLine,
  FaPlayCircle,
  FaCogs,
} from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 text-gray-800 pt-24 px-6 pb-12 overflow-y-auto">
      {/* Page Heading */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-purple-900 mb-2">Welcome Back 👋</h1>
        <p className="text-purple-700 text-md">Here’s your interview scheduling overview</p>
      </header>

      {/* Quick Stats */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-purple-800 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard icon={<FaCalendarAlt />} title="Interviews" link="/schedule" />
          <DashboardCard icon={<FaUserClock />} title="Availability" link="/availability" />
          <DashboardCard icon={<FaRobot />} title="AI Insights" link="/ai-insights" />
          <DashboardCard icon={<FaChartLine />} title="Analytics" link="/analytics" />
        </div>
      </section>

      {/* Actions Section */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-purple-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ActionCard
            icon={<FaPlayCircle />}
            title="Start Scheduling"
            description="Create a new interview schedule powered by AI."
            link="/schedule"
          />
          <ActionCard
            icon={<FaCogs />}
            title="Configure Settings"
            description="Manage your preferences, time slots, and calendar sync."
            link="/settings"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-900 text-white rounded-2xl p-8 text-center shadow-xl">
        <h2 className="text-2xl font-bold mb-3">Let AI take the wheel</h2>
        <p className="mb-6 text-indigo-100">Automate scheduling, reminders, and conflict resolution with one smart assistant.</p>
        <Link
          to="/schedule"
          className="inline-block bg-white text-indigo-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Schedule Now
        </Link>
      </section>
    </div>
  );
}

// Reusable Card for Stats
const DashboardCard = ({ icon, title, link }) => (
  <Link
    to={link}
    className="bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition"
  >
    <div className="text-4xl text-purple-700 mb-3">{icon}</div>
    <h3 className="text-lg font-semibold text-purple-800">{title}</h3>
  </Link>
);

// Reusable Card for Actions
const ActionCard = ({ icon, title, description, link }) => (
  <Link
    to={link}
    className="bg-white rounded-xl p-6 flex items-start gap-4 shadow-md hover:shadow-lg transition"
  >
    <div className="text-3xl text-purple-700">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-purple-800 mb-1">{title}</h3>
      <p className="text-sm text-purple-700">{description}</p>
    </div>
  </Link>
);

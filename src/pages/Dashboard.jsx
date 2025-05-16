import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaRobot,
  FaChartLine,
} from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 text-gray-800 pt-24 px-4 pb-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-900 mb-3">
          Welcome to the Interview Scheduler
        </h1>
        <p className="text-gray-700 text-md max-w-2xl mx-auto">
          Manage your interview process with ease. Generate schedules, track insights, and make smarter hiring decisions.
        </p>
      </header>

      {/* Main Features */}
      <section className="mb-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<FaCalendarAlt />}
            title="Start Scheduling"
            description="Use our smart algorithm to generate conflict-free interview schedules."
            link="/ScheduleInterviews"
          />
          <FeatureCard
            icon={<FaRobot />}
            title="AI Insights"
            description="Leverage AI to optimize interviewer and candidate pairings."
            link="/ai-insights"
          />
          <FeatureCard
            icon={<FaChartLine />}
            title="Analytics"
            description="Track success metrics and evaluate interviewer performance."
            link="/analytics"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <Link
          to="/ScheduleInterviews"
          className="inline-block bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition shadow-md"
        >
           Generate Interview Schedule
        </Link>
      </section>
    </div>
  );
}

// Reusable Feature Card
const FeatureCard = ({ icon, title, description, link }) => (
  <Link
    to={link}
    className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition flex flex-col items-center text-center border border-gray-100 hover:border-purple-200"
  >
    <div className="text-4xl text-purple-700 mb-3">{icon}</div>
    <h3 className="text-lg font-semibold text-purple-800 mb-1">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </Link>
);

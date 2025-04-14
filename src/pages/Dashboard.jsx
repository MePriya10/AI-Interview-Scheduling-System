import { useState } from "react";
import { Link } from "react-router-dom";

function Card({ title, count }) {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <p className="text-gray-600">{title}</p>
      <p className="text-3xl font-bold text-blue-600">{count}</p>
    </div>
  );
}

function InterviewList({ interviews }) {
  return (
    <ul className="divide-y divide-gray-200">
      {interviews.map((intv, index) => (
        <li key={index} className="py-2">
          <p className="font-semibold">{intv.candidate} - {intv.role}</p>
          <p className="text-sm text-gray-500">{intv.interviewer} | {intv.date} at {intv.time}</p>
        </li>
      ))}
    </ul>
  );
}

export default function Dashboard() {
  const [stats] = useState({ today: 8, available: 12, pending: 5 });
  const [interviews] = useState([
    { candidate: "Sarah Anderson", role: "Frontend Developer", interviewer: "Michael Chen", date: "Oct 15, 2023", time: "10:00 AM" },
    { candidate: "James Wilson", role: "Product Manager", interviewer: "Emily Zhang", date: "Oct 15, 2023", time: "2:00 PM" },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card title="Today's Interviews" count={stats.today} />
        <Card title="Available Interviewers" count={stats.available} />
        <Card title="Pending Reviews" count={stats.pending} />
      </div>
      <h2 className="text-xl font-semibold mb-2">Upcoming Interviews</h2>
      <InterviewList interviews={interviews} />
      <div className="mt-6">
        <Link to="/schedule">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">+ Schedule Interview</button>
        </Link>
      </div>
    </div>
  );
}

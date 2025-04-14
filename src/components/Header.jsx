import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div className="flex items-center gap-2">
        <img src="/logos.jpg" alt="Logo" className="h-10 w-10" />
        <h1 className="text-xl font-bold text-blue-700">ScheduleAI</h1>
      </div>
      <nav className="flex gap-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        <Link to="/schedule" className="text-gray-700 hover:text-blue-600">Schedule</Link>
        <Link to="/availability" className="text-gray-700 hover:text-blue-600">Availability</Link>
      </nav>
    </header>
  );
}

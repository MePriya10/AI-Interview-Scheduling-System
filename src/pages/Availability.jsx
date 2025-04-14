import { useState } from "react";

export default function Availability() {
  const [interviewers] = useState([
    { name: "Sarah Wilson", times: ["Mon 9:00 AM", "Wed 2:00 PM", "Fri 11:00 AM"] },
    { name: "James Chen", times: ["Tue 10:00 AM", "Thu 3:00 PM"] },
    { name: "Michael Thompson", times: ["Wed 1:00 PM", "Fri 4:00 PM"] },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Availability</h1>
      <ul className="space-y-4">
        {interviewers.map((int, idx) => (
          <li key={idx} className="bg-white p-4 rounded shadow">
            <p className="font-semibold">{int.name}</p>
            <div className="text-sm text-gray-500 flex flex-wrap gap-2 mt-2">
              {int.times.map((t, i) => (
                <span key={i} className="bg-green-100 text-green-700 px-2 py-1 rounded">{t}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

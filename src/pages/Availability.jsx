import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const interviewSlots = [
  { id: 1, name: 'Alice Johnson', field: 'Frontend Development', time: '10:00 AM', date: '2025-05-12' },
  { id: 2, name: 'Bob Smith', field: 'Backend Engineering', time: '02:00 PM', date: '2025-05-13' },
  { id: 3, name: 'Carla Reyes', field: 'UI/UX Design', time: '11:00 AM', date: '2025-05-15' },
  { id: 4, name: 'David Lee', field: 'Data Science', time: '04:00 PM', date: '2025-05-16' },
  { id: 5, name: 'Ella Zhang', field: 'DevOps', time: '09:00 AM', date: '2025-05-18' },
  { id: 6, name: 'Sophia Wang', field: 'Cloud Computing', time: '12:00 PM', date: '2025-05-20' },
  { id: 7, name: 'James Brown', field: 'Artificial Intelligence', time: '03:00 PM', date: '2025-05-22' },
  { id: 8, name: 'Laura Lee', field: 'Cybersecurity', time: '01:00 PM', date: '2025-05-25' },
  { id: 9, name: 'Liam Scott', field: 'Machine Learning', time: '02:00 PM', date: '2025-05-28' },
  { id: 10, name: 'Emma White', field: 'Product Management', time: '10:00 AM', date: '2025-06-01' },
];

const AvailabilityPage = () => {
  const [selectedInterviewers, setSelectedInterviewers] = useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (event, interviewerId) => {
    if (event.target.checked) {
      if (selectedInterviewers.length >= 1) {
        alert('Only one interviewer can be selected at a time.');
        return;
      }
      setSelectedInterviewers([interviewerId]);
    } else {
      setSelectedInterviewers([]);
    }
  };

  const handleBookSlot = () => {
    if (selectedInterviewers.length === 1) {
      navigate('/schedule');
    } else {
      alert('Please select one interviewer.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 py-24 px-4 md:px-16">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">Available Interview Slots</h1>

      <div className="bg-white rounded-xl shadow-xl overflow-x-auto max-h-[65vh] overflow-y-scroll">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-indigo-600 text-white sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4">Select</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Field</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {interviewSlots.map(({ id, name, field, time, date }) => (
              <tr key={id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    onChange={(event) => handleCheckboxChange(event, id)}
                    checked={selectedInterviewers.includes(id)}
                    className="h-5 w-5"
                  />
                </td>
                <td className="px-6 py-4 font-medium">{name}</td>
                <td className="px-6 py-4">{field}</td>
                <td className="px-6 py-4">{time}</td>
                <td className="px-6 py-4">{new Date(date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handleBookSlot}
          disabled={selectedInterviewers.length !== 1}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-lg disabled:opacity-50"
        >
          Book Selected Slot
        </button>
      </div>
    </div>
  );
};

export default AvailabilityPage;

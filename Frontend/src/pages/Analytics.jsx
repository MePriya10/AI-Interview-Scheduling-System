// src/pages/Analytics.jsx
import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  // Line Chart - Interviews over Time
  const interviewsOverTime = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Scheduled Interviews',
        data: [12, 19, 14, 20, 16],
        borderColor: '#38BDF8',
        backgroundColor: 'rgba(56, 189, 248, 0.3)',
        pointBackgroundColor: '#0EA5E9',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Bar Chart - Efficiency Metrics
  const schedulingEfficiency = {
    labels: ['Panel Delay', 'Candidate Delay', 'Auto-Match Success', 'Conflicts Resolved'],
    datasets: [
      {
        label: 'Efficiency Metrics',
        data: [2, 3, 16, 4],
        backgroundColor: ['#8B5CF6', '#F472B6', '#22D3EE', '#60A5FA'],
        borderRadius: 6,
        borderSkipped: false
      }
    ]
  };

  // Doughnut Chart - Interview Outcomes
  const interviewOutcomes = {
    labels: ['Completed', 'Rescheduled', 'Canceled'],
    datasets: [
      {
        label: 'Interview Outcomes',
        data: [28, 5, 2],
        backgroundColor: ['#14B8A6', '#FBBF24', '#F43F5E'],
        hoverBackgroundColor: ['#0D9488', '#F59E0B', '#E11D48'],
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 pt-24 px-6 text-gray-800">

      <h1 className="text-4xl font-bold mb-10 text-blue-800">📊 Analytics Dashboard</h1>

      {/* Grid of Charts */}
      <div className="grid lg:grid-cols-2 gap-10 mb-12">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">📅 Interviews Over Time</h2>
          <div style={{ width: '100%', height: '320px' }}>
            <Line data={interviewsOverTime} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">⚙️ Scheduling Efficiency</h2>
          <div style={{ width: '100%', height: '320px' }}>
            <Bar data={schedulingEfficiency} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Doughnut Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-md mb-16 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-blue-700 mb-2">🧠 Interview Outcomes</h2>
        <p className="text-sm text-gray-500 mb-6">Distribution of completed, rescheduled, and canceled interviews</p>
        <div style={{ maxWidth: '500px', width: '100%' }}>
          <Doughnut data={interviewOutcomes} options={{
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: '#4B5563',
                  font: { size: 14 }
                }
              }
            },
            cutout: '70%'
          }} />
        </div>
      </div>

      {/* Recent Interviews Table */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">📝 Recent Interviews</h2>
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-100 text-blue-900 uppercase">
              <tr>
                <th className="p-4">Candidate</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Panel</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Alice J.', date: 'May 2, 2025', status: 'Completed', panel: '2 members' },
                { name: 'Brian K.', date: 'May 4, 2025', status: 'Rescheduled', panel: '3 members' },
                { name: 'Sophie L.', date: 'May 5, 2025', status: 'Canceled', panel: '-' }
              ].map((entry, i) => (
                <tr key={i} className="border-t border-blue-100 hover:bg-blue-50">
                  <td className="p-4">{entry.name}</td>
                  <td className="p-4">{entry.date}</td>
                  <td className="p-4">{entry.status}</td>
                  <td className="p-4">{entry.panel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

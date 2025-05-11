import React, { useEffect, useState } from 'react';
import { FaBrain, FaClock, FaCalendarCheck, FaLightbulb } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

const mockInterviews = [
  { id: 1, date: '2025-05-10', startTime: '14:00', endTime: '14:30', interviewer: 'Alice Johnson', category: 'Frontend Developer' },
  { id: 2, date: '2025-05-10', startTime: '14:30', endTime: '15:00', interviewer: 'Bob Smith', category: 'Backend Developer' },
  { id: 3, date: '2025-05-11', startTime: '10:00', endTime: '10:30', interviewer: 'Carla Reyes', category: 'Data Scientist' },
  { id: 4, date: '2025-05-12', startTime: '16:00', endTime: '16:30', interviewer: 'Daniel Kim', category: 'DevOps Engineer' },
  { id: 5, date: '2025-05-13', startTime: '12:00', endTime: '12:30', interviewer: 'Emma Liu', category: 'Product Manager' },
];

export default function AIInsights() {
  const [insights, setInsights] = useState({
    bestTime: '',
    conflicts: [],
    smartBuffering: '',
    recommendation: '',
  });

  useEffect(() => {
    const fetchInsights = () => {
      const timeSlots = mockInterviews.map((interview) => interview.startTime);
      const bestTime = getBestTimeSlot(timeSlots);
      const conflicts = detectConflicts(mockInterviews);
      const smartBuffering = recommendBuffering(mockInterviews);
      const recommendation = generateRecommendation(conflicts);

      setInsights({ bestTime, conflicts, smartBuffering, recommendation });
    };

    fetchInsights();
  }, []);

  const barData = {
    labels: mockInterviews.map((int) => `${int.date} ${int.startTime}`),
    datasets: [
      {
        label: 'Interview Count by Time Slot',
        data: mockInterviews.map(() => 1),
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Your Weekly Interview Schedule Overview',
        font: { size: 18 },
      },
    },
  };

  return (
    <div className="pt-20 px-4 pb-10 min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 font-sans">
      <header className="text-center py-12 mb-8 bg-purple-800 text-white rounded-xl shadow-md">
        <h1 className="text-5xl font-bold mb-3">Welcome to Your AI Scheduler Dashboard</h1>
        <p className="text-lg">Smart scheduling tips personalized just for you ✨</p>
      </header>

      <div className="max-w-6xl mx-auto mb-12">
        <div className="relative h-[350px] bg-white rounded-xl shadow-md p-6">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
        <InsightCard
          icon={<FaClock />}
          title="Best Time Slots"
          tip={`Best interview time: ${insights.bestTime || 'Calculating...'}`}
        />
        <InsightCard
          icon={<FaCalendarCheck />}
          title="Conflicts Detected"
          tip={insights.conflicts.length ? `Overlaps: ${insights.conflicts.join(', ')}` : 'No conflicts!'}
        />
        <InsightCard
          icon={<FaLightbulb />}
          title="Buffer Suggestions"
          tip={insights.smartBuffering || 'Calculating...'}
        />
        <InsightCard
          icon={<FaBrain />}
          title="AI Recommendation"
          tip={insights.recommendation || 'Analyzing...'}
        />
      </section>

      <section className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-12">
        <h2 className="text-xl font-semibold mb-4 text-purple-900">📅 Upcoming Interviews</h2>
        <ul className="space-y-4">
          {mockInterviews.map((int) => (
            <li key={int.id} className="flex items-center gap-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50">
              <img
                src={`https://unsplash.it/50/50?random=${int.id}`}
                alt="candidate avatar"
                className="rounded-full w-12 h-12 object-cover"
              />
              <div>
                <p className="font-medium text-purple-800">Interview #{int.id}</p>
                <p className="text-sm text-gray-600">{int.date} from {int.startTime} to {int.endTime}</p>
                <p className="text-sm text-gray-700">With: {int.interviewer}</p>
                <p className="text-sm text-gray-700">Category: {int.category}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="text-center">
        <button
          className="bg-purple-700 text-white px-8 py-3 rounded-full hover:bg-purple-900 transition text-lg shadow-md"
          onClick={() => alert("Awesome! We'll keep sending you smart tips.")}
        >
          Got it! Keep these tips coming 🚀
        </button>
      </div>
    </div>
  );
}

const getBestTimeSlot = (timeSlots) => {
  const timeCount = timeSlots.reduce((acc, time) => {
    acc[time] = (acc[time] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(timeCount).reduce((a, b) => timeCount[a] > timeCount[b] ? a : b);
};

const detectConflicts = (interviews) => {
  let conflicts = [];
  for (let i = 0; i < interviews.length; i++) {
    for (let j = i + 1; j < interviews.length; j++) {
      const iStart = interviews[i].startTime;
      const iEnd = interviews[i].endTime;
      const jStart = interviews[j].startTime;
      const jEnd = interviews[j].endTime;
      if (iStart < jEnd && jStart < iEnd) {
        conflicts.push(`Interview ${interviews[i].id} & ${interviews[j].id}`);
      }
    }
  }
  return conflicts;
};

const recommendBuffering = (interviews) => {
  let bufferRecommendation = 'Consider 15-min gaps between interviews';
  const times = interviews.map((int) => int.endTime);
  const timeGaps = times.slice(1).map((time, i) => getTimeDifference(times[i], time));
  if (timeGaps.some((gap) => gap < 15)) {
    bufferRecommendation = 'Add more time between interviews';
  }
  return bufferRecommendation;
};

const getTimeDifference = (start, end) => {
  const startMinutes = convertToMinutes(start);
  const endMinutes = convertToMinutes(end);
  return endMinutes - startMinutes;
};

const convertToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const generateRecommendation = (conflicts) => {
  return conflicts.length > 0
    ? 'Conflicts found in your schedule. Resolve them to avoid issues.'
    : 'Great schedule! AI has optimized it for you.';
};

const InsightCard = ({ icon, title, tip }) => (
  <div className="relative bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-xl transition">
    <div className="text-4xl text-purple-700 mb-3">{icon}</div>
    <h3 className="text-lg font-semibold text-purple-800 mb-1">{title}</h3>
    <p className="text-sm text-gray-600">{tip}</p>
  </div>
);

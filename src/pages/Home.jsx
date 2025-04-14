export default function Home() {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Welcome to ScheduleAI</h1>
        <p className="mb-4 text-gray-700">
          ScheduleAI is an AI-powered interview scheduling platform that streamlines the coordination process...
        </p>
        <ul className="list-disc list-inside text-gray-600">
          <li>AI detects interviewer availability and avoids scheduling conflicts.</li>
          <li>Recommends the best interview slots using predictive analytics.</li>
          <li>Supports hybrid scheduling (Virtual & In-person) with built-in meeting links.</li>
          <li>Auto-reminders and smart rescheduling in case of clashes.</li>
          <li>Integrated with calendars and availability systems (like Google or Outlook).</li>
        </ul>
      </div>
    );
  }
  
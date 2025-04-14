import { useState } from "react";

export default function Schedule() {
  const [form, setForm] = useState({
    name: "", position: "", date: "", interviewer: "", mode: "Virtual", link: ""
  });
  const [conflict, setConflict] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === "interviewer" && value === "Sarah Johnson") {
      setConflict(true);
    } else {
      setConflict(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Interview Scheduled Successfully!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Schedule an Interview</h1>
      <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
        <input className="w-full border p-2 rounded" name="name" placeholder="Candidate Name" onChange={handleChange} />
        <input className="w-full border p-2 rounded" name="position" placeholder="Position Applied For" onChange={handleChange} />
        <input className="w-full border p-2 rounded" type="datetime-local" name="date" onChange={handleChange} />
        <select className="w-full border p-2 rounded" name="interviewer" onChange={handleChange}>
          <option value="">Select Interviewer</option>
          <option value="Sarah Johnson">Sarah Johnson</option>
          <option value="Michael Chen">Michael Chen</option>
        </select>
        <div className="flex gap-4">
          <label><input type="radio" name="mode" value="Virtual" checked={form.mode === 'Virtual'} onChange={handleChange} /> Virtual</label>
          <label><input type="radio" name="mode" value="In-person" checked={form.mode === 'In-person'} onChange={handleChange} /> In-person</label>
        </div>
        <input className="w-full border p-2 rounded" name="link" placeholder="Meeting Link" onChange={handleChange} />
        {conflict && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            <p><strong>Scheduling Conflict Detected</strong></p>
            <p>Suggested Times:</p>
            <ul className="list-disc list-inside">
              <li>Tomorrow at 2:00 PM</li>
              <li>Friday at 10:30 AM</li>
              <li>Next Monday at 3:00 PM</li>
            </ul>
          </div>
        )}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Schedule</button>
      </form>
    </div>
  );
}

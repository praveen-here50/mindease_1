import { useState } from "react";
import { ChevronLeft, ChevronRight, Upload } from "lucide-react";

const AcademicCalendar = () => {
  const [activeMonth, setActiveMonth] = useState(new Date());
  const [events, setEvents] = useState([]);

  const handlePrevMonth = () => {
    const prev = new Date(activeMonth);
    prev.setMonth(prev.getMonth() - 1);
    setActiveMonth(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(activeMonth);
    next.setMonth(next.getMonth() + 1);
    setActiveMonth(next);
  };

  const monthName = activeMonth.toLocaleString("default", { month: "long", year: "numeric" });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const result = ev.target?.result;
        if (typeof result === 'string') {
          const json = JSON.parse(result);
          setEvents(json);
        }
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const filteredEvents = events.filter(
    (ev) =>
      new Date(ev.date).getMonth() === activeMonth.getMonth() &&
      new Date(ev.date).getFullYear() === activeMonth.getFullYear()
  );

  const upcomingReminders = events.filter((ev) => {
    const today = new Date();
    const eventDate = new Date(ev.date);
    const diff = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 && diff <= 7;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Academic Calendar</h2>
          <div className="flex items-center gap-2">
            <button className="p-1 border rounded" onClick={handlePrevMonth}>
              <ChevronLeft />
            </button>
            <span className="font-medium">{monthName}</span>
            <button className="p-1 border rounded" onClick={handleNextMonth}>
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer text-indigo-600">
            <Upload />
            Upload Academic Calendar (JSON)
            <input type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>

        {upcomingReminders.length > 0 && (
          <div className="mb-4">
            <h3 className="text-red-600 font-semibold mb-1">Upcoming Reminders (Next 7 Days)</h3>
            <ul className="list-disc list-inside text-sm">
              {upcomingReminders.map((ev, i) => (
                <li key={i}>
                  <strong>{ev.title}</strong> on {new Date(ev.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        )}

        <h3 className="text-lg font-semibold mb-2">Events this Month</h3>
        {filteredEvents.length > 0 ? (
          <ul className="list-disc list-inside text-sm">
            {filteredEvents.map((ev, i) => (
              <li key={i}>
                <strong>{ev.title}</strong> — {new Date(ev.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No events for this month.</p>
        )}
      </div>
    </div>
  );
};

export default AcademicCalendar;
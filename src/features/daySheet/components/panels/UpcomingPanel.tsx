import React from "react";
import { ScheduleItem } from "../../types/day-sheet.types";

interface UpcomingPanelProps {
  items: ScheduleItem[];
}

const UpcomingPanel: React.FC<UpcomingPanelProps> = ({ items }) => {
  const now = new Date();

  const upcoming = items
    .filter((i) => new Date(i.startDate) > now)
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="p-3 border rounded-md bg-white shadow-sm mt-3">
      <h3 className="font-semibold mb-2">Upcoming</h3>
      {upcoming.map((i) => (
        <div key={i.id} className="mb-1 text-sm truncate">
          {i.title} -{" "}
          {new Date(i.startDate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      ))}
      {upcoming.length === 0 && <p>No upcoming items</p>}
    </div>
  );
};

export default UpcomingPanel;

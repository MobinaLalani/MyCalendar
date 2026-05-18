import React from "react";
import { ScheduleItem } from "../../types/day-sheet.types";

interface DaySummaryProps {
  items: ScheduleItem[];
}

const DaySummary: React.FC<DaySummaryProps> = ({ items }) => {
  const total = items.length;
  const completed = items.filter((i) => i.completed).length;

  return (
    <div className="p-3 border rounded-md bg-white shadow-sm">
      <h3 className="font-semibold mb-2">Day Summary</h3>
      <p>Total Items: {total}</p>
      <p>Completed: {completed}</p>
    </div>
  );
};

export default DaySummary;

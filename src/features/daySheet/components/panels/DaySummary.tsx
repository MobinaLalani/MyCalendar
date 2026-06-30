import React from "react";
import { ScheduleItem } from "../../types/day-sheet.types";

interface DaySummaryProps {
  items: ScheduleItem[];
}

const DaySummary: React.FC<DaySummaryProps> = ({ items }) => {
  const total = items.length;
  const completed = items.filter((i) => i.completed).length;
  const percent = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        
        <span className="text-sm font-semibold text-black">خلاصه روز</span>
        <span className="text-sm font-bold text-black">
          {completed}/{total}
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full border border-black/10 bg-black/8">
        <div
          className="h-full rounded-full bg-(--yellow) transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default DaySummary;

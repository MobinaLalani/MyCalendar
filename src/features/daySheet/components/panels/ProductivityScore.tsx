import React from "react";
import { ScheduleItem } from "../../types/day-sheet.types";

interface ProductivityScoreProps {
  items: ScheduleItem[];
}

const ProductivityScore: React.FC<ProductivityScoreProps> = ({ items }) => {
  const completed = items.filter((i) => i.completed).length;
  const total = items.length;
  const score = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="p-3 border rounded-md bg-white shadow-sm mt-3">
      <h3 className="font-semibold mb-2">Productivity Score</h3>
      <div className="w-full bg-gray-200 h-4 rounded-full">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-right text-xs mt-1">{score}%</p>
    </div>
  );
};

export default ProductivityScore;

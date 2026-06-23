import React from "react";
import { ScheduleItem } from "../../types/day-sheet.types";

interface ProductivityScoreProps {
  items: ScheduleItem[];
}

const ProductivityScore: React.FC<ProductivityScoreProps> = ({ items }) => {
  const completed = items.filter((i) => i.completed).length;
  const total = items.length;
  const score = total === 0 ? 0 : Math.round((completed / total) * 100);

  const barColor =
    score >= 80
      ? "from-emerald-500 to-teal-400"
      : score >= 50
        ? "from-amber-500 to-yellow-400"
        : "from-red-500 to-rose-400";

  return (
    <div className="border-b border-white/10 pb-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-(--text-foreground)">امتیاز بهره‌وری</h3>
        <span className="text-lg font-bold text-(--text-foreground)">{score}%</span>
      </div>
      <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
        <div
          className={`h-2 rounded-full bg-linear-to-r transition-all duration-500 ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export default ProductivityScore;

import React from "react";
import { ScheduleItem } from "../../types/day-sheet.types";

interface ProductivityScoreProps {
  items: ScheduleItem[];
}

const ProductivityScore: React.FC<ProductivityScoreProps> = ({ items }) => {
  const completed = items.filter((i) => i.completed).length;
  const total = items.length;
  const score = total === 0 ? 0 : Math.round((completed / total) * 100);

  const config =
    score >= 80
      ? {
          gradient: "from-emerald-500 to-teal-400",
          glowGradient: "from-emerald-500 to-teal-400",
          color: "text-emerald-300",
          label: "عالی",
        }
      : score >= 50
        ? {
            gradient: "from-amber-500 to-yellow-400",
            glowGradient: "from-amber-500 to-yellow-400",
            color: "text-amber-300",
            label: "خوب",
          }
        : {
            gradient: "from-rose-500 to-red-400",
            glowGradient: "from-rose-500 to-red-400",
            color: "text-rose-300",
            label: "نیاز به تلاش",
          };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-black/50">
          بهره‌وری
        </h3>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
          <span className={`text-lg font-bold leading-none ${config.color}`}>{score}%</span>
        </div>
      </div>
      <div className="relative h-2.5 w-full overflow-hidden rounded-full border border-black/10 bg-black/6">
        <div
          className={`h-full rounded-full bg-linear-to-r transition-all duration-700 ease-out ${config.gradient}`}
          style={{ width: `${score}%` }}
        />
        <div
          className={`absolute inset-y-0 left-0 rounded-full bg-linear-to-r opacity-40 blur-sm ${config.glowGradient}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export default ProductivityScore;

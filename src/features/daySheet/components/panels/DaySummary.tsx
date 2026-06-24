import React from "react";
import { ScheduleItem } from "../../types/day-sheet.types";

interface DaySummaryProps {
  items: ScheduleItem[];
}

const DaySummary: React.FC<DaySummaryProps> = ({ items }) => {
  const total = items.length;
  const completed = items.filter((i) => i.completed).length;
  const remaining = total - completed;

  const stats = [
    {
      label: "کل",
      value: total,
      icon: "📊",
      colorClass: "text-slate-200",
      bgClass: "border-white/10 bg-white/6",
    },
    {
      label: "انجام شده",
      value: completed,
      icon: "✅",
      colorClass: "text-emerald-300",
      bgClass: "border-emerald-500/20 bg-emerald-500/8",
    },
    {
      label: "باقیمانده",
      value: remaining,
      icon: "⏳",
      colorClass: "text-amber-300",
      bgClass: "border-amber-500/20 bg-amber-500/8",
    },
  ];

  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        خلاصه روز
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-xl border p-3 text-center ${stat.bgClass}`}>
            <div className="mb-0.5 text-base">{stat.icon}</div>
            <div className={`mb-1 text-xl font-bold leading-none ${stat.colorClass}`}>
              {stat.value}
            </div>
            <div className="text-[11px] text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaySummary;

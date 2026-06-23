import React from "react";
import { ScheduleItem } from "../../types/day-sheet.types";

interface DaySummaryProps {
  items: ScheduleItem[];
}

const DaySummary: React.FC<DaySummaryProps> = ({ items }) => {
  const total = items.length;
  const completed = items.filter((i) => i.completed).length;
  const remaining = total - completed;

  return (
    <div className="border-b border-white/10 pb-4 mb-4">
      <h3 className="text-sm font-semibold text-(--text-foreground) mb-3">خلاصه روز</h3>
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-3 text-center">
          <div className="text-xl font-bold text-(--text-foreground)">{total}</div>
          <div className="text-xs text-slate-400 mt-1">کل</div>
        </div>
        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-center">
          <div className="text-xl font-bold text-emerald-400">{completed}</div>
          <div className="text-xs text-slate-400 mt-1">انجام شده</div>
        </div>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-3 text-center">
          <div className="text-xl font-bold text-amber-400">{remaining}</div>
          <div className="text-xs text-slate-400 mt-1">باقیمانده</div>
        </div>
      </div>
    </div>
  );
};

export default DaySummary;

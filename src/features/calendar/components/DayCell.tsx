import type { CalendarDay, PlannerTask } from "../types/calendar.types";
import { formatPersianNumber } from "../utils/tasks";

type DayCellProps = {
  day: CalendarDay;
  tasks: PlannerTask[];
  onSelect: (dateKey: string) => void;
};

export default function DayCell({ day, tasks, onSelect }: DayCellProps) {
  const visibleTasks = tasks.slice(0, 2);
  const moreCount = tasks.length - visibleTasks.length;

  return (
    <button
      type="button"
      onClick={() => onSelect(day.dateKey)}
      className={`min-h-28 rounded-3xl border p-3 text-right transition ${
        day.isSelected
          ? "border-cyan-400 bg-cyan-400/12 shadow-lg shadow-cyan-900/30"
          : "border-white/10 bg-[#EDE7D9] hover:bg-white/10"
      } ${day.isToday ? "ring-1 ring-emerald-400/60" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-black">
            {formatPersianNumber(day.persian.day)}
          </span>
          <span className="text-xs text-slate-400">
            {day.persian.weekdayName}
          </span>
        </div>
        <span className="rounded-full bg-slate-900/80 px-2 py-1 text-xs text-slate-300">
          {day.gregorianDay}
        </span>
      </div>

      <div className="mt-3 space-y-2">
        {visibleTasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 px-2 py-1.5 text-xs text-slate-500">
            بدون برنامه
          </div>
        ) : null}

        {visibleTasks.map((task) => (
          <div
            key={task.id}
            className={`rounded-2xl px-2 py-1.5 text-xs ${
              task.completed
                ? "bg-emerald-500/15 text-emerald-200"
                : "bg-violet-500/15 text-violet-100"
            }`}
          >
            <div className="truncate font-medium">{task.title}</div>
            <div className="mt-1 text-[11px] opacity-80">{task.time}</div>
          </div>
        ))}

        {moreCount > 0 ? (
          <div className="text-xs text-cyan-200">
            + {formatPersianNumber(moreCount)} مورد دیگر
          </div>
        ) : null}
      </div>
    </button>
  );
}

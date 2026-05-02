import type { CalendarMonth, PlannerTask } from "../types/calendar.types";
import { WEEKDAY_LABELS } from "../utils/jalali";
import { getTasksForDate } from "../utils/tasks";
import DayCell from "./DayCell";

type CalendarMonthGridProps = {
  month: CalendarMonth;
  tasks: PlannerTask[];
  onSelectDate: (dateKey: string) => void;
};

export default function CalendarMonthGrid({
  month,
  tasks,
  onSelectDate,
}: CalendarMonthGridProps) {
  return (
    <>
      <div className="mt-6 grid grid-cols-7 gap-2 text-center text-sm text-slate-400">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="rounded-2xl bg-white/5 px-2 py-3">
            {label}
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-7 gap-2">
        {Array.from({ length: month.leadingEmptyDays }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="min-h-28 rounded-3xl border border-dashed border-white/5 bg-white/[0.02]"
          />
        ))}

        {month.days.map((day) => (
          <DayCell
            key={day.dateKey}
            day={day}
            tasks={getTasksForDate(tasks, day.dateKey)}
            onSelect={onSelectDate}
          />
        ))}
      </div>
    </>
  );
}

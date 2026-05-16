import type { CalendarMonth, PlannerTask } from "../types/calendar.types";
import { WEEKDAY_LABELS, WEEKDAY_SHORT_LABELS } from "../utils/jalali";
import { HabitType } from "../../habits/types/habit.type";

import { getTasksForDate } from "../utils/tasks";
import DayCell from "./DayCell";

type CalendarMonthGridProps = {
  habits: HabitType[];
  month: CalendarMonth;
  tasks: PlannerTask[];
  onSelectDate: (dateKey: string) => void;
  onQuickAdd: (dateKey: string) => void;
};

export default function CalendarMonthGrid({
  habits,
  month,
  tasks,
  onSelectDate,
  onQuickAdd,
}: CalendarMonthGridProps) {
  return (
    <div className="mt-6">
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[42rem]">
          <div className="grid grid-cols-7 gap-1.5 text-center text-xs text-slate-400 sm:gap-2 sm:text-sm">
            {WEEKDAY_LABELS.map((label, index) => (
              <WeekdayHeaderCell
                key={label}
                label={label}
                shortLabel={WEEKDAY_SHORT_LABELS[index]}
              />
            ))}
          </div>

          <div className="mt-3 grid grid-cols-7 gap-1.5 sm:gap-2">
            {Array.from({ length: month.leadingEmptyDays }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="min-h-24 rounded-2xl border border-dashed border-white/5 bg-white/[0.02] sm:min-h-28 sm:rounded-3xl"
              />
            ))}

            {month.days.map((day) => (
              <DayCell
                key={day.dateKey}
                day={day}
             
                tasks={getTasksForDate(tasks, day.dateKey)}
                onSelect={onSelectDate}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500 sm:hidden">
        برای دیدن همه روزهای ماه، تقویم را به صورت افقی اسکرول کن.
      </p>
    </div>
  );
}

type WeekdayHeaderCellProps = {
  label: string;
  shortLabel: string;
};

function WeekdayHeaderCell({ label, shortLabel }: WeekdayHeaderCellProps) {
  return (
    <div className="rounded-2xl bg-white/5 px-2 py-2.5 text-(--text-foreground) font-bold text-xl sm:py-3">
      <span className="sm:hidden">{shortLabel}</span>
      <span className="hidden sm:inline">{label}</span>
    </div>
  );
}

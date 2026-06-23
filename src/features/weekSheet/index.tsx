"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { loadPlannerTasks } from "../calendar/services/calendar.storage";
import {
  WEEKDAY_LABELS,
  addDays,
  getWeekDays,
  getPersianDateParts,
  getTodayDateKey,
  toDateKey,
} from "../../utils/jalali";
import { getTasksForDate } from "../calendar/utils/tasks";
import type { PlannerTask } from "../calendar/types/calendar.types";

const PRIORITY_COLOR: Record<string, string> = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#22c55e",
};

export default function WeeklyView() {
  const router = useRouter();
  const [tasks] = useState<PlannerTask[]>(loadPlannerTasks);
  const [anchorDate, setAnchorDate] = useState(() => new Date());
  const todayKey = getTodayDateKey();

  const weekDays = useMemo(() => getWeekDays(anchorDate), [anchorDate]);

  const weekLabel = useMemo(() => {
    const start = getPersianDateParts(weekDays[0]);
    const end = getPersianDateParts(weekDays[6]);
    if (start.month === end.month) {
      return `${start.monthName} ${start.year}`;
    }
    return `${start.monthName} — ${end.monthName} ${start.year}`;
  }, [weekDays]);

  const goToPrevWeek = () => setAnchorDate((d) => addDays(d, -7));
  const goToNextWeek = () => setAnchorDate((d) => addDays(d, 7));
  const goToThisWeek = () => setAnchorDate(new Date());

  return (
    <section className="mx-auto flex min-h-screen w-full flex-col px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-(--text-foreground)">نمای هفتگی</h1>
          <p className="mt-1 text-sm text-slate-400">{weekLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevWeek}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-(--text-foreground) transition hover:bg-white/10"
          >
            ›
          </button>
          <button
            onClick={goToThisWeek}
            className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-400 transition hover:bg-amber-400/20"
          >
            این هفته
          </button>
          <button
            onClick={goToNextWeek}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-(--text-foreground) transition hover:bg-white/10"
          >
            ‹
          </button>
        </div>
      </div>

      {/* Week grid */}
      <div className="grid flex-1 grid-cols-7 gap-2">
        {weekDays.map((day, i) => {
          const dateKey = toDateKey(day);
          const persian = getPersianDateParts(day);
          const dayTasks = getTasksForDate(tasks, dateKey);
          const isToday = dateKey === todayKey;
          const completedCount = dayTasks.filter((t) => t.completed).length;

          return (
            <div
              key={dateKey}
              onClick={() => router.push(`/DaySheet?date=${dateKey}`)}
              className={`flex cursor-pointer flex-col rounded-3xl border p-3 transition-all hover:scale-[1.01] hover:shadow-lg ${
                isToday
                  ? "border-amber-400/50 bg-amber-400/5"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              {/* Day header */}
              <div className="mb-3 text-center">
                <div className={`text-[11px] font-medium ${isToday ? "text-amber-400" : "text-slate-400"}`}>
                  {WEEKDAY_LABELS[i]}
                </div>
                <div
                  className={`mt-1 text-xl font-bold ${isToday ? "text-amber-400" : "text-(--text-foreground)"}`}
                >
                  {persian.day}
                </div>
                {dayTasks.length > 0 && (
                  <div className="mt-1 text-[10px] text-slate-500">
                    {completedCount}/{dayTasks.length}
                  </div>
                )}
              </div>

              {/* Task pills */}
              <div className="flex-1 space-y-1 overflow-hidden">
                {dayTasks.slice(0, 5).map((task) => (
                  <div
                    key={task.id}
                    className={`rounded-lg px-2 py-1 text-[10px] leading-tight truncate text-white ${
                      task.completed ? "opacity-50 line-through" : ""
                    }`}
                    style={{ backgroundColor: `${task.color || "#60a5fa"}bb` }}
                  >
                    {task.priority && task.priority !== "medium" && (
                      <span
                        className="mr-1 inline-block h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: PRIORITY_COLOR[task.priority] }}
                      />
                    )}
                    {task.title}
                  </div>
                ))}
                {dayTasks.length > 5 && (
                  <div className="px-1 text-[10px] text-slate-500">+{dayTasks.length - 5} بیشتر</div>
                )}
              </div>

              {dayTasks.length === 0 && (
                <div className="flex-1 flex items-center justify-center text-[10px] text-slate-600">
                  خالی
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

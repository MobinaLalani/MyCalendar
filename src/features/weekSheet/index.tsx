"use client";

import { useState, useMemo } from "react";
import ChevronDownIcon from "../../components/icons/arrow-down.svg";
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

export default function WeeklyView() {
  const router = useRouter();
  const [tasks] = useState<PlannerTask[]>(loadPlannerTasks);
  const [anchorDate, setAnchorDate] = useState(() => new Date());
  const todayKey = getTodayDateKey();

  const weekDays = useMemo(() => getWeekDays(anchorDate), [anchorDate]);

  const weekLabel = useMemo(() => {
    const start = getPersianDateParts(weekDays[0]);
    const end = getPersianDateParts(weekDays[6]);
    if (start.month === end.month) return `${start.monthName} ${start.year}`;
    return `${start.monthName} — ${end.monthName} ${start.year}`;
  }, [weekDays]);

  const goToPrevWeek = () => setAnchorDate((d) => addDays(d, -7));
  const goToNextWeek = () => setAnchorDate((d) => addDays(d, 7));
  const goToThisWeek = () => setAnchorDate(new Date());

  return (
    <div className="mx-4 flex min-h-[95vh] max-w-full flex-col gap-5 py-5 lg:mx-8">
      {/* Header */}
      <div className="relative border border-black px-6 py-5 rounded-3xl bg-[#a2abab]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <div className="h-1.5 w-6 rounded-full bg-linear-to-r from-yellow-400 to-amber-400" />
              <span className="text-xs font-medium tracking-widest text-black uppercase">
                برنامه‌ریزی هفتگی
              </span>
            </div>
            <h1 className="text-2xl font-bold text-black">نمای هفتگی</h1>
            <p className="mt-1 text-sm text-black/60">{weekLabel}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevWeek}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-black bg-(--lightBlue) text-black transition hover:opacity-80"
            >
              <ChevronDownIcon className="rotate-270" />
            </button>
            <button
              onClick={goToThisWeek}
              className="rounded-xl border border-black bg-(--yellow) px-4 py-2 text-sm font-semibold text-black transition hover:opacity-80"
            >
              این هفته
            </button>
            <button
              onClick={goToNextWeek}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-black bg-(--lightBlue) text-black transition hover:opacity-80"
            >
              <ChevronDownIcon className="rotate-90" />
            </button>
          </div>
        </div>
      </div>

      {/* Week grid */}
      <div className="grid flex-1 grid-cols-7 gap-2">
        {weekDays.map((day, i) => {
          const dateKey = toDateKey(day);
          const persian = getPersianDateParts(day);
          const dayTasks = getTasksForDate(tasks, dateKey);
          const isToday = dateKey === todayKey;
          const hasTasks = dayTasks.length > 0;
          const completedCount = dayTasks.filter((t) => t.completed).length;

          const cardBg = isToday
            ? "bg-(--yellow)"
            : hasTasks
              ? "bg-(--lightBlue)"
              : "bg-white";

          return (
            <div
              key={dateKey}
              onClick={() => router.push(`/DaySheet?date=${dateKey}`)}
              className={`flex cursor-pointer flex-col rounded-3xl border border-black transition-all hover:scale-[1.01] hover:shadow-md ${cardBg} ${isToday ? "border-2" : ""}`}
            >
              {/* Day header */}
              <div className="px-3 pt-3 pb-2 text-center">
                <div className="text-[11px] font-medium text-black/50">
                  {WEEKDAY_LABELS[i]}
                </div>

                <div
                  className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-base font-bold ${
                    isToday
                      ? "bg-black text-white"
                      : "text-black"
                  }`}
                >
                  {persian.day}
                </div>

                {hasTasks && (
                  <div className="mt-1">
                    <span className={`rounded-full border border-black px-1.5 py-0.5 text-[9px] font-semibold ${isToday ? "bg-black text-white" : "bg-(--yellow) text-black"}`}>
                      {completedCount}/{dayTasks.length}
                    </span>
                  </div>
                )}
              </div>

              {/* Content area — notebook lines */}
              <div
                className="flex-1 min-h-20 overflow-hidden rounded-b-3xl px-2 pb-3 space-y-1"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    to bottom,
                    transparent,
                    transparent 23px,
                    rgba(0,0,0,0.08) 23px,
                    rgba(0,0,0,0.08) 24px
                  )`,
                }}
              >
                {dayTasks.slice(0, 5).map((task) => (
                  <div
                    key={task.id}
                    className={`rounded-lg border border-black bg-white px-2 py-1 text-[10px] leading-tight truncate ${
                      task.completed ? "text-black/35 line-through" : "text-black"
                    }`}
                    style={{
                      borderRightWidth: 3,
                      borderRightColor: task.color || "#FFD230",
                    }}
                  >
                    {task.title}
                  </div>
                ))}
                {dayTasks.length > 5 && (
                  <div className="rounded-lg border border-black bg-(--yellow) px-2 py-0.5 text-center text-[9px] font-semibold text-black">
                    +{dayTasks.length - 5} بیشتر
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

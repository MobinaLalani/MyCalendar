"use client";

import React from "react";
import TimeGrid from "../timeline/TimeGrid";
import DaySummary from "../panels/DaySummary";
import ProductivityScore from "../panels/ProductivityScore";
import UpcomingPanel from "../panels/UpcomingPanel";
import FocusTimer from "../FocusTimer";
import { useDaySheet } from "../../hooks/useDaySheet";
import { useFormStore } from "../../../habits/store/Store";
import { addDays, toDateKey } from "../../../../utils/jalali";

type DaySheetLayoutProps = {
  selectedDateKey?: string;
};

function calculateStreak(completedDates: string[]): number {
  let streak = 0;
  const today = new Date();
  while (streak < 365) {
    const key = toDateKey(addDays(today, -streak));
    if (completedDates.includes(key)) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

const DaySheetLayout: React.FC<DaySheetLayoutProps> = ({ selectedDateKey }) => {
  const {
    items,
    selectedDateParts,
    selectedHabits,
    selectedTasks,
    selectedDateKey: effectiveDateKey,
  } = useDaySheet(selectedDateKey);

  const { habits: storeHabits, toggleHabitDate } = useFormStore();

  const completedHabits = selectedHabits.filter((h) => {
    const sh = storeHabits.find((s) => s.id === h.id);
    return sh?.completedDates?.includes(effectiveDateKey);
  }).length;

  return (
    <div className="mx-4 flex min-h-[95vh] max-w-full flex-col bg-(--background) gap-5 py-5 lg:mx-8">
      {/* Header */}
      <div className="relative border-b border-black bg-(--lightGray) px-6 py-5 rounded-4xl">
        <div className="relative flex items-center justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <div className="h-1.5 w-6 rounded-full bg-linear-to-r from-indigo-400 to-violet-400" />
              <span className="text-xs font-medium tracking-widest text-white  uppercase">
                برنامه روز
              </span>
            </div>
            <h1 className="text-2xl font-bold text-(--text-foreground)">{selectedDateParts.fullLabel}</h1>
          </div>
          <div className=" border border-black rounded-full  bg-(--yellow) px-4 py-2">
            <span className="text-sm font-medium  text-(--text-foreground)">{items.length} مورد</span>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-5 lg:flex-row">
      {/* ─── Timeline panel ─── */}
      <div className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-white/8  shadow-2xl backdrop-blur-xl">
        {/* Timeline */}
        <div className="relative max-h-[calc(100vh-200px)] w-full overflow-y-auto px-4 py-4">
          <div className="pl-14">
            <TimeGrid tasks={selectedTasks} />
          </div>
        </div>
      </div>

      {/* ─── Sidebar ─── */}
      <aside className="w-full space-y-4 lg:w-[22rem]">
        <FocusTimer />

        {/* Stats panel */}
        <div className="overflow-hidden rounded-3xl border border-black ">
          <div className="border border-black bg-(--yellow) m-3 rounded-3xl px-5 py-4">
            <div className="flex items-center gap-2 ">
          <div className="h-2.5 w-2.5 rounded-full bg-black" />
              <h2 className=" font-bold text-black">آمار و عملکرد</h2>
            </div>
          </div>
          <div className="space-y-5 p-5">
            <DaySummary items={items} />
            <ProductivityScore items={items} />
            
            <UpcomingPanel items={items} />
          </div>
        </div>

        {/* Habits panel */}
        <div className="overflow-hidden rounded-3xl border border-black ">
          
          <div className="border border-black  rounded-3xl px-5 py-4 bg-(--yellow) m-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 ">
                
                <div className="h-1.5 w-4 rounded-full bg-linear-to-r from-emerald-400 to-teal-400" />

                <h2 className="text-sm font-semibold text-black">عادت‌های روزانه</h2>
              </div>
              <div className="flex items-center gap-2">

                <span className="text-xs font-medium text-emerald-400">

                  {completedHabits}/{selectedHabits.length}

                </span>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                  {selectedHabits.length}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 p-4">
            {selectedHabits.length === 0 ? (
              <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-white/10 px-4 py-8 text-center">
                <span className="text-2xl">📋</span>
                <span className="text-sm text-slate-400">برای این روز عادتی ثبت نشده</span>
              </div>
            ) : null}

            {selectedHabits.map((habit) => {
              const storeHabit = storeHabits.find((h) => h.id === habit.id);
              const completedDates = storeHabit?.completedDates ?? [];
              const isDoneToday = completedDates.includes(effectiveDateKey);
              const streak = calculateStreak(completedDates);

              return (
                <div
                  key={habit.id}
                  className={`group relative overflow-hidden rounded-xl border p-4 transition-all duration-300 ${
                    isDoneToday
                      ? "border-emerald-500/25 bg-linear-to-r from-emerald-500/10 to-teal-500/5"
                      : "border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/6"
                  }`}
                >
                  <div className="relative flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div
                        className={`truncate text-sm font-semibold ${
                          isDoneToday ? "text-emerald-100" : "text-white"
                        }`}
                      >
                        {habit.HabitName}
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        {streak > 0 && (
                          <span className="font-semibold text-amber-400">🔥 {streak} روز</span>
                        )}
                        <span className="rounded-full border border-white/8 bg-white/8 px-2 py-0.5">
                          {habit.HabitFrequency}× هفته
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleHabitDate(habit.id, effectiveDateKey)}
                      className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                        isDoneToday
                          ? "border border-emerald-500/20 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                          : "border border-white/10 bg-white/8 text-slate-300 hover:bg-white/15"
                      }`}
                    >
                      {isDoneToday ? "✓ انجام شد" : "انجام نشده"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
      </div>
    </div>
  );
};

export default DaySheetLayout;

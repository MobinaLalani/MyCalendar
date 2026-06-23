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
  const { items, selectedDateParts, selectedHabits, selectedTasks, selectedDateKey: effectiveDateKey } =
    useDaySheet(selectedDateKey);

  const { habits: storeHabits, toggleHabitDate } = useFormStore();

  return (
    <div className="mx-6 flex min-h-[95vh] max-w-full flex-col gap-6 py-6 lg:mx-10 lg:flex-row">
      {/* Timeline panel */}
      <div className="min-w-0 flex-1 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        <div className="mb-4 border-b border-white/10 pb-4">
          <h1 className="text-xl font-semibold text-(--text-foreground)">جزئیات روز</h1>
          <p className="mt-1 text-sm text-slate-400">{selectedDateParts.fullLabel}</p>
        </div>

        <div className="relative w-full pl-14 overflow-y-auto max-h-[75vh]">
          <TimeGrid tasks={selectedTasks} />
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-full space-y-4 lg:w-[24rem]">
        {/* Focus Timer */}
        <FocusTimer />

        {/* Summary + Productivity + Upcoming */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <DaySummary items={items} />
          <ProductivityScore items={items} />
          <UpcomingPanel items={items} />
        </div>

        {/* Habits */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-base font-semibold text-(--text-foreground)">عادت های این روز</h2>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-(--text-foreground)">
              {selectedHabits.length}
            </span>
          </div>

          <div className="space-y-3">
            {selectedHabits.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 px-4 py-5 text-sm text-slate-400">
                برای این روز عادتی ثبت نشده است.
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
                  className={`rounded-2xl border p-4 transition-all ${
                    isDoneToday
                      ? "border-emerald-500/30 bg-emerald-500/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-(--text-foreground) truncate">
                        {habit.HabitName}
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        {streak > 0 && (
                          <span className="font-medium text-amber-400">🔥 {streak} روز</span>
                        )}
                        <span className="rounded-full bg-white/10 px-2 py-0.5">
                          {habit.HabitFrequency} بار/هفته
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleHabitDate(habit.id, effectiveDateKey)}
                      className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                        isDoneToday
                          ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                          : "bg-white/10 text-slate-400 hover:bg-white/20"
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
  );
};

export default DaySheetLayout;

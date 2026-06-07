"use client";

import React from "react";
import TimeGrid from "../timeline/TimeGrid";
import DaySummary from "../panels/DaySummary";
import ProductivityScore from "../panels/ProductivityScore";
import UpcomingPanel from "../panels/UpcomingPanel";
import { useDaySheet } from "../../hooks/useDaySheet";

type DaySheetLayoutProps = {
  selectedDateKey?: string;
};

const DaySheetLayout: React.FC<DaySheetLayoutProps> = ({
  selectedDateKey,
}) => {
  const { items, selectedDateParts, selectedHabits, selectedTasks } =
    useDaySheet(selectedDateKey);

  return (
    <div className="mx-6 flex min-h-[95vh] max-w-full flex-col gap-6 py-6 lg:mx-10 lg:flex-row">
      <div className="min-w-0 flex-1 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        <div className="mb-4 border-b border-white/10 pb-4">
          <h1 className="text-xl font-semibold text-(--text-foreground)">
            جزئیات روز
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {selectedDateParts.fullLabel}
          </p>
        </div>

        <div className="relative overflow-x-auto">
          <TimeGrid tasks={selectedTasks} />
        </div>
      </div>

      <aside className="w-full space-y-4 lg:w-[24rem]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <DaySummary items={items} />
          <ProductivityScore items={items} />
          <UpcomingPanel items={items} />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-base font-semibold text-(--text-foreground)">
              عادت های این روز
            </h2>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-(--text-foreground)">
              {selectedHabits.length}
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {selectedHabits.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 px-4 py-5 text-sm text-slate-400">
                برای این روز عادتی ثبت نشده است.
              </div>
            ) : null}

            {selectedHabits.map((habit) => (
              <div
                key={habit.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="text-sm font-semibold text-(--text-foreground)">
                  {habit.HabitName}
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400">
                  <span className="rounded-full bg-white/10 px-3 py-1">
                    شروع: {habit.HabitStartDate}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1">
                    تعداد در هفته: {habit.HabitFrequency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DaySheetLayout;

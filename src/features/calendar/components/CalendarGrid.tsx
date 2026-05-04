"use client";

import { usePlanner } from "../hooks/usePlanner";
import { formatPersianNumber } from "../utils/tasks";
import CalendarMonthGrid from "./CalendarMonthGrid";
import MonthNavigator from "./MonthNavigator";
import PlannerHeader from "./PlannerHeader";
import PlannerSummary from "./PlannerSummary";
import TaskList from "./TaskList";

export default function CalendarGrid() {
  const planner = usePlanner();

  return (
    <section className="mx-auto flex min-h-screen w-full  flex-col gap-6 bg-(--background) px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="grid gap-4 lg:grid-cols-[1.45fr_0.95fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
          <PlannerHeader
            monthLabel={planner.calendarMonth.monthLabel}
            totalMonthTasks={planner.totalMonthTasks}
            completedTodayCount={planner.completedTodayCount}
            formatNumber={formatPersianNumber}
          />

          <MonthNavigator
            monthLabel={planner.calendarMonth.monthLabel}
            onPrevious={planner.goToPreviousMonth}
            onToday={planner.goToToday}
            onNext={planner.goToNextMonth}
          />

          <CalendarMonthGrid
            month={planner.calendarMonth}
            tasks={planner.tasks}
            onSelectDate={planner.selectDate}
          />
        </div>

        <div className="space-y-4">
          <TaskList
            selectedDate={planner.selectedDate}
            selectedDateParts={planner.selectedDateParts}
            tasks={planner.selectedTasks}
            onAddTask={planner.addTask}
            onToggleTask={planner.toggleTaskStatus}
            onDeleteTask={planner.deleteTask}
          />

          <PlannerSummary
            todayTasks={planner.todayTasks}
            tomorrowTasks={planner.tomorrowTasks}
          />
        </div>
      </div>
    </section>
  );
}

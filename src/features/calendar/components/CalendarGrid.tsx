"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { usePlanner } from "../hooks/usePlanner";
import useHabit from "../../habits/hooks/useHabit";
import { getHabitsForDate } from "../../habits/utils/habits";
import CalendarMonthGrid from "./CalendarMonthGrid";
import MonthNavigator from "./MonthNavigator";
import TaskList from "./TaskList";

type PanelMode = "view" | "create";

export default function CalendarGrid() {
  const router = useRouter();
  const planner = usePlanner();
  const habits = useHabit();

  const [isTaskPanelOpen, setIsTaskPanelOpen] = useState(true);
  const [panelMode, setPanelMode] = useState<PanelMode>("view");

  const selectedHabits = useMemo(
    () => getHabitsForDate(habits.habits, planner.selectedDateKey),
    [habits.habits, planner.selectedDateKey],
  );

  const handleSelectDate = (dateKey: string) => {
    planner.selectDate(dateKey);
    setPanelMode("view");
    setIsTaskPanelOpen(true);
  };

  const handleQuickAdd = (dateKey: string) => {
    planner.selectDate(dateKey);
    setPanelMode("create");
    setIsTaskPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsTaskPanelOpen(false);
    setPanelMode("view");
  };

  const handleStartCreate = () => {
    setPanelMode("create");
    setIsTaskPanelOpen(true);
  };

  const handleCancelCreate = () => {
    setPanelMode("view");
  };

  const handleViewDaySheet = () => {
    if (planner.selectedTasks.length === 0) {
      return;
    }

    router.push(`/DaySheet?date=${planner.selectedDateKey}`);
  };

  const handleAddTask = (input: Parameters<typeof planner.addTask>[0]) => {
    const isAdded = planner.addTask(input);
    if (isAdded) handleClosePanel();
    return isAdded;
  };

  return (
    <section className="mx-auto flex min-h-screen w-full  flex-col bg-(--background) px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="grid flex-1 gap-2 xl:grid-cols-[minmax(0,1.9fr)_minmax(22rem,0.78fr)]">
        <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <MonthNavigator
            monthLabel={planner.calendarMonth.monthLabel}
            onPrevious={planner.goToPreviousMonth}
            onToday={planner.goToToday}
            onNext={planner.goToNextMonth}
          />

          <div className="mt-4 flex-1">
            <CalendarMonthGrid
              month={planner.calendarMonth}
              habits={habits.habits}
              tasks={planner.tasks}
              onSelectDate={handleSelectDate}
              onQuickAdd={handleQuickAdd}
            />
          </div>
        </div>

        <div className="m-5 min-h-88 xl:ml-6">
          <TaskList
            isOpen={isTaskPanelOpen}
            isCreateMode={panelMode === "create"}
            selectedDate={planner.selectedDate}
            selectedDateParts={planner.selectedDateParts}
            habits={selectedHabits}
            tasks={planner.selectedTasks}
            onAddTask={handleAddTask}
            onToggleTask={planner.toggleTaskStatus}
            onDeleteTask={planner.deleteTask}
            onDeleteGroup={planner.deleteTaskGroup}
            onClose={handleClosePanel}
            onStartCreate={handleStartCreate}
            onCancelCreate={handleCancelCreate}
            onViewDaySheet={handleViewDaySheet}
          />
        </div>
      </div>
    </section>
  );
}

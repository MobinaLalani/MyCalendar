"use client";

import { useState } from "react";
import { usePlanner } from "../hooks/usePlanner";
import CalendarMonthGrid from "./CalendarMonthGrid";
import MonthNavigator from "./MonthNavigator";
import TaskList from "./TaskList";

type PanelMode = "view" | "create";

export default function CalendarGrid() {
  const planner = usePlanner();
  const [isTaskPanelOpen, setIsTaskPanelOpen] = useState(true);
  const [panelMode, setPanelMode] = useState<PanelMode>("view");

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

  const handleAddTask = (input: {
    title: string;
    time: string;
    description: string;
  }) => {
    const isAdded = planner.addTask(input);

    if (isAdded) {
      handleClosePanel();
    }

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
              tasks={planner.tasks}
              onSelectDate={handleSelectDate}
              onQuickAdd={handleQuickAdd}
            />
          </div>
        </div>

        <div className="min-h-[22rem] xl:block m-5 ml-10">
          <TaskList
            isOpen={isTaskPanelOpen}
            isCreateMode={panelMode === "create"}
            selectedDate={planner.selectedDate}
            selectedDateParts={planner.selectedDateParts}
            tasks={planner.selectedTasks}
            onAddTask={handleAddTask}
            onToggleTask={planner.toggleTaskStatus}
            onDeleteTask={planner.deleteTask}
            onClose={handleClosePanel}
            onStartCreate={handleStartCreate}
            onCancelCreate={handleCancelCreate}
          />
        </div>
      </div>
    </section>
  );
}

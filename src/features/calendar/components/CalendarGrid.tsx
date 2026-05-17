"use client";

import { useMemo, useState } from "react";
import { usePlanner } from "../hooks/usePlanner";
import useHabit from "../../habits/hooks/useHabit";
import { getHabitsForDate } from "../../habits/utils/habits";
import CalendarMonthGrid from "./CalendarMonthGrid";
import DayTimelinePanel from "./DayTimelinePanel";
import MonthNavigator from "./MonthNavigator";
import TaskList from "./TaskList";

type PanelMode = "view" | "create";

export default function CalendarGrid() {
  const planner = usePlanner();
  const habits = useHabit();
  const [isTaskPanelOpen, setIsTaskPanelOpen] = useState(true);
  const [isDayTimelineOpen, setIsDayTimelineOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<PanelMode>("view");

  const selectedHabits = useMemo(
    () => getHabitsForDate(habits.habits, planner.selectedDateKey),
    [habits.habits, planner.selectedDateKey],
  );

  const handleSelectDate = (dateKey: string) => {
    planner.selectDate(dateKey);
    setPanelMode("view");
    setIsTaskPanelOpen(true);
    setIsDayTimelineOpen(false);
  };

  const handleQuickAdd = (dateKey: string) => {
    planner.selectDate(dateKey);
    setPanelMode("create");
    setIsTaskPanelOpen(true);
    setIsDayTimelineOpen(false);
  };

  const handleClosePanel = () => {
    setIsTaskPanelOpen(false);
    setPanelMode("view");
    setIsDayTimelineOpen(false);
  };

  const handleStartCreate = () => {
    setPanelMode("create");
    setIsTaskPanelOpen(true);
    setIsDayTimelineOpen(false);
  };

  const handleCancelCreate = () => {
    setPanelMode("view");
  };

  const handleToggleDetails = () => {
    setPanelMode("view");
    setIsTaskPanelOpen(true);
    setIsDayTimelineOpen((currentState) => !currentState);
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
      <div
        className={`grid flex-1 gap-2 ${
          isDayTimelineOpen
            ? "xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1.35fr)]"
            : "xl:grid-cols-[minmax(0,1.9fr)_minmax(22rem,0.78fr)]"
        }`}
      >
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

        <div className="m-5 min-h-[22rem] xl:ml-6">
          <div className="flex h-full flex-col gap-4 xl:flex-row xl:items-start">
            <div
              className={
                isDayTimelineOpen ? "xl:w-[25rem] xl:flex-none" : "w-full"
              }
            >
              <TaskList
                isOpen={isTaskPanelOpen}
                isCreateMode={panelMode === "create"}
                isDetailsOpen={isDayTimelineOpen}
                selectedDate={planner.selectedDate}
                selectedDateParts={planner.selectedDateParts}
                habits={selectedHabits}
                tasks={planner.selectedTasks}
                onAddTask={handleAddTask}
                onToggleTask={planner.toggleTaskStatus}
                onDeleteTask={planner.deleteTask}
                onClose={handleClosePanel}
                onStartCreate={handleStartCreate}
                onCancelCreate={handleCancelCreate}
                onToggleDetails={handleToggleDetails}
              />
            </div>

            {isTaskPanelOpen && isDayTimelineOpen ? (
              <div className="min-w-0 flex-1">
                <DayTimelinePanel
                  selectedDateParts={planner.selectedDateParts}
                  habits={selectedHabits}
                  tasks={planner.selectedTasks}
                  onToggleTask={planner.toggleTaskStatus}
                  onDeleteTask={planner.deleteTask}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

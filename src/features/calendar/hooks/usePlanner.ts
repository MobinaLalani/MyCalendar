"use client";

import { useEffect, useMemo, useState } from "react";

import {
  loadPlannerTasks,
  savePlannerTasks,
} from "../services/calendar.storage";
import type { PlannerTask, PlannerTaskInput } from "../types/calendar.types";
import {
  addDays,
  buildCalendarMonth,
  getNextPersianMonth,
  getPersianDateParts,
  getPreviousPersianMonth,
  parseDateKey,
  toDateKey,
} from "../../../utils/jalali";
import { countTasksInMonth, getTasksForDate } from "../utils/tasks";

export function usePlanner() {
  const today = useMemo(() => new Date(), []);
  const todayKey = useMemo(() => toDateKey(today), [today]);

  const [visibleMonthAnchor, setVisibleMonthAnchor] = useState(today);
  const [selectedDateKey, setSelectedDateKey] = useState(todayKey);
  const [tasks, setTasks] = useState<PlannerTask[]>(loadPlannerTasks);

  useEffect(() => {
    savePlannerTasks(tasks);
  }, [tasks]);

  const calendarMonth = useMemo(
    () => buildCalendarMonth(visibleMonthAnchor, selectedDateKey),
    [selectedDateKey, visibleMonthAnchor],
  );

  const selectedDate = useMemo(
    () => parseDateKey(selectedDateKey),
    [selectedDateKey],
  );
  const selectedDateParts = useMemo(
    () => getPersianDateParts(selectedDate),
    [selectedDate],
  );

  const selectedTasks = useMemo(
    () => getTasksForDate(tasks, selectedDateKey),
    [selectedDateKey, tasks],
  );

  const todayTasks = useMemo(
    () => getTasksForDate(tasks, todayKey),
    [tasks, todayKey],
  );

  const tomorrowKey = useMemo(() => toDateKey(addDays(today, 1)), [today]);
  const tomorrowTasks = useMemo(
    () => getTasksForDate(tasks, tomorrowKey),
    [tasks, tomorrowKey],
  );

  const totalMonthTasks = useMemo(
    () => countTasksInMonth(tasks, calendarMonth.days),
    [calendarMonth.days, tasks],
  );

  const completedTodayCount = useMemo(
    () => todayTasks.filter((task) => task.completed).length,
    [todayTasks],
  );

  const addTask = (taskInput: PlannerTaskInput) => {
    const title = taskInput.title.trim();
    const description = taskInput.description.trim();
    const startTime = taskInput.startTime;
    const endTime = taskInput.endTime;


    if (!title || !taskInput.startTime || !taskInput.endTime) {
      return false;
    }

    const newTask: PlannerTask = {
      id: crypto.randomUUID(),
      dateKey: selectedDateKey,
      title,
      startTime: startTime,
      endTime: taskInput.endTime,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
    return true;
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  };

  const goToToday = () => {
    setVisibleMonthAnchor(today);
    setSelectedDateKey(todayKey);
  };

  const goToPreviousMonth = () => {
    setVisibleMonthAnchor((currentMonth) =>
      getPreviousPersianMonth(currentMonth),
    );
  };

  const goToNextMonth = () => {
    setVisibleMonthAnchor((currentMonth) => getNextPersianMonth(currentMonth));
  };

  return {
    tasks,
    calendarMonth,
    selectedDate,
    selectedDateKey,
    selectedDateParts,
    selectedTasks,
    todayTasks,
    tomorrowTasks,
    totalMonthTasks,
    completedTodayCount,
    selectDate: setSelectedDateKey,
    addTask,
    deleteTask,
    toggleTaskStatus,
    goToToday,
    goToPreviousMonth,
    goToNextMonth,
  };
}

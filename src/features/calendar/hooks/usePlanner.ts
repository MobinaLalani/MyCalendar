"use client";

import { useEffect, useMemo, useState } from "react";

import {
  loadPlannerTasks,
  savePlannerTasks,
} from "../services/calendar.storage";
import { seedMockData } from "../../../utils/mockData";
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
  const [tasks, setTasks] = useState<PlannerTask[]>(() => {
    seedMockData();
    return loadPlannerTasks();
  });

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
    const { startTime, endTime, color, priority = 'medium', repeat = 'none' } = taskInput;

    if (!title || !startTime || !endTime) return false;

    const repeatGroupId = repeat !== 'none' ? crypto.randomUUID() : undefined;

    const buildTask = (dateKey: string): PlannerTask => ({
      id: crypto.randomUUID(),
      dateKey,
      title,
      startTime,
      endTime,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
      color,
      priority,
      repeat,
      repeatGroupId,
    });

    if (repeat === 'none') {
      setTasks((prev) => [...prev, buildTask(selectedDateKey)]);
      return true;
    }

    const tasksToAdd: PlannerTask[] = [];
    const startDate = parseDateKey(selectedDateKey);

    if (repeat === 'daily') {
      for (let i = 0; i < 90; i++) {
        tasksToAdd.push(buildTask(toDateKey(addDays(startDate, i))));
      }
    } else if (repeat === 'weekly') {
      for (let i = 0; i < 12; i++) {
        tasksToAdd.push(buildTask(toDateKey(addDays(startDate, i * 7))));
      }
    } else if (repeat === 'monthly') {
      for (let m = 0; m < 12; m++) {
        const d = new Date(startDate);
        d.setMonth(d.getMonth() + m);
        tasksToAdd.push(buildTask(toDateKey(d)));
      }
    }

    setTasks((prev) => [...prev, ...tasksToAdd]);
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

  const deleteTaskGroup = (repeatGroupId: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.repeatGroupId !== repeatGroupId),
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

  const reloadTasks = () => setTasks(loadPlannerTasks());

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
    deleteTaskGroup,
    toggleTaskStatus,
    goToToday,
    goToPreviousMonth,
    goToNextMonth,
    reloadTasks,
  };
}

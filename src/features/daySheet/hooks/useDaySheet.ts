"use client";
import { useMemo } from "react";
import { usePlanner } from "../../calendar/hooks/usePlanner";
import useHabit from "../../habits/hooks/useHabit";
import { ScheduleItem } from "../types/day-sheet.types";
import { getTasksForDate } from "../../calendar/utils/tasks";
import { getHabitsForDate } from "../../habits/utils/habits";
import {
  getPersianDateParts,
  getTodayDateKey,
  parseDateKey,
} from "../../../utils/jalali";

function buildDateTime(dateKey: string, time: string) {
  if (!time || !time.includes(":")) {
    return `${dateKey}T00:00:00`;
  }

  return `${dateKey}T${time}:00`;
}

export function useDaySheet(selectedDateKey?: string) {
  const planner = usePlanner();
  const habits = useHabit();
  const effectiveDateKey = selectedDateKey || getTodayDateKey();

  const selectedTasks = useMemo(
    () => getTasksForDate(planner.tasks, effectiveDateKey),
    [effectiveDateKey, planner.tasks],
  );

  const selectedHabits = useMemo(
    () => getHabitsForDate(habits.habits, effectiveDateKey),
    [effectiveDateKey, habits.habits],
  );

  const selectedDateParts = useMemo(
    () => getPersianDateParts(parseDateKey(effectiveDateKey)),
    [effectiveDateKey],
  );

  const items = useMemo<ScheduleItem[]>(() => {
    const normalizedTasks = selectedTasks.map((task) => ({
      id: task.id,
      type: "task" as const,
      title: task.title,
      description: task.description,
      startDate: buildDateTime(effectiveDateKey, task.startTime),
      endDate: buildDateTime(effectiveDateKey, task.endTime),
      completed: task.completed,
      color: task.color,
    }));

    const normalizedHabits = selectedHabits.map((habit) => ({
      id: habit.id,
      type: "habit" as const,
      title: habit.HabitName,
      startDate: habit.HabitStartDate,
      endDate: habit.HabitStartDate,
      completed: habit.completed,
      description: `تعداد در هفته: ${habit.HabitFrequency}`,
    }));

    return [...normalizedTasks, ...normalizedHabits];
  }, [effectiveDateKey, selectedHabits, selectedTasks]);

  return {
    items,
    selectedDateKey: effectiveDateKey,
    selectedDateParts,
    selectedTasks,
    selectedHabits,
  };
}

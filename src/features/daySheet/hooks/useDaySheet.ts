"use client";
import { useMemo } from "react";
import { usePlanner } from "../../calendar/hooks/usePlanner";
import useHabit from "../../habits/hooks/useHabit";
import { ScheduleItem } from "../types/day-sheet.types";

export function useDaySheet() {
  const planner = usePlanner();
  const habits = useHabit();

  const items = useMemo<ScheduleItem[]>(() => {
    const normalizedTasks = planner.tasks.map((task) => ({
      id: task.id,

      type: "task" as const,

      title: task.title,

      startDate: task.createdAt,

      endDate: task.createdAt,

      completed: task.completed,
    }));

    const normalizedHabits = habits.habits.map((habit) => ({
      id: habit.id,

      type: "habit" as const,

      title: habit.HabitName,

      startDate: habit.HabitStartDate,

      endDate: habit.HabitStartDate,

      completed: habit.completed,
    }));

    return [...normalizedTasks, ...normalizedHabits];
  }, [planner, habits]);

  return {
    items,
  };
}

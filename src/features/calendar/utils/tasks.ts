import type { CalendarDay, PlannerTask } from "../types/calendar.types";

export function formatPersianNumber(value: number) {
  return value.toLocaleString("fa-IR");
}

export function sortPlannerTasks(tasks: PlannerTask[]) {
  return [...tasks].sort((left, right) => {
    if (left.time === right.time) {
      return right.createdAt.localeCompare(left.createdAt);
    }

    if (!left.time) {
      return 1;
    }

    if (!right.time) {
      return -1;
    }

    return left.time.localeCompare(right.time);
  });
}

export function getTasksForDate(tasks: PlannerTask[], dateKey: string) {
  return sortPlannerTasks(tasks.filter((task) => task.dateKey === dateKey));
}

export function countTasksInMonth(tasks: PlannerTask[], days: CalendarDay[]) {
  const validDateKeys = new Set(days.map((day) => day.dateKey));
  return tasks.filter((task) => validDateKeys.has(task.dateKey)).length;
}
